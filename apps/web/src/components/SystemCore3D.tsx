import { useState, useRef, useEffect, useCallback } from 'react'
import { Activity, Cpu, Database, Network, Shield, Sparkles } from 'lucide-react'

interface NodeItem {
  id: string
  label: string
  role: string
  metric: string
  x: number
  y: number
  z: number
  color: string
}

const NODES: NodeItem[] = [
  { id: 'simrs', label: 'SIMRS Core', role: 'Hospital System', metric: '99.98% Uptime', x: 0, y: -90, z: 20, color: '#E63946' },
  { id: 'ai', label: 'AI S.O.A.P.I.E', role: 'Clinical Parser', metric: '<120ms Latency', x: 95, y: -20, z: -40, color: '#457B9D' },
  { id: 'postgres', label: 'PostgreSQL', role: 'Distributed DB', metric: 'Multi-Region Replica', x: -85, y: 30, z: 50, color: '#1D3557' },
  { id: 'nextjs', label: 'Next.js 15', role: 'Frontend Gateway', metric: '100 Core Web Vitals', x: 80, y: 70, z: 60, color: '#10B981' },
  { id: 'bpjs', label: 'BPJS Bridging', role: 'FHIR / VClaim API', metric: 'Regional Interop', x: -90, y: -60, z: -30, color: '#E63946' },
  { id: 'redis', label: 'Redis Cache', role: 'Real-time State', metric: 'Sub-millisecond Ops', x: 0, y: 95, z: -50, color: '#F59E0B' },
]

export function SystemCore3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [rotX, setRotX] = useState(-15)
  const [rotY, setRotY] = useState(25)
  const [activeNode, setActiveNode] = useState<NodeItem>(NODES[0])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotX: -15, rotY: 25 })
  const autoRotateRef = useRef(true)

  // Gentle idle rotation when not dragging
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

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    setRotY(dragStart.rotY + dx * 0.5)
    setRotX(Math.max(-55, Math.min(55, dragStart.rotX - dy * 0.5)))
  }, [isDragging, dragStart])

  const handlePointerUp = () => {
    setIsDragging(false)
    setTimeout(() => {
      autoRotateRef.current = true
    }, 4000)
  }

  return (
    <div className="relative w-full max-w-[420px] aspect-square flex flex-col items-center justify-center select-none touch-none">
      {/* Interactive Helper Pill */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#1D3557]/15 shadow-sm text-[11px] font-mono text-[#1D3557] flex items-center gap-1.5 pointer-events-none">
        <Sparkles className="w-3 h-3 text-[#E63946]" />
        <span>Drag to rotate • Click node</span>
      </div>

      {/* 3D Scene Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center [perspective:900px] ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {/* Ambient Glow Disk Behind Core */}
        <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#A8DADC]/40 via-[#457B9D]/30 to-[#E63946]/20 blur-3xl pointer-events-none" />

        {/* Orbit Rings (CSS 3D) */}
        <div
          className="relative w-64 h-64 [transform-style:preserve-3d] transition-transform duration-75"
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Wireframe Orbital Rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#1D3557]/20 [transform:rotateX(75deg)] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-dashed border-[#457B9D]/25 [transform:rotateY(60deg)] pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#E63946]/20 [transform:rotateZ(45deg)] pointer-events-none" />

          {/* Central System Core Block */}
          <div className="absolute inset-0 m-auto w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1D3557] via-[#2A486F] to-[#122238] shadow-2xl border border-white/20 flex flex-col items-center justify-center text-white [transform-style:preserve-3d] transform hover:scale-105 transition-transform">
            <Cpu className="w-8 h-8 text-[#A8DADC] animate-pulse" />
            <span className="font-mono text-[10px] font-bold tracking-widest mt-1 text-white/90">SYS.CORE</span>
            <span className="text-[8px] font-mono text-[#A8DADC]">v2.6_ACTIVE</span>
          </div>

          {/* Satellite Architecture Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id
            return (
              <div
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveNode(node)
                }}
                className="absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 cursor-pointer [transform-style:preserve-3d] group"
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                }}
              >
                {/* Node Pill button that billboard-faces forward */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg transition-all duration-300 [transform-style:preserve-3d] ${
                    isSelected
                      ? 'bg-[#1D3557] text-white border-[#E63946] scale-125 shadow-xl'
                      : 'bg-white/95 text-[#1D3557] border-[#1D3557]/15 hover:scale-110 hover:border-[#457B9D]'
                  }`}
                  style={{
                    transform: `rotateY(${-rotY}deg) rotateX(${-rotX}deg)`,
                  }}
                >
                  {node.id === 'simrs' && <Activity className="w-5 h-5 text-[#E63946]" />}
                  {node.id === 'ai' && <Sparkles className="w-5 h-5 text-[#457B9D]" />}
                  {node.id === 'postgres' && <Database className="w-5 h-5 text-[#1D3557]" />}
                  {node.id === 'nextjs' && <Network className="w-5 h-5 text-[#10B981]" />}
                  {node.id === 'bpjs' && <Shield className="w-5 h-5 text-[#E63946]" />}
                  {node.id === 'redis' && <Cpu className="w-5 h-5 text-[#F59E0B]" />}
                </div>

                {/* Always-readable Node Tag */}
                <div
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
                  style={{
                    transform: `rotateY(${-rotY}deg) rotateX(${-rotX}deg)`,
                  }}
                >
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight shadow-xs ${
                      isSelected
                        ? 'bg-[#1D3557] text-white'
                        : 'bg-white/90 text-[#1D3557] border border-[#1D3557]/10'
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

      {/* Real-time Telemetry Card for Active Node */}
      <div className="w-full mt-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#1D3557]/15 shadow-md flex items-center justify-between text-left transition-all">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1D3557]" />
          <div>
            <div className="text-xs font-bold text-[#1D3557] flex items-center gap-1.5">
              <span>{activeNode.label}</span>
              <span className="text-[10px] font-normal text-[#457B9D] font-mono">({activeNode.role})</span>
            </div>
            <div className="text-[11px] font-mono font-semibold text-[#E63946]">{activeNode.metric}</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-[#457B9D] block">CLUSTER PROTOCOL</span>
          <span className="text-[10px] font-mono font-bold text-[#1D3557]">LIVE_VERIFIED</span>
        </div>
      </div>
    </div>
  )
}
