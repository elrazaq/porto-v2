export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#F1FAEE]"
    >
      {/* Subtle Geometric Architectural Dot Matrix */}
      <div
        className="absolute inset-0 opacity-[0.45] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(29, 53, 87, 0.12) 1px, transparent 1px)',
        }}
      />

      {/* Floating Ambient Glowing Discs */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-[#A8DADC]/40 blur-3xl opacity-70 animate-pulse [animation-duration:9s]" />
      <div className="absolute top-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-[#457B9D]/15 blur-3xl opacity-60 animate-pulse [animation-duration:11s]" />
      <div className="absolute top-2/3 left-1/4 w-80 h-80 rounded-full bg-[#E63946]/10 blur-3xl opacity-50" />
    </div>
  )
}
