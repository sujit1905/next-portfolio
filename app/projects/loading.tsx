import { ProjectCardSkeleton } from '@/components/ui/Skeleton';

export default function ProjectsLoading() {
  return (
    <div className="pt-40 pb-16">
      <div className="container">
        <div className="h-4 w-24 bg-surface-2 rounded-full animate-pulse mb-4" />
        <div className="h-16 w-64 bg-surface-2 rounded-xl animate-pulse mb-4" />
        <div className="h-5 w-80 bg-surface-2 rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
