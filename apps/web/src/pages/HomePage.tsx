import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  Layers,
  Send,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Footer } from '../components/Footer'
import { GithubIcon } from '../components/icons/GithubIcon'
import { NavbarDock } from '../components/NavbarDock'
import { StatusBadge } from '../components/StatusBadge'

export function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('elrazaq@example.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-[#1D3557] selection:bg-[#A8DADC] selection:text-[#1D3557]">
      <NavbarDock />

      {/* Hero / About Section */}
      <section id="about" className="pt-36 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-start gap-6">
          <StatusBadge statusText="Available for high-impact software engineering" />

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1D3557] leading-[1.12]">
            Engineering resilient systems, clean architectures, and{' '}
            <span className="text-[#E63946]">high-performance web apps.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#457B9D] max-w-2xl leading-relaxed">
            Halo, saya <span className="font-semibold text-[#1D3557]">Abdul Razak</span>. Software engineer
            dengan fokus pada perancangan sistem web end-to-end: React 19, TypeScript, NestJS, dan
            PostgreSQL. Menghubungkan ketelitian rekayasa backend dengan antarmuka pengguna yang cepat dan presisi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#projects">
              <Button variant="primary" size="lg" className="rounded-xl shadow-md shadow-[#E63946]/20">
                <span>Eksplorasi Proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-xl bg-white/80">
                <Download className="h-4 w-4 text-[#457B9D]" />
                <span>Resume / CV</span>
              </Button>
            </a>
            <a
              href="https://github.com/elrazaq"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-[#1D3557]/15 bg-white/80 text-[#1D3557] hover:bg-white hover:border-[#1D3557]/30 transition-all shadow-xs"
              aria-label="GitHub Profile @elrazaq"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-[#E63946]" />
              <span className="text-xs font-mono font-medium text-[#457B9D] uppercase tracking-wider">
                Career Trajectory
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Riwayat Pengalaman</h2>
          </div>
        </div>

        <div className="relative border-l-2 border-[#457B9D]/20 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
          <div className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#1D3557] group-hover:bg-[#E63946] transition-colors" />

            <div className="p-6 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-[#1D3557]">Full-Stack Software Engineer</h3>
                <span className="text-xs font-mono text-[#1D3557] bg-[#A8DADC]/30 px-2.5 py-1 rounded-md border border-[#A8DADC]/40">
                  2023 — Sekarang
                </span>
              </div>
              <p className="text-sm font-medium text-[#457B9D] mt-1">Enterprise Web Solutions & Distributed Systems</p>
              <p className="text-sm text-[#1D3557]/80 mt-3 leading-relaxed">
                Membangun dan memelihara aplikasi web skala enterprise. Mengimplementasikan autentikasi berbasis RBAC relasional,
                manajemen session refresh-token anti-replay, serta pipeline upload media otomatis dengan Cloudinary CDN.
              </p>
              <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-black/5">
                <Badge>React 19</Badge>
                <Badge>TypeScript</Badge>
                <Badge>NestJS</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Prisma</Badge>
                <Badge>Docker</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="h-4 w-4 text-[#E63946]" />
              <span className="text-xs font-mono font-medium text-[#457B9D] uppercase tracking-wider">
                Engineering Stack
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Keahlian Teknis</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-4">
                <Layers className="h-5 w-5 text-[#E63946]" />
              </div>
              <h3 className="text-base font-bold text-[#1D3557] mb-1">Frontend Engineering</h3>
              <p className="text-xs text-[#457B9D] mb-4 leading-relaxed">
                Antarmuka modern, responsif, dan interaktif dengan optimasi performa tinggi.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
              <Badge>React 19</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Vite</Badge>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-4">
                <Code2 className="h-5 w-5 text-[#457B9D]" />
              </div>
              <h3 className="text-base font-bold text-[#1D3557] mb-1">Backend & Database</h3>
              <p className="text-xs text-[#457B9D] mb-4 leading-relaxed">
                REST API berstruktur modular, skema relasional, dan otorisasi RBAC aman.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
              <Badge>NestJS 12</Badge>
              <Badge>Prisma ORM</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Neon Serverless</Badge>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-4">
                <Sparkles className="h-5 w-5 text-[#457B9D]" />
              </div>
              <h3 className="text-base font-bold text-[#1D3557] mb-1">Cloud & Infrastructure</h3>
              <p className="text-xs text-[#457B9D] mb-4 leading-relaxed">
                Deployment edge, manajemen media cloud CDN, dan container dev environment.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
              <Badge>Vercel</Badge>
              <Badge>Cloudinary</Badge>
              <Badge>Docker</Badge>
              <Badge>Git</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Layers className="h-4 w-4 text-[#E63946]" />
              <span className="text-xs font-mono font-medium text-[#457B9D] uppercase tracking-wider">
                Selected Work
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Showcase Portofolio</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Featured Project Card */}
          <div className="group rounded-3xl bg-white border border-[#457B9D]/20 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#457B9D]/40 transition-all flex flex-col justify-between">
            <div>
              <div className="h-52 bg-[#1D3557]/5 relative overflow-hidden flex items-center justify-center border-b border-[#457B9D]/15">
                <div className="text-center p-6">
                  <span className="text-xs font-mono text-[#457B9D] uppercase tracking-wider block mb-1">
                    Cloudinary Showcase Preview
                  </span>
                  <span className="font-extrabold text-xl text-[#1D3557] block">
                    Enterprise Multi-Vendor Platform
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="accent">Featured</Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1D3557] group-hover:text-[#E63946] transition-colors">
                  Enterprise Multi-Vendor Platform
                </h3>
                <p className="text-sm text-[#457B9D] mt-2.5 leading-relaxed">
                  Platform e-commerce terdistribusi dengan perlindungan otorisasi RBAC menyeluruh, manajemen session cookie
                  JWT anti-replay, dan integrasi media Cloudinary.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  <Badge>React 19</Badge>
                  <Badge>NestJS</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>Prisma</Badge>
                  <Badge>Cloudinary</Badge>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#F1FAEE]/30 border-t border-black/5 flex items-center justify-between">
              <Link
                to="/projects/enterprise-ecommerce"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E63946] hover:underline"
              >
                <span>Lihat Galeri & Detail</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/elrazaq"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-[#457B9D] hover:text-[#1D3557] hover:bg-black/5 transition-all"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#457B9D]/25 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-medium text-[#457B9D] uppercase tracking-wider block mb-1">
                  Get in Touch
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Mari Berkolaborasi</h2>
                <p className="text-sm text-[#457B9D] mt-2.5 leading-relaxed">
                  Buka untuk peluang rekayasa perangkat lunak, perancangan arsitektur sistem, atau kolaborasi teknis.
                </p>
              </div>

              <div className="pt-6">
                <span className="text-xs font-mono text-[#457B9D] block mb-2">Kontak Langsung:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold px-3 py-2 rounded-xl border border-[#1D3557]/15 bg-[#F1FAEE] text-[#1D3557] hover:border-[#1D3557]/30 transition-all cursor-pointer"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? 'Email Tersalin!' : 'Salin Email'}</span>
                </button>
              </div>
            </div>

            <form className="md:col-span-3 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">Nama</label>
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="nama@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1">Pesan</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan proyek atau kebutuhan teknis Anda..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                ></textarea>
              </div>
              <div>
                <Button variant="primary" size="md" className="rounded-xl w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  <span>Kirimkan Pesan</span>
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
