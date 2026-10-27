import {
  ArrowRight,
  Briefcase,
  Check,
  Code2,
  Copy,
  Download,
  FolderGit2,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AmbientBackground } from '../components/AmbientBackground'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Footer } from '../components/Footer'
import { HeroAvatar } from '../components/HeroAvatar'
import { GithubIcon } from '../components/icons/GithubIcon'
import { NavbarDock } from '../components/NavbarDock'
import { Typewriter } from '../components/Typewriter'
import { contentData, type Language } from '../data/content'

export function HomePage() {
  const [lang, setLang] = useState<Language>('id')
  const [copiedEmail, setCopiedEmail] = useState(false)

  const c = contentData[lang]

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elrazaq185@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="min-h-screen text-[#1D3557] selection:bg-[#A8DADC] selection:text-[#1D3557] relative">
      <AmbientBackground />
      <NavbarDock currentLang={lang} onToggleLang={setLang} navLabels={c.nav} />

      {/* Hero Section */}
      <section id="about" className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-5 text-left">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#457B9D] bg-white/80 px-3 py-1 rounded-full border border-[#1D3557]/10 shadow-xs">
              {c.hero.greeting}
            </span>

            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1D3557] leading-[1.15]">
                Abdul Razak, S.T.
              </h1>
              <div className="mt-2 text-xl sm:text-2xl font-bold text-[#457B9D] min-h-[2rem]">
                <Typewriter words={c.hero.roles} className="text-[#E63946]" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#1D3557]/80 leading-relaxed max-w-xl">
              {c.hero.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#projects">
                <Button variant="primary" size="md" className="rounded-xl shadow-md shadow-[#E63946]/20">
                  <span>{c.hero.ctaProjects}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md" className="rounded-xl bg-white/80">
                  <Download className="h-4 w-4 text-[#457B9D]" />
                  <span>{c.hero.ctaResume}</span>
                </Button>
              </a>
              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[#1D3557]/15 bg-white/80 text-[#1D3557] hover:bg-white hover:border-[#1D3557]/30 transition-all shadow-xs"
                aria-label="GitHub Profile @elrazaq"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Photo Right Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroAvatar statusText={c.hero.statusBadge} yearsText={c.hero.yearsBadge} />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <Briefcase className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.experience.eyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">{c.experience.title}</h2>
        </div>

        <div className="space-y-8">
          {c.experience.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white/90 border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all backdrop-blur-xs"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1D3557]">{item.role}</h3>
                  <p className="text-sm font-semibold text-[#457B9D] mt-0.5">{item.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[#1D3557] bg-[#A8DADC]/30 px-2.5 py-1 rounded-lg border border-[#A8DADC]/40">
                    {item.period}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#1D3557]/80 leading-relaxed list-disc list-inside">
                {item.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx}>{resp}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-5 pt-3 border-t border-black/5">
                {item.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <Code2 className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.skills.eyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">{c.skills.title}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {c.skills.groups.map((group, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white/90 border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-[#1D3557] mb-3">{group.category}</h3>
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

      {/* Projects Showcase Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1.5">
            <FolderGit2 className="h-4 w-4 text-[#E63946]" />
            <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider">
              {c.projects.eyebrow}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">{c.projects.title}</h2>
          <p className="text-xs sm:text-sm text-[#457B9D] mt-1">{c.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {c.projects.items.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-3xl bg-white border border-[#457B9D]/20 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#457B9D]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview Banner */}
                <div className="h-48 bg-[#1D3557]/5 relative overflow-hidden flex items-center justify-center border-b border-[#457B9D]/15 p-6">
                  <div className="text-center">
                    <span className="text-[11px] font-mono text-[#457B9D] uppercase tracking-wider block mb-1">
                      {proj.category}
                    </span>
                    <span className="font-extrabold text-lg text-[#1D3557] block">{proj.title}</span>
                  </div>
                  {proj.isFeatured && (
                    <div className="absolute top-3.5 right-3.5">
                      <Badge variant="accent">Featured</Badge>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1D3557] group-hover:text-[#E63946] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#457B9D] mt-2 leading-relaxed">
                    {proj.summary}
                  </p>
                  <p className="text-xs font-medium text-[#1D3557] mt-3 italic bg-[#F1FAEE] p-2.5 rounded-xl border border-[#457B9D]/15">
                    Impact: {proj.impact}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {proj.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-[#F1FAEE]/40 border-t border-black/5 flex items-center justify-between">
                <Link
                  to={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E63946] hover:underline"
                >
                  <span>{c.projects.viewDetail}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-[#457B9D] hover:text-[#1D3557] hover:bg-black/5 transition-all"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#457B9D]/25 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#457B9D] uppercase tracking-wider block mb-1">
                  {c.contact.eyebrow}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">{c.contact.title}</h2>
                <p className="text-xs sm:text-sm text-[#457B9D] mt-2 leading-relaxed">{c.contact.subtitle}</p>
              </div>

              <div className="pt-6">
                <span className="text-xs font-mono text-[#457B9D] block mb-2">{c.contact.directContact}:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl border border-[#1D3557]/15 bg-[#F1FAEE] text-[#1D3557] hover:border-[#1D3557]/30 transition-all cursor-pointer"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? c.contact.copied : c.contact.copyEmail}</span>
                </button>
              </div>
            </div>

            <form className="md:col-span-3 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">
                    {c.contact.formName}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Abdul Razak"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">
                    {c.contact.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">
                  {c.contact.formMessage}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan proyek atau kebutuhan teknis Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                ></textarea>
              </div>
              <div>
                <Button variant="primary" size="md" className="rounded-xl w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  <span>{c.contact.formSubmit}</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
