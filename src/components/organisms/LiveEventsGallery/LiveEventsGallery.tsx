"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { useScrollLock } from "@/lib/scroll-lock";
import type { EventGalleryItem } from "@/data/live-events";

const GALLERY_CATEGORIES = [
  "All",
  "On-Site Engraving",
  "Live Calligraphy Station",
  "Calligraphy on Products",
  "Live Sketching Station",
] as const;

type GalleryFilter = (typeof GALLERY_CATEGORIES)[number];

export function LiveEventsGallery({ items }: { items: EventGalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryFilter>("All");
  const [activeItem, setActiveItem] = useState<EventGalleryItem | null>(null);

  useScrollLock(!!activeItem);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () =>
      GALLERY_CATEGORIES.filter(
        (category) =>
          category === "All" || items.some((item) => item.category === category),
      ),
    [items],
  );

  const filtered = useMemo(
    () =>
      selected === "All"
        ? items
        : items.filter((item) => item.category === selected),
    [items, selected],
  );

  const updateControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "auto" });
    const raf = window.requestAnimationFrame(updateControls);
    window.addEventListener("resize", updateControls);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateControls);
    };
  }, [selected, updateControls]);

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
      {/* Filter pills + desktop slider arrows */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Filter event gallery by category"
          className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {categories.map((category) => {
            const isActive = selected === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(category)}
                className={`inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  isActive
                    ? "border-brand bg-brand text-white shadow-xs"
                    : "border-light bg-white text-deep hover:border-brand/50 hover:text-brand"
                }`}
              >
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={!canPrev}
              aria-label="Previous gallery highlight"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={!canNext}
              aria-label="Next gallery highlight"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-brand bg-brand text-white transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:border-light disabled:bg-white disabled:text-brand disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal snap slider */}
      <div
        ref={trackRef}
        onScroll={updateControls}
        className="no-scrollbar mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-8 sm:gap-5 sm:px-0 sm:scroll-px-0"
      >
        {filtered.map((item) => (
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
                sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
              <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-caps text-brand shadow-sm">
                {item.category}
              </span>
            </div>
            <figcaption className="p-3.5 sm:p-4">
              <p className="text-sm font-medium text-deep group-hover:text-brand transition-colors">{item.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Image Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          aria-label={activeItem.title}
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-deep/80 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="custom-scrollbar relative my-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-card border border-light bg-white shadow-artwork animate-modal-pop will-change-transform"
          >
            {/* Sticky Header with Category Badge and Close Button */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-light/60 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-3.5">
              <span className="rounded-full bg-ice px-3 py-1 text-micro font-semibold uppercase tracking-caps text-brand">
                {activeItem.category}
              </span>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close image preview"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-deep transition-all duration-200 hover:border-steel/30 hover:bg-ice hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Full Image & Title Only */}
            <div className="p-4 sm:p-6">
              <div className="relative aspect-[3/4] max-h-[68vh] w-full overflow-hidden rounded-control bg-ice shadow-xs">
                <SkeletonImage
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  sizes="(min-width: 1024px) 672px, 95vw"
                  className="object-contain bg-deep/5"
                />
              </div>

              <div className="mt-4 sm:mt-5">
                <h3 className="font-serif text-xl font-light tracking-tight text-deep sm:text-2xl">
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
