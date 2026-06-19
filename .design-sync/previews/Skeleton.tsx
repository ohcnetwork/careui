import { Skeleton } from "careui";

export function TextLines() {
  return (
    <div className="w-64 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

export function Avatar() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

export function Card() {
  return (
    <div className="w-72 rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-1.5 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-24 w-full rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function Shapes() {
  return (
    <div className="flex gap-4 items-end">
      <Skeleton className="size-8 rounded" />
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-4 w-32 rounded" />
      <Skeleton className="h-8 w-24 rounded-md" />
    </div>
  );
}
