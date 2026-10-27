import { useState, useEffect } from 'react'
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
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  // Smart Hide on Scroll Down / Reveal on Scroll Up
  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      // If mobile menu is open, don't auto-hide
      if (mobileMenuOpen) return

      if (currentY > 80 && currentY > lastY + 5) {
        setIsVisible(false)
      } else if (currentY < lastY - 5 || currentY <= 20) {
        setIsVisible(true)
      }
      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileMenuOpen])

  const closeMobile = () => setMobileMenuOpen(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/10 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-3 flex items-center justify-between gap-4">
        {/* Brand Official Logo */}
        <Link to="/" onClick={closeMobile} className="flex items-center gap-3 group">
          <img
            src="/logo-dark.png"
            alt="Abdul Razak - Fullstack Developer"
            className="h-8 sm:h-9 w-auto object-contain hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Desktop Anchor Navigation */}
        {isHomePage ? (
          <div className="hidden md:flex items-center gap-1.5 text-sm font-bold text-[#457B9D]">
            <a
              href="#about"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.about}
            </a>
            <a
              href="#experience"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.experience}
            </a>
            <a
              href="#projects"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.projects}
            </a>
            <a
              href="#skills"
              className="px-3 py-1.5 rounded-lg hover:text-[#1D3557] hover:bg-black/5 transition-colors"
            >
              {navLabels.skills}
            </a>
          </div>
        ) : (
          <Link
            to="/#projects"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#457B9D] hover:text-[#1D3557] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Portofolio</span>
          </Link>
        )}

        {/* Controls: Language Toggle & Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language Toggle Pill */}
          {onToggleLang && (
            <div className="flex items-center p-0.5 rounded-xl bg-[#F1FAEE] border border-black/15 text-xs font-mono">
              <button
                type="button"
                onClick={() => onToggleLang('id')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
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
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
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
                <Button size="sm" variant="primary" className="rounded-xl px-4 py-2 font-bold text-xs uppercase tracking-wider">
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
              className="md:hidden p-2 rounded-xl text-[#1D3557] hover:bg-black/5 border border-black/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && isHomePage && (
        <div className="md:hidden w-full bg-white/98 backdrop-blur-xl border-t border-black/10 shadow-2xl px-6 py-5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#about"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-bold text-sm text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.about}
          </a>
          <a
            href="#experience"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-bold text-sm text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.experience}
          </a>
          <a
            href="#projects"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-bold text-sm text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.projects}
          </a>
          <a
            href="#skills"
            onClick={closeMobile}
            className="px-3 py-2.5 rounded-xl font-bold text-sm text-[#1D3557] hover:bg-[#F1FAEE] transition-colors"
          >
            {navLabels.skills}
          </a>

          <div className="pt-2 border-t border-black/10 flex flex-col gap-2">
            <a href="#contact" onClick={closeMobile} className="w-full">
              <Button size="md" variant="primary" className="w-full justify-center rounded-xl font-bold uppercase tracking-wider text-xs">
                <span>{navLabels.contact}</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
