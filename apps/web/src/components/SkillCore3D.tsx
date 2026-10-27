import { useState, useRef, useEffect, useCallback } from 'react'
import { Cpu } from 'lucide-react'
import { HackerStreamCanvas } from './HackerStreamCanvas'
import {
  FlutterIcon,
  NestIcon,
  NextIcon,
  NuxtIcon,
  PrismaIcon,
  ReactIcon,
  ViteIcon,
  VueIcon,
} from './icons/TechIcons'

interface SkillNode {
  id: string
  label: string
  category: string
  x: number
  y: number
  z: number
}

const SKILL_NODES: SkillNode[] = [
  { id: 'react', label: 'React 19', category: 'Frontend Core', x: 0, y: -100, z: 20 },
  { id: 'next', label: 'Next.js 15', category: 'Fullstack SSR', x: 95, y: -40, z: -30 },
  { id: 'vue', label: 'Vue 3', category: 'Progressive UI', x: -95, y: -30, z: 40 },
  { id: 'nuxt', label: 'Nuxt.js', category: 'Universal Vue', x: 80, y: 55, z: 50 },
  { id: 'vite', label: 'Vite', category: 'Next-gen Bundler', x: -80, y: 60, z: -40 },
  { id: 'prisma', label: 'Prisma', category: 'Type-safe ORM', x: 0, y: 105, z: -20 },
  { id: 'nestjs', label: 'NestJS', category: 'Enterprise Backend', x: 100, y: 20, z: -60 },
  { id: 'mobile', label: 'Flutter / Mobile', category: 'Cross-Platform', x: -95, y: 20, z: -70 },
]

export function SkillCore3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(-15)
  const [rotY, setRotY] = useState(25)
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotX: -15, rotY: 25 })
  const autoRotateRef = useRef(true)

  // Smooth continuous idle rotation
  useEffect(() => {
    let animId: number
    const loop = () => {
      if (autoRotateRef.current) {
        setRotY((y) => (y + 0.35) % 360)
        setRotX(() => Math.sin(Date.now() / 2500) * 12 - 10)
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    autoRotateRef.current = false
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y
      setRotY(dragStart.rotY + dx * 0.5)
      setRotX(Math.max(-55, Math.min(55, dragStart.rotX - dy * 0.5)))
    },
    [isDragging, dragStart]
  )

  const handlePointerUp = () => {
    setIsDragging(false)
    setTimeout(() => {
      autoRotateRef.current = true
    }, 3500)
  }

  return (
    <div className="relative w-full max-w-[440px] aspect-square flex flex-col items-center justify-center select-none touch-none">
      {/* Hacker / Matrix Rain Canvas in borderless circular background */}
      <HackerStreamCanvas className="w-full h-full" />

      {/* 3D Scene Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center [perspective:900px] z-10 ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Orbit Rings (CSS 3D) */}
        <div
          className="relative w-64 h-64 [transform-style:preserve-3d] transition-transform duration-75"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Wireframe Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#1D3557]/20 [transform:rotateX(75deg)] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-dashed border-[#457B9D]/20 [transform:rotateY(60deg)] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-black/10 [transform:rotateZ(45deg)] pointer-events-none" />

          {/* Central Dev Core Hub */}
          <div className="absolute inset-0 m-auto w-24 h-24 rounded-2xl bg-[#121B24] shadow-2xl border border-white/20 flex flex-col items-center justify-center text-white [transform-style:preserve-3d] transform hover:scale-105 transition-transform">
            <Cpu className="w-8 h-8 text-[#CCFF00]" />
            <span className="font-mono text-[10px] font-black tracking-widest mt-1 text-white">
              DEV.CORE
            </span>
            <span className="text-[8px] font-mono text-[#CCFF00]">FULLSTACK</span>
          </div>

          {/* Satellite Skill Nodes with Authentic SVG Logos */}
          {SKILL_NODES.map((node) => {
            const isSelected = activeSkill?.id === node.id
            return (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveSkill(node)
                }}
                className="absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 cursor-pointer [transform-style:preserve-3d] group"
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                }}
              >
                {/* Node Pill button with authentic SVG logo */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-md transition-all duration-300 [transform-style:preserve-3d] ${
                    isSelected
                      ? 'bg-black text-white border-[#CCFF00] scale-125 shadow-xl'
                      : 'bg-white/95 text-[#1D3557] border-black/15 hover:scale-115 hover:border-black/40'
                  }`}
                  style={{
                    transform: `rotateY(${-rotY}deg) rotateX(${-rotX}deg)`,
                  }}
                >
                  {node.id === 'react' && <ReactIcon className="w-6 h-6" />}
                  {node.id === 'next' && <NextIcon className="w-6 h-6" />}
                  {node.id === 'vue' && <VueIcon className="w-6 h-6" />}
                  {node.id === 'nuxt' && <NuxtIcon className="w-6 h-6" />}
                  {node.id === 'vite' && <ViteIcon className="w-6 h-6" />}
                  {node.id === 'prisma' && <PrismaIcon className="w-6 h-6" />}
                  {node.id === 'nestjs' && <NestIcon className="w-6 h-6" />}
                  {node.id === 'mobile' && <FlutterIcon className="w-6 h-6" />}
                </div>

                {/* Always-readable Skill Label Tag */}
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                  style={{
                    transform: `rotateY(${-rotY}deg) rotateX(${-rotX}deg)`,
                  }}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight shadow-xs ${
                      isSelected
                        ? 'bg-black text-[#CCFF00]'
                        : 'bg-white/95 text-black border border-black/10'
                    }`}
                  >
                    {node.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
