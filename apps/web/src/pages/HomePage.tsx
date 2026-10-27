import { ArrowRight, Code2, Download, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { GithubIcon } from '../components/icons/GithubIcon'
import { NavbarDock } from '../components/NavbarDock'
import { StatusBadge } from '../components/StatusBadge'

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#F1FAEE] text-[#1D3557] selection:bg-[#A8DADC] selection:text-[#1D3557]">
      <NavbarDock />

      {/* Hero / About Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <StatusBadge statusText="Available for work & projects" />

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1D3557] leading-[1.15]">
            Crafting Scalable <span className="text-[#E63946]">Web Solutions</span> with Clean Architecture.
          </h1>

          <p className="text-base sm:text-lg text-[#457B9D] max-w-2xl leading-relaxed">
            Full-Stack Software Engineer yang berfokus pada ekosistem React, TypeScript, NestJS, dan PostgreSQL.
            Membangun antarmuka modern yang cepat, estetis, dan arsitektur backend yang tangguh.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
            <a href="#projects">
              <Button variant="primary" size="lg" className="rounded-xl">
                <span>Lihat Proyek</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-xl bg-white/60">
                <Download className="h-4 w-4 text-[#457B9D]" />
                <span>Download CV</span>
              </Button>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-[#1D3557]/15 bg-white/60 text-[#1D3557] hover:bg-white hover:border-[#1D3557]/30 transition-all shadow-xs"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="h-5 w-5 text-[#E63946]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3557]">Riwayat Pengalaman</h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs hover:border-[#457B9D]/40 transition-all">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-[#1D3557]">Lead Full-Stack Developer</h3>
              <span className="text-xs font-mono text-[#457B9D] bg-[#F1FAEE] px-2.5 py-1 rounded-md border border-[#457B9D]/20">
                2023 — Sekarang
              </span>
            </div>
            <p className="text-sm font-medium text-[#457B9D] mt-1">Tech Agency & Software House</p>
            <p className="text-sm text-[#1D3557]/80 mt-3 leading-relaxed">
              Memimpin perancangan dan pengembangan aplikasi web berskala enterprise menggunakan arsitektur monorepo, NestJS microservices, dan frontend React.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>NestJS</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Docker</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center gap-2 mb-8">
          <Code2 className="h-5 w-5 text-[#E63946]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3557]">Keahlian Teknis</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs">
            <h3 className="text-sm font-mono font-bold text-[#457B9D] uppercase tracking-wider mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>React 19</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Vite</Badge>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs">
            <h3 className="text-sm font-mono font-bold text-[#457B9D] uppercase tracking-wider mb-3">Backend & Database</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>NestJS 12</Badge>
              <Badge>Prisma ORM</Badge>
              <Badge>PostgreSQL</Badge>
              <Badge>Neon Serverless</Badge>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#457B9D]/20 shadow-xs sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-mono font-bold text-[#457B9D] uppercase tracking-wider mb-3">Cloud & Tooling</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Vercel</Badge>
              <Badge>Cloudinary</Badge>
              <Badge>Docker</Badge>
              <Badge>Git</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1D3557]">Showcase Portofolio</h2>
            <p className="text-sm text-[#457B9D] mt-1">Klik untuk membuka detail galeri gambar & arsitektur proyek</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Showcase Card */}
          <div className="group rounded-2xl bg-white border border-[#457B9D]/20 overflow-hidden shadow-xs hover:shadow-lg hover:border-[#457B9D]/40 transition-all flex flex-col">
            <div className="h-48 bg-[#1D3557]/5 relative overflow-hidden flex items-center justify-center border-b border-[#457B9D]/15">
              <div className="text-center p-4">
                <span className="text-xs font-mono text-[#457B9D] uppercase tracking-wider block">Thumbnail Showcase</span>
                <span className="font-bold text-lg text-[#1D3557]">Enterprise E-Commerce Platform</span>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="accent">Featured</Badge>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1D3557] group-hover:text-[#E63946] transition-colors">
                  Enterprise E-Commerce Platform
                </h3>
                <p className="text-sm text-[#457B9D] mt-2 leading-relaxed">
                  Sistem platform e-commerce multi-vendor dengan autentikasi berbasis RBAC dan pengelolaan katalog produk berskala besar.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Badge>React</Badge>
                  <Badge>NestJS</Badge>
                  <Badge>PostgreSQL</Badge>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-black/5 flex items-center justify-between">
                <Link
                  to="/projects/enterprise-ecommerce"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E63946] hover:underline"
                >
                  <span>Lihat Detail & Galeri</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#457B9D] hover:text-[#1D3557] transition-colors p-1"
                  aria-label="GitHub Repo"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#1D3557]/10">
        <div className="p-8 rounded-3xl bg-white border border-[#457B9D]/25 shadow-xs">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Mari Bekerja Sama</h2>
            <p className="text-sm text-[#457B9D] mt-2 leading-relaxed">
              Tertarik mendiskusikan peluang kerja, kolaborasi proyek, atau konsultasi arsitektur perangkat lunak? Kirimkan pesan Anda langsung di bawah ini.
            </p>
          </div>

          <form className="mt-6 grid grid-cols-1 gap-4 max-w-xl" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1.5">Nama</label>
                <input
                  type="text"
                  placeholder="Nama Anda"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono font-medium text-[#1D3557] mb-1.5">Pesan</label>
              <textarea
                rows={4}
                placeholder="Tuliskan pesan Anda..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#457B9D]/30 bg-[#F1FAEE]/40 text-sm text-[#1D3557] focus:outline-hidden focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
              ></textarea>
            </div>
            <div>
              <Button variant="primary" size="md" className="rounded-xl w-full sm:w-auto">
                <Send className="h-4 w-4" />
                <span>Kirim Pesan</span>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-xs font-medium text-[#457B9D] border-t border-[#1D3557]/10">
        <p>© {new Date().getFullYear()} Randy Fauzi. Built with React 19, NestJS, Prisma, Cloudinary & Neon.</p>
      </footer>
    </div>
  )
}

