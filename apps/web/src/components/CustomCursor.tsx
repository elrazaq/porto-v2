import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'photo'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  useEffect(() => {
    // Disable on touch devices
    if (isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      // Check if target or parent is inside a photo reveal container
      if (target.closest('[data-cursor="photo"]')) {
        setCursorType('photo')
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setCursorType('link')
      } else {
        setCursorType('default')
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible, isTouch])

  if (isTouch || !isVisible) return null

  // Styles based on cursor state
  const isPhoto = cursorType === 'photo'
  const isLink = cursorType === 'link'

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
          isPhoto
            ? 'w-28 h-28 border-2 border-black/80 bg-white/10 backdrop-blur-[1px] shadow-lg'
            : isLink
              ? 'w-12 h-12 bg-black/15 border border-black/40 backdrop-blur-xs scale-100'
              : 'w-3 h-3 bg-black'
        }`}
      >
        {isPhoto && (
          <span className="font-mono text-[9px] font-bold text-black bg-white/90 px-1.5 py-0.5 rounded shadow-xs tracking-wider uppercase">
            COLOR
          </span>
        )}
      </div>
    </div>
  )
}
