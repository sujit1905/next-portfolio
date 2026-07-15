import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import HeroSection from '@/components/sections/home/HeroSection';
import FeaturedProjects from '@/components/sections/home/FeaturedProjects';
import TechMarquee from '@/components/sections/home/TechMarquee';
import HomeCTA from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = createMetadata({
  title: 'Sujit Mecwan — MERN Stack Developer',
  description:
    'Portfolio of Sujit Mecwan, a full-stack MERN developer specializing in React, Next.js, Node.js, and MongoDB. Building fast, scalable production web applications.',
  path: '/',
  keywords: ['MERN Stack Developer', 'React Developer', 'Next.js', 'Node.js', 'Freelance Developer'],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <FeaturedProjects />
      <HomeCTA />
    </>
  );
}
