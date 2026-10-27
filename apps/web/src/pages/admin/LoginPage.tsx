import { Lock, LogIn, Mail, ArrowLeft } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AdminCursor } from '../../components/admin/AdminCursor'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin/dashboard'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login gagal. Periksa kembali email dan password administrator Anda.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#CCFF00] selection:text-black">
      <AdminCursor />

      {/* Return to public site link */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase text-black hover:bg-[#CCFF00] px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>PORTFOLIO_HOME</span>
        </Link>
      </div>

      {/* Main Login Card - Brutalist Modern */}
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* System Header Badge */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CCFF00] border border-black inline-block" />
            <span className="font-mono text-xs font-black tracking-widest uppercase">
              // 04 . ADMIN_PORTAL
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-black text-[#CCFF00]">
            SECURE_AUTH
          </span>
        </div>

        <div className="text-left mb-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">
            LOGIN CMS
          </h1>
          <p className="font-mono text-xs text-black/70 mt-1 uppercase">
            Content Management & System Architecture Control
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono font-bold text-red-900">
            [ERROR]: {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-mono text-xs font-black uppercase tracking-wider text-black mb-1.5">
              EMAIL ADMINISTRATOR
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-black/60" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-mono text-sm text-black placeholder:text-black/35 focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase tracking-wider text-black mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-black/60" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-black font-mono text-sm text-black placeholder:text-black/35 focus:outline-none focus:bg-[#CCFF00]/10 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-sm font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isSubmitting ? 'VERIFYING...' : 'MASUK KE DASHBOARD →'}</span>
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t-2 border-black/10 text-center">
          <span className="font-mono text-[10px] text-black/50 uppercase">
            RESTRICTED ACCESS • AUTHORIZED PERSONNEL ONLY
          </span>
        </div>
      </div>
    </div>
  )
}
