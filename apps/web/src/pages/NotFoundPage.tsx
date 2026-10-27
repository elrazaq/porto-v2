import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { CustomCursor } from '../components/CustomCursor'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F1FAEE] flex flex-col items-center justify-center px-4 text-center">
      <CustomCursor />
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#457B9D]/20 shadow-xs">
        <span className="text-6xl font-extrabold font-mono text-[#E63946] block mb-2">404</span>
        <h1 className="text-2xl font-bold text-[#1D3557]">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-[#457B9D] mt-2 mb-6">
          Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau tautan yang Anda masukkan salah.
        </p>

        <Link to="/">
          <Button variant="primary" size="md" className="rounded-xl w-full">
            <Home className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

