import { useState, useEffect } from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { Language } from '../data/content'

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

        {/* Desktop Anchor Navigation (Order: About -> Projects -> Experience -> Skills) */}
        {isHomePage ? (
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#about"
              className="group px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-[#1D3557] border border-transparent hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
            >
              <span className="opacity-50 group-hover:opacity-100 mr-1 text-[10px]">01//</span>
              <span>{navLabels.about}</span>
            </a>
            <a
              href="#projects"
              className="group px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-[#1D3557] border border-transparent hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
            >
              <span className="opacity-50 group-hover:opacity-100 mr-1 text-[10px]">02//</span>
              <span>{navLabels.projects}</span>
            </a>
            <a
              href="#experience"
              className="group px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-[#1D3557] border border-transparent hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
            >
              <span className="opacity-50 group-hover:opacity-100 mr-1 text-[10px]">03//</span>
              <span>{navLabels.experience}</span>
            </a>
            <a
              href="#skills"
              className="group px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-[#1D3557] border border-transparent hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
            >
              <span className="opacity-50 group-hover:opacity-100 mr-1 text-[10px]">04//</span>
              <span>{navLabels.skills}</span>
            </a>
          </div>
        ) : (
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase text-black bg-white hover:bg-[#CCFF00] px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>KEMBALI KE PORTOFOLIO</span>
          </Link>
        )}

        {/* Controls: Brutal Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Brutalist Language Toggle Box */}
          {onToggleLang && (
            <div className="flex items-center border-2 border-black bg-white p-0.5 text-xs font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <button
                type="button"
                onClick={() => onToggleLang('id')}
                className={`px-2.5 py-1 transition-colors cursor-pointer font-black ${
                  currentLang === 'id'
                    ? 'bg-black text-[#CCFF00]'
                    : 'text-black hover:bg-black/10'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <span className="text-black/30 font-bold px-0.5 select-none">|</span>
              <button
                type="button"
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1 transition-colors cursor-pointer font-black ${
                  currentLang === 'en'
                    ? 'bg-black text-[#CCFF00]'
                    : 'text-black hover:bg-black/10'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          {isHomePage && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="md:hidden p-2 border-2 border-black bg-white text-black hover:bg-black hover:text-[#CCFF00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer"
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
        <div className="md:hidden w-full bg-white border-b-2 border-black shadow-2xl px-6 py-6 flex flex-col gap-2 font-mono">
          <a
            href="#about"
            onClick={closeMobile}
            className="flex items-center justify-between px-3 py-2.5 border border-black/10 hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors font-bold text-xs uppercase"
          >
            <span>{navLabels.about}</span>
            <span className="text-[10px] opacity-60">01//</span>
          </a>
          <a
            href="#projects"
            onClick={closeMobile}
            className="flex items-center justify-between px-3 py-2.5 border border-black/10 hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors font-bold text-xs uppercase"
          >
            <span>{navLabels.projects}</span>
            <span className="text-[10px] opacity-60">02//</span>
          </a>
          <a
            href="#experience"
            onClick={closeMobile}
            className="flex items-center justify-between px-3 py-2.5 border border-black/10 hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors font-bold text-xs uppercase"
          >
            <span>{navLabels.experience}</span>
            <span className="text-[10px] opacity-60">03//</span>
          </a>
          <a
            href="#skills"
            onClick={closeMobile}
            className="flex items-center justify-between px-3 py-2.5 border border-black/10 hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors font-bold text-xs uppercase"
          >
            <span>{navLabels.skills}</span>
            <span className="text-[10px] opacity-60">04//</span>
          </a>
        </div>
      )}
    </header>
  )
}
