import { useState, useEffect, type FormEvent } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import { CloudinaryUploader } from './CloudinaryUploader'

export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS_TOOLS' | 'DESIGN_OTHER'

export interface SkillData {
  id?: string
  name: string
  category: SkillCategory
  iconUrl?: string | null
  iconPublicId?: string | null
  proficiency?: number | null
  sortOrder: number
}

interface SkillFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: SkillData) => Promise<void>
  initialData?: SkillData | null
  title: string
}

export function SkillFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: SkillFormModalProps) {
  const [formData, setFormData] = useState<SkillData>({
    name: '',
    category: 'FRONTEND',
    iconUrl: '',
    iconPublicId: '',
    proficiency: 90,
    sortOrder: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: '',
        category: 'FRONTEND',
        iconUrl: '',
        iconPublicId: '',
        proficiency: 90,
        sortOrder: 1,
      })
    }
    setError(null)
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan data keahlian.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 text-left max-h-[90vh] overflow-y-auto">
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
          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              NAMA KEAHLIAN / TEKNOLOGI *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="Contoh: React 19, NestJS, Flutter"
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black focus:outline-none focus:bg-[#CCFF00]/10"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
              KATEGORI DOMAIN *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value as SkillCategory }))}
              className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black bg-white focus:outline-none"
            >
              <option value="FRONTEND">FRONTEND (React, Next.js, Vue, Tailwind)</option>
              <option value="BACKEND">BACKEND (NestJS, Node.js, Prisma)</option>
              <option value="DATABASE">DATABASE (PostgreSQL, Redis)</option>
              <option value="DEVOPS_TOOLS">DEVOPS & TOOLS (Docker, Linux, Git)</option>
              <option value="DESIGN_OTHER">MOBILE & DESIGN (Flutter, Dart)</option>
            </select>
          </div>

          <div>
            <CloudinaryUploader
              mode="single"
              folder="portfolio/skills"
              label="IKON LOGO (PNG / SVG)"
              currentUrl={formData.iconUrl || ''}
              currentPublicId={formData.iconPublicId || ''}
              onSingleSuccess={({ url, publicId }) => {
                setFormData((p) => ({ ...p, iconUrl: url, iconPublicId: publicId }))
              }}
              onRemoveSingle={() => {
                setFormData((p) => ({ ...p, iconUrl: '', iconPublicId: '' }))
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                PROFISIENSI (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.proficiency || 90}
                onChange={(e) => setFormData((p) => ({ ...p, proficiency: parseInt(e.target.value, 10) || 90 }))}
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black uppercase text-black mb-1.5">
                URUTAN TAMPILAN
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData((p) => ({ ...p, sortOrder: parseInt(e.target.value, 10) || 0 }))}
                className="w-full px-3 py-2 border-2 border-black font-mono text-xs text-black"
              />
            </div>
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
              <span>{isSubmitting ? 'MENYIMPAN...' : 'SIMPAN KEAHLIAN'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

