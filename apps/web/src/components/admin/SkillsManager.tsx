import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Sparkles } from 'lucide-react'
import { apiClient } from '../../lib/api-client'
import { SkillFormModal, type SkillData, type SkillCategory } from './SkillFormModal'

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  FRONTEND: '01 // FRONTEND ECOSYSTEM',
  BACKEND: '02 // BACKEND & ARCHITECTURE',
  DATABASE: '03 // DATA & STORAGE',
  DEVOPS_TOOLS: '04 // DEVOPS & INFRASTRUCTURE',
  DESIGN_OTHER: '05 // MOBILE & NATIVE APPS',
}

export function SkillsManager() {
  const [groupedSkills, setGroupedSkills] = useState<Record<SkillCategory, SkillData[]>>({
    FRONTEND: [],
    BACKEND: [],
    DATABASE: [],
    DEVOPS_TOOLS: [],
    DESIGN_OTHER: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null)

  const fetchSkills = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<Record<SkillCategory, SkillData[]>>('/skills')
      if (data) {
        setGroupedSkills(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat daftar keahlian')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchSkills()
  }, [])

  const handleOpenCreate = () => {
    setSelectedSkill(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (skill: SkillData) => {
    setSelectedSkill(skill)
    setIsModalOpen(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    const confirmDelete = window.confirm('Hapus keahlian ini?')
    if (!confirmDelete) return

    try {
      await apiClient.delete(`/skills/${id}`)
      await fetchSkills()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus keahlian')
    }
  }

  const handleSubmit = async (skillData: SkillData) => {
    // Sanitize metadata fields
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...cleanSkill } = skillData as any
    if (!cleanSkill.iconUrl || cleanSkill.iconUrl.trim() === '') {
      cleanSkill.iconUrl = null
    }

    if (selectedSkill?.id) {
      await apiClient.patch(`/skills/${selectedSkill.id}`, cleanSkill)
    } else {
      await apiClient.post('/skills', cleanSkill)
    }
    await fetchSkills()
  }

  const totalSkills = Object.values(groupedSkills).reduce((acc, curr) => acc + curr.length, 0)

  return (
    <div className="w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              // 03 . MANAJEMEN_KEAHLIAN ({totalSkills})
            </h2>
          </div>
          <p className="font-mono text-xs text-black/60 mt-0.5 uppercase">
            Kelola keahlian teknis terdistribusi dalam 5 kategori domain
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH KEAHLIAN</span>
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
            MEMUAT DATA KEAHLIAN...
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {(Object.keys(CATEGORY_LABELS) as SkillCategory[]).map((cat) => {
            const list = groupedSkills[cat] || []
            return (
              <div
                key={cat}
                className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-black/10">
                  <h3 className="font-mono text-xs font-black uppercase tracking-wider text-black">
                    {CATEGORY_LABELS[cat]} ({list.length})
                  </h3>
                </div>

                {list.length === 0 ? (
                  <span className="font-mono text-xs text-black/40 uppercase block">
                    Belum ada keahlian di kategori ini.
                  </span>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {list.map((skill) => (
                      <div
                        key={skill.id || skill.name}
                        className="border-2 border-black p-3 bg-white hover:bg-black/[0.02] flex items-center justify-between gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {skill.iconUrl ? (
                            <img
                              src={skill.iconUrl}
                              alt={skill.name}
                              className="w-6 h-6 object-contain shrink-0"
                            />
                          ) : (
                            <Sparkles className="w-4 h-4 text-black/50 shrink-0" />
                          )}
                          <span className="font-mono text-xs font-bold text-black truncate">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(skill)}
                            className="p-1 hover:bg-[#CCFF00] border border-black/30 cursor-pointer"
                            title="Edit"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(skill.id)}
                            className="p-1 hover:bg-red-500 hover:text-white border border-black/30 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <SkillFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedSkill}
        title={selectedSkill ? 'EDIT KEAHLIAN TEKNIS' : 'TAMBAH KEAHLIAN TEKNIS'}
      />
    </div>
  )
}

