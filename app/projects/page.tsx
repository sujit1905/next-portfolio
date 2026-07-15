'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectMockup from '@/components/ui/ProjectMockup';
import Badge from '@/components/ui/Badge';
import { projects, projectCategories, type ProjectCategory } from '@/lib/projects';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/animations';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchCat =
      activeCategory === 'All' || p.category.includes(activeCategory);
    const matchSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-40 pb-16 overflow-hidden" aria-labelledby="projects-title">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,255,63,0.06) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-accent block mb-4">
            All Work
          </span>
          <h1
            id="projects-title"
            className="font-display font-bold text-text-primary mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: '1.05' }}
          >
            Projects
          </h1>
          <p className="text-text-secondary text-lg max-w-xl">
            6 production applications — built, deployed, and maintained. Each one taught me something
            different.
          </p>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="pb-12" aria-label="Project filters">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {(['All', ...projectCategories] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'border-accent text-accent bg-accent/10'
                      : 'border-border text-text-muted hover:text-text-primary hover:border-border-hover'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="sm:ml-auto relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search projects or tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search projects"
                className="pl-9 pr-4 py-2 rounded-xl text-sm text-text-primary placeholder:text-text-muted bg-surface-2 border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors w-56"
                style={{ borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>

          {/* Results count */}
          <p className="text-xs text-text-muted mb-6">
            Showing {filtered.length} of {projects.length} projects
            {search && ` for "${search}"`}
          </p>

          {/* Project grid */}
          {filtered.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              key={`${activeCategory}-${search}`}
            >
              {filtered.map((project) => (
                <motion.div key={project.slug} variants={staggerItemVariants}>
                  <Link
                    href={`/projects/${project.slug}`}
                    data-cursor="card"
                    data-cursor-label="View"
                    className="group block glass glass-hover rounded-2xl overflow-hidden h-full hover:shadow-card-hover transition-all duration-300"
                    aria-label={`${project.title} — ${project.tagline}`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <ProjectMockup
                        colors={project.mockupColors}
                        title={project.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-mono"
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(8px)',
                            color: project.status === 'live' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                          }}
                        >
                          {project.status === 'live' ? '● Live' : project.status === 'in-progress' ? '◐ In Progress' : '○ Archived'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-mono text-text-muted mb-1">{project.year} · {project.role}</p>
                      <h2 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors mb-2">
                        {project.title}
                      </h2>
                      <p className="text-text-secondary text-sm line-clamp-2 mb-4">
                        {project.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4" aria-hidden="true">🔍</p>
              <p className="text-text-secondary">No projects found for &quot;{search}&quot;</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-4 text-sm text-accent underline-draw"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
