import { Skeleton } from "~/components/ui/skeleton";

export default function TasksLoading() {
  return (
    <div className="container mx-auto space-y-6 px-6 py-10 md:px-0">
      {/* Table skeleton */}
      <div className="rounded-md border">
        {/* Table header */}
        <div className="border-b bg-slate-50/50 p-4">
          <div className="flex space-x-4">
            {[300, 100, 120, 120, 120, 150, 100].map((width, i) => (
              <Skeleton key={i} className={`h-4 w-[${width}px]`} />
            ))}
          </div>
        </div>

        {/* Table rows */}
        <div className="divide-y">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
