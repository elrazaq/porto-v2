import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  Copy,
  FolderGit2,
} from 'lucide-react'
import { useState } from 'react'
import { apiClient } from '../lib/api-client'
import { Link } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { CustomCursor } from '../components/CustomCursor'
import { Footer } from '../components/Footer'
import { GithubIcon } from '../components/icons/GithubIcon'
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
      { name: 'React 19', icon: '/skills/react.png', level: 'EXPERT', percent: 95, desc: 'Concurrent UI, Server Components' },
      { name: 'Next.js 15', icon: '/skills/nextjs.png', level: 'EXPERT', percent: 96, desc: 'App Router, SSR / ISR, Edge' },
      { name: 'Vue 3', icon: '/skills/vue.png', level: 'ADVANCED', percent: 88, desc: 'Composition API, Pinia, Reactivity' },
      { name: 'Nuxt.js', icon: '/skills/nuxt.png', level: 'ADVANCED', percent: 86, desc: 'Universal Vue, Nitro Engine' },
      { name: 'Vite', icon: '/skills/vite.png', level: 'EXPERT', percent: 92, desc: 'Rollup Bundler, Fast HMR' },
      { name: 'TypeScript', icon: '/skills/typescript.png', level: 'EXPERT', percent: 94, desc: 'Strict Typing, Generics, AST' },
    ],
  },
  {
    id: '02',
    title: 'Enterprise Backend & Distributed APIs',
    subtitle: 'Clean Architecture • High Concurrency • Microservices & Bridging',
    skills: [
      { name: 'NestJS', icon: '/skills/nestjs.png', level: 'EXPERT', percent: 94, desc: 'Modular DI, Guards, Microservices' },
      { name: 'Node.js', icon: '/skills/nextjs.png', level: 'EXPERT', percent: 94, desc: 'Async I/O, Event Loop, Streams' },
      { name: 'RESTful API', icon: '/skills/prisma.png', level: 'EXPERT', percent: 96, desc: 'BPJS Bridging, FHIR Standard' },
      { name: 'Microservices', icon: '/skills/docker.png', level: 'ADVANCED', percent: 88, desc: 'Decoupled Event-Driven Queues' },
    ],
  },
  {
    id: '03',
    title: 'Database Architecture & ORM Pipeline',
    subtitle: 'Strict Modeling • High Concurrency • Zero Data Loss Transactions',
    skills: [
      { name: 'PostgreSQL', icon: '/skills/postgresql.png', level: 'EXPERT', percent: 95, desc: 'Relational Indexing, Partitioning' },
      { name: 'Prisma ORM', icon: '/skills/prisma.png', level: 'EXPERT', percent: 92, desc: 'Type-safe Client, Schema Migrations' },
      { name: 'MySQL', icon: '/skills/postgresql.png', level: 'EXPERT', percent: 90, desc: 'High-availability Replica' },
      { name: 'Redis Cache', icon: '/skills/prisma.png', level: 'ADVANCED', percent: 88, desc: 'Sub-millisecond State Caching' },
    ],
  },
  {
    id: '04',
    title: 'Mobile Engineering & Cloud Infrastructure',
    subtitle: 'Cross-platform Delivery • Containerized Orchestration • Linux',
    skills: [
      { name: 'Flutter Mobile', icon: '/skills/flutter.png', level: 'ADVANCED', percent: 85, desc: 'Dart Cross-Platform iOS & Android' },
      { name: 'Docker Engine', icon: '/skills/docker.png', level: 'ADVANCED', percent: 88, desc: 'Containerization, Multi-stage' },
      { name: 'Linux Server', icon: '/skills/linux.png', level: 'EXPERT', percent: 94, desc: 'Ubuntu/Debian Kernel & Security' },
      { name: 'CI/CD & Git', icon: '/skills/docker.png', level: 'EXPERT', percent: 92, desc: 'Automated Test & Deployment' },
    ],
  },
]

export function HomePage() {
  const [lang, setLang] = useState<Language>('id')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [inquiryName, setInquiryName] = useState('')
  const [inquiryEmail, setInquiryEmail] = useState('')
  const [inquiryMessage, setInquiryMessage] = useState('')
  const [inquirySubmitting, setInquirySubmitting] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)
  const [inquiryError, setInquiryError] = useState<string | null>(null)

  const c = contentData[lang]
  const isId = lang === 'id'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elrazaq185@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setInquirySubmitting(true)
    setInquiryError(null)
    setInquirySuccess(false)

    try {
      await apiClient.post('/inquiries', {
        name: inquiryName.trim() || 'Pengunjung Portofolio',
        email: inquiryEmail.trim(),
        subject: isId ? 'Pesan Langsung dari Website Portofolio' : 'Direct Message from Portfolio Website',
        message: inquiryMessage.trim() || 'Halo, saya tertarik dengan profil profesional Anda.',
      })
      setInquirySuccess(true)
      setInquiryName('')
      setInquiryEmail('')
      setInquiryMessage('')
    } catch (err) {
      setInquiryError(
        err instanceof Error ? err.message : isId ? 'Gagal mengirim pesan.' : 'Failed to send message.',
      )
    } finally {
      setInquirySubmitting(false)
    }
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
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-none border-2 border-black bg-black text-[#CCFF00] font-mono font-black text-xs uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-none transition-all cursor-pointer group"
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

      {/* Combined Full-Width Brutalist Neon Super-Block: Billboard + Deliverables + LAN Conduit + My Profile */}
      <section
        id="about"
        className="w-full bg-[#CCFF00] text-black border-y-2 border-black overflow-hidden relative my-12 scroll-mt-20 select-none"
      >
        {/* 1. Full-Width Infinite Running Text Marquee (Edge-to-Edge Without Gaps) */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap py-6 sm:py-8 border-b-2 border-black bg-[#CCFF00]">
          <div className="flex animate-marquee tracking-tighter uppercase font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black">
            <span className="mx-4">{c.marquee.headline}</span>
            <span className="mx-4">{c.marquee.headline}</span>
          </div>
        </div>

        {/* 2. Editorial Headline Statement (Safe Gutter: Never Touches Edge) */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-10 text-left">
          <p className="text-xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-snug max-w-5xl">
            {c.marquee.subtitle}
          </p>
        </div>

        {/* 3. Middle Element: Core Engineering Deliverables (Inspired by Reference Layout) */}
        <div className="w-full border-t-2 border-black bg-black/[0.02]">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
              {/* Left Column: Context Label */}
              <div className="lg:col-span-3">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-black/70 block">
                  {isId ? 'Spesifikasi Rekayasa :' : 'What You Can Expect :'}
                </span>
                <span className="text-sm font-extrabold text-black block mt-1">
                  {isId ? 'Standar deliverable sistem enterprise & mobile' : 'Production-grade enterprise & mobile deliverables'}
                </span>
              </div>

              {/* Middle Column: Numbered Deliverables */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="border-b-2 border-black/15 pb-5">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-base font-black text-black">01</span>
                    <h4 className="font-black text-base sm:text-lg text-black uppercase tracking-tight">
                      {isId ? 'Arsitektur Web Skala Tinggi' : 'High-Scalability Web Architecture'}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed pl-7">
                    {isId
                      ? 'Membangun ekosistem web modern (React 19, Next.js, Vue 3, NestJS) berkinerja tinggi, sub-second latency, dan berarsitektur microservices untuk menangani traffic skala masif.'
                      : 'Engineering modern high-throughput web ecosystems (React 19, Next.js, Vue 3, NestJS) with sub-second latency, clean architecture, and modular scalability.'}
                  </p>
                </div>

                <div className="border-b-2 border-black/15 pb-5">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-base font-black text-black">02</span>
                    <h4 className="font-black text-base sm:text-lg text-black uppercase tracking-tight">
                      {isId ? 'Mobile Engineering & Cross-Platform' : 'Mobile Engineering & Cross-Platform'}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed pl-7">
                    {isId
                      ? 'Aplikasi mobile Flutter & Dart dengan pengalaman UI/UX fluid 60fps, arsitektur offline-first, konsumsi memori optimal, dan bridging native API perangkat.'
                      : 'Cross-platform Flutter & Dart applications featuring 60fps fluid UI/UX, offline-first state synchronization, and reliable native hardware bridging.'}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-base font-black text-black">03</span>
                    <h4 className="font-black text-base sm:text-lg text-black uppercase tracking-tight">
                      {isId ? 'Pipeline Data & Integrasi Kritis' : 'Mission-Critical Data Pipelines'}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-black/85 font-medium leading-relaxed pl-7">
                    {isId
                      ? 'Integrasi sistem rumah sakit (SIMRS), standardisasi FHIR, bridging BPJS tanpa downtime, dan pemodelan basis data relasional (PostgreSQL, Prisma, Redis).'
                      : 'Enterprise health system integration (SIMRS), FHIR compliance, zero-downtime BPJS bridging, and relational schema migrations (PostgreSQL, Prisma, Redis).'}
                  </p>
                </div>
              </div>

              {/* Right Column: Routing Pills (Exception: Retains Rounded-Full Pill Shape) */}
              <div className="lg:col-span-3 flex flex-col gap-2.5 lg:items-end">
                <span className="font-mono text-xs font-black text-black/70 mb-1 lg:text-right block w-full">
                  CONNECT //
                </span>
                <a
                  href="https://github.com/elrazaq"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border-2 border-black bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  <span>GitHub</span>
                  <span>→</span>
                </a>
                <a
                  href="https://www.instagram.com/el_razaq/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border-2 border-black bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  <span>Instagram</span>
                  <span>→</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/abdul-razak-981212159/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-4 px-5 py-2.5 rounded-full border-2 border-black bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  <span>LinkedIn</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Profil Saya (Integrated Bio, Key Stats & Grayscale Spotlight Photo) */}
        <div className="w-full border-t-2 border-black">
          <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center text-left">
            {/* Left Column: Bio & Stats */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black uppercase tracking-widest text-black/70">
                <span className="w-2 h-2 bg-black inline-block" />
                <span>// 00 . LEAD_ENGINEER_PROFILE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase mb-6">
                {isId ? 'Profil Saya:' : 'My Profile:'}
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-black/90 leading-relaxed font-medium mb-8 max-w-2xl">
                {isId
                  ? 'Lead Full-Stack Web & Mobile Engineer dengan gelar Sarjana Teknik Informatika (S.T.). Menguasai ekosistem React 19, Next.js, Vue 3, Nuxt.js, Vite, NestJS, dan Prisma ORM serta arsitektur mobile. Berpengalaman 5+ tahun memimpin rekayasa platform digital skala enterprise, infrastruktur sistem terdistribusi, dan otomasi proses bisnis.'
                  : 'Lead Full-Stack Web & Mobile Engineer with a Bachelor’s in Informatics Engineering (B.Eng / S.T.). Proficient across React 19, Next.js, Vue 3, Nuxt.js, Vite, NestJS, Prisma ORM, and cross-platform mobile apps. Over 5 years of experience leading enterprise-grade digital platforms, distributed systems, and business process automation.'}
              </p>

              {/* Key Stats Counter Row (Brutalist Sharp Boxes) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 py-6 border-y-2 border-black/20 mb-8 max-w-xl">
                <div className="p-3 sm:p-4 bg-white/40 border border-black/20">
                  <div className="text-3xl sm:text-5xl font-black text-black font-mono">5+</div>
                  <div className="text-[11px] sm:text-xs font-black text-black/80 tracking-wider uppercase mt-1">
                    {isId ? 'Tahun Pengalaman' : 'Years Experience'}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white/40 border border-black/20">
                  <div className="text-3xl sm:text-5xl font-black text-black font-mono">S1</div>
                  <div className="text-[11px] sm:text-xs font-black text-black/80 tracking-wider uppercase mt-1">
                    {isId ? 'Teknik Informatika' : 'Informatics Eng.'}
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white/40 border border-black/20">
                  <div className="text-3xl sm:text-5xl font-black text-black font-mono">15+</div>
                  <div className="text-[11px] sm:text-xs font-black text-black/80 tracking-wider uppercase mt-1">
                    {isId ? 'Solusi Web & Mobile' : 'Web & Mobile Apps'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={isId ? '/resume-id.pdf' : '/resume-en.pdf'}
                  download={isId ? 'Abdul_Razak_CV_Indonesia.pdf' : 'Abdul_Razak_Resume_English.pdf'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-black text-[#CCFF00] font-mono font-black text-xs uppercase tracking-wider hover:bg-black/85 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none cursor-pointer"
                >
                  <span>{isId ? 'Unduh Resume (CV ATS)' : 'Download Resume (CV ATS)'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="https://github.com/elrazaq"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-black bg-transparent hover:bg-black hover:text-[#CCFF00] text-black font-mono font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub @elrazaq</span>
                </a>
              </div>
            </div>

            {/* Right Column: Grayscale Photo with Interactive Spotlight Color Reveal */}
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
                className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-none overflow-hidden bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black group select-none transition-transform duration-500 hover:scale-[1.02]"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
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
        </div>
      </section>

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
              <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
                <FolderGit2 className="h-4 w-4 text-[#E63946]" />
                <span>{c.projects.eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1D3557] tracking-tight uppercase">
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
                className="group relative flex flex-col text-left transition-all duration-300 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
              >
                {/* Visual Image Banner with Hover Slide-Up Reveal */}
                <div className="relative aspect-[16/11] rounded-none overflow-hidden bg-[#121B24] border-2 border-black select-none">
                  {/* Thumbnail Image or Fallback Graphic */}
                  {proj.thumbnailUrl ? (
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1D3557] via-[#121B24] to-[#0A1118] p-6 flex flex-col items-center justify-center text-center text-white">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
                        {proj.category}
                      </span>
                      <span className="font-extrabold text-xl sm:text-2xl text-white leading-tight max-w-[260px]">
                        {proj.title}
                      </span>
                    </div>
                  )}

                  {/* Corner Badge Tags */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-none border border-black bg-black/85 backdrop-blur-xs text-[#CCFF00] font-mono text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {proj.category}
                    </span>
                  </div>

                  {proj.isFeatured && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-none border border-black bg-[#E63946] text-white font-mono text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Modern Hover Slide-up Overlay (Revealing Impact & Links) */}
                  <div className="absolute inset-0 bg-[#0A1118]/95 backdrop-blur-md p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 text-white rounded-none">
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
                            className="px-2 py-0.5 rounded-none border border-white/20 bg-white/10 text-[10px] font-mono text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/15">
                      <Link
                        to={`/projects/${proj.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#CCFF00] hover:underline uppercase"
                      >
                        <span>{c.projects.viewDetail}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border-2 border-black bg-white text-black text-xs font-mono font-black uppercase hover:bg-[#CCFF00] transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Below-Image Bold Title Header */}
                <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center justify-between gap-2">
                  <h3 className="font-mono text-base sm:text-lg font-black uppercase text-[#1D3557] group-hover:text-[#E63946] transition-colors truncate">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-black/30 bg-[#F1FAEE] text-[#1D3557] shrink-0">
                    {proj.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section (Brutalist Engineering Deployment Ledger) */}
      <section
        id="experience"
        className="py-16 sm:py-24 px-6 sm:px-10 lg:px-16 w-full max-w-[1440px] mx-auto scroll-mt-20 border-t border-black/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-[#E63946] tracking-widest uppercase">
              <Briefcase className="h-4 w-4 text-[#E63946]" />
              <span>{c.experience.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1D3557] tracking-tight uppercase">
              {c.experience.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#457B9D] max-w-md">
            DEPLOYMENT_HISTORY // VERIFIED_SERVICE_LOGS // ENTERPRISE_SYSTEMS
          </p>
        </div>

        {/* Brutalist Engineering Deployment Ledger Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {c.experience.items.map((item, idx) => (
            <div
              key={idx}
              className="group p-6 sm:p-8 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all flex flex-col justify-between text-left"
            >
              <div>
                {/* Ledger Index Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black/10 font-mono text-xs">
                  <span className="font-black text-black">
                    LOG // 0{idx + 1}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black text-[#CCFF00] font-black tracking-wider text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span>{item.period.toUpperCase()}</span>
                  </span>
                </div>

                {/* Role & Company */}
                <h3 className="text-xl font-black text-[#1D3557] leading-tight uppercase group-hover:text-[#E63946] transition-colors">
                  {item.role}
                </h3>
                <div className="font-mono text-xs font-extrabold text-[#457B9D] uppercase tracking-wider mt-1 mb-4 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#457B9D] shrink-0" />
                  <span>{item.company}</span>
                </div>

                {/* Key Impact & Responsibilities */}
                <p className="text-xs sm:text-sm text-black/80 font-medium leading-relaxed mb-6">
                  {item.responsibilities[0]}
                </p>
              </div>

              {/* Brutal Monospace Tech Tags */}
              <div className="pt-4 border-t-2 border-black/10">
                <span className="font-mono text-[10px] font-bold text-[#457B9D] uppercase tracking-widest block mb-2">
                  DEPLOYED_STACK //
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 font-mono text-[11px] font-bold bg-[#F1FAEE] text-black border border-black/30 hover:border-black hover:bg-black hover:text-[#CCFF00] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1D3557] tracking-tight uppercase">
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
              className="p-7 sm:p-8 rounded-none bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-black/15 mb-6">
                  <span className="font-mono text-xs font-black text-[#E63946] tracking-widest uppercase">
                    {tier.id} // {tier.title.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-none border border-black bg-[#CCFF00] text-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    VERIFIED_EXPERT
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1D3557] mb-2 uppercase">{tier.title}</h3>
                <p className="text-xs sm:text-sm text-[#457B9D] font-medium leading-relaxed mb-6 font-mono">
                  {tier.subtitle}
                </p>
              </div>

              {/* Grid of Real Brand Logo Cards with Proficiency Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t-2 border-black/10">
                {tier.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-none bg-[#F1FAEE] border-2 border-black/20 flex flex-col justify-between hover:bg-white hover:border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-7 h-7 object-contain shrink-0"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <span className="font-mono text-xs font-black text-[#1D3557]">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-none border border-black ${
                          skill.level === 'EXPERT'
                            ? 'bg-black text-[#CCFF00]'
                            : 'bg-[#1D3557] text-white'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>

                    <div className="w-full mt-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#457B9D] mb-1">
                        <span>{skill.desc}</span>
                        <span className="font-black text-black">{skill.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/15 rounded-none overflow-hidden border border-black/30">
                        <div
                          className={`h-full rounded-none ${
                            skill.level === 'EXPERT' ? 'bg-black' : 'bg-[#1D3557]'
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
                    href="https://www.instagram.com/el_razaq/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E63946] transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdul-razak-981212159/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#E63946] transition-colors"
                  >
                    LinkedIn
                  </a>
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
              {inquirySuccess ? (
                <div className="p-4 border-2 border-black bg-[#CCFF00] text-black font-mono text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {isId
                    ? '✓ [PESAN_TERKIRIM]: Terima kasih! Pesan Anda telah berhasil terkirim langsung ke admin inbox.'
                    : '✓ [MESSAGE_SENT]: Thank you! Your inquiry has been delivered directly to the inbox.'}
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  {inquiryError && (
                    <div className="p-2 border-2 border-black bg-red-100 text-red-900 font-mono text-xs font-bold">
                      [ERROR]: {inquiryError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={isId ? 'Nama Lengkap / Instansi *' : 'Your Name / Org *'}
                      className="w-full px-3 py-2.5 rounded-none border-2 border-black bg-white font-mono text-xs text-black placeholder:text-black/40 focus:bg-[#CCFF00]/10 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder={isId ? 'Alamat Email Aktif *' : 'Active Email Address *'}
                      className="w-full px-3 py-2.5 rounded-none border-2 border-black bg-white font-mono text-xs text-black placeholder:text-black/40 focus:bg-[#CCFF00]/10 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder={isId ? 'Pesan, penawaran proyek, atau topik kolaborasi... *' : 'Message, project scope, or opportunity... *'}
                    className="w-full px-3 py-2.5 rounded-none border-2 border-black bg-white font-mono text-xs text-black placeholder:text-black/40 focus:bg-[#CCFF00]/10 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-none border-2 border-black bg-black text-[#CCFF00] font-mono font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-none transition-all cursor-pointer disabled:opacity-60"
                  >
                    {inquirySubmitting
                      ? (isId ? 'MENGIRIMKAN...' : 'SENDING...')
                      : (isId ? 'KIRIM PESAN SEKARANG →' : 'SUBMIT INQUIRY NOW →')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
