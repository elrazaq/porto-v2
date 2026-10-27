import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-[0.98]'

    const variantStyles = {
      primary:
        'bg-[#E63946] text-white hover:bg-[#d52b38] shadow-sm hover:shadow-md hover:shadow-[#E63946]/20',
      secondary:
        'bg-[#457B9D] text-white hover:bg-[#386b8a] shadow-sm hover:shadow-md hover:shadow-[#457B9D]/20',
      outline:
        'border border-[#1D3557]/20 text-[#1D3557] hover:bg-[#1D3557]/5 hover:border-[#1D3557]/40',
      ghost:
        'text-[#1D3557] hover:bg-[#1D3557]/5',
    }

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-6 py-2.5 gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

