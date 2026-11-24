"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import type { EventGalleryItem } from "@/data/live-events";

const GALLERY_CATEGORIES = [
  "All",
  "Engraving",
  "Station",
  "Products",
  "Live Sketching",
] as const;

type GalleryFilter = (typeof GALLERY_CATEGORIES)[number];

export function LiveEventsGallery({ items }: { items: EventGalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryFilter>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(
    () =>
      GALLERY_CATEGORIES.map((category) => ({
        name: category,
        count:
          category === "All"
            ? items.length
            : items.filter((item) => item.category === category).length,
      })).filter((entry) => entry.name === "All" || entry.count > 0),
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

    const firstCard = track.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 20;
      const step = firstCard.offsetWidth + gap;
      if (step > 0) {
        const idx = Math.min(
          filtered.length - 1,
          Math.max(0, Math.round(track.scrollLeft / step)),
        );
        setActiveIndex(idx);
      }
    }
  }, [filtered.length]);

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
      {/* Filter pills + desktop slider counter & arrows (matching Visual Archive UI/UX) */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Filter event gallery by category"
          className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          {counts.map((category) => {
            const isActive = selected === category.name;
            return (
              <button
                key={category.name}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelected(category.name)}
                className={`inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${
                  isActive
                    ? "border-brand bg-brand text-white shadow-xs"
                    : "border-light bg-white text-deep hover:border-brand/50 hover:text-brand"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`font-mono text-[11px] ${
                    isActive ? "text-white/80" : "text-steel"
                  }`}
                >
                  {String(category.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="font-mono text-xs text-steel">
            <strong className="font-semibold text-deep">
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>{" "}
            / {String(filtered.length).padStart(2, "0")} highlights
          </span>
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
        {filtered.map((item, idx) => (
          <figure
            key={item.id}
            className="group relative flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand/40 sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-3.75rem)/4)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ice">
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
              <span className="absolute end-3 top-3 rounded-full bg-deep/55 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-xs">
                {String(idx + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="p-3.5 sm:p-4">
              <p className="text-sm font-medium text-deep">{item.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
