import { useState, useEffect, type FormEvent } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import { apiClient } from '../../lib/api-client'
import { CloudinaryUploader, type UploadedMediaItem } from './CloudinaryUploader'

export interface ProjectData {
  id?: string
  title: string
  slug: string
  summary: string
  description: string
  thumbnailUrl: string
  thumbnailPublicId?: string
  repoUrl?: string
  techStack: string[]
  isFeatured: boolean
  isPublished: boolean
  sortOrder: number
  images?: Array<{ id?: string; url: string; publicId?: string; caption?: string; sortOrder?: number }>
}

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectData, gallery: UploadedMediaItem[]) => Promise<void>
  initialData?: ProjectData | null
  title: string
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: ProjectFormModalProps) {
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    slug: '',
    summary: '',
    description: '',
    thumbnailUrl: '',
    thumbnailPublicId: '',
    repoUrl: '',
    techStack: [],
    isFeatured: false,
    isPublished: true,
    sortOrder: 1,
  })
  const [techStackInput, setTechStackInput] = useState('')
  const [gallery, setGallery] = useState<UploadedMediaItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setTechStackInput(initialData.techStack?.join(', ') || '')
      setGallery(
        initialData.images?.map((img, i) => ({
          url: img.url,
          publicId: img.publicId,
          caption: img.caption,
          sortOrder: img.sortOrder ?? i,
        })) || [],
      )
    } else {
      setFormData({
        title: '',
        slug: '',
        summary: '',
        description: '',
        thumbnailUrl: '',
        thumbnailPublicId: '',
        repoUrl: '',
        techStack: [],
        isFeatured: false,
        isPublished: true,
        sortOrder: 1,
      })
      setTechStackInput('')
      setGallery([])
    }
    setError(null)
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleTitleChange = (newTitle: string) => {
    const slug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: initialData ? prev.slug : slug,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.thumbnailUrl) {
      setError('Thumbnail proyek wajib diunggah.')
      return
    }

    setIsSubmitting(true)

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    try {
      await onSubmit({ ...formData, techStack }, gallery)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan proyek.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 text-left max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CCFF00] border border-black" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border-2 border-black hover:bg-black hover:text-[#CCFF00] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border-2 border-black text-xs font-mono font-bold text-red-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>[ERROR]: {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                JUDUL PROYEK *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: RS Bintan Health Ecosystem"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                SLUG URL UNIK *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                placeholder="simrs-bintan-cloud"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
          </div>

          {/* Row 2: Summary (Showcase Card) */}
          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              RINGKASAN SINGKAT (1-2 KALIMAT) *
            </label>
            <input
              type="text"
              required
              value={formData.summary}
              onChange={(e) => setFormData((p) => ({ ...p, summary: e.target.value }))}
              placeholder="Enterprise Cloud-Native Hospital Information System with FHIR compliance..."
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          {/* Row 3: Technical Description (Markdown) */}
          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              DESKRIPSI LENGKAP ARSITEKTUR (MARKDOWN) *
            </label>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="## Enterprise Hospital Management & Clinical Integration..."
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          {/* Row 4: Repo URL (GitHub Only) & Tech Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                LINK REPOSITORI GITHUB (TANPA LIVE PREVIEW)
              </label>
              <input
                type="url"
                value={formData.repoUrl || ''}
                onChange={(e) => setFormData((p) => ({ ...p, repoUrl: e.target.value }))}
                placeholder="https://github.com/elrazaq/simrs-cloud-core"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                TECH STACK (PISAHKAN DENGAN KOMA) *
              </label>
              <input
                type="text"
                required
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="React 19, Next.js, NestJS, PostgreSQL, Prisma, Docker"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
          </div>

          {/* Row 5: Thumbnail Uploader */}
          <div className="border-t-2 border-black/10 pt-4">
            <CloudinaryUploader
              mode="single"
              folder="portfolio/projects"
              label="THUMBNAIL PROYEK UTAMA *"
              currentUrl={formData.thumbnailUrl}
              currentPublicId={formData.thumbnailPublicId}
              onSingleSuccess={({ url, publicId }) => {
                setFormData((p) => ({ ...p, thumbnailUrl: url, thumbnailPublicId: publicId }))
              }}
              onRemoveSingle={() => {
                setFormData((p) => ({ ...p, thumbnailUrl: '', thumbnailPublicId: '' }))
              }}
            />
          </div>

          {/* Row 6: Multi Gallery Uploader */}
          <div className="border-t-2 border-black/10 pt-4">
            <CloudinaryUploader
              mode="multi"
              folder="portfolio/projects/gallery"
              label="GALERI FOTO DETAIL PROYEK (/projects/:slug)"
              galleryItems={gallery}
              onGallerySuccess={(items) => setGallery(items)}
              onRemoveGalleryItem={async (index) => {
                const item = gallery[index] as any
                if (item?.id) {
                  try {
                    await apiClient.delete(`/projects/images/${item.id}`)
                  } catch (err) {
                    console.warn('Gagal menghapus gambar proyek dari database:', err)
                  }
                }
                setGallery((prev) => prev.filter((_, i) => i !== index))
              }}
            />
          </div>

          {/* Row 7: Flags & Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-2 border-black/10 pt-4 items-center">
            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-black uppercase">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) => setFormData((p) => ({ ...p, isPublished: e.target.checked }))}
                className="w-4 h-4 border-2 border-black accent-black rounded-none"
              />
              <span>TERBITKAN (PUBLISHED)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-black uppercase">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((p) => ({ ...p, isFeatured: e.target.checked }))}
                className="w-4 h-4 border-2 border-black accent-black rounded-none"
              />
              <span>UNGGULAN (FEATURED)</span>
            </label>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black uppercase shrink-0">URUTAN:</span>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData((p) => ({ ...p, sortOrder: parseInt(e.target.value, 10) || 0 }))}
                className="w-20 px-2 py-1 border-2 border-black font-mono text-xs text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-white hover:bg-black/10 text-black border-2 border-black font-mono text-xs font-black uppercase transition-all cursor-pointer"
            >
              BATAL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? 'MENYIMPAN...' : 'SIMPAN PROYEK'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

