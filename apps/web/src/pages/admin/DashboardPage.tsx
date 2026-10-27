import { FolderKanban, LogOut, MessageSquare, Sparkles, User, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'

export function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-[#1D3557]">
      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[#457B9D]/20 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="h-8 w-8 rounded-lg bg-[#1D3557] text-[#F1FAEE] flex items-center justify-center font-bold text-xs hover:bg-[#E63946] transition-colors">
            AR
          </Link>
          <span className="font-bold text-sm text-[#1D3557]">Admin CMS Portal</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#457B9D] bg-[#F1FAEE] px-3 py-1.5 rounded-lg border border-[#457B9D]/20">
            <User className="h-3.5 w-3.5 text-[#1D3557]" />
            <span>{user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => logout()} className="rounded-lg">
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar</span>
          </Button>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1D3557]">Overview & Kontrol Konten</h1>
          <p className="text-sm text-[#457B9D] mt-1">
            Selamat datang, <span className="font-semibold text-[#1D3557]">{user?.name || user?.email}</span>. Gunakan panel ini untuk mengelola showcase portofolio.
          </p>
        </div>

        {/* Quick Modules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#457B9D]/20 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-3">
              <FolderKanban className="h-5 w-5 text-[#E63946]" />
            </div>
            <h3 className="font-bold text-base text-[#1D3557]">Projects</h3>
            <p className="text-xs text-[#457B9D] mt-1">Kelola proyek, thumbnail, & galeri Cloudinary.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#457B9D]/20 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-3">
              <Sparkles className="h-5 w-5 text-[#457B9D]" />
            </div>
            <h3 className="font-bold text-base text-[#1D3557]">Experiences</h3>
            <p className="text-xs text-[#457B9D] mt-1">Kelola riwayat karir dan pencapaian.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#457B9D]/20 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-3">
              <Wrench className="h-5 w-5 text-[#457B9D]" />
            </div>
            <h3 className="font-bold text-base text-[#1D3557]">Skills</h3>
            <p className="text-xs text-[#457B9D] mt-1">Kelola keahlian teknis per kategori.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#457B9D]/20 shadow-xs">
            <div className="h-10 w-10 rounded-xl bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] mb-3">
              <MessageSquare className="h-5 w-5 text-[#E63946]" />
            </div>
            <h3 className="font-bold text-base text-[#1D3557]">Inquiries</h3>
            <p className="text-xs text-[#457B9D] mt-1">Baca pesan masuk dari pengunjung web.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#457B9D]/20 text-center py-12">
          <p className="text-sm font-medium text-[#457B9D]">
            Fondasi CMS telah aktif (M1). Fitur interaktif CRUD dan uploader foto Cloudinary akan diimplementasikan pada Milestone M4.
          </p>
        </div>
      </main>
    </div>
  )
}

