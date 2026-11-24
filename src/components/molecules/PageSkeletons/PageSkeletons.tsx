import { Container, containerClassName } from "@/components/atoms/Container";
import { ProductCardSkeleton, Skeleton, SkeletonText } from "@/components/atoms/Skeleton";

export function HomePageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading gallery">
      {/* Hero section skeleton */}
      <section className="border-b border-light bg-ice/50 py-6 sm:py-10 lg:py-14">
        <Container>
          <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="max-w-xl space-y-5">
              <div className="flex items-center gap-3">
                <Skeleton className="h-px w-8" />
                <Skeleton className="h-3.5 w-40 rounded-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-10 w-11/12 sm:h-12" />
                <Skeleton className="h-10 w-3/4 sm:h-12" />
              </div>
              <SkeletonText lines={3} />
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Skeleton className="h-12 w-full rounded-control sm:w-44" />
                <Skeleton className="h-12 w-full rounded-control sm:w-36" />
              </div>
            </div>

            <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-light bg-white shadow-artwork lg:max-w-none">
              <Skeleton className="aspect-[4/3] w-full rounded-none sm:aspect-[16/10] lg:aspect-square" />
              <div className="flex items-center justify-between gap-4 p-4 sm:p-5">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Category & featured shelves skeleton */}
      <section className="bg-white py-10 sm:py-14">
        <Container>
          <div className="max-w-xl space-y-3">
            <Skeleton className="h-3.5 w-32 rounded-full" />
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-card border border-light bg-white">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <SkeletonText lines={2} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export function CatalogPageSkeleton() {
  return (
    <div className="min-h-screen bg-ice/30 pb-24 pt-4 sm:pt-10" aria-busy="true" aria-label="Loading catalogue">
      {/* Mobile sticky bar skeleton */}
      <div className="border-b border-light bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 flex-1 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>

      <Container>
        <div className="mb-8 hidden border-b border-light pb-8 lg:block">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="mt-3 h-4 w-full max-w-lg" />
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          <aside className="hidden w-72 shrink-0 space-y-4 lg:block">
            <div className="rounded-2xl border border-light bg-white p-4">
              <Skeleton className="mb-2 h-3.5 w-28" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="rounded-2xl border border-light bg-white p-4 space-y-3">
              <Skeleton className="h-4 w-32" />
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-9 w-full rounded-lg" />
              ))}
            </div>
          </aside>

          <div className="flex-1 w-full">
            <div className="mb-6 flex items-center justify-between border-b border-light/60 pb-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="hidden h-9 w-40 rounded-lg sm:block" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-7">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-ice/30 pb-28 pt-6 sm:pt-10 lg:pb-20" aria-busy="true" aria-label="Loading artwork">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-32" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-2xl border border-light bg-white p-4">
              <Skeleton className="aspect-portrait w-full rounded-xl sm:aspect-landscape lg:aspect-[4/3]" />
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-20 shrink-0 rounded-xl" />
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-light bg-white p-6 space-y-5">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-8 w-4/5" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-36" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-12 w-28 rounded-lg" />
                <Skeleton className="h-12 flex-1 rounded-lg" />
              </div>
            </div>
            <div className="rounded-2xl border border-light bg-white p-6 space-y-3">
              <Skeleton className="h-6 w-40" />
              <SkeletonText lines={4} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function EditorialPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <section className="bg-ice py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-4 lg:col-span-6">
              <Skeleton className="h-3.5 w-36 rounded-full" />
              <Skeleton className="h-10 w-5/6 sm:h-12" />
              <Skeleton className="h-5 w-2/3" />
              <SkeletonText lines={3} />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-12 w-44 rounded-control" />
                <Skeleton className="h-12 w-36 rounded-control" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <Skeleton className="aspect-[16/10] w-full rounded-card sm:aspect-[4/3]" />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 divide-x divide-y divide-light overflow-hidden rounded-card border border-light bg-white sm:grid-cols-4 sm:divide-y-0">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2 p-4 sm:p-5">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-card border border-light bg-white">
                <Skeleton className="aspect-[16/10] w-full rounded-none" />
                <div className="space-y-3 p-6">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-6 w-3/4" />
                  <SkeletonText lines={3} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-ice/40 py-12 lg:py-16" aria-busy="true" aria-label="Loading cart">
      <div className={containerClassName}>
        <div className="border-b border-light pb-6 mb-8 space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-3.5 w-32" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-light bg-white p-4 sm:p-5">
                <Skeleton className="h-24 w-24 shrink-0 rounded-lg sm:h-32 sm:w-32" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-light bg-white p-6 space-y-4 h-fit">
            <Skeleton className="h-6 w-40" />
            <SkeletonText lines={3} />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPageSkeleton() {
  return (
    <div className="min-h-screen bg-ice/30 py-12 lg:py-16" aria-busy="true" aria-label="Loading checkout">
      <div className={containerClassName}>
        <Skeleton className="h-9 w-56 mb-8" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-light bg-white p-6 sm:p-8 space-y-5">
            <Skeleton className="h-5 w-36" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            ))}
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div className="rounded-xl border border-light bg-white p-6 space-y-4 h-fit">
            <Skeleton className="h-6 w-44" />
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Skeleton className="h-12 w-12 shrink-0 rounded" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-14" />
              </div>
            ))}
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrdersPageSkeleton() {
  return (
    <div className="min-h-screen bg-ice/30 py-8 sm:py-14" aria-busy="true" aria-label="Loading orders">
      <Container>
        <div className="border-b border-light pb-6 sm:pb-8 mb-8 space-y-2">
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-light bg-white p-5 sm:p-6 space-y-4">
              <div className="flex flex-col gap-3 border-b border-light/60 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-28 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              {[1, 2].map((row) => (
                <div key={row} className="flex items-center gap-4 py-2">
                  <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3.5 w-28" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
