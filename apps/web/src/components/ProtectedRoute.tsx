import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string
}

export function ProtectedRoute({ children, requiredRole = 'admin' }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-[#1D3557]/20 border-t-[#E63946]" />
          <p className="text-sm font-medium text-[#457B9D]">Memverifikasi sesi...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (requiredRole && !user.roles?.includes(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F1FAEE] p-4">
        <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-red-200 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#1D3557]">Akses Ditolak</h2>
          <p className="text-sm text-[#457B9D] mt-2">
            Akun Anda tidak memiliki hak akses administratif untuk membuka halaman ini.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

