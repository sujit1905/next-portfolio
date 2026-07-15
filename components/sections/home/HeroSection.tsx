'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

// Dynamic import — particle field is heavy, don't block first paint
const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  'MERN Stack Developer',
  'Full Stack Engineer',
  'React & Next.js Specialist',
  'Node.js Architect',
  'MongoDB Expert',
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect for rotating roles
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(ROLES[0]);
      return;
    }

    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        return;
      }
      timeout = setTimeout(() => {
        setDisplayText((t) => t.slice(0, -1));
      }, 40);
    } else {
      if (displayText === current) {
        setIsPaused(true);
        return;
      }
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 70);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, roleIndex, shouldReduceMotion]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Particle constellation background ───────────────────────────── */}
      <ParticleField />

      {/* ── Gradient vignette overlays ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,255,63,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(212,255,63,0.04) 0%, transparent 50%),
            linear-gradient(to bottom, transparent 70%, var(--color-background) 100%)
          `,
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <motion.div
        className="container relative z-10 text-center py-32"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow tag */}
        <motion.div variants={staggerItemVariants} className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border"
            style={{
              color: 'var(--color-accent)',
              borderColor: 'rgba(212,255,63,0.25)',
              backgroundColor: 'rgba(212,255,63,0.06)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Available for freelance projects
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div variants={staggerItemVariants}>
          <h1
            className="font-display tracking-tight text-text-primary mb-2"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: '1.03' }}
          >
            Crafting Digital
          </h1>
          <h1
            className="font-display tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              lineHeight: '1.03',
              color: 'var(--color-accent)',
              textShadow: '0 0 60px rgba(212,255,63,0.3)',
            }}
          >
            Experiences.
          </h1>
        </motion.div>

        {/* Subheading with typewriter */}
        <motion.div variants={staggerItemVariants} className="mb-10">
          <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto mb-3">
            Hi, I&apos;m{' '}
            <span className="text-text-primary font-semibold">Sujit Mecwan</span> —
          </p>
          <div className="h-8 flex items-center justify-center">
            <span
              className="text-xl md:text-2xl font-display font-medium"
              style={{ color: 'var(--color-accent)' }}
            >
              {displayText}
              <span
                className="inline-block w-0.5 h-6 ml-0.5 align-middle"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  animation: 'pulse 0.8s step-end infinite',
                }}
              />
            </span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          variants={staggerItemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary — gradient fill with glow on hover */}
          <Link
            href="/projects"
            id="hero-view-projects"
            className="btn-primary-gradient relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base"
          >
            View Projects
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Secondary — bordered button with glow on hover */}
          <a
            href="/resume.pdf"
            download
            id="hero-download-resume"
            className="btn-outline-glow inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-text-primary text-base border hover:bg-white/[0.04]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={staggerItemVariants}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '6+', label: 'Projects Shipped' },
            { value: '99.9%', label: 'Uptime Maintained' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-display font-bold text-2xl md:text-3xl"
                style={{ color: 'var(--color-accent)' }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-text-muted mt-0.5 font-mono uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
