import { type HTMLAttributes } from 'react'

export interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  statusText?: string
}

export function StatusBadge({ statusText = 'Available for work', className = '', ...props }: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#1D3557]/10 text-xs font-medium text-[#1D3557] shadow-xs backdrop-blur-xs ${className}`}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>{statusText}</span>
    </div>
  )
}

