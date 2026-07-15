'use client';

import Link from 'next/link';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container text-center py-24">
        <p className="text-5xl mb-6" aria-hidden="true">🚧</p>
        <h1 className="font-display font-bold text-3xl text-text-primary mb-3">
          Project not found
        </h1>
        <p className="text-text-secondary mb-8 max-w-sm mx-auto">
          This project page couldn&apos;t be loaded. It may have been removed or the
          URL might be incorrect.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm text-background"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Try Again
          </button>
          <Link
            href="/projects"
            className="px-6 py-2.5 rounded-lg font-semibold text-sm border text-text-secondary hover:text-text-primary transition-colors"
            style={{ borderColor: 'var(--color-border)' }}
          >
            All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
