import { useState, useEffect, type FormEvent } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'

export interface ExperienceData {
  id?: string
  company: string
  role: string
  location?: string
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  description: string
  technologies: string[]
  sortOrder: number
}

interface ExperienceFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ExperienceData) => Promise<void>
  initialData?: ExperienceData | null
  title: string
}

export function ExperienceFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: ExperienceFormModalProps) {
  const [formData, setFormData] = useState<ExperienceData>({
    company: '',
    role: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    technologies: [],
    sortOrder: 1,
  })
  const [techInput, setTechInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        startDate: initialData.startDate ? initialData.startDate.slice(0, 10) : '',
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : '',
      })
      setTechInput(initialData.technologies?.join(', ') || '')
    } else {
      setFormData({
        company: '',
        role: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        technologies: [],
        sortOrder: 1,
      })
      setTechInput('')
    }
    setError(null)
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    try {
      await onSubmit({
        ...formData,
        technologies,
        endDate: formData.isCurrent ? null : formData.endDate || null,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan riwayat pengalaman.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 text-left max-h-[90vh] overflow-y-auto">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                NAMA PERUSAHAAN / INSTANSI *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                placeholder="PT Solusi Digital Nusantara"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                PERAN / POSISI *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
                placeholder="Lead Full-Stack Web & Mobile Engineer"
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              LOKASI (KOTA / REMOTE)
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
              placeholder="Bintan / Batam (Hybrid) atau Remote"
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                TANGGAL MULAI *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                TANGGAL SELESAI
              </label>
              <input
                type="date"
                disabled={formData.isCurrent}
                value={formData.endDate || ''}
                onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none disabled:bg-gray-100 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => setFormData((p) => ({ ...p, isCurrent: e.target.checked }))}
              className="w-4 h-4 border-2 border-black accent-black rounded-none"
            />
            <label htmlFor="isCurrent" className="font-mono text-xs font-black uppercase text-black cursor-pointer">
              MASIH BEKERJA DI SINI (SEKARANG)
            </label>
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              DESKRIPSI TANGGUNG JAWAB & PENCAPAIAN *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
              placeholder="Memimpin rekayasa platform digital enterprise, mengimplementasikan microservices..."
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              TEKNOLOGI YANG DIGUNAKAN (PISAHKAN DENGAN KOMA)
            </label>
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React 19, Next.js, NestJS, Flutter, PostgreSQL, Docker"
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="font-mono text-xs font-black uppercase">URUTAN TAMPILAN:</span>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => setFormData((p) => ({ ...p, sortOrder: parseInt(e.target.value, 10) || 0 }))}
              className="w-20 px-2 py-1 border-2 border-black font-mono text-xs text-black"
            />
          </div>

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
              <span>{isSubmitting ? 'MENYIMPAN...' : 'SIMPAN PENGALAMAN'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

