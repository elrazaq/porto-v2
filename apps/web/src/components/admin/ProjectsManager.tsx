import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { apiClient } from '../../lib/api-client'
import { ProjectFormModal, type ProjectData } from './ProjectFormModal'
import { type UploadedMediaItem } from './CloudinaryUploader'

export function ProjectsManager() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await apiClient.get<ProjectData[]>('/projects/admin/all')
      setProjects(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data proyek')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchProjects()
  }, [])

  const handleOpenCreate = () => {
    setSelectedProject(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus proyek ini beserta seluruh galeri gambarnya?',
    )
    if (!confirmDelete) return

    try {
      await apiClient.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus proyek')
    }
  }

  const handleSubmit = async (projectData: ProjectData, galleryItems: UploadedMediaItem[]) => {
    // Sanitize payload: strip system metadata and empty strings (Ponytail: lean & robust)
    const {
      id: _id,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      images: _images,
      ...rawClean
    } = projectData as any

    const cleanPayload = { ...rawClean }
    if (!cleanPayload.repoUrl || cleanPayload.repoUrl.trim() === '') {
      delete cleanPayload.repoUrl
    }
    if (!cleanPayload.thumbnailPublicId || cleanPayload.thumbnailPublicId.trim() === '') {
      delete cleanPayload.thumbnailPublicId
    }

    if (selectedProject?.id) {
      // Update existing project
      await apiClient.patch(`/projects/${selectedProject.id}`, cleanPayload)

      // Sync gallery images: add any new ones
      for (const item of galleryItems) {
        const alreadyExists = selectedProject.images?.some((img) => img.url === item.url)
        if (!alreadyExists && item.url) {
          await apiClient.post(`/projects/${selectedProject.id}/images`, {
            url: item.url,
            publicId: item.publicId,
            caption: item.caption,
            sortOrder: item.sortOrder,
          })
        }
      }
    } else {
      // Create new project
      const created = await apiClient.post<ProjectData>('/projects', cleanPayload)

      // Add gallery images to newly created project
      if (created?.id && galleryItems.length > 0) {
        for (const item of galleryItems) {
          await apiClient.post(`/projects/${created.id}/images`, {
            url: item.url,
            publicId: item.publicId,
            caption: item.caption,
            sortOrder: item.sortOrder,
          })
        }
      }
    }

    await fetchProjects()
  }

  return (
    <div className="w-full text-left">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              // 01 . MANAJEMEN_PROYEK ({projects.length})
            </h2>
          </div>
          <p className="font-mono text-xs text-black/60 mt-0.5 uppercase">
            Kelola showcase, deskripsi markdown, link GitHub, dan galeri Cloudinary
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PROYEK BARU</span>
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
            MEMUAT DATA PROYEK DARI NEON DB...
          </span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-mono text-xs font-black uppercase text-black/60 block mb-3">
            BELUM ADA PROYEK TERDAFTAR DI DATABASE.
          </span>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-black text-[#CCFF00] font-mono text-xs font-black uppercase border-2 border-black"
          >
            + BUAT PROYEK PERTAMA
          </button>
        </div>
      ) : (
        /* Projects Table - Brutalist Modern */
        <div className="overflow-x-auto border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white font-mono text-xs uppercase tracking-wider border-b-2 border-black">
                <th className="p-3">THUMBNAIL</th>
                <th className="p-3">JUDUL & SLUG</th>
                <th className="p-3">TECH STACK</th>
                <th className="p-3 text-center">GALERI</th>
                <th className="p-3 text-center">STATUS</th>
                <th className="p-3 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/10 font-mono text-xs">
              {projects.map((proj) => (
                <tr key={proj.id || proj.slug} className="hover:bg-black/[0.02] transition-colors">
                  <td className="p-3">
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-16 h-12 object-cover border border-black bg-black/5"
                    />
                  </td>
                  <td className="p-3 max-w-xs">
                    <span className="font-black text-black block truncate">{proj.title}</span>
                    <span className="text-[10px] text-black/60 block">/{proj.slug}</span>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack?.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 bg-black/5 border border-black/30 text-[9px] font-bold"
                        >
                          {t}
                        </span>
                      ))}
                      {(proj.techStack?.length || 0) > 3 && (
                        <span className="text-[9px] text-black/50">
                          +{(proj.techStack?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/5 border border-black font-bold text-[10px]">
                      <ImageIcon className="w-3 h-3" />
                      <span>{proj.images?.length || 0}</span>
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {proj.isPublished ? (
                      <span className="px-2 py-0.5 bg-[#CCFF00] border border-black text-black font-black text-[10px] uppercase">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-200 border border-black text-black/70 font-bold text-[10px] uppercase">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 border border-black bg-white hover:bg-[#CCFF00] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                        title="Edit Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 border border-black bg-red-500 hover:bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Project Form Modal */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedProject}
        title={selectedProject ? 'EDIT PROYEK PORTOFOLIO' : 'TAMBAH PROYEK BARU'}
      />
    </div>
  )
}
