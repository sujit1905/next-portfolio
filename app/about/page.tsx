import type { Metadata } from 'next';
import { createMetadata, breadcrumbSchema } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'Learn about Sujit Mecwan — a MERN stack developer with 5+ years of experience building production web applications using React, Next.js, Node.js, and MongoDB.',
  path: '/about',
  keywords: ['About Sujit Mecwan', 'MERN Developer story', 'Full stack developer background'],
});

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://sujitmecwan.dev' },
  { name: 'About', url: 'https://sujitmecwan.dev/about' },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden" aria-labelledby="about-hero-title">
        {/* Diagonal gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(212,255,63,0.04) 0%, transparent 40%, rgba(59,130,246,0.03) 100%)',
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-4">
                About Me
              </span>
              <h1
                id="about-hero-title"
                className="font-display font-bold text-text-primary mb-6"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.05' }}
              >
                I build things for the{' '}
                <span style={{ color: 'var(--color-accent)' }}>web</span>.
              </h1>
              <div className="space-y-4 text-text-secondary text-base leading-relaxed">
                <p>
                  I&apos;m <strong className="text-text-primary">Sujit Mecwan</strong>, a full-stack
                  MERN developer based in India with 5+ years of experience building production-grade web
                  applications. I started coding in 2019 out of curiosity — and never stopped.
                </p>
                <p>
                  My craft is at the intersection of performance engineering and great user experience:
                  fast React frontends, robust Node.js APIs, intelligent MongoDB schemas, and
                  infrastructure that stays up at 3 AM.
                </p>
                <p>
                  I&apos;ve shipped everything from real-time chat apps handling 10,000+ WebSocket
                  connections to multi-tenant SaaS platforms and AI-powered tools. I care deeply
                  about the details — the kind that users feel but can&apos;t quite name.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="/resume.pdf"
                  download
                  id="about-download-resume"
                  className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </a>
                <a
                  href="mailto:mecwansujit@gmail.com"
                  className="btn-outline-glow inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border text-text-secondary hover:text-accent"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Say Hello
                </a>
              </div>
            </div>

            {/* Avatar / visual side (No SM box, clean glowing avatar card) */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-4 rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(212,255,63,0.15), transparent, rgba(212,255,63,0.05))',
                    animation: 'spin-slow 20s linear infinite',
                  }}
                  aria-hidden="true"
                />
                {/* Profile Card */}
                <div
                  className="relative w-72 h-80 rounded-3xl glass flex flex-col items-center justify-center p-6 text-center"
                  style={{ border: '1px solid rgba(212,255,63,0.2)' }}
                  role="img"
                  aria-label="Sujit Mecwan profile"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center border border-accent/30 bg-accent/10 mb-4 shadow-glow-sm">
                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h2 className="font-display font-bold text-xl text-text-primary">Sujit Mecwan</h2>
                  <p className="text-accent text-xs font-mono font-medium mt-1">MERN Stack Developer</p>
                  <p className="text-text-muted text-xs mt-3">📍 India · Remote</p>

                  <div className="mt-4 pt-4 border-t border-white/10 w-full flex justify-center gap-3">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-white/5">React</span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-white/5">Next.js</span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-2 text-text-secondary border border-white/5">Node.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="font-display font-bold text-3xl text-text-primary mb-10">
            What I believe in
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Performance First',
                body: 'Every millisecond matters. I optimize for speed from architecture to the final byte.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Security by Default',
                body: 'Auth, validation, headers, rate limits — baked in from day one, not bolted on later.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                ),
                title: 'Clean Architecture',
                body: 'Code that a teammate (or future me) can read, extend, and reason about easily.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: 'Ship with Confidence',
                body: 'Proper testing, CI/CD, monitoring. Reliability you can trust in production.',
              },
            ].map((v) => (
              <div key={v.title} className="glass glass-hover rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
