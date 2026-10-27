import { useState, useRef, type ChangeEvent, type DragEvent } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { apiClient } from '../../lib/api-client'

export interface UploadedMediaItem {
  publicId?: string
  url: string
  caption?: string
  sortOrder?: number
}

interface CloudinaryUploaderProps {
  mode?: 'single' | 'multi'
  folder?: string
  currentUrl?: string
  currentPublicId?: string
  galleryItems?: UploadedMediaItem[]
  onSingleSuccess?: (result: { url: string; publicId: string }) => void
  onGallerySuccess?: (items: UploadedMediaItem[]) => void
  onRemoveSingle?: () => void
  onRemoveGalleryItem?: (index: number) => void
  label?: string
}

export function CloudinaryUploader({
  mode = 'single',
  folder = 'portfolio',
  currentUrl,
  galleryItems = [],
  onSingleSuccess,
  onGallerySuccess,
  onRemoveSingle,
  onRemoveGalleryItem,
  label = 'UNGGAH MEDIA',
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void processFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      void processFiles(Array.from(e.target.files))
    }
  }

  const processFiles = async (files: File[]) => {
    setError(null)
    setIsUploading(true)

    try {
      if (mode === 'single') {
        const file = files[0]
        const formData = new FormData()
        formData.append('file', file)

        const res = await apiClient.post<{ secureUrl: string; publicId: string }>(
          `/media/upload?folder=${encodeURIComponent(folder)}`,
          formData,
        )

        if (res && res.secureUrl && onSingleSuccess) {
          onSingleSuccess({ url: res.secureUrl, publicId: res.publicId })
        }
      } else {
        const formData = new FormData()
        files.forEach((f) => {
          formData.append('files', f)
        })

        const res = await apiClient.post<
          Array<{ secureUrl: string; publicId: string; caption?: string; sortOrder?: number }>
        >(`/media/upload-gallery?folder=${encodeURIComponent(folder)}`, formData)

        if (Array.isArray(res) && onGallerySuccess) {
          const newItems: UploadedMediaItem[] = res.map((r, i) => ({
            url: r.secureUrl,
            publicId: r.publicId,
            caption: r.caption || files[i]?.name,
            sortOrder: galleryItems.length + i,
          }))
          onGallerySuccess([...galleryItems, ...newItems])
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengunggah media ke Cloudinary')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full text-left">
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-xs font-black uppercase tracking-wider text-black">
          {label}
        </label>
        <span className="font-mono text-[10px] text-black/60 uppercase">
          {mode === 'single' ? 'SINGLE ASSET (MAX 5MB)' : 'MULTI GALLERY (MAX 10 FOTO)'}
        </span>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-red-100 border-2 border-black text-xs font-mono text-red-900 font-bold">
          [UPLOAD_ERROR]: {error}
        </div>
      )}

      {/* Mode Single Display */}
      {mode === 'single' && currentUrl ? (
        <div className="relative border-2 border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={currentUrl}
              alt="Preview"
              className="w-16 h-16 object-cover border-2 border-black shrink-0 bg-black/5"
            />
            <div className="overflow-hidden">
              <span className="font-mono text-xs font-black text-black block truncate max-w-xs">
                {currentUrl}
              </span>
              <span className="font-mono text-[10px] text-[#2B9348] font-bold block uppercase">
                ✓ CLOUDINARY_HOSTED
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveSingle}
            className="p-2 bg-red-500 hover:bg-black text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            title="Hapus Media"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Drag and Drop Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed border-black p-6 text-center cursor-pointer transition-colors ${
            isDragging ? 'bg-[#CCFF00]/20' : 'bg-white hover:bg-black/[0.02]'
          } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            multiple={mode === 'multi'}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-black animate-spin" />
                <span className="font-mono text-xs font-black uppercase text-black">
                  UPLOADING TO CLOUDINARY...
                </span>
              </>
            ) : (
              <>
                <div className="w-10 h-10 border-2 border-black bg-[#CCFF00] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Upload className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black uppercase text-black block">
                    KLIK ATAU TARIK BERKAS GAMBAR KE SINI
                  </span>
                  <span className="font-mono text-[10px] text-black/60 uppercase block mt-0.5">
                    JPG, PNG, WEBP, ATAU SVG
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Multi Mode Gallery Grid Preview */}
      {mode === 'multi' && galleryItems.length > 0 && (
        <div className="mt-4">
          <span className="font-mono text-xs font-black uppercase text-black mb-2 block">
            GALERI FOTO TERUNGGAH ({galleryItems.length})
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {galleryItems.map((item, idx) => (
              <div
                key={item.url + idx}
                className="relative border-2 border-black bg-white p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group"
              >
                <img
                  src={item.url}
                  alt={item.caption || `Gallery ${idx + 1}`}
                  className="w-full h-24 object-cover border border-black mb-1.5"
                />
                <span className="font-mono text-[10px] text-black font-bold block truncate">
                  {item.caption || `Foto #${idx + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveGalleryItem && onRemoveGalleryItem(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-600 text-white border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all cursor-pointer"
                  title="Hapus dari galeri"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
