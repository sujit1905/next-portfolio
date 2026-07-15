import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Sujit Mecwan',
  description: "This page doesn't exist. Happens to the best of us.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Blurred glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,255,63,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container text-center relative z-10 py-24">
        {/* Giant 404 */}
        <div
          className="font-display font-bold select-none mb-4 leading-none"
          style={{
            fontSize: 'clamp(8rem, 25vw, 20rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(212,255,63,0.2)',
            textShadow: '0 0 120px rgba(212,255,63,0.15)',
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-text-primary mb-4">
          Lost in the{' '}
          <span style={{ color: 'var(--color-accent)' }}>void</span>
        </h1>

        <p className="text-text-secondary text-lg max-w-md mx-auto mb-10">
          This page doesn&apos;t exist — or maybe it moved. The best 404 pages are the ones
          you never see. You saw this one.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-background transition-all duration-200 hover:shadow-glow"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
            style={{ borderColor: 'var(--color-border)' }}
          >
            View Projects
          </Link>
        </div>

        {/* Fun code block hint */}
        <p className="mt-12 text-xs font-mono text-text-muted">
          <span style={{ color: 'var(--color-accent-muted)' }}>HTTP</span> 404:{' '}
          <span className="text-text-muted">Resource not found at this path</span>
        </p>
      </div>
    </div>
  );
}
