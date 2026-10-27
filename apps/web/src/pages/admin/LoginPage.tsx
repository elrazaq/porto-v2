import { Lock, LogIn, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal. Periksa kembali email dan password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block">
          <div className="h-12 w-12 rounded-2xl bg-[#1D3557] text-[#F1FAEE] flex items-center justify-center font-bold text-lg mx-auto shadow-md hover:bg-[#E63946] transition-colors">
            AR
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-extrabold text-[#1D3557]">Admin CMS Portal</h2>
        <p className="mt-1 text-xs font-mono text-[#457B9D]">Portfolio Management & Content Control</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#457B9D]/20 rounded-3xl sm:px-10">
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-600">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1.5">Email Administrator</label>
              <div className="relative">
                <Mail className="h-4 w-4 text-[#457B9D] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-[#457B9D] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full rounded-xl"
                disabled={isSubmitting}
              >
                <LogIn className="h-4 w-4" />
                <span>{isSubmitting ? 'Memproses...' : 'Masuk ke Dashboard'}</span>
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-medium text-[#457B9D] hover:text-[#1D3557] transition-colors">
              ← Kembali ke Beranda Publik
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

