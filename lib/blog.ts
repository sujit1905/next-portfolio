// ─── Blog Data & MDX Utilities ───────────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number; // minutes
  featured: boolean;
  draft?: boolean;
}

// ─── Static blog manifest (matches content/blog/*.mdx filenames) ──────────────
// TODO: Add/remove entries as you write new posts.
export const blogPosts: BlogPost[] = [
  {
    slug: 'optimizing-mongodb-queries',
    title: 'Optimizing MongoDB Queries: From 800ms to 45ms',
    description:
      'A deep dive into MongoDB aggregation pipelines, compound indexes, and Atlas Search — with real query plans and before/after benchmarks from a production e-commerce database.',
    date: '2024-11-15',
    tags: ['MongoDB', 'Performance', 'Backend', 'Database'],
    readingTime: 12,
    featured: true,
    draft: false,
  },
  {
    slug: 'building-realtime-features-nodejs',
    title: 'Building Real-Time Features in Node.js: WebSockets at Scale',
    description:
      'How to architect Socket.io applications that handle 10,000+ concurrent connections — covering Redis pub/sub adapter, room management, presence systems, and horizontal scaling patterns.',
    date: '2024-09-22',
    tags: ['Node.js', 'WebSockets', 'Socket.io', 'Redis', 'Real-Time'],
    readingTime: 15,
    featured: true,
    draft: false,
  },
  {
    slug: 'nextjs-performance-tips',
    title: 'Next.js 14 Performance: Achieving 95+ Lighthouse Scores in Production',
    description:
      'Practical techniques for squeezing every point out of your Lighthouse score: Server Components, streaming, image optimization, font loading strategies, and eliminating layout shift.',
    date: '2024-07-08',
    tags: ['Next.js', 'Performance', 'Frontend', 'Web Vitals'],
    readingTime: 10,
    featured: false,
    draft: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured && !p.draft);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.includes(tag) && !p.draft);
}

export function getAllBlogTags(): string[] {
  const tagSet = new Set<string>();
  blogPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.filter((p) => !p.draft).map((p) => p.slug);
}
