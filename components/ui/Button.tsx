'use client';

import { useRef, useState, forwardRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  /** Magnetic spring pull toward cursor */
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  /** Animate right-arrow icon sliding on hover */
  animateArrow?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-busy'?: boolean;
}

// ─── Glow Border Wrapper ────────────────────────────────────────────────────
// A thin layer that adds the ambient rotating lemon-green glow ring.
// Primary buttons → subtle glow (fill already has strong presence)
// Secondary / outline / ghost → full glow (border IS the presence)

function GlowWrap({
  children,
  variant,
  disabled,
  className,
}: {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  disabled?: boolean;
  className?: string;
}) {
  const isSubtle = variant === 'primary';
  return (
    <span
      className={cn(
        'glow-border-wrap rounded-xl',
        isSubtle ? 'glow-subtle' : '',
        disabled ? 'opacity-50' : '',
        className
      )}
    >
      {children}
    </span>
  );
}

// ─── Animated Arrow ─────────────────────────────────────────────────────────
function AnimatedArrow({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.span
      animate={{ x: isHovered ? 4 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="inline-flex items-center ml-0.5"
      aria-hidden="true"
    >
      <svg
        width="16" height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </motion.span>
  );
}

// ─── Base Size Classes ───────────────────────────────────────────────────────
const sizeClasses = {
  sm: 'px-4 py-2 text-xs tracking-wide',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

// ─── Variant Classes ─────────────────────────────────────────────────────────
// Primary: gradient + near-black warm text (#14170a) + semibold
// Others: standard dark-theme styling
const variantClasses = {
  primary:
    'btn-primary-gradient font-semibold rounded-xl inline-flex items-center justify-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  secondary:
    'bg-surface-2 text-text-primary font-semibold border border-border hover:border-border-hover hover:bg-surface-3 rounded-xl inline-flex items-center justify-center gap-2 select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  ghost:
    'bg-transparent text-text-secondary font-medium hover:text-text-primary hover:bg-white/[0.04] rounded-xl inline-flex items-center justify-center gap-2 select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  outline:
    'bg-transparent text-accent font-semibold border border-accent/40 hover:border-accent hover:bg-accent/[0.06] rounded-xl inline-flex items-center justify-center gap-2 select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
};

// ─── Main Button Component ───────────────────────────────────────────────────

/**
 * Premium button system with:
 * - Animated rotating glow border ring (lemon-green, ambient 8s → 2s on hover)
 * - Primary: gradient fill (#d4ff3f→#b8e62e), near-black warm text (#14170a), spring scale
 * - Secondary/outline/ghost: glowing border IS the visual presence
 * - Magnetic spring physics (cursor attraction)
 * - Animated → arrow (slides right on hover)
 * - Fully accessible: aria-*, focus-visible ring, reduced-motion CSS fallback
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button',
  className,
  magnetic = true,
  icon,
  iconPosition = 'right',
  animateArrow = false,
  id,
  'aria-label': ariaLabel,
  'aria-busy': ariaBusy,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 18 });
  const x = useTransform(springX, (val) => (isHovered && magnetic && !disabled ? val : 0));
  const y = useTransform(springY, (val) => (isHovered && magnetic && !disabled ? val : 0));

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || !ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    mouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const classes = cn(variantClasses[variant], sizeClasses[size], className);

  // Force text color inline for primary (defeats any CSS inheritance)
  const primaryTextStyle =
    variant === 'primary'
      ? ({ color: '#14170a', '--tw-text-opacity': '1' } as React.CSSProperties)
      : {};

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="shrink-0" style={primaryTextStyle}>{icon}</span>
      )}
      <span style={primaryTextStyle}>{children}</span>
      {animateArrow && (
        <span style={primaryTextStyle}>
          <AnimatedArrow isHovered={isHovered} />
        </span>
      )}
      {icon && iconPosition === 'right' && !animateArrow && (
        <motion.span
          animate={{ x: isHovered ? 3 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
          style={primaryTextStyle}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http');
    return (
      <GlowWrap variant={variant} disabled={disabled}>
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          id={id}
          aria-label={ariaLabel}
          className={classes}
          style={{ x, y, ...primaryTextStyle }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </motion.a>
      </GlowWrap>
    );
  }

  return (
    <GlowWrap variant={variant} disabled={disabled}>
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        id={id}
        aria-label={ariaLabel}
        aria-busy={ariaBusy}
        disabled={disabled}
        onClick={onClick}
        className={classes}
        style={{ x, y, ...primaryTextStyle }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {content}
      </motion.button>
    </GlowWrap>
  );
}
