import { X, Mail, Archive, CheckCircle2, Trash2 } from 'lucide-react'

export interface InquiryData {
  id: string
  name: string
  email: string
  subject?: string | null
  message: string
  isRead: boolean
  isArchived: boolean
  ipAddress?: string | null
  createdAt: string
}

interface InquiryViewModalProps {
  isOpen: boolean
  onClose: () => void
  inquiry: InquiryData | null
  onMarkRead: (id: string) => Promise<void>
  onToggleArchive: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export function InquiryViewModal({
  isOpen,
  onClose,
  inquiry,
  onMarkRead,
  onToggleArchive,
  onDelete,
}: InquiryViewModalProps) {
  if (!isOpen || !inquiry) return null

  const formattedDate = new Date(inquiry.createdAt).toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white border-2 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#CCFF00] border border-black" />
            <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
              DETAIL PESAN MASUK
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

        {/* Sender Info Card */}
        <div className="border-2 border-black bg-black/[0.02] p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div>
              <span className="text-black/60 block uppercase">PENGIRIM:</span>
              <span className="font-black text-black text-sm">{inquiry.name}</span>
            </div>
            <div>
              <span className="text-black/60 block uppercase">EMAIL:</span>
              <a
                href={`mailto:${inquiry.email}`}
                className="font-black text-[#1D3557] hover:underline"
              >
                {inquiry.email}
              </a>
            </div>
            <div>
              <span className="text-black/60 block uppercase">WAKTU TERIMA:</span>
              <span className="font-bold text-black">{formattedDate}</span>
            </div>
            <div>
              <span className="text-black/60 block uppercase">IP ADDRESS:</span>
              <span className="font-bold text-black">{inquiry.ipAddress || 'UNKNOWN_IP'}</span>
            </div>
          </div>
        </div>

        {/* Subject */}
        {inquiry.subject && (
          <div className="mb-4">
            <span className="font-mono text-xs font-black uppercase text-black/60 block mb-1">
              SUBJEK:
            </span>
            <div className="border-2 border-black bg-white p-2.5 font-mono text-xs font-bold text-black">
              {inquiry.subject}
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="mb-6">
          <span className="font-mono text-xs font-black uppercase text-black/60 block mb-1">
            ISI PESAN:
          </span>
          <div className="border-2 border-black bg-white p-4 font-mono text-xs text-black leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {inquiry.message}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-black">
          <div className="flex items-center gap-2">
            {!inquiry.isRead && (
              <button
                type="button"
                onClick={() => onMarkRead(inquiry.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#CCFF00] hover:bg-black hover:text-[#CCFF00] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>TANDAI SUDAH DIBACA</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleArchive(inquiry.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black/10 text-black border-2 border-black font-mono text-xs font-black uppercase transition-all cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>{inquiry.isArchived ? 'BATALKAN ARSIP' : 'ARSIPKAN'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${inquiry.email}?subject=Re: ${encodeURIComponent(inquiry.subject || 'Balasan Portofolio')}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-[#CCFF00] border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-none transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>BALAS EMAIL</span>
            </a>

            <button
              type="button"
              onClick={() => onDelete(inquiry.id)}
              className="p-2 bg-red-600 hover:bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer"
              title="Hapus Pesan"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
