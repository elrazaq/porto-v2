import { type HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'ice' | 'accent' | 'navy' | 'neutral'
}

export function Badge({ variant = 'ice', className = '', children, ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center font-mono text-xs px-2.5 py-1 rounded-md font-medium tracking-tight transition-colors'

  const variantStyles = {
    ice: 'bg-[#A8DADC]/30 text-[#1D3557] border border-[#A8DADC]/50',
    accent: 'bg-[#E63946]/10 text-[#E63946] border border-[#E63946]/20',
    navy: 'bg-[#1D3557] text-[#F1FAEE]',
    neutral: 'bg-black/5 text-[#457B9D] border border-black/10',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}

