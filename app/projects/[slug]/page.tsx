import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createMetadata, breadcrumbSchema, softwareApplicationSchema } from '@/lib/metadata';
import { getProjectBySlug, getAllSlugs, projects } from '@/lib/projects';
import ProjectMockup from '@/components/ui/ProjectMockup';
import Badge from '@/components/ui/Badge';

// ─── Static Params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    keywords: project.tags,
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const structuredData = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://sujitmecwan.dev' },
      { name: 'Projects', url: 'https://sujitmecwan.dev/projects' },
      { name: project.title, url: `https://sujitmecwan.dev/projects/${slug}` },
    ]),
    softwareApplicationSchema({
      name: project.title,
      description: project.description,
      url: project.liveUrl,
      techStack: [...project.techStack.frontend, ...project.techStack.backend],
    }),
  ];

  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero banner */}
      <section className="relative pt-32 pb-0 overflow-hidden" aria-labelledby="project-title">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,255,63,0.05) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-text-muted">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li aria-hidden="true">→</li>
              <li><Link href="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li aria-hidden="true">→</li>
              <li className="text-text-primary" aria-current="page">{project.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-4">
                Case Study
              </span>
              <h1
                id="project-title"
                className="font-display font-bold text-text-primary mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: '1.08' }}
              >
                {project.title}
              </h1>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">{project.tagline}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.category.map((cat) => (
                  <Badge key={cat} variant="accent" size="md">{cat}</Badge>
                ))}
                <Badge variant="outline" size="md">{project.year}</Badge>
                <Badge
                  variant={project.status === 'live' ? 'accent' : 'default'}
                  size="md"
                >
                  {project.status === 'live' ? '● Live' : project.status === 'in-progress' ? '◐ In Progress' : '○ Archived'}
                </Badge>
              </div>

              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                    id={`project-live-${slug}`}
                  >
                    View Live
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border text-text-secondary hover:text-accent hover:border-accent/30 transition-colors"
                    style={{ borderColor: 'var(--color-border)' }}
                    id={`project-github-${slug}`}
                  >
                    GitHub
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Project mockup */}
            <div className="relative rounded-2xl overflow-hidden h-72 border"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <ProjectMockup colors={project.mockupColors} title={project.title} className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Case study body */}
      <article className="section" aria-label="Case study details">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Problem */}
              <section aria-labelledby="problem-title">
                <h2 id="problem-title" className="font-display font-bold text-2xl text-text-primary mb-4">
                  The Problem
                </h2>
                <p className="text-text-secondary leading-relaxed">{project.problemStatement}</p>
              </section>

              {/* Solution */}
              <section aria-labelledby="solution-title">
                <h2 id="solution-title" className="font-display font-bold text-2xl text-text-primary mb-4">
                  The Solution
                </h2>
                <p className="text-text-secondary leading-relaxed">{project.solution}</p>
              </section>

              {/* Key Features */}
              <section aria-labelledby="features-title">
                <h2 id="features-title" className="font-display font-bold text-2xl text-text-primary mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3" role="list">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
                        style={{
                          backgroundColor: 'rgba(212,255,63,0.1)',
                          color: 'var(--color-accent)',
                          border: '1px solid rgba(212,255,63,0.2)',
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Challenges & Solutions */}
              <section aria-labelledby="challenges-title">
                <h2 id="challenges-title" className="font-display font-bold text-2xl text-text-primary mb-6">
                  Challenges & Solutions
                </h2>
                <div className="space-y-5">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="glass rounded-xl p-6">
                      <p className="text-sm font-semibold text-text-primary mb-2">
                        <span className="text-accent mr-2" aria-hidden="true">⚠</span>
                        Problem
                      </p>
                      <p className="text-text-secondary text-sm mb-4">{c.problem}</p>
                      <p className="text-sm font-semibold text-text-primary mb-2">
                        <span className="text-accent mr-2" aria-hidden="true">✓</span>
                        Solution
                      </p>
                      <p className="text-text-secondary text-sm">{c.solution}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6" aria-label="Project details">
              {/* Tech Stack */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-display font-semibold text-text-primary mb-4">Tech Stack</h3>
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category} className="mb-3">
                    <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(techs as string[]).map((tech: string) => (
                        <Badge key={tech} variant="default" size="sm">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              {project.metrics.length > 0 && (
                <div className="glass rounded-xl p-6">
                  <h3 className="font-display font-semibold text-text-primary mb-4">Impact & Metrics</h3>
                  <ul className="space-y-2" role="list">
                    {project.metrics.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-accent shrink-0 mt-0.5" aria-hidden="true">→</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Role & Year */}
              <div className="glass rounded-xl p-6 space-y-3">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">Role</p>
                  <p className="text-text-primary text-sm font-semibold">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-1">Year</p>
                  <p className="text-text-primary text-sm font-semibold">{project.year}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Next Project */}
      {nextProject && (
        <section className="pb-20" aria-label="Next project">
          <div className="container">
            <div
              className="border-t pt-12"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                Next Project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
              >
                <h2 className="font-display font-bold text-2xl text-text-primary group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h2>
                <svg
                  className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:translate-x-2 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <p className="text-text-secondary text-sm mt-1">{nextProject.tagline}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
