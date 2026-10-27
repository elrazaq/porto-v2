import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  FolderGit2,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { Badge } from '../components/Badge'
import { BillboardMarquee } from '../components/BillboardMarquee'
import { CustomCursor } from '../components/CustomCursor'
import { Footer } from '../components/Footer'
import { GithubIcon } from '../components/icons/GithubIcon'
import { MyProfileSection } from '../components/MyProfileSection'
import { NavbarDock } from '../components/NavbarDock'
import { SkillCore3D } from '../components/SkillCore3D'
import { contentData, type Language } from '../data/content'

interface SkillItemWithLevel {
  name: string
  icon: string
  level: 'EXPERT' | 'ADVANCED'
  percent: number
  desc: string
}

const SKILL_TIERS: {
  id: string
  title: string
  subtitle: string
  skills: SkillItemWithLevel[]
}[] = [
  {
    id: '01',
    title: 'Modern Web & Reactive Frontend',
    subtitle: 'Core Web Vitals 99 • Client & Server Rendering • Micro-frontends',
    skills: [
      { name: 'React 19', icon: '/skills/react.svg', level: 'EXPERT', percent: 95, desc: 'Concurrent UI, Server Components' },
      { name: 'Next.js 15', icon: '/skills/nextjs.svg', level: 'EXPERT', percent: 96, desc: 'App Router, SSR / ISR, Edge' },
      { name: 'Vue 3', icon: '/skills/vue.svg', level: 'ADVANCED', percent: 88, desc: 'Composition API, Pinia, Reactivity' },
      { name: 'Nuxt.js', icon: '/skills/nuxt.svg', level: 'ADVANCED', percent: 86, desc: 'Universal Vue, Nitro Engine' },
      { name: 'Vite', icon: '/skills/vite.svg', level: 'EXPERT', percent: 92, desc: 'Rollup Bundler, Fast HMR' },
      { name: 'TypeScript', icon: '/skills/typescript.svg', level: 'EXPERT', percent: 94, desc: 'Strict Typing, Generics, AST' },
    ],
  },
  {
    id: '02',
    title: 'Enterprise Backend & Distributed APIs',
    subtitle: 'Clean Architecture • High Concurrency • Microservices & Bridging',
    skills: [
      { name: 'NestJS', icon: '/skills/nestjs.svg', level: 'EXPERT', percent: 94, desc: 'Modular DI, Guards, Microservices' },
      { name: 'Node.js', icon: '/skills/nextjs.svg', level: 'EXPERT', percent: 94, desc: 'Async I/O, Event Loop, Streams' },
      { name: 'RESTful API', icon: '/skills/prisma.svg', level: 'EXPERT', percent: 96, desc: 'BPJS Bridging, FHIR Standard' },
      { name: 'Microservices', icon: '/skills/docker.svg', level: 'ADVANCED', percent: 88, desc: 'Decoupled Event-Driven Queues' },
    ],
  },
  {
    id: '03',
    title: 'Database Architecture & ORM Pipeline',
    subtitle: 'Strict Modeling • High Concurrency • Zero Data Loss Transactions',
    skills: [
      { name: 'PostgreSQL', icon: '/skills/postgresql.svg', level: 'EXPERT', percent: 95, desc: 'Relational Indexing, Partitioning' },
      { name: 'Prisma ORM', icon: '/skills/prisma.svg', level: 'EXPERT', percent: 92, desc: 'Type-safe Client, Schema Migrations' },
      { name: 'MySQL', icon: '/skills/postgresql.svg', level: 'EXPERT', percent: 90, desc: 'High-availability Replica' },
      { name: 'Redis Cache', icon: '/skills/prisma.svg', level: 'ADVANCED', percent: 88, desc: 'Sub-millisecond State Caching' },
    ],
  },
  {
    id: '04',
    title: 'Mobile Engineering & Cloud Infrastructure',
    subtitle: 'Cross-platform Delivery • Containerized Orchestration • Linux',
    skills: [
      { name: 'Flutter Mobile', icon: '/skills/flutter.svg', level: 'ADVANCED', percent: 85, desc: 'Dart Cross-Platform iOS & Android' },
      { name: 'Docker Engine', icon: '/skills/docker.svg', level: 'ADVANCED', percent: 88, desc: 'Containerization, Multi-stage' },
      { name: 'Linux Server', icon: '/skills/linux.svg', level: 'EXPERT', percent: 94, desc: 'Ubuntu/Debian Kernel & Security' },
      { name: 'CI/CD & Git', icon: '/skills/vite.svg', level: 'EXPERT', percent: 92, desc: 'Automated Test & Deployment' },
    ],
  },
]

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
      <CustomCursor />
      <AmbientBackground />
      <NavbarDock currentLang={lang} onToggleLang={setLang} navLabels={c.nav} />

      {/* Hero Section (Full-Width Editorial Canvas with Safe Gutters) */}
      <section className="pt-24 sm:pt-32 pb-12 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Massive Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-[#1D3557] uppercase">
              <span className="block">{c.hero.titlePrefix}</span>
              <span className="inline-flex items-center flex-wrap gap-2 sm:gap-3 my-1">
                {/* Photo Pill Capsule with Grayscale & Zoom */}
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

            {/* Sub-bar below Hero Heading (Cleaned up: tech text removed for brutalist space) */}
            <div className="w-full mt-10 pt-6 border-t border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#457B9D]">
              <div className="font-extrabold text-[#1D3557] tracking-tight text-sm sm:text-base">
                {c.hero.subLeft}
              </div>
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1D3557] hover:bg-[#E63946] text-white font-extrabold text-xs tracking-wider transition-all shadow-md group cursor-pointer"
                >
                  <span>{c.hero.ctaStart}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Skill Core 3D with Matrix Rain Background */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SkillCore3D />
          </div>
        </div>
      </section>

      {/* Times Square / New York Giant Marquee Billboard (Full-Width, Unpaused) */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <BillboardMarquee headline={c.marquee.headline} subtitle={c.marquee.subtitle} />
      </div>

      {/* My Profile Section (Editorial Stats & Grayscale Spotlight Photo) */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <MyProfileSection currentLang={lang} />
      </div>

      {/* Featured Projects Section (Brutalist 3-Column Grid Matching Reference) */}
      <section
        id="projects"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto scroll-mt-20 border-t border-black/10 relative"
      >
        {/* Subtle Architectural Graph Paper Gridlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(29, 53, 87, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(29, 53, 87, 0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 text-left">
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
            <p className="text-xs sm:text-sm text-[#457B9D] font-mono max-w-md">
              ARCHITECTURAL_BLUEPRINTS // PRODUCTION_SHIPPED
            </p>
          </div>

          {/* 3-Column Brutalist Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.projects.items.map((proj) => (
              <div
                key={proj.id}
                className="group relative flex flex-col text-left transition-all duration-300"
              >
                {/* Visual Image Banner with Hover Slide-Up Reveal */}
                <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#121B24] border border-black/15 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  {/* Base Graphic / Mockup Presentation */}
                  <div className="w-full h-full bg-gradient-to-br from-[#1D3557] via-[#121B24] to-[#0A1118] p-6 flex flex-col items-center justify-center text-center text-white relative">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
                      {proj.category}
                    </span>
                    <span className="font-extrabold text-xl sm:text-2xl text-white leading-tight max-w-[260px]">
                      {proj.title}
                    </span>
                    {proj.isFeatured && (
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E63946] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Modern Hover Slide-up Overlay (Revealing Impact & Links) */}
                  <div className="absolute inset-0 bg-[#0A1118]/95 backdrop-blur-md p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 text-white">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#CCFF00] uppercase tracking-wider block mb-2">
                        Impact & Architecture
                      </span>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium mb-4">
                        {proj.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/15">
                      <Link
                        to={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CCFF00] hover:underline"
                      >
                        <span>{c.projects.viewDetail}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-mono font-bold hover:bg-[#CCFF00] transition-colors"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Below-Image Bold Title Header (Clean matching reference) */}
                <div className="mt-3.5">
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1D3557] group-hover:text-[#E63946] transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-xs font-mono text-[#457B9D] uppercase tracking-wider block mt-0.5">
                    {proj.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section (Condensed & Clean Timeline) */}
      <section
        id="experience"
        className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto scroll-mt-20 border-t border-black/10"
      >
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-1.5">
            <Briefcase className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.experience.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1D3557] tracking-tight">
            {c.experience.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {c.experience.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-black/10 shadow-sm hover:shadow-xl hover:border-black/30 transition-all flex flex-col justify-between text-left"
            >
              <div>
                <span className="inline-block text-[11px] font-mono font-bold text-[#1D3557] bg-[#A8DADC]/40 px-2.5 py-1 rounded-lg mb-3">
                  {item.period}
                </span>
                <h3 className="text-lg font-black text-[#1D3557]">{item.role}</h3>
                <p className="text-xs font-bold text-[#457B9D] mt-0.5 mb-3">{item.company}</p>
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

      {/* Skills Section: Real Image Logos + Proficiency Levels */}
      <section
        id="skills"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto scroll-mt-20 border-t border-black/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#E63946] inline-block" />
              <span>{c.skills.eyebrow}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1D3557] tracking-tight">
              {c.skills.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#457B9D] max-w-md">
            PROFICIENCY_AUDIT // EXPERT_&_ADVANCED_TIERS // ARCHITECTURAL_STACK
          </p>
        </div>

        {/* 4 Brutalist Tiers with Authentic Brand Image Logos & Level Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="p-7 sm:p-8 rounded-[2rem] bg-white border-2 border-black/15 hover:border-black shadow-sm hover:shadow-2xl transition-all duration-300 text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                  <span className="font-mono text-xs font-black text-[#E63946] tracking-widest uppercase">
                    {tier.id} // {tier.title.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#CCFF00] text-black">
                    VERIFIED_EXPERT
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1D3557] mb-2">{tier.title}</h3>
                <p className="text-xs sm:text-sm text-[#457B9D] font-medium leading-relaxed mb-6">
                  {tier.subtitle}
                </p>
              </div>

              {/* Grid of Real Brand Logo Cards with Proficiency Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-black/5">
                {tier.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-2xl bg-[#F1FAEE] border border-black/10 flex flex-col justify-between hover:bg-white hover:border-black/30 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-6 h-6 object-contain shrink-0"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <span className="font-mono text-xs font-extrabold text-[#1D3557]">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded ${
                          skill.level === 'EXPERT'
                            ? 'bg-[#1D3557] text-[#CCFF00]'
                            : 'bg-[#457B9D]/20 text-[#1D3557]'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <div className="w-full mt-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#457B9D] mb-1">
                        <span>{skill.desc}</span>
                        <span className="font-bold text-[#1D3557]">{skill.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.level === 'EXPERT' ? 'bg-[#1D3557]' : 'bg-[#457B9D]'
                          }`}
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Footer Section (Full-Width with Inverted White Logo in Dark Card) */}
      <section
        id="contact"
        className="py-16 sm:py-20 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto scroll-mt-20 border-t border-black/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Card: Official Inverted White Logo */}
          <div className="lg:col-span-5 rounded-[2.5rem] bg-[#121B24] text-white p-8 sm:p-12 flex flex-col justify-between shadow-xl text-left">
            <div>
              <div className="mb-8">
                {/* Official Logo Inverted to Pure White */}
                <img
                  src="/logo-dark.png"
                  alt="Abdul Razak - Fullstack Developer"
                  className="h-10 sm:h-11 w-auto object-contain filter invert brightness-200"
                />
              </div>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-normal mb-8">
                {isId
                  ? 'Membangun platform web modern berkinerja tinggi, arsitektur backend andal, dan aplikasi mobile yang scalable untuk kebutuhan enterprise.'
                  : 'Engineering modern high-performance web platforms, resilient backend architectures, and scalable mobile apps for enterprise solutions.'}
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
          <div className="lg:col-span-7 rounded-[2.5rem] bg-white border border-black/10 p-8 sm:p-12 flex flex-col justify-between shadow-xl text-left">
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
                  className="flex-1 px-4 py-3 rounded-full border border-black/20 bg-[#F1FAEE] text-sm focus:outline-hidden focus:border-[#1D3557]"
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
