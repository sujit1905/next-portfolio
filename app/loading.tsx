import { PageHeroSkeleton, ProjectCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container pt-32 pb-20 animate-pulse">
      <PageHeroSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
