'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '@/lib/projects';
import ProjectMockup from '@/components/ui/ProjectMockup';
import Badge from '@/components/ui/Badge';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="section relative overflow-hidden" aria-labelledby="featured-projects-title">
      {/* Section background: soft lemon-green orb + grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-32 right-0 w-[600px] h-[600px] orb orb-accent opacity-30 pointer-events-none"
        aria-hidden="true"
        style={{ filter: 'blur(120px)' }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-3">
            Selected Work
          </span>
          <h2
            id="featured-projects-title"
            className="font-display text-display font-bold text-text-primary"
          >
            Projects that{' '}
            <span style={{ color: 'var(--color-accent)' }}>ship</span>
          </h2>
          <p className="text-text-secondary text-lg mt-4 max-w-xl">
            Production-grade applications built for real users — not just portfolio pieces.
          </p>
        </motion.div>

        {/* Bento grid of featured projects */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              variants={staggerItemVariants}
              // First card is large (spans 2 cols on lg)
              className={i === 0 ? 'lg:col-span-2' : ''}
            >
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="card"
                data-cursor-label="View"
                className="group block glass glass-hover rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-card-hover"
                aria-label={`${project.title} — ${project.tagline}`}
              >
                {/* Mockup frame */}
                <div className={`relative overflow-hidden ${i === 0 ? 'h-64 md:h-80' : 'h-52'}`}>
                  <ProjectMockup
                    colors={project.mockupColors}
                    title={project.title}
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        color: project.status === 'live' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            project.status === 'live'
                              ? 'var(--color-accent)'
                              : project.status === 'in-progress'
                              ? '#f59e0b'
                              : '#6b7280',
                        }}
                      />
                      {project.status === 'live' ? 'Live' : project.status === 'in-progress' ? 'In Progress' : 'Archived'}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {Object.values(project.techStack).flat().slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-sm text-text-muted mt-0.5">{project.role} · {project.year}</p>
                    </div>
                    <div className="flex gap-2 shrink-0 mt-0.5">
                      {project.liveUrl && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
                          style={{ borderColor: 'var(--color-border)' }}
                          title="View live site"
                          role="button"
                          tabIndex={0}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      )}
                      {project.githubUrl && (
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-8 h-8 rounded-lg border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-colors"
                          style={{ borderColor: 'var(--color-border)' }}
                          title="View GitHub repo"
                          role="button"
                          tabIndex={0}
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/projects"
            id="featured-view-all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:border-accent/40 hover:text-accent group"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            View All Projects
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
