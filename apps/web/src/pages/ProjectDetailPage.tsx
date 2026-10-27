import { ArrowLeft, Code, ExternalLink, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { GithubIcon } from '../components/icons/GithubIcon'
import { NavbarDock } from '../components/NavbarDock'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  // Mock details for M1 verification
  const project = {
    title: 'Enterprise E-Commerce Platform',
    slug: slug || 'enterprise-ecommerce',
    summary:
      'Sistem platform e-commerce multi-vendor dengan autentikasi berbasis RBAC dan pengelolaan katalog produk berskala besar.',
    description: `### Arsitektur & Latar Belakang
Platform ini dibangun untuk menangani tantangan skalabilitas dan keamanan data pada sistem transaksi multi-vendor. Menggunakan arsitektur monorepo decoupled dengan backend NestJS dan frontend React 19.

### Fitur Utama
- **Autentikasi Aman**: Cookie-based JWT dual-token dengan rotasi token dan deteksi refresh-token reuse.
- **Role-Based Access Control (RBAC)**: Pemisahan hak akses antara Superadmin, Vendor Manager, dan Customer.
- **Katalog Produk Dinamis**: Penanganan varian produk beresolusi tinggi dengan CDN Cloudinary.
- **Database Optimized**: PostgreSQL dengan Prisma ORM dan connection pooling Neon.`,
    repoUrl: 'https://github.com/example/ecommerce-platform',
    techStack: ['React 19', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Cloudinary', 'Tailwind CSS'],
    images: [
      { id: '1', caption: 'Dashboard Overview & Analytics' },
      { id: '2', caption: 'Product Catalog Management' },
      { id: '3', caption: 'Role Permissions & Access Control' },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-[#1D3557]">
      <NavbarDock />

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#457B9D] hover:text-[#1D3557] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Showcase</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#457B9D]/20 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-medium text-[#457B9D] uppercase tracking-wider block mb-1">
                Project Detail & Architecture
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1D3557]">{project.title}</h1>
            </div>

            {/* Official GitHub Action Link Only (No Live Preview) */}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md" className="rounded-xl">
                  <GithubIcon className="h-4 w-4" />
                  <span>Lihat di GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </Button>
              </a>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#457B9D] mt-3 max-w-2xl leading-relaxed">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-black/5">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>

        {/* High-Resolution Image Gallery (Cloudinary Showcase) */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-[#E63946]" />
            <h2 className="text-lg font-bold text-[#1D3557]">Galeri Tampilan & Antarmuka</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((img, idx) => (
              <div
                key={img.id}
                className={`rounded-2xl bg-white border border-[#457B9D]/20 overflow-hidden shadow-xs ${
                  idx === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div
                  className={`bg-[#1D3557]/5 flex items-center justify-center p-8 border-b border-black/5 ${
                    idx === 0 ? 'h-64 sm:h-80' : 'h-48'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-xs font-mono text-[#457B9D] uppercase tracking-wider block">
                      Cloudinary Image Placeholder
                    </span>
                    <span className="text-sm font-semibold text-[#1D3557] mt-1 block">{img.caption}</span>
                  </div>
                </div>
                <div className="p-3 bg-white text-xs font-mono text-[#457B9D] text-center">
                  {img.caption}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Technical Markdown Description */}
        <section className="mt-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#457B9D]/20 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-4 w-4 text-[#E63946]" />
            <h2 className="text-lg font-bold text-[#1D3557]">Ulasan Arsitektur & Rekayasa</h2>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base text-[#1D3557]/80 leading-relaxed whitespace-pre-line">
            {project.description}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-xs font-medium text-[#457B9D] border-t border-[#1D3557]/10">
        <p>© {new Date().getFullYear()} Randy Fauzi. Built with React 19, NestJS, Prisma, Cloudinary & Neon.</p>
      </footer>
    </div>
  )
}

