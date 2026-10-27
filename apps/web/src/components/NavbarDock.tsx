import { ArrowLeft, Send } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'

export function NavbarDock() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-4 px-4 py-2.5 rounded-2xl bg-white/80 border border-[#1D3557]/10 shadow-lg shadow-[#1D3557]/5 backdrop-blur-md max-w-4xl w-full transition-all">
        {/* Brand Monogram */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-[#1D3557] text-[#F1FAEE] flex items-center justify-center font-bold text-xs tracking-wider shadow-xs group-hover:bg-[#E63946] transition-colors">
            AR
          </div>
          <div className="hidden sm:block text-left leading-tight">
            <span className="font-bold text-sm text-[#1D3557] block tracking-tight">Abdul Razak</span>
            <span className="text-[11px] font-mono text-[#457B9D] block">Software Engineer</span>
          </div>
        </Link>

        {/* Anchor Links (Only displayed on HomePage) */}
        {isHomePage ? (
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-[#457B9D]">
            <a
              href="#about"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              Tentang
            </a>
            <a
              href="#experience"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              Pengalaman
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              Keahlian
            </a>
            <a
              href="#projects"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              Proyek
            </a>
          </div>
        ) : (
          <Link
            to="/#projects"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#457B9D] hover:text-[#1D3557] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        )}

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {isHomePage ? (
            <a href="#contact">
              <Button size="sm" variant="primary" className="rounded-xl">
                <span>Kontak</span>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </a>
          ) : (
            <Link to="/admin/login">
              <Button size="sm" variant="outline" className="rounded-xl">
                <span>Admin</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
