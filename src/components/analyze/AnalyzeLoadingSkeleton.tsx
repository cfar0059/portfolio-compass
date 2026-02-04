import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AnalyzeLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stock Header Skeleton */}
      <Card className="bg-card border-border rounded-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Analysis Skeleton */}
      <Card className="bg-card border-border rounded-xl">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-32" />
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-2 w-full max-w-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyst Consensus Skeleton */}
      <Card className="bg-card border-border rounded-xl">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-8 w-16 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
