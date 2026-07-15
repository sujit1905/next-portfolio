'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { isTouchDevice } from '@/lib/utils';

/**
 * Custom cursor — small dot + lagging outer ring using spring physics.
 * Morphs on hover over links, buttons, and project cards.
 * Completely hidden/disabled on touch/coarse-pointer devices.
 */
export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'link' | 'button' | 'card' | 'image'>('default');
  const [cursorLabel, setCursorLabel] = useState('');

  // Raw mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-lagged position for the outer ring
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (isTouchDevice()) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.dataset.cursor === 'card') {
        setCursorState('card');
        setCursorLabel(target.dataset.cursorLabel || 'View');
      } else if (target.tagName === 'BUTTON' || target.closest('button') || target.dataset.cursor === 'button') {
        setCursorState('button');
        setCursorLabel('');
      } else if (target.tagName === 'A' || target.closest('a')) {
        setCursorState('link');
        setCursorLabel('');
      } else if (target.tagName === 'IMG' || target.dataset.cursor === 'image') {
        setCursorState('image');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('default');
      setCursorLabel('');
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Delegate hover detection via event delegation
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // ─── Ring style per state ───────────────────────────────────────────────
  const ringStyles = {
    default: {
      width: 32,
      height: 32,
      border: '1.5px solid rgba(212, 255, 63, 0.5)',
      backgroundColor: 'transparent',
      mixBlendMode: 'normal' as const,
    },
    link: {
      width: 48,
      height: 48,
      border: '1.5px solid rgba(212, 255, 63, 0.8)',
      backgroundColor: 'rgba(212, 255, 63, 0.08)',
      mixBlendMode: 'normal' as const,
    },
    button: {
      width: 56,
      height: 56,
      border: '1.5px solid var(--color-accent)',
      backgroundColor: 'rgba(212, 255, 63, 0.12)',
      mixBlendMode: 'normal' as const,
    },
    card: {
      width: 72,
      height: 72,
      border: '1.5px solid var(--color-accent)',
      backgroundColor: 'rgba(212, 255, 63, 0.1)',
      mixBlendMode: 'normal' as const,
    },
    image: {
      width: 40,
      height: 40,
      border: '1px solid rgba(255,255,255,0.4)',
      backgroundColor: 'transparent',
      mixBlendMode: 'difference' as const,
    },
  };

  return (
    <>
      {/* Dot — follows cursor exactly (no spring lag) */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none"
        style={{
          zIndex: 'var(--z-cursor)' as unknown as number,
          transform: 'translate(-50%, -50%)',
          width: cursorState === 'card' ? 8 : 5,
          height: cursorState === 'card' ? 8 : 5,
          borderRadius: '50%',
          backgroundColor:
            cursorState === 'image' ? 'white' : 'var(--color-accent)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          boxShadow:
            cursorState !== 'default'
              ? '0 0 8px rgba(212, 255, 63, 0.8)'
              : 'none',
        }}
      />

      {/* Outer ring — spring-lagged, morphs per cursor state */}
      <motion.div
        className="fixed pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 99,
          borderRadius: '50%',
          transition: 'mix-blend-mode 0.2s',
          ...ringStyles[cursorState],
        }}
        animate={ringStyles[cursorState]}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Label inside ring for card state */}
        {cursorState === 'card' && cursorLabel && (
          <span
            className="text-[9px] font-display font-semibold tracking-wider uppercase"
            style={{ color: 'var(--color-accent)' }}
          >
            {cursorLabel}
          </span>
        )}
        {cursorState === 'image' && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1.5" />
          </svg>
        )}
      </motion.div>
    </>
  );
}
