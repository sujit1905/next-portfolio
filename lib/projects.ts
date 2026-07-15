// ─── Project Data Layer ───────────────────────────────────────────────────────
// TODO: Replace placeholder content with your real projects.
// Each project maps to /projects/[slug] and a case-study page.

export type ProjectCategory = 'MERN' | 'Next.js' | 'Full Stack' | 'Open Source';

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  devops: string[];
  tools: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  featured: boolean;
  status: 'live' | 'in-progress' | 'archived';
  year: number;
  role: string;
  problemStatement: string;
  solution: string;
  techStack: TechStack;
  keyFeatures: string[];
  challenges: { problem: string; solution: string }[];
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  mockupColors: [string, string, string]; // gradient colors for CSS mockup
  tags: string[];
  order: number;
}

export const projects: Project[] = [
  {
    slug: 'nexmart-ecommerce',
    title: 'NexMart',
    tagline: 'Full-featured MERN e-commerce platform with real-time inventory',
    description:
      'A production-ready e-commerce platform built with the MERN stack, featuring real-time inventory management, Stripe payments, and an admin dashboard.',
    longDescription:
      'NexMart is a comprehensive e-commerce solution I built from scratch to solve the limitations of existing platforms — slow performance, poor mobile experience, and rigid admin tools. The platform supports thousands of concurrent users, features real-time inventory sync via WebSockets, and achieves sub-2s page loads through aggressive caching and code splitting.',
    category: ['MERN', 'Full Stack'],
    featured: true,
    status: 'live',
    year: 2024,
    role: 'Full Stack Developer',
    problemStatement:
      'Small-to-medium retailers needed an affordable, customizable e-commerce solution that could handle flash sales without crashing, with inventory that updates in real time across multiple admin sessions.',
    solution:
      'Built a MERN-stack platform with Redis-backed session management, WebSocket-powered live inventory updates, optimistic UI for cart operations, and a CDN-delivered React frontend with SSR for product pages.',
    techStack: {
      frontend: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express', 'Socket.io', 'Redis'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['AWS EC2', 'AWS S3', 'CloudFront', 'Docker'],
      tools: ['Stripe API', 'SendGrid', 'Cloudinary', 'GitHub Actions'],
    },
    keyFeatures: [
      'Real-time inventory sync via WebSockets across admin sessions',
      'Stripe payment integration with webhook handling',
      'Advanced product filtering with MongoDB aggregation pipelines',
      'Admin dashboard with live order tracking and analytics',
      'Cloudinary-powered image optimization and CDN delivery',
      'JWT + refresh token auth with Redis session blacklisting',
    ],
    challenges: [
      {
        problem: 'Flash sale events caused race conditions in inventory deduction, leading to overselling.',
        solution:
          'Implemented MongoDB atomic operations with findOneAndUpdate + $inc, combined with Redis distributed locks (Redlock) for high-throughput scenarios.',
      },
      {
        problem: 'Product search was slow on a 100k-product catalog.',
        solution:
          'Added MongoDB Atlas Search (Lucene-based) with compound indexes, reducing p95 search latency from 800ms to 45ms.',
      },
    ],
    metrics: [
      '10,000+ products indexed',
      'Sub-50ms search latency',
      '99.9% uptime on AWS',
      'Stripe payment success rate: 98.7%',
    ],
    liveUrl: 'https://nexmart-demo.vercel.app',
    githubUrl: 'https://github.com/sujitmecwan/nexmart',
    mockupColors: ['#1a1a2e', '#d4ff3f', '#16213e'],
    tags: ['E-Commerce', 'MERN', 'Redis', 'WebSockets', 'Stripe', 'AWS'],
    order: 1,
  },
  {
    slug: 'syncchat-realtime',
    title: 'SyncChat',
    tagline: 'Real-time messaging platform with end-to-end encryption',
    description:
      'A WhatsApp-inspired real-time chat app with rooms, direct messages, file sharing, and read receipts — built for 10,000+ concurrent connections.',
    longDescription:
      'SyncChat was born from a need for a self-hosted, privacy-first messaging solution. Built on Socket.io with horizontal scaling via Redis pub/sub, it handles 10,000+ concurrent WebSocket connections on commodity hardware. Features E2E encryption, file sharing via AWS S3, and a full mobile-responsive React UI.',
    category: ['MERN', 'Full Stack'],
    featured: true,
    status: 'live',
    year: 2024,
    role: 'Full Stack Developer',
    problemStatement:
      'Teams needed a self-hosted messaging solution with real privacy guarantees — not a SaaS product where their messages live on someone else\'s servers.',
    solution:
      'Built a Node.js/Socket.io backend with Redis pub/sub for multi-instance horizontal scaling, client-side AES-256 encryption, and S3 for encrypted file attachments.',
    techStack: {
      frontend: ['React', 'Context API', 'Tailwind CSS', 'Socket.io Client'],
      backend: ['Node.js', 'Express', 'Socket.io', 'Redis'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['Docker', 'Docker Compose', 'AWS S3', 'Nginx'],
      tools: ['CryptoJS', 'Multer', 'Sharp', 'JWT'],
    },
    keyFeatures: [
      'End-to-end encryption with client-side AES-256',
      '10,000+ concurrent WebSocket connections via Redis pub/sub',
      'Real-time typing indicators and read receipts',
      'File and image sharing with S3 + Sharp compression',
      'Group rooms with role-based permissions (admin/member)',
      'Message search with full-text MongoDB indexing',
    ],
    challenges: [
      {
        problem: 'WebSocket connections became unmanageable when scaling to multiple Node.js instances.',
        solution:
          'Integrated Redis pub/sub as a Socket.io adapter, enabling any server instance to route messages to any connected client regardless of which instance they\'re connected to.',
      },
    ],
    metrics: [
      '10,000+ concurrent connections tested',
      '< 50ms message delivery latency',
      'Horizontal scaling to 4 Node.js instances',
      'Docker deployment in under 2 minutes',
    ],
    liveUrl: 'https://syncchat-demo.vercel.app',
    githubUrl: 'https://github.com/sujitmecwan/syncchat',
    mockupColors: ['#0d1b2a', '#d4ff3f', '#1b263b'],
    tags: ['Real-Time', 'WebSockets', 'Socket.io', 'E2E Encryption', 'Redis', 'MERN'],
    order: 2,
  },
  {
    slug: 'taskflow-saas',
    title: 'TaskFlow',
    tagline: 'Team project management SaaS with drag-and-drop Kanban boards',
    description:
      'A Jira-inspired project management tool built with Next.js and Node.js, featuring Kanban boards, sprint planning, time tracking, and team collaboration.',
    longDescription:
      'TaskFlow is a full-stack SaaS product management tool. The frontend uses Next.js 14 App Router with server components for fast initial loads, while real-time updates arrive via WebSockets. Multi-tenant architecture ensures complete data isolation between organizations.',
    category: ['Next.js', 'Full Stack'],
    featured: true,
    status: 'live',
    year: 2023,
    role: 'Lead Developer',
    problemStatement:
      'Small dev teams needed a lighter, faster alternative to Jira — without the enterprise pricing or the complexity of features they\'d never use.',
    solution:
      'Built a multi-tenant Next.js SaaS with row-level security in MongoDB, drag-and-drop Kanban via @hello-pangea/dnd, real-time notifications, and a clean subscription model via Stripe.',
    techStack: {
      frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', '@hello-pangea/dnd'],
      backend: ['Node.js', 'Express', 'Socket.io'],
      database: ['MongoDB', 'Redis (session cache)'],
      devops: ['Vercel', 'Railway', 'MongoDB Atlas'],
      tools: ['Stripe', 'Resend', 'Cloudinary', 'Zod'],
    },
    keyFeatures: [
      'Drag-and-drop Kanban boards with optimistic UI updates',
      'Sprint planning with velocity tracking',
      'Real-time notifications and activity feeds',
      'Multi-tenant with complete org-level data isolation',
      'Time tracking with per-task logs and weekly summaries',
      'Stripe subscription billing with usage-based limits',
    ],
    challenges: [
      {
        problem: 'Drag-and-drop state needed to sync across multiple browser tabs in real time without conflicts.',
        solution:
          'Used optimistic UI updates locally + debounced WebSocket broadcasts to sync state across tabs, with server as source of truth for conflict resolution.',
      },
    ],
    metrics: [
      '50+ teams onboarded in beta',
      'Average session duration: 28 minutes',
      'Task completion rate 40% higher vs. spreadsheets (user surveys)',
      'Stripe MRR growing 15% month-over-month',
    ],
    liveUrl: 'https://taskflow-saas.vercel.app',
    githubUrl: 'https://github.com/sujitmecwan/taskflow',
    mockupColors: ['#0a0a1a', '#d4ff3f', '#1a0a2e'],
    tags: ['SaaS', 'Next.js', 'Multi-tenant', 'Kanban', 'Stripe', 'TypeScript'],
    order: 3,
  },
  {
    slug: 'ai-recipe-finder',
    title: 'RecipeAI',
    tagline: 'AI-powered recipe generator from pantry ingredients',
    description:
      'Upload a photo of your fridge or type in ingredients, and get personalized recipes generated by GPT-4 with step-by-step instructions and nutritional data.',
    longDescription:
      'RecipeAI combines computer vision (Google Vision API) with OpenAI GPT-4 to generate personalized recipes from whatever ingredients the user has available. The app includes a meal planner, grocery list generator, and dietary preference engine.',
    category: ['Full Stack', 'Next.js'],
    featured: false,
    status: 'live',
    year: 2024,
    role: 'Full Stack Developer',
    problemStatement:
      '"What should I cook tonight?" — a universal problem. Most recipe apps require you to already know what you want. RecipeAI flips the model: start with what you have.',
    solution:
      'Integrated Google Vision API for ingredient detection from photos, streamed GPT-4 responses via Edge API routes for low latency, and cached popular ingredient combinations in Redis to reduce AI API costs by 60%.',
    techStack: {
      frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Next.js API Routes (Edge)', 'Node.js'],
      database: ['MongoDB', 'Redis'],
      devops: ['Vercel', 'Vercel KV'],
      tools: ['OpenAI GPT-4', 'Google Vision API', 'Spoonacular API', 'Stripe'],
    },
    keyFeatures: [
      'Photo-to-ingredients via Google Vision API',
      'Streamed AI recipe generation (no long loading wait)',
      'Dietary filter engine (vegan, gluten-free, keto, etc.)',
      'Weekly meal planner with grocery list export',
      'Nutritional breakdown via Spoonacular API',
      'Recipe saving, rating, and sharing',
    ],
    challenges: [
      {
        problem: 'GPT-4 API calls had 3-5s latency, making the UX feel slow.',
        solution:
          'Switched to streaming responses via Next.js Edge API routes with `TransformStream`, showing recipe content character-by-character as it arrived — perceived wait time dropped to <0.5s.',
      },
    ],
    metrics: [
      '2,000+ recipes generated in beta',
      '60% AI API cost reduction via Redis caching',
      '<500ms perceived load time with streaming',
      '4.8/5 average user rating',
    ],
    liveUrl: 'https://recipeai-demo.vercel.app',
    githubUrl: 'https://github.com/sujitmecwan/recipe-ai',
    mockupColors: ['#1a1200', '#d4ff3f', '#2a1e00'],
    tags: ['AI', 'GPT-4', 'Next.js', 'Edge Functions', 'Vision API', 'Streaming'],
    order: 4,
  },
  {
    slug: 'devmetrics-dashboard',
    title: 'DevMetrics',
    tagline: 'GitHub analytics dashboard for individual developers and OSS projects',
    description:
      'A real-time GitHub analytics dashboard that tracks commits, PRs, code review velocity, contributor trends, and repo health scores.',
    longDescription:
      'DevMetrics pulls from the GitHub REST and GraphQL APIs to surface insights that GitHub\'s built-in analytics don\'t provide — like code review velocity, bus factor analysis, and contribution heatmaps normalized for team size.',
    category: ['Full Stack', 'Open Source'],
    featured: false,
    status: 'live',
    year: 2023,
    role: 'Full Stack Developer',
    problemStatement:
      'Engineering managers needed data-driven insights about team productivity and repo health without expensive enterprise GitHub plans.',
    solution:
      'Built a Next.js dashboard that aggregates GitHub GraphQL + REST data, caches it in MongoDB with a 1-hour TTL, and renders interactive charts via Recharts — all open source and self-hostable.',
    techStack: {
      frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      backend: ['Next.js API Routes', 'Octokit (GitHub SDK)'],
      database: ['MongoDB', 'Mongoose'],
      devops: ['Vercel', 'MongoDB Atlas'],
      tools: ['GitHub GraphQL API', 'NextAuth.js', 'date-fns'],
    },
    keyFeatures: [
      'GitHub OAuth with NextAuth.js — zero manual token management',
      'Commit heatmaps and contribution streaks',
      'PR cycle time and review velocity analytics',
      'Bus factor analysis (knowledge concentration risk)',
      'Repo health score (test coverage, CI status, docs quality)',
      'CSV export of all analytics data',
    ],
    challenges: [
      {
        problem: 'GitHub API rate limits (5,000 req/hr) hit quickly for active repos.',
        solution:
          'Implemented a MongoDB cache layer with 1-hour TTL and exponential backoff retry logic. For large repos, paginated GraphQL queries are batched and cached incrementally.',
      },
    ],
    metrics: [
      '500+ GitHub stars (open source)',
      '200+ self-hosted installations',
      'Handles repos with 10,000+ commits',
      'Average dashboard load: 1.2s',
    ],
    liveUrl: 'https://devmetrics.vercel.app',
    githubUrl: 'https://github.com/sujitmecwan/devmetrics',
    mockupColors: ['#0a1628', '#d4ff3f', '#0d2137'],
    tags: ['Open Source', 'GitHub API', 'Next.js', 'Analytics', 'GraphQL', 'Recharts'],
    order: 5,
  },
  {
    slug: 'socialflow-platform',
    title: 'SocialFlow',
    tagline: 'Social media scheduling and analytics platform for creators',
    description:
      'Schedule posts across Twitter/X, Instagram, and LinkedIn from one dashboard, with AI-generated caption suggestions and engagement analytics.',
    longDescription:
      'SocialFlow streamlines social media management for independent creators and small agencies. AI-powered caption generation, optimal posting time recommendations, and a unified analytics dashboard make it a one-stop shop for growing a social media presence.',
    category: ['MERN', 'Full Stack'],
    featured: false,
    status: 'in-progress',
    year: 2024,
    role: 'Full Stack Developer',
    problemStatement:
      'Content creators were juggling 3-5 different tools for scheduling, analytics, and caption writing — an expensive and fragmented workflow.',
    solution:
      'Built a unified MERN platform that connects to social APIs, uses GPT-4 for caption generation, and runs scheduled jobs via cron workers in Node.js for reliable post publishing.',
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'react-calendar'],
      backend: ['Node.js', 'Express', 'Bull Queue', 'Redis'],
      database: ['MongoDB', 'Redis'],
      devops: ['Railway', 'AWS S3', 'Cloudflare'],
      tools: ['Twitter API v2', 'Instagram Graph API', 'LinkedIn API', 'OpenAI', 'Stripe'],
    },
    keyFeatures: [
      'Cross-platform post scheduling (Twitter/X, Instagram, LinkedIn)',
      'AI caption generator with tone and hashtag options',
      'Optimal posting time recommendations via engagement ML model',
      'Unified analytics across all connected platforms',
      'Media library with S3 storage and Cloudinary optimization',
      'Team collaboration with approval workflow',
    ],
    challenges: [
      {
        problem: 'Social API rate limits and authentication complexity across three platforms.',
        solution:
          'Abstracted each platform behind a unified PostService interface, handling OAuth token refresh, rate limit queuing via Bull, and platform-specific media format validation.',
      },
    ],
    metrics: [
      '100+ beta users',
      '5,000+ posts scheduled',
      '3x faster publishing workflow vs. manual posting',
      'In active development',
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/sujitmecwan/socialflow',
    mockupColors: ['#1a0a28', '#d4ff3f', '#2a0a3e'],
    tags: ['Social Media', 'MERN', 'Bull Queue', 'AI', 'Multi-Platform', 'Scheduling'],
    order: 6,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category.includes(category)).sort((a, b) => a.order - b.order);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export const projectCategories: ProjectCategory[] = ['MERN', 'Next.js', 'Full Stack', 'Open Source'];
