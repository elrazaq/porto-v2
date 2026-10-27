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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bio & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight mb-6">
              {isId ? 'Profil Saya:' : 'My Profile:'}
            </h2>

            <p className="text-base sm:text-lg text-black/90 leading-relaxed font-medium mb-8 max-w-xl">
              {isId
                ? 'Full-Stack Web Developer, Arsitek Sistem Terdistribusi, dan Spesialis Linux dengan gelar Sarjana Teknik Informatika (S.T.). Memiliki lebih dari 5 tahun pengalaman merancang dan memodernisasi infrastruktur digital sektor kesehatan (SIMRS RSUD Bintan), integrasi API klinis AI S.O.A.P.I.E, serta sistem portal keuangan dan beasiswa pemerintahan daerah.'
                : 'A Full-Stack Web Developer, Systems Architect, and Linux Specialist with a Bachelor’s in Informatics Engineering (B.Eng). Over 5 years of specialized experience engineering and modernizing healthcare infrastructure (Hospital SIMRS), clinical AI integrations, and regional government digital portals.'}
            </p>

            {/* Key Stats Counter Row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y border-black/15 mb-8 max-w-lg">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-mono">5+</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Tahun Pengalaman' : 'Years Experience'}
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-mono">S1</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Teknik Informatika' : 'Informatics Eng.'}
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-black font-mono">10+</div>
                <div className="text-[11px] sm:text-xs font-bold text-black/70 tracking-wider uppercase mt-1">
                  {isId ? 'Sistem Produksi' : 'Systems Deployed'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-[#CCFF00] font-bold text-sm hover:bg-black/85 transition-all shadow-md group cursor-pointer"
              >
                <span>{isId ? 'Unduh Resume (CV ATS)' : 'View CV ATS'}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-black/30 hover:border-black text-black font-bold text-sm transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub @elrazaq</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Studio Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden bg-black shadow-2xl border-2 border-black/15 group">
              <img
                src="/profile.jpg"
                alt="Abdul Razak, S.T."
                className="w-full h-full object-cover object-top filter grayscale contrast-115 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-6 right-6 text-white text-left pointer-events-none">
                <span className="font-mono text-xs font-bold text-[#CCFF00] tracking-wider block">
                  LEAD SOFTWARE ENGINEER
                </span>
                <span className="text-xl font-black text-white block">Abdul Razak, S.T.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
