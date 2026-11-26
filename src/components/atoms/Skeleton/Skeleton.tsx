import type { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "light" | "dark";
}

/** Smooth shimmer block matched to the Sumaira Arts surface palette. */
export function Skeleton({ className = "", tone = "light", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`${tone === "dark" ? "skeleton-shimmer-dark" : "skeleton-shimmer"} rounded-md ${className}`}
      {...props}
    />
  );
}

/** Multi-line text skeleton with tapered last line. */
export function SkeletonText({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={`h-3.5 ${idx === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

/** Layout-identical shimmer card matching `ProductCard` proportions. */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-light bg-white"
    >
      <Skeleton className="aspect-[4/3] w-full shrink-0 rounded-none sm:aspect-[5/4] lg:aspect-[4/3]" />
      <div className="flex flex-1 flex-col justify-between px-2.5 py-2 sm:p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-16 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-4 w-4/5 sm:h-5" />
          <Skeleton className="h-3.5 w-3/5" />
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 border-t border-light/70 pt-1 sm:mt-4 sm:pt-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-11 w-11 shrink-0 rounded-lg sm:h-8 sm:w-20" />
        </div>
      </div>
    </div>
  );
}
