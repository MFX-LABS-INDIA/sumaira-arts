"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon, PauseIcon, PlayIcon } from "@/components/ui/Icons";

type Labels = {
  slide: string;
  of: string;
  previous: string;
  next: string;
  goTo: string;
  pause: string;
  play: string;
};

const round =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-deep";

/**
 * Drives the hero carousel without owning its words. The slides are server-rendered with `data-hero-slide`
 * and `data-index`; this only flips `data-active` / `inert` on them (the CSS does the fading), so no copy or
 * image list is shipped to the client. The progress bar's CSS animation is the timer: when it ends, the next
 * slide shows, and pausing the animation pauses the carousel.
 */
export function HeroControls({ count, interval = 7, labels }: { count: number; interval?: number; labels: Labels }) {
  const root = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const paused = userPaused || interacting;

  const go = useCallback((to: number) => setIndex(((to % count) + count) % count), [count]);

  // Show the current slide: flip data-active and inert on every slide element.
  useEffect(() => {
    const section = root.current?.closest("section");
    section?.querySelectorAll<HTMLElement>("[data-hero-slide]").forEach((slide) => {
      const active = Number(slide.dataset.index) === index;
      slide.dataset.active = String(active);
      slide.toggleAttribute("inert", !active);
    });
  }, [index]);

  // Pause while the pointer or keyboard focus is in the hero, announce changes only when not autoplaying,
  // and let a horizontal swipe change slide.
  useEffect(() => {
    const section = root.current?.closest("section");
    if (!section) return;

    section.querySelector<HTMLElement>("[data-hero-content]")?.setAttribute("aria-live", paused ? "polite" : "off");

    const hold = () => setInteracting(true);
    const release = () => setInteracting(false);
    let startX = 0;
    const onStart = (event: TouchEvent) => {
      startX = event.touches[0]?.clientX ?? 0;
    };
    const onEnd = (event: TouchEvent) => {
      const dx = (event.changedTouches[0]?.clientX ?? 0) - startX;
      if (Math.abs(dx) > 50) setIndex((current) => (((current + (dx < 0 ? 1 : -1)) % count) + count) % count);
    };

    section.addEventListener("mouseenter", hold);
    section.addEventListener("mouseleave", release);
    section.addEventListener("focusin", hold);
    section.addEventListener("focusout", release);
    section.addEventListener("touchstart", onStart, { passive: true });
    section.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      section.removeEventListener("mouseenter", hold);
      section.removeEventListener("mouseleave", release);
      section.removeEventListener("focusin", hold);
      section.removeEventListener("focusout", release);
      section.removeEventListener("touchstart", onStart);
      section.removeEventListener("touchend", onEnd);
    };
  }, [count, paused]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div ref={root} className="flex items-center gap-5 sm:gap-8" style={{ ["--hero-interval" as string]: `${interval}s` }}>
      <p className="text-label font-medium tabular-nums tracking-caps text-white">
        <span className="sr-only">{`${labels.slide} `}</span>
        {pad(index + 1)}
        <span className="text-white/60">{` / ${pad(count)}`}</span>
      </p>

      <div className="flex flex-1 gap-2 sm:max-w-sm">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`${labels.goTo} ${i + 1} ${labels.of} ${count}`}
            aria-current={i === index}
            className="group/seg flex h-9 flex-1 items-center"
          >
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30 transition-colors group-hover/seg:bg-white/50">
              {i < index ? <span className="absolute inset-0 bg-white" /> : null}
              {i === index ? (
                <span
                  key={index}
                  onAnimationEnd={() => go(index + 1)}
                  className={`absolute inset-0 animate-hero-progress bg-white ltr:origin-left rtl:origin-right motion-reduce:scale-x-100 motion-reduce:animate-none ${
                    paused ? "[animation-play-state:paused]" : ""
                  }`}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setUserPaused((value) => !value)} aria-label={userPaused ? labels.play : labels.pause} className={round}>
          {userPaused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
        </button>
        <button type="button" onClick={() => go(index - 1)} aria-label={labels.previous} className={`${round} hidden sm:inline-flex`}>
          <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={`${round} hidden sm:inline-flex`}>
          <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
