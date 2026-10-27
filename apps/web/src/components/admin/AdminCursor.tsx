import { useEffect, useState } from 'react'

export type AdminCursorType = 'default' | 'action' | 'input' | 'upload' | 'danger'

export function AdminCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [cursorType, setCursorType] = useState<AdminCursorType>('default')
  const [label, setLabel] = useState<string>('')
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  useEffect(() => {
    if (isTouch) return

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (!target) return

      // Danger actions
      if (
        target.closest('[data-variant="danger"]') ||
        target.closest('.text-red-600') ||
        target.closest('.text-red-500') ||
        target.closest('.bg-red-500') ||
        target.closest('.bg-red-600') ||
        target.closest('[data-cursor="danger"]')
      ) {
        setCursorType('danger')
        setLabel('WARN_DEL')
        return
      }

      // Upload / File Dropzones
      if (
        target.closest('[data-cursor="upload"]') ||
        target.closest('input[type="file"]') ||
        target.closest('label:has(input[type="file"])')
      ) {
        setCursorType('upload')
        setLabel('UPLOAD')
        return
      }

      // Text Input Fields
      if (
        target.closest(
          'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="file"])',
        ) ||
        target.closest('textarea') ||
        target.closest('[contenteditable="true"]')
      ) {
        setCursorType('input')
        setLabel('TYPE')
        return
      }

      // Interactive Action Buttons & Links
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('[role="tab"]') ||
        target.closest('input[type="checkbox"]') ||
        target.closest('input[type="radio"]') ||
        target.closest('[data-cursor="pointer"]') ||
        target.closest('[data-cursor="action"]')
      ) {
        setCursorType('action')
        setLabel('CLICK')
        return
      }

      // Default Canvas / Neutral
      setCursorType('default')
      setLabel('')
    }

    const onMouseDown = () => setIsMouseDown(true)
    const onMouseUp = () => setIsMouseDown(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible, isTouch])

  if (isTouch || !isVisible) return null

  // Dimension & styling configs per state
  let boxSizeClass = 'w-7 h-7'
  let borderColorClass = 'border-black'
  let badgeBgClass = 'bg-[#CCFF00] text-black'

  if (cursorType === 'action') {
    boxSizeClass = 'w-10 h-10'
    borderColorClass = 'border-black'
    badgeBgClass = 'bg-[#CCFF00] text-black'
  } else if (cursorType === 'input') {
    boxSizeClass = 'w-4 h-8'
    borderColorClass = 'border-black'
    badgeBgClass = 'bg-black text-white'
  } else if (cursorType === 'upload') {
    boxSizeClass = 'w-12 h-12'
    borderColorClass = 'border-black'
    badgeBgClass = 'bg-black text-[#CCFF00]'
  } else if (cursorType === 'danger') {
    boxSizeClass = 'w-10 h-10'
    borderColorClass = 'border-red-600'
    badgeBgClass = 'bg-red-500 text-white'
  }

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden="true"
    >
      {/* Outer Industrial Framing / CAD Corner Brackets */}
      <div
        className={`relative transition-all duration-150 ease-out flex items-center justify-center ${boxSizeClass} ${
          isMouseDown ? 'scale-75' : 'scale-100'
        }`}
      >
        {/* Top-Left Corner */}
        <span
          className={`absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 ${borderColorClass}`}
        />
        {/* Top-Right Corner */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 ${borderColorClass}`}
        />
        {/* Bottom-Left Corner */}
        <span
          className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 ${borderColorClass}`}
        />
        {/* Bottom-Right Corner */}
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 ${borderColorClass}`}
        />

        {/* Center Precision Reticle Core */}
        {cursorType === 'input' ? (
          <div className="w-0.5 h-4 bg-black animate-pulse" />
        ) : (
          <div
            className={`transition-all duration-150 ${
              cursorType === 'danger'
                ? 'w-2.5 h-2.5 bg-red-600 border border-black shadow-[1px_1px_0px_#000]'
                : cursorType === 'action'
                  ? 'w-2.5 h-2.5 bg-[#CCFF00] border border-black shadow-[1px_1px_0px_#000]'
                  : 'w-2 h-2 bg-[#CCFF00] border border-black'
            }`}
          />
        )}

        {/* Dynamic Contextual Monospace HUD Badge */}
        {label && (
          <div
            className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none ${badgeBgClass}`}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

