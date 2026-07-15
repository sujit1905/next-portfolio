'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomeCTA() {
  return (
    <section
      className="section relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Radial lemon-green glow rising from bottom edge */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom center, rgba(212,255,63,0.15) 0%, rgba(212,255,63,0.04) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Diagonal grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 40px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-6">
            Let&apos;s build something great
          </p>

          <h2
            id="cta-heading"
            className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.05' }}
          >
            Have a project in mind?
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Let&apos;s talk.</span>
          </h2>

          <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10">
            I&apos;m currently available for freelance projects, contract work, and
            full-time opportunities. Let&apos;s discuss what we can build together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              id="cta-contact"
              className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
            >
              Start a Conversation
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

            <a
              href="mailto:mecwansujit@gmail.com"
              id="cta-email"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors duration-200"
            >
              mecwansujit@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
