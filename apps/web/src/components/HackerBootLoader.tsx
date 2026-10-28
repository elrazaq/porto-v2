import { useState, useEffect } from 'react'

// In-memory module flag: resets to false only on full page load / F5 refresh,
// preserving seamless instantaneous SPA routing across internal links.
let hasBootedInThisWindow = false

const BOOT_LOGS = [
  'KERNEL_INIT_V2.6 // BOOTING ARCHITECTURE...',
  'MOUNTING BRUTALIST HARDWARE RETICLE CURSOR...',
  'ESTABLISHING SECURE PIPELINE TO NEON POSTGRESQL...',
  'VERIFYING CLOUDINARY CDN MEDIA ENGINE...',
  'SYNCHRONIZING PORTFOLIO ASSETS & SHOWCASE...',
  'ALL SYSTEMS OPERATIONAL. UNLOCKING INTERFACE...',
]

export function HackerBootLoader() {
  const [shouldRender, setShouldRender] = useState(() => !hasBootedInThisWindow)
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    if (hasBootedInThisWindow) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        return next
      })
    }, 45)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hasBootedInThisWindow) return

    // Update terminal log stream progressively
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev))
    }, 180)

    return () => clearInterval(logInterval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      hasBootedInThisWindow = true
      const timer = setTimeout(() => {
        setIsFadingOut(true)
        const unmountTimer = setTimeout(() => {
          setShouldRender(false)
        }, 300)
        return () => clearTimeout(unmountTimer)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [progress])

  if (!shouldRender) return null

  // Calculate ASCII-style progress blocks
  const totalBlocks = 24
  const filledBlocks = Math.round((progress / 100) * totalBlocks)
  const blockString = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks)

  return (
    <div
      className={`fixed inset-0 z-[999999] bg-[#0A0A0A] text-[#CCFF00] flex flex-col justify-between p-6 sm:p-10 select-none font-mono transition-transform duration-300 ease-in-out ${
        isFadingOut ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      aria-label="System Boot Terminal"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CCFF00] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#CCFF00] animate-ping inline-block" />
          <span className="font-black tracking-widest uppercase">
            // [TERMINAL_INIT] :: ABDUL RAZAK, S.T. PORTFOLIO
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#CCFF00]/80">
          <span>MEM: 64MB OK</span>
          <span>NEON: LINKED</span>
          <span>BUILD: M4.3</span>
        </div>
      </div>

      {/* Center Console & Progress Bar */}
      <div className="w-full max-w-2xl mx-auto my-auto text-left">
        <div className="border-2 border-[#CCFF00] bg-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#CCFF00]">
          {/* Header Title */}
          <div className="flex items-baseline justify-between mb-4 border-b border-[#CCFF00]/40 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-white">
              INITIALIZING SYSTEM ENVIRONMENT
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#CCFF00]">
              {progress}%
            </span>
          </div>

          {/* Dynamic Log Stream */}
          <div className="h-28 overflow-hidden text-xs space-y-1 mb-6 text-[#CCFF00]/90">
            {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-white">&gt;</span>
                <span className={i === logIndex ? 'font-black text-white' : ''}>{log}</span>
                {i < logIndex && <span className="text-[#CCFF00] font-bold">[OK]</span>}
              </div>
            ))}
          </div>

          {/* ASCII Progress Line */}
          <div className="text-xs font-black tracking-widest text-[#CCFF00] mb-2 truncate">
            [{blockString}]
          </div>

          {/* Horizontal Brutalist Progress Bar */}
          <div className="w-full h-6 border-2 border-[#CCFF00] bg-zinc-950 p-0.5 shadow-[4px_4px_0px_0px_#CCFF00]">
            <div
              className="h-full bg-[#CCFF00] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Terminal Footer */}
      <div className="flex items-center justify-between border-t-2 border-[#CCFF00] pt-3 text-[10px] text-[#CCFF00]/70">
        <span>STATUS: MOUNTING_CORE_MODULES</span>
        <span className="animate-pulse">_CURSOR_READY</span>
      </div>
    </div>
  )
}

