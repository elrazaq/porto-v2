import { useState, useEffect } from 'react'
import { Mail, Trash2, Eye, Loader2 } from 'lucide-react'
import { apiClient } from '../../lib/api-client'
import { InquiryViewModal, type InquiryData } from './InquiryViewModal'

interface InquiriesResponse {
  items: InquiryData[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
    unreadCount: number
  }
}

interface InquiriesManagerProps {
  onUnreadCountChange?: (count: number) => void
}

export function InquiriesManager({ onUnreadCountChange }: InquiriesManagerProps) {
  const [inquiries, setInquiries] = useState<InquiryData[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryData | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const fetchInquiries = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const endpoint =
        filter === 'unread'
          ? '/inquiries?isRead=false'
          : '/inquiries'

      const res = await apiClient.get<InquiriesResponse>(endpoint)
      if (res) {
        let items = res.items || []
        if (filter === 'archived') {
          items = items.filter((i) => i.isArchived)
        } else if (filter === 'all') {
          items = items.filter((i) => !i.isArchived)
        }
        setInquiries(items)
        setUnreadCount(res.meta?.unreadCount || 0)
        if (onUnreadCountChange) onUnreadCountChange(res.meta?.unreadCount || 0)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat pesan masuk')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchInquiries()
  }, [filter])

  const handleOpenView = async (inquiry: InquiryData) => {
    setSelectedInquiry(inquiry)
    setIsViewModalOpen(true)
    if (!inquiry.isRead) {
      try {
        await apiClient.patch(`/inquiries/${inquiry.id}/read`)
        setInquiries((prev) =>
          prev.map((i) => (i.id === inquiry.id ? { ...i, isRead: true } : i)),
        )
        const newUnread = Math.max(0, unreadCount - 1)
        setUnreadCount(newUnread)
        if (onUnreadCountChange) onUnreadCountChange(newUnread)
      } catch {
        // ignore
      }
    }
  }

  const handleMarkRead = async (id: string) => {
    try {
      await apiClient.patch(`/inquiries/${id}/read`)
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)),
      )
      const newUnread = Math.max(0, unreadCount - 1)
      setUnreadCount(newUnread)
      if (onUnreadCountChange) onUnreadCountChange(newUnread)
      if (selectedInquiry) setSelectedInquiry({ ...selectedInquiry, isRead: true })
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menandai pesan')
    }
  }

  const handleToggleArchive = async (id: string) => {
    try {
      await apiClient.patch(`/inquiries/${id}/archive`)
      await fetchInquiries()
      setIsViewModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal mengarsipkan pesan')
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus pesan ini secara permanen?')
    if (!confirmDelete) return

    try {
      await apiClient.delete(`/inquiries/${id}`)
      setInquiries((prev) => prev.filter((i) => i.id !== id))
      setIsViewModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Gagal menghapus pesan')
    }
  }

  return (
    <div className="w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              // 04 . KOTAK_MASUK_PESAN ({inquiries.length})
            </h2>
          </div>
          <p className="font-mono text-xs text-black/60 mt-0.5 uppercase">
            Pesan kontak dari pengunjung portofolio via form publik
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 border-2 border-black p-1 bg-white">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase transition-all cursor-pointer ${
              filter === 'all' ? 'bg-black text-[#CCFF00]' : 'hover:bg-black/5 text-black'
            }`}
          >
            SEMUA
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              filter === 'unread' ? 'bg-black text-[#CCFF00]' : 'hover:bg-black/5 text-black'
            }`}
          >
            <span>BELUM DIBACA</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilter('archived')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase transition-all cursor-pointer ${
              filter === 'archived' ? 'bg-black text-[#CCFF00]' : 'hover:bg-black/5 text-black'
            }`}
          >
            ARSIP
          </button>
        </div>
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
            MEMUAT PESAN MASUK DARI DATABASE...
          </span>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="p-12 text-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <Mail className="w-8 h-8 mx-auto mb-2 text-black/40" />
          <span className="font-mono text-xs font-black uppercase text-black/60 block">
            TIDAK ADA PESAN PADA KATEGORI INI.
          </span>
        </div>
      ) : (
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] divide-y-2 divide-black/10">
          {inquiries.map((inq) => {
            const dateStr = new Date(inq.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })

            return (
              <div
                key={inq.id}
                onClick={() => handleOpenView(inq)}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-black/[0.03] transition-colors ${
                  !inq.isRead ? 'bg-[#CCFF00]/10 font-bold' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 overflow-hidden">
                  <div className="shrink-0 mt-0.5 sm:mt-0">
                    {!inq.isRead ? (
                      <span className="inline-block w-2.5 h-2.5 bg-[#CCFF00] border border-black" title="Belum dibaca" />
                    ) : (
                      <span className="inline-block w-2.5 h-2.5 bg-black/20" title="Sudah dibaca" />
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="font-mono text-xs font-black text-black">{inq.name}</span>
                      <span className="font-mono text-[10px] text-black/50">({inq.email})</span>
                    </div>
                    <p className="font-mono text-xs text-black/80 truncate max-w-lg">
                      {inq.subject ? `[${inq.subject}] ` : ''}
                      {inq.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10">
                  <span className="font-mono text-[10px] text-black/60">{dateStr}</span>
                  <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleOpenView(inq)}
                      className="p-1.5 border border-black bg-white hover:bg-[#CCFF00] text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                      title="Lihat Detail Pesan"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(inq.id)}
                      className="p-1.5 border border-black bg-red-500 hover:bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
                      title="Hapus Pesan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Inquiry Detail View Modal */}
      <InquiryViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        inquiry={selectedInquiry}
        onMarkRead={handleMarkRead}
        onToggleArchive={handleToggleArchive}
        onDelete={handleDelete}
      />
    </div>
  )
}
