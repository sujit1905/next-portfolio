'use client';

import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiMongodb,
  SiExpress, SiRedis, SiDocker, SiTailwindcss,
  SiPostgresql, SiSocketdotio, SiGraphql, SiGit, SiGithub,
  SiPrisma, SiVite, SiFigma, SiVercel, SiLinux,
  SiZod, SiJest, SiPnpm, SiNpm,
} from 'react-icons/si';
import { SiFramer } from 'react-icons/si';
import type { IconType } from 'react-icons';

// ─── Icon Registry ─────────────────────────────────────────────────────────
// Maps tech name (lowercase, normalized) → { Icon, brandColor }
// Brand colors only used on hover; at rest icons render muted white.

export const TECH_ICONS: Record<string, { Icon: IconType; brandColor: string }> = {
  react:          { Icon: SiReact,              brandColor: '#61dafb' },
  'next.js':      { Icon: SiNextdotjs,          brandColor: '#ffffff' },
  nextjs:         { Icon: SiNextdotjs,          brandColor: '#ffffff' },
  'node.js':      { Icon: SiNodedotjs,          brandColor: '#5fa04e' },
  nodejs:         { Icon: SiNodedotjs,          brandColor: '#5fa04e' },
  typescript:     { Icon: SiTypescript,         brandColor: '#3178c6' },
  mongodb:        { Icon: SiMongodb,            brandColor: '#47a248' },
  'express.js':   { Icon: SiExpress,            brandColor: '#ffffff' },
  expressjs:      { Icon: SiExpress,            brandColor: '#ffffff' },
  express:        { Icon: SiExpress,            brandColor: '#ffffff' },
  redis:          { Icon: SiRedis,              brandColor: '#ff4438' },
  docker:         { Icon: SiDocker,             brandColor: '#2496ed' },
  aws:            { Icon: SiVercel,            brandColor: '#ff9900' }, // use Vercel as placeholder; actual AWS SVG handled inline in marquee
  'tailwind css': { Icon: SiTailwindcss,        brandColor: '#06b6d4' },
  tailwindcss:    { Icon: SiTailwindcss,        brandColor: '#06b6d4' },
  tailwind:       { Icon: SiTailwindcss,        brandColor: '#06b6d4' },
  postgresql:     { Icon: SiPostgresql,         brandColor: '#4169e1' },
  'socket.io':    { Icon: SiSocketdotio,        brandColor: '#ffffff' },
  socketio:       { Icon: SiSocketdotio,        brandColor: '#ffffff' },
  graphql:        { Icon: SiGraphql,            brandColor: '#e10098' },
  'framer motion':{ Icon: SiFramer,             brandColor: '#05f' },
  framer:         { Icon: SiFramer,             brandColor: '#05f' },
  zod:            { Icon: SiZod,               brandColor: '#3e67b1' },
  git:            { Icon: SiGit,               brandColor: '#f05032' },
  github:         { Icon: SiGithub,            brandColor: '#ffffff' },
  prisma:         { Icon: SiPrisma,            brandColor: '#5a67d8' },
  vite:           { Icon: SiVite,              brandColor: '#646cff' },
  figma:          { Icon: SiFigma,             brandColor: '#f24e1e' },
  vercel:         { Icon: SiVercel,            brandColor: '#ffffff' },
  linux:          { Icon: SiLinux,             brandColor: '#fcc624' },
  jest:           { Icon: SiJest,              brandColor: '#c21325' },
};

// ─── Component ────────────────────────────────────────────────────────────

interface TechIconProps {
  /** Technology name — matched case-insensitively against registry */
  name: string;
  /** Size in px (uniform bounding box) */
  size?: number;
  /** If true: uses lemon-green on hover instead of brand color */
  lemonHover?: boolean;
  className?: string;
}

/**
 * Renders the official Simple Icons SVG brand mark for a given technology.
 * At rest: muted light-gray fill (consistent dark-palette look).
 * On hover: lemon-green (#d4ff3f) by default (site signature) — or brand color if requested.
 * Falls back to a monogram pill if no icon found.
 */
export default function TechIcon({
  name,
  size = 20,
  lemonHover = true,
  className = '',
}: TechIconProps) {
  const key = name.toLowerCase();
  const entry = TECH_ICONS[key];

  const hoverColor = lemonHover ? '#d4ff3f' : (entry?.brandColor ?? '#d4ff3f');

  if (!entry) {
    // Fallback: monogram pill
    return (
      <span
        className={`inline-flex items-center justify-center rounded font-mono font-bold text-[9px] text-text-muted ${className}`}
        style={{ width: size, height: size, backgroundColor: 'var(--color-surface-3)' }}
        title={name}
        aria-label={name}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const { Icon } = entry;

  return (
    <span
      className={`inline-flex items-center justify-center group/icon transition-colors duration-200 ${className}`}
      style={{ width: size, height: size, color: 'rgba(255,255,255,0.45)' }}
      title={name}
      aria-label={name}
      role="img"
    >
      <Icon
        size={size}
        style={{ display: 'block', flexShrink: 0 }}
        className="transition-colors duration-200 group-hover/icon:!text-[var(--hover-color)]"
        // CSS custom property trick for hover color
        // We use CSS variables set on parent instead
      />
      <style>{`.group\\/icon:hover [title="${name.replace(/[^a-zA-Z0-9]/g, '')}"] { color: ${hoverColor}; }`}</style>
    </span>
  );
}

/**
 * Simpler version using a wrapper that transitions color via CSS on hover
 * — exported for use in marquees and skill grids.
 */
export function TechIconHoverable({
  name,
  size = 20,
  lemonHover = true,
}: TechIconProps) {
  const key = name.toLowerCase();
  const entry = TECH_ICONS[key];
  const hoverColor = lemonHover ? '#d4ff3f' : (entry?.brandColor ?? '#d4ff3f');

  if (!entry) {
    return (
      <span
        className="inline-flex items-center justify-center rounded font-mono font-bold text-[9px] text-text-muted"
        style={{ width: size, height: size, backgroundColor: 'var(--color-surface-3)' }}
        title={name}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const { Icon } = entry;

  return (
    <span
      className="tech-icon-wrapper inline-flex items-center justify-center"
      style={
        {
          width: size,
          height: size,
          '--icon-hover': hoverColor,
          color: 'rgba(255,255,255,0.45)',
          transition: 'color 0.2s ease',
        } as React.CSSProperties
      }
      title={name}
      role="img"
      aria-label={name}
    >
      <Icon size={size} style={{ display: 'block' }} />
    </span>
  );
}
