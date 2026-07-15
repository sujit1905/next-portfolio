'use client';

import MarqueeStrip from '@/components/ui/MarqueeStrip';
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiMongodb,
  SiExpress, SiRedis, SiDocker, SiTailwindcss,
  SiPostgresql, SiSocketdotio, SiGraphql, SiGit, SiZod, SiFramer,
} from 'react-icons/si';

// Inline AWS SVG — official orange-gradient logomark (no Simple Icon available)
const AwsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 80 80" fill="none" aria-label="AWS">
    <text x="2" y="38" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="30" fill="currentColor">aws</text>
    <path d="M12 50 Q40 62 68 50" stroke="#FF9900" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <polygon points="66,44 74,50 66,56" fill="#FF9900"/>
  </svg>
);

// ─── Tech items with official Simple Icons SVGs ───────────────────────────
// Icon = official brand SVG from react-icons/si (Simple Icons)
// All icons rendered at 18×18px uniform size for marquee visual weight consistency

const techItems = [
  { name: 'React',          icon: <SiReact size={18} /> },
  { name: 'Next.js',        icon: <SiNextdotjs size={18} /> },
  { name: 'Node.js',        icon: <SiNodedotjs size={18} /> },
  { name: 'TypeScript',     icon: <SiTypescript size={18} /> },
  { name: 'MongoDB',        icon: <SiMongodb size={18} /> },
  { name: 'Express.js',     icon: <SiExpress size={18} /> },
  { name: 'Redis',          icon: <SiRedis size={18} /> },
  { name: 'Docker',         icon: <SiDocker size={18} /> },
  { name: 'AWS',            icon: <AwsIcon /> },
  { name: 'Tailwind CSS',   icon: <SiTailwindcss size={18} /> },
  { name: 'PostgreSQL',     icon: <SiPostgresql size={18} /> },
  { name: 'Socket.io',      icon: <SiSocketdotio size={18} /> },
  { name: 'GraphQL',        icon: <SiGraphql size={18} /> },
  { name: 'Framer Motion',  icon: <SiFramer size={18} /> },
  { name: 'Zod',            icon: <SiZod size={18} /> },
  { name: 'Git',            icon: <SiGit size={18} /> },
];

export default function TechMarquee() {
  return (
    <section
      className="py-12 overflow-hidden relative"
      aria-label="Technology stack"
    >
      {/* Section divider lines */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-border))' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, var(--color-border))' }}
        aria-hidden="true"
      />

      <p className="text-center text-xs font-mono uppercase tracking-widest text-text-muted mb-8">
        Technologies I work with
      </p>

      <div className="flex flex-col gap-4">
        <MarqueeStrip items={techItems} direction="left" speed={40} />
        <MarqueeStrip items={[...techItems].reverse()} direction="right" speed={35} />
      </div>
    </section>
  );
}
