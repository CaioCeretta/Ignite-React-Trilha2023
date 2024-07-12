import { Skeleton } from '@/components/ui/skeleton'

export function MetricCardSkeleton() {
  return (
    <>
      {/* Normally, with skeletons, we want the height to be the same height as the font */}
      <Skeleton className="h-7 w-36" />
      <Skeleton className="h-4 w-52" />
    </>
  )
}
