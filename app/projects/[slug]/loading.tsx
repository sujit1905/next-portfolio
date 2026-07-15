import { Skeleton } from '@/components/ui/Skeleton';

export default function ProjectSlugLoading() {
  return (
    <div className="pt-32 pb-20">
      <div className="container">
        <div className="flex gap-2 mb-8">
          {[1,2,3].map(i => <Skeleton key={i} className="h-4 w-16" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-16 w-3/4" />
            <Skeleton className="h-16 w-1/2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-10 w-28 rounded-xl" />
              <Skeleton className="h-10 w-24 rounded-xl" />
            </div>
          </div>
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
