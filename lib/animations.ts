// ─── Shared Framer Motion Animation Variants ─────────────────────────────────
// Import these in any component for consistent motion across the site.
// All variants respect prefers-reduced-motion — use them with the
// useReducedMotion() hook or via CSS @media (prefers-reduced-motion: reduce).

import { Variants, Transition } from 'framer-motion';

// ─── Base Transitions ──────────────────────────────────────────────────────
export const smoothTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

export const snappyTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

export const easeOutTransition: Transition = {
  duration: 0.6,
  ease: 'easeOut',
};

// ─── Fade Up ───────────────────────────────────────────────────────────────
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutTransition,
  },
};

// ─── Fade In ───────────────────────────────────────────────────────────────
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// ─── Staggered Container ───────────────────────────────────────────────────
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ─── Staggered Item ────────────────────────────────────────────────────────
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutTransition,
  },
};

// ─── Character Reveal (for hero headlines) ─────────────────────────────────
export const charRevealVariants: Variants = {
  hidden: { opacity: 0, y: '110%', rotateZ: 5 },
  visible: {
    opacity: 1,
    y: '0%',
    rotateZ: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ─── Word Reveal (for subheadings) ─────────────────────────────────────────
export const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ─── Slide In From Left ───────────────────────────────────────────────────
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutTransition,
  },
};

// ─── Slide In From Right ──────────────────────────────────────────────────
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutTransition,
  },
};

// ─── Scale In ──────────────────────────────────────────────────────────────
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: easeOutTransition,
  },
};

// ─── Card Hover ────────────────────────────────────────────────────────────
export const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// ─── Overlay Rise (for card hover overlays) ────────────────────────────────
export const overlayRiseVariants: Variants = {
  rest: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// ─── Page Transition ───────────────────────────────────────────────────────
export const pageTransitionVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

// ─── Timeline Item (alternating) ───────────────────────────────────────────
export const timelineLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutTransition,
  },
};

export const timelineRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOutTransition,
  },
};

// ─── Loading Bar ───────────────────────────────────────────────────────────
export const loadingBarVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1] },
  },
};
