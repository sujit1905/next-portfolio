// ─── Skills Data Layer ───────────────────────────────────────────────────────
// TODO: Adjust proficiency percentages and add/remove skills as needed.

export type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon: string; // emoji or short text icon
  yearsOfExperience: number;
  description: string;
  tags?: string[];
}

export const skills: Skill[] = [
  // ─── Frontend ─────────────────────────────────────────────────────────────
  {
    name: 'React',
    category: 'Frontend',
    proficiency: 95,
    icon: '⚛️',
    yearsOfExperience: 4,
    description: 'Hooks, Context, performance optimization, custom renderer patterns',
    tags: ['Hooks', 'Redux', 'React Query', 'Performance'],
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    proficiency: 92,
    icon: '▲',
    yearsOfExperience: 3,
    description: 'App Router, Server Components, ISR, edge runtime, middleware',
    tags: ['App Router', 'SSR', 'ISR', 'Edge'],
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    proficiency: 90,
    icon: '📘',
    yearsOfExperience: 3,
    description: 'Strict mode, generics, utility types, declaration files',
    tags: ['Strict Mode', 'Generics', 'Type Guards'],
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    proficiency: 93,
    icon: '🎨',
    yearsOfExperience: 3,
    description: 'Custom design systems, JIT, animations, responsive design',
    tags: ['Design Systems', 'Animation', 'Responsive'],
  },
  {
    name: 'Framer Motion',
    category: 'Frontend',
    proficiency: 82,
    icon: '🎬',
    yearsOfExperience: 2,
    description: 'Page transitions, gesture handling, spring animations, layout animations',
    tags: ['Transitions', 'Gestures', 'Springs'],
  },
  {
    name: 'GraphQL',
    category: 'Frontend',
    proficiency: 75,
    icon: '◈',
    yearsOfExperience: 2,
    description: 'Apollo Client, queries/mutations/subscriptions, schema design',
    tags: ['Apollo', 'Subscriptions', 'Schema'],
  },

  // ─── Backend ──────────────────────────────────────────────────────────────
  {
    name: 'Node.js',
    category: 'Backend',
    proficiency: 92,
    icon: '🟢',
    yearsOfExperience: 4,
    description: 'Event loop, streams, worker threads, performance profiling',
    tags: ['Event Loop', 'Streams', 'Clustering'],
  },
  {
    name: 'Express.js',
    category: 'Backend',
    proficiency: 90,
    icon: '🚂',
    yearsOfExperience: 4,
    description: 'REST APIs, middleware patterns, auth, rate limiting, error handling',
    tags: ['REST', 'Middleware', 'Auth', 'Rate Limiting'],
  },
  {
    name: 'Socket.io',
    category: 'Backend',
    proficiency: 83,
    icon: '⚡',
    yearsOfExperience: 2,
    description: 'Real-time bidirectional events, rooms, namespaces, Redis adapter',
    tags: ['WebSockets', 'Real-time', 'Redis Adapter'],
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    proficiency: 95,
    icon: '🔌',
    yearsOfExperience: 4,
    description: 'RESTful design, versioning, authentication, documentation (OpenAPI)',
    tags: ['RESTful', 'OpenAPI', 'Versioning'],
  },

  // ─── Database ─────────────────────────────────────────────────────────────
  {
    name: 'MongoDB',
    category: 'Database',
    proficiency: 90,
    icon: '🍃',
    yearsOfExperience: 4,
    description: 'Aggregation pipelines, indexes, Atlas Search, transactions, sharding',
    tags: ['Aggregation', 'Indexes', 'Atlas Search'],
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    proficiency: 78,
    icon: '🐘',
    yearsOfExperience: 2,
    description: 'Complex joins, window functions, indexing strategies, Prisma ORM',
    tags: ['SQL', 'Prisma', 'Window Functions'],
  },
  {
    name: 'Redis',
    category: 'Database',
    proficiency: 82,
    icon: '🔴',
    yearsOfExperience: 2,
    description: 'Caching, pub/sub, distributed locks, session management, queues',
    tags: ['Caching', 'Pub/Sub', 'Distributed Locks'],
  },
  {
    name: 'Mongoose',
    category: 'Database',
    proficiency: 90,
    icon: '📚',
    yearsOfExperience: 4,
    description: 'Schema design, virtuals, middleware, population, transactions',
    tags: ['Schema', 'Virtuals', 'Population'],
  },

  // ─── DevOps ───────────────────────────────────────────────────────────────
  {
    name: 'Docker',
    category: 'DevOps',
    proficiency: 80,
    icon: '🐳',
    yearsOfExperience: 2,
    description: 'Containerization, multi-stage builds, Docker Compose, optimization',
    tags: ['Containers', 'Compose', 'Multi-stage'],
  },
  {
    name: 'AWS',
    category: 'DevOps',
    proficiency: 72,
    icon: '☁️',
    yearsOfExperience: 2,
    description: 'EC2, S3, CloudFront, Lambda, RDS, IAM, VPC configurations',
    tags: ['EC2', 'S3', 'CloudFront', 'Lambda'],
  },
  {
    name: 'Vercel',
    category: 'DevOps',
    proficiency: 92,
    icon: '▲',
    yearsOfExperience: 3,
    description: 'Deployment, edge functions, preview deployments, analytics, KV',
    tags: ['Edge Functions', 'Analytics', 'KV'],
  },
  {
    name: 'CI/CD',
    category: 'DevOps',
    proficiency: 78,
    icon: '🔄',
    yearsOfExperience: 2,
    description: 'GitHub Actions workflows, automated testing, Docker builds, deployment pipelines',
    tags: ['GitHub Actions', 'Pipelines', 'Testing'],
  },

  // ─── Tools ────────────────────────────────────────────────────────────────
  {
    name: 'Git',
    category: 'Tools',
    proficiency: 92,
    icon: '🌿',
    yearsOfExperience: 5,
    description: 'Git flow, interactive rebase, cherry-pick, bisect, submodules',
    tags: ['Git Flow', 'Rebase', 'GitHub'],
  },
  {
    name: 'Zod',
    category: 'Tools',
    proficiency: 88,
    icon: '✅',
    yearsOfExperience: 2,
    description: 'Runtime type validation, schema inference, form validation with RHF',
    tags: ['Validation', 'Schema', 'Type Safety'],
  },
  {
    name: 'Prisma',
    category: 'Tools',
    proficiency: 74,
    icon: '🔷',
    yearsOfExperience: 1,
    description: 'Type-safe ORM, migrations, relations, raw queries',
    tags: ['ORM', 'Migrations', 'Type-safe'],
  },
  {
    name: 'Figma',
    category: 'Tools',
    proficiency: 70,
    icon: '🎨',
    yearsOfExperience: 2,
    description: 'UI design, prototyping, design tokens, developer handoff',
    tags: ['UI Design', 'Prototyping', 'Handoff'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills
    .filter((s) => s.category === category)
    .sort((a, b) => b.proficiency - a.proficiency);
}

export const skillCategories: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'Tools',
];
