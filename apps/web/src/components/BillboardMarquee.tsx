export interface BillboardMarqueeProps {
  headline?: string
  subtitle?: string
}

export function BillboardMarquee({
  headline = 'DISTRIBUTED ARCHITECTURE • SIMRS INTEGRATION • NEXT.JS & REACT • AI ENGINE • CORE WEB VITALS 99 • CLEAN CODE • HIGH AVAILABILITY •',
  subtitle = 'Abdul Razak, S.T. is a Lead Full-Stack Engineer bridging regional enterprise needs with high-performance distributed tech architectures, clinical AI integration, and robust data pipelines.',
}: BillboardMarqueeProps) {
  return (
    <div className="w-full rounded-[2.5rem] bg-[#CCFF00] text-black overflow-hidden shadow-xl border border-black/10 select-none py-10 sm:py-14 my-8">
      {/* Massive Infinite Marquee Track */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee tracking-tighter uppercase font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black">
          <span className="mx-4">{headline}</span>
          <span className="mx-4">{headline}</span>
        </div>
      </div>

      {/* Editorial Subtitle Below Marquee */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 mt-8 sm:mt-10">
        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-black/90 leading-snug tracking-tight">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
