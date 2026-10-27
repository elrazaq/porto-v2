import { type ReactNode } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

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
        <div className="bg-white border-2 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-black border-t-[#CCFF00] animate-spin" />
          <p className="font-mono text-xs font-black uppercase tracking-wider text-black">
            MEMVERIFIKASI SESI ADMINISTRATOR...
          </p>
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
        <div className="max-w-md w-full bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
          <div className="w-12 h-12 bg-red-100 border-2 border-black flex items-center justify-center mx-auto mb-4 text-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="font-black text-2xl uppercase tracking-tight text-black mb-2">
            AKSES DITOLAK
          </h2>
          <p className="font-mono text-xs text-black/70 mb-6 uppercase leading-relaxed">
            Akun Anda (<span className="font-bold text-black">{user.email}</span>) tidak memiliki hak akses administrator untuk membuka panel ini.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#CCFF00] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>KEMBALI KE BERANDA</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
