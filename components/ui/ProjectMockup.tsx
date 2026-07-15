/**
 * ProjectMockup — CSS gradient frames as placeholder for project screenshots.
 *
 * Usage: <ProjectMockup colors={['#1a1a2e', '#d4ff3f', '#16213e']} />
 *
 * When you have a real screenshot, replace with:
 * <Image src="/projects/nexmart.png" alt="NexMart screenshot" fill className="object-cover" />
 */

interface ProjectMockupProps {
  colors: [string, string, string];
  className?: string;
  title?: string;
}

export default function ProjectMockup({ colors, className = '', title }: ProjectMockupProps) {
  const [dark, accent, mid] = colors;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${dark} 0%, ${mid} 50%, ${dark} 100%)`,
      }}
      role="img"
      aria-label={title ? `${title} project mockup` : 'Project mockup'}
    >
      {/* Animated accent orb */}
      <div
        className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 rounded-full"
        style={{
          background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          animation: 'float 5s ease-in-out infinite',
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${accent}20 1px, transparent 1px), linear-gradient(90deg, ${accent}20 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Fake UI chrome — browser-like mockup */}
      <div className="absolute inset-4 rounded-xl overflow-hidden border border-white/[0.07]">
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ backgroundColor: `${dark}cc` }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <div
            className="ml-2 flex-1 h-4 rounded-full"
            style={{ backgroundColor: `${accent}15`, border: `1px solid ${accent}20` }}
          />
        </div>

        {/* Content area */}
        <div
          className="p-4 space-y-3"
          style={{ backgroundColor: `${dark}88` }}
        >
          {/* Fake nav */}
          <div className="flex gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 rounded-full"
                style={{
                  width: `${40 + i * 15}px`,
                  backgroundColor: i === 1 ? `${accent}80` : `${accent}20`,
                }}
              />
            ))}
          </div>

          {/* Fake hero text */}
          <div className="space-y-2">
            <div
              className="h-3 rounded-full w-3/4"
              style={{ backgroundColor: `${accent}40` }}
            />
            <div
              className="h-3 rounded-full w-1/2"
              style={{ backgroundColor: `${accent}25` }}
            />
          </div>

          {/* Fake cards row */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg p-3 space-y-2"
                style={{
                  backgroundColor: `${accent}08`,
                  border: `1px solid ${accent}15`,
                  opacity: 1 - i * 0.1,
                }}
              >
                <div
                  className="h-2 rounded-full w-2/3"
                  style={{ backgroundColor: `${accent}50` }}
                />
                <div
                  className="h-1.5 rounded-full w-full"
                  style={{ backgroundColor: `${accent}20` }}
                />
                <div
                  className="h-1.5 rounded-full w-4/5"
                  style={{ backgroundColor: `${accent}15` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div
        className="absolute bottom-0 left-0 w-24 h-24"
        style={{
          background: `radial-gradient(circle at bottom left, ${accent}30 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
