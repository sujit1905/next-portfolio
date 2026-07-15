// ─── Shared Metadata Factory ─────────────────────────────────────────────────
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sujitmecwan.dev';

export const siteConfig = {
  name: 'Sujit Mecwan',
  title: 'Sujit Mecwan — MERN Stack Developer',
  description:
    'Full-stack engineer specializing in React, Next.js, Node.js, Express, and MongoDB. Building fast, scalable, production-grade web applications.',
  url: siteUrl,
  email: 'mecwansujit@gmail.com',
  github: 'https://github.com/sujitmecwan',
  linkedin: 'https://linkedin.com/in/sujitmecwan',
  twitter: 'https://twitter.com/sujitmecwan',
  location: 'India',
  availability: 'Open to opportunities',
  keywords: [
    'MERN Stack Developer',
    'Full Stack Engineer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'MongoDB',
    'Express.js',
    'TypeScript',
    'Web Developer',
    'Sujit Mecwan',
    'Freelance Developer',
    'JavaScript Developer',
  ],
};

interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  keywords = [],
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = `${siteConfig.url}${path}`;
  const ogImage = image || `${siteConfig.url}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      creator: '@sujitmecwan',
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

// ─── JSON-LD Schemas ─────────────────────────────────────────────────────────
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sujit Mecwan',
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: 'MERN Stack Developer',
    description: siteConfig.description,
    sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.twitter],
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'Express.js',
      'TypeScript',
      'Full Stack Web Development',
      'MERN Stack',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { '@type': 'Person', name: 'Sujit Mecwan' },
  };
}

export function articleSchema({
  title,
  description,
  date,
  slug,
  tags,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: 'Sujit Mecwan',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: 'Sujit Mecwan',
    },
    url: `${siteConfig.url}/blog/${slug}`,
    keywords: tags.join(', '),
  };
}

export function softwareApplicationSchema({
  name,
  description,
  url,
  techStack,
}: {
  name: string;
  description: string;
  url?: string;
  techStack: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    author: {
      '@type': 'Person',
      name: 'Sujit Mecwan',
    },
    applicationCategory: 'WebApplication',
    url,
    keywords: techStack.join(', '),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
