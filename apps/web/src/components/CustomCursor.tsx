import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'photo'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  useEffect(() => {
    if (isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      // Instant 1:1 hardware coordinate update, no lag
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      // Detect hover targets
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

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible, isTouch])

  if (isTouch || !isVisible) return null

  const isPhoto = cursorType === 'photo'
  const isLink = cursorType === 'link'

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      {/* Expanding indicator ring centered exactly on pointer tip */}
      <div
        className={`rounded-full transition-all duration-150 ease-out flex items-center justify-center ${
          isPhoto
            ? 'w-29 h-29 border-0 '
            : isLink
              ? 'w-11 h-11 bg-black/15 border border-black/50 backdrop-blur-[1px] scale-100'
              : 'w-3 h-3 bg-black shadow-xs'
        }`}
      />
    </div>
  )
}
