import { useState } from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { Language } from '../data/content'
import { Button } from './Button'

export interface NavbarDockProps {
  currentLang?: Language
  onToggleLang?: (lang: Language) => void
  navLabels?: {
    about: string
    experience: string
    skills: string
    projects: string
    contact: string
    admin: string
  }
}

export function NavbarDock({
  currentLang = 'id',
  onToggleLang,
  navLabels = {
    about: 'Tentang',
    experience: 'Pengalaman',
    skills: 'Keahlian',
    projects: 'Proyek',
    contact: 'Kontak',
    admin: 'Admin',
  },
}: NavbarDockProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 px-4 py-2.5 rounded-2xl bg-white/95 border border-[#1D3557]/10 shadow-lg shadow-[#1D3557]/5 backdrop-blur-md max-w-4xl w-full transition-all">
        {/* Brand */}
        <Link to="/" onClick={closeMobile} className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-xl bg-[#1D3557] text-[#F1FAEE] flex items-center justify-center font-bold text-xs tracking-wider group-hover:bg-[#E63946] transition-colors">
            AR
          </div>
          <span className="font-extrabold text-sm sm:text-base text-[#1D3557] tracking-tight">
            Abdul Razak<span className="text-[#E63946]">.</span>
          </span>
        </Link>

        {/* Desktop Anchor Links */}
        {isHomePage ? (
          <div className="hidden md:flex items-center gap-1 text-sm font-medium text-[#457B9D]">
            <a
              href="#about"
              className="px-2.5 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.about}
            </a>
            <a
              href="#experience"
              className="px-2.5 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.experience}
            </a>
            <a
              href="#projects"
              className="px-2.5 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.projects}
            </a>
            <a
              href="#skills"
              className="px-2.5 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.skills}
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

        {/* Controls: Language Toggle & Action & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Pill */}
          {onToggleLang && (
            <div className="flex items-center p-0.5 rounded-xl bg-[#F1FAEE] border border-[#1D3557]/15 text-xs font-mono">
              <button
                type="button"
                onClick={() => onToggleLang('id')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  currentLang === 'id'
                    ? 'bg-[#1D3557] text-[#F1FAEE] shadow-xs'
                    : 'text-[#457B9D] hover:text-[#1D3557]'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  currentLang === 'en'
                    ? 'bg-[#1D3557] text-[#F1FAEE] shadow-xs'
                    : 'text-[#457B9D] hover:text-[#1D3557]'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          )}

          {/* Desktop Contact CTA */}
          <div className="hidden sm:block">
            {isHomePage ? (
              <a href="#contact">
                <Button size="sm" variant="primary" className="rounded-xl">
                  <span>{navLabels.contact}</span>
                </Button>
              </a>
            ) : (
              <Link to="/admin/login">
                <Button size="sm" variant="outline" className="rounded-xl">
                  <span>{navLabels.admin}</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          {isHomePage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 rounded-xl text-[#1D3557] hover:bg-black/5 border border-[#1D3557]/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && isHomePage && (
        <div className="pointer-events-auto md:hidden fixed inset-x-4 top-20 rounded-2xl bg-white/98 backdrop-blur-xl border border-[#1D3557]/15 shadow-2xl p-5 flex flex-col gap-3 transition-all animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-[#1D3557]/10">
            <span className="font-mono text-xs font-bold text-[#457B9D] uppercase tracking-wider">Navigasi</span>
            <button
              type="button"
              onClick={closeMobile}
              className="p-1 rounded-lg text-[#1D3557] hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <a
            href="#about"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-semibold text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.about}
          </a>
          <a
            href="#experience"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-semibold text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.experience}
          </a>
          <a
            href="#projects"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-semibold text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.projects}
          </a>
          <a
            href="#skills"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-semibold text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.skills}
          </a>

          <div className="pt-2 border-t border-[#1D3557]/10 flex flex-col gap-2">
            <a href="#contact" onClick={closeMobile} className="w-full">
              <Button size="md" variant="primary" className="w-full justify-center rounded-xl">
                <span>{navLabels.contact}</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
