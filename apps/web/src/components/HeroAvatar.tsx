import { Sparkles } from 'lucide-react'

export interface HeroAvatarProps {
  statusText: string
  yearsText: string
}

export function HeroAvatar({ statusText, yearsText }: HeroAvatarProps) {
  return (
    <div className="relative mx-auto lg:mx-0 w-72 h-88 sm:w-80 sm:h-[400px] flex items-center justify-center select-none transition-transform duration-500 ease-out hover:scale-[1.02] group">
      {/* Ambient gradient glow behind portrait */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#1D3557]/40 via-[#457B9D]/30 to-[#E63946]/30 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Smooth gradient frame container */}
      <div className="relative w-full h-full p-[3px] rounded-3xl bg-gradient-to-br from-[#E63946]/60 via-[#457B9D] to-[#1D3557] shadow-2xl flex flex-col justify-end overflow-hidden">
        {/* Inner photo container with dark studio backdrop blending with cut-out photo */}
        <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#0A1118] relative flex items-end justify-center">
          <img
            src="/profile.jpg"
            alt="Abdul Razak, S.T."
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle bottom gradient to ground the portrait */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/80 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Floating Badge Top-Right: Specialized Experience */}
      <div className="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#457B9D]/30 shadow-lg shadow-[#1D3557]/10 flex items-center gap-2 transform transition-transform duration-300 group-hover:-translate-y-0.5">
        <Sparkles className="h-4 w-4 text-[#E63946]" />
        <span className="font-mono text-xs font-bold text-[#1D3557] tracking-tight">{yearsText}</span>
      </div>

      {/* Floating Badge Bottom-Left: Available for work with clean static green indicator */}
      <div className="absolute -bottom-3 -left-3 sm:-left-4 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#A8DADC] shadow-lg shadow-[#1D3557]/10 flex items-center gap-2.5 transform transition-transform duration-300 group-hover:translate-y-0.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0" />
        <span className="text-xs font-semibold text-[#1D3557] tracking-tight">{statusText}</span>
      </div>
    </div>
  )
}

