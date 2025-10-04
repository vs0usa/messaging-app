import { Skeleton } from "@repo/ui/components/skeleton"

export const MessagesRecipientSkeleton = () => (
  <div className="size-full space-y-4 overflow-y-auto p-4">
    <div className="flex min-h-14 w-full gap-2 p-2">
      <Skeleton className="size-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
    <div className="flex min-h-14 w-full gap-2 p-2">
      <Skeleton className="size-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-8 rounded" />
          <Skeleton className="h-4 w-10 rounded" />
        </div>
      </div>
    </div>{" "}
    <div className="flex min-h-14 w-full gap-2 p-2">
      <Skeleton className="size-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-8 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
      </div>
    </div>{" "}
    <div className="flex min-h-14 w-full gap-2 p-2">
      <Skeleton className="size-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>{" "}
    <div className="flex min-h-14 w-full gap-2 p-2">
      <Skeleton className="size-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-1">
          <Skeleton className="h-4 w-32 rounded" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          <Skeleton className="h-4 w-10 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  </div>
)
