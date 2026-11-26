"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import type { WorkshopGalleryItem } from "@/data/workshops";

export function WorkshopsGallery({ items }: { items: WorkshopGalleryItem[] }) {
  const [activeItem, setActiveItem] = useState<WorkshopGalleryItem | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const raf = window.requestAnimationFrame(updateControls);
    window.addEventListener("resize", updateControls);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 20;
    track.scrollBy({
      left: (card.offsetWidth + gap) * direction,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-6 sm:mt-8">
      {/* Desktop slider arrows */}
      <div className="hidden items-center justify-end gap-2 md:flex">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canPrev}
            aria-label="Previous classroom moment"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canNext}
            aria-label="Next classroom moment"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand bg-brand text-white transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:border-light disabled:bg-white disabled:text-brand disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Horizontal snap slider */}
      <div
        ref={trackRef}
        onScroll={updateControls}
        className="no-scrollbar mt-5 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-6 sm:gap-5 sm:px-0 sm:scroll-px-0"
      >
        {items.map((item) => (
          <figure
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative flex w-[78vw] max-w-[300px] shrink-0 snap-start cursor-pointer flex-col overflow-hidden rounded-card border border-light bg-white transition-all hover:border-brand/50 hover:shadow-md sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-3.75rem)/4)]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-ice">
              <SkeletonImage
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
            </div>
            <figcaption className="p-4 sm:p-5">
              <p className="text-sm font-medium text-deep sm:text-base group-hover:text-brand transition-colors">{item.title}</p>
              <p className="mt-1 text-xs text-steel">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Image Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative aspect-[3/4] max-h-[68vh] w-full overflow-hidden bg-ice">
              <SkeletonImage
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                sizes="(min-width: 1024px) 672px, 95vw"
                className="object-contain bg-deep/5"
              />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close image preview"
                className="absolute end-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-deep/60 text-white backdrop-blur-md transition-colors hover:bg-deep"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4 sm:p-5 bg-white border-t border-light">
              <h3 className="font-serif text-lg font-normal text-deep">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-steel line-clamp-2">
                {activeItem.caption || activeItem.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
