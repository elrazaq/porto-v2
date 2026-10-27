import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LogOut, ArrowUpRight, FolderKanban, Briefcase, Wrench, Mail, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export type AdminTab = 'projects' | 'experiences' | 'skills' | 'inquiries'

interface AdminLayoutProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  unreadInquiriesCount?: number
  children: ReactNode
}

export function AdminLayout({
  activeTab,
  onTabChange,
  unreadInquiriesCount = 0,
  children,
}: AdminLayoutProps) {
  const { user, logout } = useAuth()

  const tabs: Array<{ id: AdminTab; label: string; icon: typeof FolderKanban; badge?: number }> = [
    { id: 'projects', label: 'PROYEK SHOWCASE', icon: FolderKanban },
    { id: 'experiences', label: 'PENGALAMAN KERJA', icon: Briefcase },
    { id: 'skills', label: 'KEAHLIAN TEKNIS', icon: Wrench },
    { id: 'inquiries', label: 'INBOX PESAN', icon: Mail, badge: unreadInquiriesCount },
  ]

  return (
    <div className="min-h-screen bg-[#F1FAEE] text-black selection:bg-[#CCFF00] selection:text-black">
      {/* Top Brutalist Navigation Bar */}
      <header className="w-full bg-white border-b-2 border-black px-4 sm:px-8 py-3.5 sticky top-0 z-40 shadow-[0_2px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Portal Label */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="w-9 h-9 bg-black text-[#CCFF00] border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] hover:text-black hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              title="Lihat Portofolio Publik"
            >
              AR
            </Link>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#CCFF00] border border-black inline-block" />
                <span className="font-mono text-xs font-black tracking-wider uppercase text-black">
                  ADMIN CMS PORTAL
                </span>
              </div>
              <span className="font-mono text-[10px] text-black/60 hidden sm:block uppercase">
                PORTFOLIO MANAGEMENT & NEON DATA CONTROL
              </span>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black/5 text-black border-2 border-black font-mono text-[11px] font-black uppercase transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
            >
              <span>LIHAT WEB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-black/5 border-2 border-black font-mono text-xs font-bold text-black">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span className="truncate max-w-[150px]">{user?.email}</span>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-black text-white border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">KELUAR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b-2 border-black pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-black uppercase border-2 border-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-[#CCFF00] shadow-[3px_3px_0px_0px_rgba(204,255,0,1)] translate-x-0.5 translate-y-0.5'
                    : 'bg-white text-black hover:bg-[#CCFF00]/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-none font-mono text-[10px] font-black border border-black ${
                      isActive ? 'bg-[#CCFF00] text-black' : 'bg-red-500 text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content Canvas */}
        <div className="w-full">{children}</div>
      </main>
    </div>
  )
}

