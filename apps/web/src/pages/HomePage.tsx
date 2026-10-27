import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  Copy,
  FolderGit2,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { Badge } from '../components/Badge'
import { BillboardMarquee } from '../components/BillboardMarquee'
import { Footer } from '../components/Footer'
import { GithubIcon } from '../components/icons/GithubIcon'
import { MyProfileSection } from '../components/MyProfileSection'
import { NavbarDock } from '../components/NavbarDock'
import { SystemCore3D } from '../components/SystemCore3D'
import { contentData, type Language } from '../data/content'

export function HomePage() {
  const [lang, setLang] = useState<Language>('id')
  const [copiedEmail, setCopiedEmail] = useState(false)

  const c = contentData[lang]
  const isId = lang === 'id'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elrazaq185@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="min-h-screen text-[#1D3557] selection:bg-[#CCFF00] selection:text-black relative">
      <AmbientBackground />
      <NavbarDock currentLang={lang} onToggleLang={setLang} navLabels={c.nav} />

      {/* Hero Section (Matching Editorial Brutalist Reference) */}
      <section className="pt-28 sm:pt-36 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-[#1D3557] uppercase">
              <span className="block">{c.hero.titlePrefix}</span>
              <span className="inline-flex items-center flex-wrap gap-2 sm:gap-3 my-1">
                {/* Photo Pill Capsule */}
                <span className="inline-flex items-center justify-center h-12 sm:h-16 lg:h-20 w-24 sm:w-32 lg:w-36 rounded-full overflow-hidden bg-black border-2 border-[#1D3557]/20 shadow-lg shrink-0 group align-middle transition-transform hover:scale-105">
                  <img
                    src="/profile.jpg"
                    alt="Abdul Razak, S.T."
                    className="w-full h-full object-cover object-top filter grayscale contrast-125"
                  />
                </span>
                <span>{c.hero.titleHighlight}</span>
              </span>
              <span className="block text-[#1D3557]">{c.hero.titleSuffix}</span>
            </h1>

            {/* Sub-bar below Hero Heading */}
            <div className="w-full mt-10 pt-6 border-t border-[#1D3557]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#457B9D]">
              <div className="font-semibold text-[#1D3557]">{c.hero.subLeft}</div>
              <div className="hidden md:block text-[#457B9D]">{c.hero.subCenter}</div>
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D3557] hover:bg-[#E63946] text-white font-bold text-xs tracking-wider transition-all shadow-md group"
                >
                  <span>{c.hero.ctaStart}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Original 3D Interactive System Core (Anti-Plagiarism) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SystemCore3D />
          </div>
        </div>
      </section>

      {/* Times Square / New York Giant Marquee Billboard */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <BillboardMarquee headline={c.marquee.headline} subtitle={c.marquee.subtitle} />
      </div>

      {/* My Profile Section (Editorial & Stats Grid & Studio Portrait) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <MyProfileSection currentLang={lang} />
      </div>

      {/* Featured Projects Section (Clean Device Cards with GitHub Link Only) */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <FolderGit2 className="h-4 w-4 text-[#E63946]" />
              <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
                {c.projects.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D3557] tracking-tight">
              {c.projects.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#457B9D] max-w-md">{c.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {c.projects.items.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-white border border-[#1D3557]/10 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#1D3557]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner */}
                <div className="h-52 bg-gradient-to-br from-[#1D3557] to-[#0A1118] relative overflow-hidden flex flex-col items-center justify-center p-6 text-white text-center">
                  <span className="text-xs font-mono font-bold text-[#A8DADC] uppercase tracking-widest block mb-2">
                    {proj.category}
                  </span>
                  <span className="font-extrabold text-xl sm:text-2xl text-white block max-w-xs leading-snug">
                    {proj.title}
                  </span>
                  {proj.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-[#E63946] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-sm text-[#457B9D] leading-relaxed mb-4">{proj.summary}</p>
                  <div className="p-3.5 rounded-2xl bg-[#F1FAEE] border border-[#1D3557]/10 text-xs font-medium text-[#1D3557]">
                    <span className="font-bold text-[#E63946] uppercase font-mono mr-1">Impact:</span>
                    {proj.impact}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* GitHub Link Only (No Live Preview) */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-black/5 flex items-center justify-between">
                <Link
                  to={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D3557] hover:text-[#E63946] transition-colors"
                >
                  <span>{c.projects.viewDetail}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1D3557]/15 bg-white hover:bg-[#F1FAEE] text-xs font-mono font-bold text-[#1D3557] hover:border-[#1D3557]/40 transition-all shadow-xs"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section (Condensed & Non-Boring) */}
      <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24 border-t border-[#1D3557]/10">
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <Briefcase className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.experience.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D3557] tracking-tight">{c.experience.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.experience.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#1D3557]/10 shadow-sm hover:shadow-xl hover:border-[#1D3557]/30 transition-all flex flex-col justify-between text-left"
            >
              <div>
                <span className="inline-block text-[11px] font-mono font-bold text-[#1D3557] bg-[#A8DADC]/40 px-2.5 py-1 rounded-lg mb-3">
                  {item.period}
                </span>
                <h3 className="text-lg font-black text-[#1D3557]">{item.role}</h3>
                <p className="text-xs font-bold text-[#457B9D] mt-0.5 mb-3">{item.company}</p>
                {/* 1-line crisp impact sentence instead of multi-bullet wall */}
                <p className="text-xs text-[#1D3557]/80 leading-relaxed font-medium">
                  {item.responsibilities[0]}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-black/5">
                {item.techStack.slice(0, 4).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24 border-t border-[#1D3557]/10">
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.skills.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D3557] tracking-tight">{c.skills.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.skills.groups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#1D3557]/10 shadow-xs hover:border-[#1D3557]/30 transition-all flex flex-col justify-between text-left"
            >
              <div>
                <h3 className="text-sm font-bold text-[#1D3557] mb-3">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Footer Section (Matching Screenshot 5) */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-24 border-t border-[#1D3557]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Card: Brand & Mission */}
          <div className="lg:col-span-5 rounded-[2.5rem] bg-[#121B24] text-white p-8 sm:p-10 flex flex-col justify-between shadow-xl text-left">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#CCFF00] text-black font-black flex items-center justify-center text-sm">
                  AR
                </div>
                <span className="text-2xl font-black text-white tracking-tight">Razak.</span>
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal mb-8">
                {isId
                  ? 'Mendorong inovasi dan keandalan sistem melalui arsitektur terdistribusi, integrasi AI medis, dan otomasi proses birokrasi pemerintahan.'
                  : 'Driving digital innovation through distributed system architectures, clinical AI integration, and enterprise business process automation.'}
              </p>
            </div>

            <div>
              <span className="font-mono text-xs text-white/50 block mb-3 uppercase tracking-wider">
                {isId ? 'Terhubung Langsung' : 'Stay In Touch!'}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/elrazaq"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? c.contact.copied : 'elrazaq185@gmail.com'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Navigation, Connect & Quick Inquiry Form */}
          <div className="lg:col-span-7 rounded-[2.5rem] bg-white border border-[#1D3557]/10 p-8 sm:p-10 flex flex-col justify-between shadow-xl text-left">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="font-serif italic text-sm text-[#457B9D] block mb-3">Navigation</span>
                <div className="flex flex-col gap-2 text-sm font-semibold text-[#1D3557]">
                  <a href="#projects" className="hover:text-[#E63946] transition-colors">
                    {c.nav.projects}
                  </a>
                  <a href="#about" className="hover:text-[#E63946] transition-colors">
                    {c.nav.about}
                  </a>
                  <a href="#experience" className="hover:text-[#E63946] transition-colors">
                    {c.nav.experience}
                  </a>
                </div>
              </div>
              <div>
                <span className="font-serif italic text-sm text-[#457B9D] block mb-3">Connect</span>
                <div className="flex flex-col gap-2 text-sm font-semibold text-[#1D3557]">
                  <a
                    href="https://github.com/elrazaq"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E63946] transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:elrazaq185@gmail.com"
                    className="hover:text-[#E63946] transition-colors"
                  >
                    Email
                  </a>
                  <Link to="/admin/login" className="hover:text-[#E63946] transition-colors">
                    CMS Admin
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="pt-6 border-t border-black/5">
              <span className="text-xs font-mono font-medium text-[#457B9D] block mb-1">
                {isId ? 'Mari bangun solusi andal bersama.' : 'Let’s build something great.'}
              </span>
              <h4 className="text-lg font-black text-[#1D3557] mb-3">
                {isId ? 'Kirimkan pesan atau kebutuhan proyek:' : 'Stay ahead with Me!'}
              </h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  window.location.href = 'mailto:elrazaq185@gmail.com'
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder={c.contact.formEmail}
                  className="flex-1 px-4 py-3 rounded-full border border-[#1D3557]/20 bg-[#F1FAEE] text-sm focus:outline-hidden focus:border-[#1D3557]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#121B24] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-colors cursor-pointer shrink-0"
                >
                  {isId ? 'Kirim' : 'Connect'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
