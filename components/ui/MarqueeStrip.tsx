'use client';

/**
 * MarqueeStrip — infinite horizontal scroll of tech stack items.
 * Pure CSS animation (no JS), pauses on hover.
 * Mask-image fades edges for a premium look.
 * Now supports React nodes as icons (Simple Icons SVGs).
 */

import type { ReactNode } from 'react';

interface MarqueeItem {
  name: string;
  icon?: ReactNode; // now accepts ReactNode (SVG component) or string
}

interface MarqueeStripProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: number; // seconds
  className?: string;
}

export default function MarqueeStrip({
  items,
  direction = 'left',
  speed = 30,
  className = '',
}: MarqueeStripProps) {
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
      aria-hidden="true"
    >
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="marquee-item flex items-center gap-2.5 px-4 py-2 rounded-full border whitespace-nowrap select-none group/item"
            style={{
              borderColor: 'var(--color-border)',
              backgroundColor: 'rgba(255,255,255,0.02)',
              transition: 'border-color 0.2s ease, background-color 0.2s ease',
            }}
          >
            {item.icon && (
              <span
                className="shrink-0 flex items-center justify-center"
                style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.45)' }}
              >
                {item.icon}
              </span>
            )}
            <span className="text-sm font-mono text-text-secondary" style={{ fontSize: '0.8125rem' }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      {/* Inline style for group hover on individual item icons */}
      <style>{`
        .marquee-item:hover {
          border-color: rgba(212,255,63,0.25) !important;
          background-color: rgba(212,255,63,0.04) !important;
        }
        .marquee-item:hover span[style] {
          color: #d4ff3f !important;
        }
      `}</style>
    </div>
  );
}
