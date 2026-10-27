import { useEffect, useRef } from 'react'

export function HackerStreamCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const chars = '0101<>/{};:=*+λπ_#?!'
    const fontSize = 11

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 360
      canvas.height = canvas.parentElement?.clientHeight || 360
    }
    resize()

    const cols = Math.floor(canvas.width / fontSize)
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -30))

    const draw = () => {
      // Gentle fade out of previous frames
      ctx.fillStyle = 'rgba(241, 250, 238, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = 'rgba(29, 53, 87, 0.22)'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        if (y > 0) {
          // Occasionally highlight lead character with lime/cyan
          if (Math.random() > 0.94) {
            ctx.fillStyle = 'rgba(204, 255, 0, 0.7)'
          } else {
            ctx.fillStyle = 'rgba(29, 53, 87, 0.25)'
          }
          ctx.fillText(text, x, y)
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className={`absolute inset-0 rounded-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        maskImage: 'radial-gradient(circle, black 35%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 72%)',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
