"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import type { WorkshopGalleryItem } from "@/data/workshops";

export function WorkshopsGallery({ items }: { items: WorkshopGalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

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
          items.length - 1,
          Math.max(0, Math.round(track.scrollLeft / step)),
        );
        setActiveIndex(idx);
      }
    }
  }, [items.length]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(updateControls);
    window.addEventListener("resize", updateControls);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateControls);
    };
  }, [updateControls]);

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
      {/* Desktop slider counter & arrows matching Portfolio Highlights */}
      <div className="hidden items-center justify-end gap-3 md:flex">
        <span className="font-mono text-xs text-steel">
          <strong className="font-semibold text-deep">
            {String(activeIndex + 1).padStart(2, "0")}
          </strong>{" "}
          / {String(items.length).padStart(2, "0")} moments
        </span>
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
        {items.map((item, idx) => (
          <figure
            key={item.id}
            className="group relative flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand/40 sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ice">
              <SkeletonImage
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
              <span className="absolute end-3 top-3 rounded-full bg-deep/55 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-xs">
                {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <figcaption className="p-4 sm:p-5">
              <p className="text-sm font-medium text-deep sm:text-base">{item.title}</p>
              <p className="mt-1 text-xs text-steel">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
