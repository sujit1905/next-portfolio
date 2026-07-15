'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  el?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** 'chars' splits at character level; 'words' at word level */
  splitBy?: 'chars' | 'words';
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

/**
 * Staggered text reveal — chars slide up from below with a clip mask.
 * Respects prefers-reduced-motion by fading instead of sliding.
 * Uses 'easeOut' string (not number array) to satisfy Framer Motion's strict Easing type.
 */
export default function AnimatedText({
  text,
  el: El = 'h2',
  className,
  splitBy = 'words',
  delay = 0,
  staggerDelay = 0.06,
  once = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();

  const tokens = splitBy === 'chars' ? text.split('') : text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const tokenVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: '110%', rotateZ: 3 },
        visible: {
          opacity: 1,
          y: '0%',
          rotateZ: 0,
          // Use named easing string — avoids number[] vs Easing type conflict
          transition: { duration: 0.65, ease: 'easeOut' },
        },
      };

  return (
    <motion.span
      className={cn('block', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden leading-none"
          // Add non-breaking space back after each word
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={tokenVariants}>
            {token}
            {splitBy === 'words' && i < tokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
