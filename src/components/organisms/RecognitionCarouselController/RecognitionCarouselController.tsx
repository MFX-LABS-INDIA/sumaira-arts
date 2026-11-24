"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

const AUTOPLAY_INTERVAL = 7000;

export function RecognitionCarouselController({
  milestoneCount,
  children,
}: {
  milestoneCount: number;
  children: ReactNode;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const slides = carouselRef.current?.querySelectorAll<HTMLElement>("[data-milestone-slide]");
    slides?.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== activeIndex));
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || isHovered || prefersReducedMotion || milestoneCount < 2) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveIndex((index) => (index + 1) % milestoneCount);
      }
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [activeIndex, isHovered, isPaused, milestoneCount, prefersReducedMotion]);

  const showMilestone = (index: number) => {
    setActiveIndex((index + milestoneCount) % milestoneCount);
  };
  const isPlaying = !isPaused && !prefersReducedMotion;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Exhibition history and collaborations"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsHovered(false);
        }
      }}
      className="mt-8 sm:mt-12"
    >
      <div className="relative overflow-hidden rounded-card border border-light bg-white shadow-xs sm:rounded-2xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-out-soft motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live={isPlaying ? "off" : "polite"}
        >
          {children}
        </div>

        <div className="flex flex-col gap-4 border-t border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center justify-between gap-5">
            <p className="font-mono text-xs font-medium text-steel" aria-live="polite">
              <span className="text-brand">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-mist" aria-hidden="true">/</span>
              {String(milestoneCount).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-1.5" aria-label="Choose a milestone">
              {Array.from({ length: milestoneCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => showMilestone(index)}
                  aria-label={`Show milestone ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="flex h-8 items-center justify-center px-1 focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                      activeIndex === index ? "w-8 bg-brand" : "w-1.5 bg-soft hover:bg-steel"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? "Play milestone carousel" : "Pause milestone carousel"}
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-xs font-medium text-steel transition-colors hover:bg-ice hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                {isPaused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{isPaused ? "Play" : "Pause"}</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showMilestone(activeIndex - 1)}
                aria-label="Previous milestone"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => showMilestone(activeIndex + 1)}
                aria-label="Next milestone"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand bg-brand text-white transition-colors hover:bg-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-ice" aria-hidden="true">
          <span
            key={`${activeIndex}-${isHovered}-${isPaused}`}
            className={`block h-full origin-left bg-brand motion-reduce:animate-none ${
              isPlaying && !isHovered ? "animate-hero-progress" : "scale-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
