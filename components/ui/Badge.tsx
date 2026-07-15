'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Tech stack pill badge — used on project cards, case studies, and skills.
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  const base = 'inline-flex items-center font-mono rounded-full transition-colors duration-200 whitespace-nowrap';

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[0.65rem] tracking-wide',
    md: 'px-3.5 py-1 text-xs tracking-wide',
  };

  const variants = {
    default:
      'bg-surface-2 text-text-secondary border border-border hover:border-accent/20 hover:text-text-primary',
    accent:
      'bg-accent/10 text-accent border border-accent/25',
    outline:
      'bg-transparent text-text-muted border border-border',
    muted:
      'bg-surface-3 text-text-muted',
  };

  return (
    <span className={cn(base, sizes[size], variants[variant], className)}>
      {children}
    </span>
  );
}
