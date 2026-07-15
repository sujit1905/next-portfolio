// ─── Experience & Timeline Data ──────────────────────────────────────────────
// TODO: Replace with your real work history.

export interface ExperienceEntry {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: 'full-time' | 'freelance' | 'contract' | 'internship';
  startDate: string; // ISO format YYYY-MM
  endDate: string | 'present';
  location: string;
  locationType: 'remote' | 'hybrid' | 'on-site';
  description: string;
  achievements: string[];
  techStack: string[];
  logoColors: [string, string]; // for CSS gradient logo placeholder
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'freelance-2024',
    company: 'Independent Freelance',
    role: 'Full Stack Developer (MERN)',
    type: 'freelance',
    startDate: '2023-06',
    endDate: 'present',
    location: 'Remote',
    locationType: 'remote',
    description:
      'Building production-grade web applications for startups and SMBs across e-commerce, SaaS, and social platforms. Delivering end-to-end solutions from architecture to deployment.',
    achievements: [
      'Delivered 6 production applications with 100% client satisfaction',
      'Reduced average client infra costs by 35% through architecture optimization',
      'Built an e-commerce platform processing $50k+/month in transactions',
      'Maintained 99.9% uptime across all deployed applications',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Docker', 'TypeScript'],
    logoColors: ['#d4ff3f', '#a8cc2e'],
  },
  {
    id: 'mern-dev-2022',
    company: 'TechBridge Solutions',
    companyUrl: 'https://techbridge.io',
    role: 'MERN Stack Developer',
    type: 'full-time',
    startDate: '2022-01',
    endDate: '2023-05',
    location: 'Mumbai, India',
    locationType: 'hybrid',
    description:
      'Worked as part of a 5-person engineering team building B2B SaaS tools for logistics companies. Owned the frontend architecture and collaborated closely on Node.js microservices.',
    achievements: [
      'Led the migration from CRA to Next.js, improving Lighthouse score from 52 → 91',
      'Built a real-time shipment tracking system serving 500+ daily active users',
      'Reduced API response times by 60% by introducing Redis caching layer',
      'Mentored 2 junior developers and established code review culture',
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.io'],
    logoColors: ['#0a78f2', '#0056c7'],
  },
  {
    id: 'junior-dev-2021',
    company: 'StartupNest',
    companyUrl: 'https://startupnest.in',
    role: 'Junior Web Developer',
    type: 'full-time',
    startDate: '2021-04',
    endDate: '2021-12',
    location: 'Pune, India',
    locationType: 'on-site',
    description:
      'First professional role — rapidly upskilled from vanilla JS to the full MERN stack in a fast-moving startup environment. Shipped features weekly and took ownership early.',
    achievements: [
      'Built 3 customer-facing features in first 30 days of employment',
      'Learned and shipped with React, Node.js, and MongoDB within first month',
      'Implemented a reusable component library adopted across 2 internal products',
      'Fixed critical auth bug that was blocking 200+ user signups per week',
    ],
    techStack: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'CSS3'],
    logoColors: ['#ff6b35', '#f7931e'],
  },
  {
    id: 'internship-2020',
    company: 'CodeCraft Labs',
    role: 'Web Development Intern',
    type: 'internship',
    startDate: '2020-06',
    endDate: '2020-12',
    location: 'Bangalore, India (Remote)',
    locationType: 'remote',
    description:
      'Summer internship focused on frontend development. Built 3 client-facing landing pages and contributed to an internal admin dashboard using vanilla JS and jQuery before transitioning to React.',
    achievements: [
      'Delivered 3 responsive landing pages on time and on budget',
      'Improved page load speed by 40% via lazy loading and image optimization',
      'Picked up React independently and contributed to admin dashboard within 6 weeks',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'React (self-taught)'],
    logoColors: ['#7c3aed', '#5b21b6'],
  },
];

// ─── Career Milestones (for About page timeline) ──────────────────────────────
export interface Milestone {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export const milestones: Milestone[] = [
  {
    year: 2024,
    title: 'Full-time Freelancing',
    description: 'Went independent — building production apps for startups and scaling up.',
    icon: '🚀',
  },
  {
    year: 2023,
    title: 'Open Source Milestone',
    description: 'DevMetrics hit 500+ GitHub stars. First significant OSS contribution.',
    icon: '⭐',
  },
  {
    year: 2022,
    title: 'MERN Stack Developer at TechBridge',
    description: 'Joined a product team, shipped real-time logistics tools at scale.',
    icon: '💼',
  },
  {
    year: 2021,
    title: 'First Production Code',
    description: 'Shipped my first full-stack feature to 5,000+ users. Addicted ever since.',
    icon: '🎯',
  },
  {
    year: 2020,
    title: 'Internship & React Discovery',
    description: 'Built first client projects. Discovered React and never looked back.',
    icon: '💡',
  },
  {
    year: 2019,
    title: 'Started Coding',
    description: 'HTML, CSS, JavaScript. Built terrible websites. Loved every second of it.',
    icon: '🌱',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getCurrentRole(): ExperienceEntry | undefined {
  return experiences.find((e) => e.endDate === 'present');
}

export function getExperienceYears(): number {
  const earliest = experiences.reduce((min, e) => {
    const year = parseInt(e.startDate.split('-')[0]);
    return year < min ? year : min;
  }, new Date().getFullYear());
  return new Date().getFullYear() - earliest;
}
