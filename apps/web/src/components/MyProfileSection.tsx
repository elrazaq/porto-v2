import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../data/content'
import { GithubIcon } from './icons/GithubIcon'

export interface MyProfileSectionProps {
  currentLang: Language
}

export function MyProfileSection({ currentLang }: MyProfileSectionProps) {
  const isId = currentLang === 'id'

  return (
    <section id="about" className="w-full my-12 sm:my-16 scroll-mt-24">
      <div className="w-full rounded-[2.5rem] bg-[#CCFF00] text-black p-8 sm:p-12 lg:p-16 border border-black/10 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bio & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight mb-6">
              {isId ? 'Profil Saya:' : 'My Profile:'}
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed font-medium mb-8 max-w-2xl">
              {isId
                ? 'Lead Full-Stack Web & Mobile Engineer dengan gelar Sarjana Teknik Informatika (S.T.). Menguasai ekosistem React 19, Next.js, Vue 3, Nuxt.js, Vite, NestJS, dan Prisma ORM serta arsitektur mobile. Berpengalaman 5+ tahun memimpin rekayasa platform digital skala enterprise, infrastruktur sistem terdistribusi, dan otomasi proses bisnis.'
                : 'Lead Full-Stack Web & Mobile Engineer with a Bachelor’s in Informatics Engineering (B.Eng / S.T.). Proficient across React 19, Next.js, Vue 3, Nuxt.js, Vite, NestJS, Prisma ORM, and cross-platform mobile apps. Over 5 years of experience leading enterprise-grade digital platforms, distributed systems, and business process automation.'}
            </p>

            {/* Key Stats Counter Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y border-black/15 mb-8 max-w-xl">
              <div>
                <div className="text-3xl sm:text-5xl font-black text-black font-mono">5+</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Tahun Pengalaman' : 'Years Experience'}
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-black text-black font-mono">S1</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Teknik Informatika' : 'Informatics Eng.'}
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-black text-black font-mono">15+</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Solusi Web & Mobile' : 'Web & Mobile Apps'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-[#CCFF00] font-bold text-sm hover:bg-black/85 transition-all shadow-md group cursor-pointer"
              >
                <span>{isId ? 'Unduh Resume (CV ATS)' : 'View CV ATS'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-black/30 hover:border-black text-black font-bold text-sm transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @elrazaq</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Studio Portrait Card with Spotlight Color Reveal */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              data-cursor="photo"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                e.currentTarget.style.setProperty('--spot-x', `${x}px`)
                e.currentTarget.style.setProperty('--spot-y', `${y}px`)
                e.currentTarget.style.setProperty('--spot-size', '55px')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--spot-size', '0px')
              }}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-2 border-black/15 group select-none transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Base Layer: Grayscale Image */}
              <img
                src="/profile.jpg"
                alt="Abdul Razak, S.T."
                className="w-full h-full object-cover object-top filter grayscale contrast-115"
              />

              {/* Spotlight Layer: Full-Color Reveal Masked under Cursor with CSS Variables */}
              <div
                className="absolute inset-0 pointer-events-none transition-[clip-path] duration-75 ease-out"
                style={{
                  clipPath: 'circle(var(--spot-size, 0px) at var(--spot-x, 0px) var(--spot-y, 0px))',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Abdul Razak, S.T. - Color Spotlight"
                  className="w-full h-full object-cover object-top filter-none"
                />
              </div>

              {/* Bottom Gradient and Name Banner */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-7 right-7 text-white text-left pointer-events-none">
                <span className="font-mono text-xs font-bold text-[#CCFF00] tracking-wider block">
                  LEAD WEB & MOBILE ENGINEER
                </span>
                <span className="text-2xl font-black text-white block">Abdul Razak, S.T.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
