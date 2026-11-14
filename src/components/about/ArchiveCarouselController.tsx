"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArchiveCategory {
  name: string;
  count: number;
}

export function ArchiveCarouselController({
  categories,
  children,
}: {
  categories: ArchiveCategory[];
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(categories[0]?.count ?? 0);

  const moveTo = (index: number) => {
    const track = trackRef.current;
    const slides = track
      ? Array.from(track.querySelectorAll<HTMLElement>("[data-archive-slide]:not([hidden])"))
      : [];
    const slide = slides[index];
    if (!track || !slide) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    slide.scrollIntoView({ behavior, block: "nearest", inline: "start" });
    setActiveIndex(index);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const openButton = event.target.closest<HTMLButtonElement>("[data-archive-open]");
      if (openButton) {
        const dialogId = openButton.dataset.archiveOpen;
        const dialog = root.querySelector<HTMLDialogElement>(
          `[data-archive-dialog="${CSS.escape(dialogId ?? "")}"]`
        );
        if (dialog && !dialog.open) dialog.showModal();
        return;
      }

      const closeButton = event.target.closest<HTMLButtonElement>("[data-archive-close]");
      if (closeButton) {
        closeButton.closest("dialog")?.close();
        return;
      }

      if (event.target instanceof HTMLDialogElement && event.target.open) {
        event.target.close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const dialog = root.querySelector<HTMLDialogElement>("dialog[open]");
      if (!dialog) return;

      event.preventDefault();
      dialog.close();
    };

    root.addEventListener("click", handleClick);
    root.addEventListener("keydown", handleKeyDown);
    return () => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const selectCategory = (category: string) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-archive-slide]"));
    let count = 0;
    slides.forEach((slide) => {
      const isVisible = category === "All" || slide.dataset.category === category;
      slide.hidden = !isVisible;
      if (isVisible) count += 1;
    });

    setActiveCategory(category);
    setActiveIndex(0);
    setVisibleCount(count);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    track
      .querySelector<HTMLElement>("[data-archive-slide:not([hidden])]")
      ?.scrollIntoView({ behavior, block: "nearest", inline: "start" });
  };

  const moveBy = (direction: -1 | 1) => {
    moveTo(Math.max(0, Math.min(visibleCount - 1, activeIndex + direction)));
  };

  return (
    <div ref={rootRef}>
      <div className="mt-6 flex flex-col gap-5 sm:mt-9 lg:flex-row lg:items-end lg:justify-between">
        <div
          className="no-scrollbar flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Filter archive by category"
        >
          {categories.map((category) => {
            const active = activeCategory === category.name;

            return (
              <button
                key={category.name}
                type="button"
                aria-pressed={active}
                onClick={() => selectCategory(category.name)}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-medium transition-[background-color,border-color,color] duration-300 sm:min-h-11 sm:text-sm ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-light bg-white text-steel hover:border-soft hover:text-deep"
                }`}
              >
                {category.name}
                <span className={`text-micro ${active ? "text-light" : "text-mist"}`}>
                  {String(category.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <p className="font-mono text-xs text-steel" aria-live="polite">
            <span className="font-semibold text-brand">
              {String(Math.min(activeIndex + 1, visibleCount)).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-mist" aria-hidden="true">/</span>
            {String(visibleCount).padStart(2, "0")} projects
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveBy(-1)}
              disabled={activeIndex === 0}
              aria-label="Previous archive project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => moveBy(1)}
              disabled={activeIndex >= visibleCount - 1}
              aria-label="Next archive project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand bg-brand text-white transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Exhibition and collaboration projects"
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={(event) => {
          const track = event.currentTarget;
          const slides = Array.from(
            track.querySelectorAll<HTMLElement>("[data-archive-slide]:not([hidden])")
          );
          const frame = track.getBoundingClientRect();
          const isRtl = getComputedStyle(track).direction === "rtl";
          let nearestIndex = 0;
          let nearestDistance = Number.POSITIVE_INFINITY;

          slides.forEach((slide, index) => {
            const bounds = slide.getBoundingClientRect();
            const distance = isRtl
              ? Math.abs(frame.right - bounds.right)
              : Math.abs(bounds.left - frame.left);
            if (distance < nearestDistance) {
              nearestDistance = distance;
              nearestIndex = index;
            }
          });
          setActiveIndex(nearestIndex);
        }}
        className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-4 focus-visible:rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:-mx-8 sm:mt-7 sm:gap-5 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0"
      >
        {children}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5" aria-label="Choose archive project">
        {Array.from({ length: visibleCount }, (_, index) => (
          <button
            key={`${activeCategory}-${index}`}
            type="button"
            onClick={() => moveTo(index)}
            aria-label={`Show project ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className="flex h-8 items-center justify-center px-1 focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          >
            <span className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
              activeIndex === index ? "w-7 bg-brand" : "w-1.5 bg-soft hover:bg-steel"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}
