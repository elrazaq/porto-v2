const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

let isRefreshing = false
let refreshSubscribers: ((success: boolean) => void)[] = []

function onRefreshed(success: boolean) {
  refreshSubscribers.forEach((cb) => cb(success))
  refreshSubscribers = []
}

function addRefreshSubscriber(cb: (success: boolean) => void) {
  refreshSubscribers.push(cb)
}

async function request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  if (options.params) {
    const searchParams = new URLSearchParams()
    Object.entries(options.params).forEach(([key, val]) => {
      if (val !== undefined) searchParams.append(key, String(val))
    })
    const queryString = searchParams.toString()
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString
    }
  }

  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const headers = new Headers(options.headers || {})
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include', // Always send httpOnly cookies
  }

  let response = await fetch(url, config)

  // Auto-refresh token on 401 Unauthorized (unless it's an auth endpoint)
  if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        })

        if (refreshResponse.ok) {
          isRefreshing = false
          onRefreshed(true)
          response = await fetch(url, config)
        } else {
          isRefreshing = false
          onRefreshed(false)
        }
      } catch {
        isRefreshing = false
        onRefreshed(false)
      }
    } else {
      // Wait for the in-progress refresh
      const refreshed = await new Promise<boolean>((resolve) => {
        addRefreshSubscriber(resolve)
      })

      if (refreshed) {
        response = await fetch(url, config)
      }
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`
    try {
      const errorData = await response.json()
      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : String(errorData.message)
      }
    } catch {
      // Ignore JSON parse error on non-JSON response
    }
    const error = new Error(errorMessage)
    ;(error as { status?: number }).status = response.status
    throw error
  }

  if (response.status === 204) {
    return null as T
  }

  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return (await response.json()) as T
  }

  return (await response.text()) as unknown as T
}

export const apiClient = {
  get: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    }),

  patch: <T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}

