import { useState, useEffect, type ReactNode } from 'react'
import { Code, ExternalLink, Sparkles, X, ZoomIn, Loader2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { CustomCursor } from '../components/CustomCursor'
import { Footer } from '../components/Footer'
import { GithubIcon } from '../components/icons/GithubIcon'
import { NavbarDock } from '../components/NavbarDock'
import { apiClient } from '../lib/api-client'
import { contentData } from '../data/content'

interface ProjectImageItem {
  id: string
  url: string
  publicId?: string
  caption?: string
  sortOrder?: number
}

interface ProjectDetailData {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  thumbnailUrl: string
  thumbnailPublicId?: string
  repoUrl?: string
  techStack: string[]
  isFeatured?: boolean
  isPublished?: boolean
  images?: ProjectImageItem[]
}


function BrutalistMarkdown({ content }: { content: string }) {
  const renderInline = (text: string) => {
    const parts: (string | ReactNode)[] = []
    const regex = /(\$\$.*?\$\$|\*\*.*?\*\*|`.*?`)/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      const token = match[0]
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} className="font-black text-black">
            {token.slice(2, -2)}
          </strong>
        )
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={match.index}
            className="px-1.5 py-0.5 mx-0.5 bg-[#F1FAEE] border border-black/40 font-mono text-[11px] sm:text-xs font-bold text-black"
          >
            {token.slice(1, -1)}
          </code>
        )
      }
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }

  const lines = content.split('\n')
  const blocks: ReactNode[] = []
  let currentList: string[] = []

  const flushList = (key: string | number) => {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={`list-${key}`} className="my-3 space-y-2 border-l-2 border-black pl-3.5 ml-1">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-black/90">
              <span className="w-2 h-2 bg-[#CCFF00] border border-black shrink-0 mt-1" />
              <span className="leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim()

    if (!line) {
      flushList(idx)
      return
    }

    if (line.startsWith('### ')) {
      flushList(idx)
      blocks.push(
        <h3
          key={`h3-${idx}`}
          className="font-mono text-xs sm:text-sm font-black uppercase text-black tracking-wider mt-5 mb-2 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-[#E63946] border border-black inline-block" />
          <span>{renderInline(line.replace(/^###\s+/, ''))}</span>
        </h3>
      )
    } else if (line.startsWith('## ')) {
      flushList(idx)
      blocks.push(
        <h2
          key={`h2-${idx}`}
          className="font-mono text-sm sm:text-base font-black uppercase text-black tracking-wider border-b-2 border-black pb-2 mt-6 mb-3 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black inline-block" />
          <span>{renderInline(line.replace(/^##\s+/, ''))}</span>
        </h2>
      )
    } else if (line.startsWith('# ')) {
      flushList(idx)
      blocks.push(
        <h1
          key={`h1-${idx}`}
          className="font-mono text-base sm:text-lg font-black uppercase text-black tracking-wide border-b-2 border-black pb-2 mt-6 mb-4"
        >
          {renderInline(line.replace(/^#\s+/, ''))}
        </h1>
      )
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      currentList.push(line.replace(/^[-*]\s+/, ''))
    } else {
      flushList(idx)
      blocks.push(
        <p key={`p-${idx}`} className="text-xs sm:text-sm font-sans text-black/90 leading-relaxed font-normal mb-3">
          {renderInline(line)}
        </p>
      )
    }
  })

  flushList('end')

  return <div className="space-y-1">{blocks}</div>
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; caption?: string } | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    async function loadProject() {
      try {
        if (!slug) throw new Error('Parameter slug proyek tidak valid.')
        const data = await apiClient.get<ProjectDetailData>(`/projects/${slug}`)
        if (isMounted) {
          setProject(data)
        }
      } catch (err) {
        // Fallback gracefully to curated local static dictionary if API fails or offline
        const localFound = contentData.id.projects.items.find((p) => p.slug === slug)
        if (localFound && isMounted) {
          setProject({
            id: localFound.id,
            title: localFound.title,
            slug: localFound.slug,
            summary: localFound.summary,
            description: `## Analisis Arsitektur & Rekayasa Solusi\n\n${localFound.summary}\n\n### Dampak & Hasil Produksi:\n${localFound.impact}\n\n### Fokus Rekayasa Utama:\n- Standardisasi arsitektur performa tinggi dan interoperabilitas sistem.\n- Pipeline pengolahan data terdistribusi dengan keandalan maksimal.\n- Pemodelan basis data relasional bersih dengan proteksi transaksi.`,
            thumbnailUrl: '/profile.jpg',
            repoUrl: localFound.repoUrl,
            techStack: localFound.techStack,
            isFeatured: localFound.isFeatured,
            images: [],
          })
        } else if (isMounted) {
          setError(err instanceof Error ? err.message : 'Gagal memuat detail proyek.')
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadProject()
    return () => {
      isMounted = false
    }
  }, [slug])

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-black selection:bg-[#CCFF00] selection:text-black">
      <CustomCursor />
      <NavbarDock />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-left">
        {/* Architectural Specification Status Bar (Single Back Button in Header) */}
        <div className="mb-6 flex items-center justify-between border-b-2 border-black/15 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black uppercase">
            <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black inline-block animate-pulse" />
            <span>SISTEM_ARSITEKTUR // SPESIFIKASI_PROYEK</span>
          </div>

          {project && (
            <span className="font-mono text-xs font-black uppercase text-black/70 border border-black/30 bg-white px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              PROYEK_ID: // {project.slug}
            </span>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="p-16 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center my-8">
            <Loader2 className="w-8 h-8 text-black animate-spin mx-auto mb-3" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
              MEMUAT DATA ARSITEKTUR PROYEK DARI DATABASE...
            </span>
          </div>
        ) : error || !project ? (
          /* Error State */
          <div className="p-12 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center my-8">
            <span className="font-mono text-sm font-black text-red-600 block mb-3 uppercase">
              [ERROR]: {error || 'Proyek tidak ditemukan.'}
            </span>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-[#CCFF00] font-mono text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] hover:text-black transition-all"
            >
              Kembali ke Portofolio
            </Link>
          </div>
        ) : (
          /* Main Project Detail Content */
          <>
            {/* Top Specification Card - Brutalist Modern */}
            <div className="bg-white border-2 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-black">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 bg-[#CCFF00] border border-black inline-block" />
                    <span className="font-mono text-xs font-black text-black/70 tracking-widest uppercase">
                      SYSTEM SPECIFICATION // SHOWCASE_DETAIL
                    </span>
                    {project.isFeatured && (
                      <span className="px-2 py-0.5 bg-[#E63946] text-white font-mono text-[9px] font-black uppercase border border-black shadow-[1px_1px_0px_#000]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-none uppercase">
                    {project.title}
                  </h1>
                </div>

                {/* GitHub Repository Action (Strict: No Live Preview Button) */}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer shrink-0"
                    title="Buka Repositori Kode Sumber di GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>LIHAT REPOSITORI GITHUB</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                )}
              </div>

              {/* Summary Statement */}
              <p className="font-sans text-base sm:text-lg text-black font-medium leading-relaxed mt-6 max-w-3xl">
                {project.summary}
              </p>

              {/* Tech Stack Pills */}
              <div className="mt-6 pt-6 border-t-2 border-black/10 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* High-Resolution Cloudinary Gallery Section */}
            {(project.thumbnailUrl || (project.images && project.images.length > 0)) && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-black" />
                  <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
                    GALERI TAMPILAN SISTEM & ANTARMUKA ({1 + (project.images?.length || 0)} ASET)
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Main Feature Thumbnail */}
                  {project.thumbnailUrl && (
                    <div
                      onClick={() =>
                        setActiveLightboxImg({
                          url: project.thumbnailUrl,
                          caption: `${project.title} — Arsitektur & Tampilan Utama`,
                        })
                      }
                      className="md:col-span-2 group relative border-2 border-black bg-white p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-102 group-hover:contrast-135 transition-all duration-300"
                          loading="lazy"
                        />
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black text-[#CCFF00] font-mono text-[10px] font-black uppercase border border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>KLIK UNTUK MEMPERBESAR</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white font-mono text-xs font-bold text-black border-t-2 border-black flex items-center justify-between">
                        <span>[MAIN_VIEWPORT]: Tampilan Sistem Utama</span>
                        <span className="text-black/60 uppercase text-[10px]">CLOUDINARY_HOSTED</span>
                      </div>
                    </div>
                  )}

                  {/* Multi Gallery Images */}
                  {project.images?.map((img, idx) => (
                    <div
                      key={img.id || img.url + idx}
                      onClick={() => setActiveLightboxImg({ url: img.url, caption: img.caption })}
                      className="group relative border-2 border-black bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                        <img
                          src={img.url}
                          alt={img.caption || `Gallery ${idx + 1}`}
                          className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-105 group-hover:contrast-135 transition-all duration-300"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 right-2 p-1 bg-black text-[#CCFF00] border border-black shadow-[1px_1px_0px_#000]">
                          <ZoomIn className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="p-2.5 bg-white font-mono text-xs font-bold text-black border-t border-black truncate">
                        {img.caption || `Foto Galeri #${idx + 1}`}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Deep Technical Architectural Markdown Section */}
            <section className="bg-white border-2 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
              <div className="flex items-center gap-2 pb-4 border-b-2 border-black mb-6">
                <Code className="w-4 h-4 text-black" />
                <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
                  ULASAN ARSITEKTUR TEKNIS & REKAYASA SISTEM
                </h2>
              </div>

              <div className="text-black">
                <BrutalistMarkdown content={project.description} />
              </div>
            </section>
          </>
        )}
      </main>

      {/* Fullscreen Brutalist Lightbox Modal */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white border-2 border-black p-3 sm:p-4 shadow-[12px_12px_0px_0px_#CCFF00]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black">
              <span className="font-mono text-xs font-black uppercase text-black truncate max-w-lg">
                {activeLightboxImg.caption || 'PREVIEW_FOTO_RESOLUSI_TINGGI'}
              </span>
              <button
                type="button"
                onClick={() => setActiveLightboxImg(null)}
                className="p-1.5 bg-[#E63946] text-white hover:bg-black font-mono text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                title="Tutup (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Full Image */}
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black/5 border border-black">
              <img
                src={activeLightboxImg.url}
                alt={activeLightboxImg.caption || 'Lightbox Preview'}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            {/* Modal Footer Caption */}
            {activeLightboxImg.caption && (
              <div className="pt-2 text-center font-mono text-xs font-bold text-black/80">
                {activeLightboxImg.caption}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
