import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Calendar, MapPin, Loader2 } from 'lucide-react'
import { apiClient } from '../../lib/api-client'
import { ExperienceFormModal, type ExperienceData } from './ExperienceFormModal'

export function ExperiencesManager() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedExp, setSelectedExp] = useState<ExperienceData | null>(null)

  const fetchExperiences = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<ExperienceData[]>('/experiences')
      setExperiences(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat riwayat pengalaman')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchExperiences()
  }, [])

  const handleOpenCreate = () => {
    setSelectedExp(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (exp: ExperienceData) => {
    setSelectedExp(exp)
    setIsModalOpen(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus data pengalaman ini?')
    if (!confirmDelete) return

    try {
      await apiClient.delete(`/experiences/${id}`)
      setExperiences((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus pengalaman')
    }
  }

  const handleSubmit = async (expData: ExperienceData) => {
    if (selectedExp?.id) {
      await apiClient.patch(`/experiences/${selectedExp.id}`, expData)
    } else {
      await apiClient.post('/experiences', expData)
    }
    await fetchExperiences()
  }

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              // 02 . MANAJEMEN_PENGALAMAN ({experiences.length})
            </h2>
          </div>
          <p className="font-mono text-xs text-black/60 mt-0.5 uppercase">
            Kelola riwayat karir, jabatan, tanggung jawab, dan teknologi
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PENGALAMAN</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-100 border-2 border-black text-xs font-mono font-bold text-red-900">
          [ERROR]: {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-black" />
          <span className="font-mono text-xs font-black uppercase text-black">
            MEMUAT DATA PENGALAMAN...
          </span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-mono text-xs font-black uppercase text-black/60 block mb-3">
            BELUM ADA PENGALAMAN KERJA TERDAFTAR.
          </span>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-black text-[#CCFF00] font-mono text-xs font-black uppercase border-2 border-black"
          >
            + BUAT DATA PENGALAMAN
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id || exp.company}
              className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row md:items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="font-black text-base text-black uppercase tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs font-bold text-black/70">
                    @ {exp.company}
                  </span>
                  {exp.isCurrent && (
                    <span className="px-2 py-0.5 bg-[#CCFF00] border border-black font-mono text-[9px] font-black uppercase">
                      ACTIVE_ROLE
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-black/60 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-black" />
                    <span>
                      {formatDate(exp.startDate)} — {exp.isCurrent ? 'SEKARANG' : formatDate(exp.endDate)}
                    </span>
                  </span>
                  {exp.location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-black" />
                      <span>{exp.location}</span>
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs text-black/90 leading-relaxed mb-3">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-black/5 border border-black/30 font-mono text-[10px] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex md:flex-col items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(exp)}
                  className="p-2 border-2 border-black bg-white hover:bg-[#CCFF00] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 border-2 border-black bg-red-500 hover:bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ExperienceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedExp}
        title={selectedExp ? 'EDIT RIWAYAT PENGALAMAN' : 'TAMBAH PENGALAMAN KERJA'}
      />
    </div>
  )
}

