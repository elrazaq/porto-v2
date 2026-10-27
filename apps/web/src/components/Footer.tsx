import { ArrowUp } from 'lucide-react'
import { GithubIcon } from './icons/GithubIcon'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10 text-xs text-[#457B9D] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="font-bold text-[#1D3557] tracking-tight">Abdul Razak</span>
        <span>•</span>
        <span>© {new Date().getFullYear()}</span>
        <span>•</span>
        <a
          href="https://github.com/elrazaq"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#1D3557] hover:text-[#E63946] transition-colors font-medium"
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>elrazaq</span>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:inline font-mono text-[11px] text-[#457B9D]/80 uppercase tracking-wider">
          PRODUCTION READY // DISTRIBUTED SYSTEMS // ZERO COMPROMISE
        </span>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border-2 border-black bg-white hover:bg-black hover:text-[#CCFF00] text-black transition-all cursor-pointer font-mono font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
          aria-label="Kembali ke atas"
        >
          <span>Atas</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  )
}

