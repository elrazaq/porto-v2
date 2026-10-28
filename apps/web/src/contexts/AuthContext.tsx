import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { apiClient } from '../lib/api-client'
import { AuthContext, type User } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkSession = useCallback(async () => {
    try {
      const profile = await apiClient.get<User>('/auth/me')
      if (profile && profile.id) {
        setUser(profile)
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function initSession() {
      try {
        const profile = await apiClient.get<User>('/auth/me')
        if (isMounted) {
          setUser(profile && profile.id ? profile : null)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void initSession()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await apiClient.post<{ user: User }>('/auth/login', { email, password })
      if (data?.user) {
        setUser(data.user)
      } else {
        await checkSession()
      }
    },
    [checkSession],
  )

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

