"use client";

import { useState, useEffect } from "react";
import { ChevronRight, MapPin, X } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { artist } from "@/data/artist";
import { ArchiveCarouselController } from "@/components/organisms/ArchiveCarouselController";
import { useScrollLock } from "@/lib/scroll-lock";

const categories = ["All", "Exhibitions", "Product Design", "Workshops", "Awards"] as const;

export function InteractiveArchive() {
  const [activeStory, setActiveStory] = useState<(typeof artist.archiveStories)[number] | null>(null);

  useScrollLock(!!activeStory);

  useEffect(() => {
    if (!activeStory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveStory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStory]);

  const categoryCounts = categories.map((category) => ({
    name: category,
    count:
      category === "All"
        ? artist.archiveStories.length
        : artist.archiveStories.filter((story) => story.category === category).length,
  }));

  return (
    <div>
      <SectionHeading
        eyebrow="Visual Archive"
        title="Curated Exhibitions & Collaborative Design"
        description="A closer look at the exhibitions, collections and creative work that bring calligraphy into the world."
      />

      <ArchiveCarouselController categories={categoryCounts}>
        {artist.archiveStories.map((story) => (
          <article
            key={story.id}
            data-archive-slide
            data-category={story.category}
            className="group flex w-[84vw] max-w-96 shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-[border-color,box-shadow] duration-500 hover:border-soft sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-3.75rem)/4)]"
          >
            <button
              type="button"
              onClick={() => setActiveStory(story)}
              aria-label={`View details: ${story.title}`}
              className="relative block aspect-[16/11] w-full overflow-hidden bg-ice text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand cursor-pointer"
            >
              <SkeletonImage
                src={story.image}
                alt={story.title}
                fill
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 84vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-deep/65 via-transparent to-deep/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-micro font-semibold uppercase tracking-caps text-brand shadow-raised sm:start-4 sm:top-4">
                {story.category}
              </span>
              <span className="absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between gap-3 text-start text-xs font-semibold text-white opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:inset-x-5 sm:bottom-5 sm:text-sm motion-reduce:translate-y-0 motion-reduce:transition-none">
                Explore this project
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/60">
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </span>
              </span>
            </button>

            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <span className="flex items-center gap-1.5 text-xs leading-relaxed text-steel">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                {story.location}
              </span>
              <h3
                role="button"
                tabIndex={0}
                onClick={() => setActiveStory(story)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStory(story);
                  }
                }}
                className="mt-2 cursor-pointer text-lg font-medium leading-snug tracking-tight text-deep transition-colors hover:text-brand sm:mt-3 sm:text-xl"
              >
                {story.title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-steel sm:mt-3 sm:text-sm">
                {story.description}
              </p>
            </div>
          </article>
        ))}
      </ArchiveCarouselController>

      {/* React Lightbox Modal (avoids native dialog scroll jump) */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          aria-labelledby={`archive-title-${activeStory.id}`}
          onClick={() => setActiveStory(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-deep/80 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="custom-scrollbar relative my-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-card border border-light bg-white shadow-artwork animate-modal-pop will-change-transform"
          >
            {/* Sticky Header with Category Badge, Location, and Close Button */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-light/60 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-3.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-ice px-3 py-1 text-micro font-semibold uppercase tracking-caps text-brand">
                  {activeStory.category}
                </span>
                <span className="text-micro font-medium uppercase tracking-caps text-steel">
                  {activeStory.location}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveStory(null)}
                aria-label="Close project details"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-deep transition-all duration-200 hover:border-steel/30 hover:bg-ice hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Full Image & Title */}
            <div className="p-4 sm:p-6">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-control bg-ice shadow-xs sm:aspect-[16/10]">
                <SkeletonImage
                  src={activeStory.image}
                  alt={activeStory.title}
                  fill
                  sizes="(min-width: 640px) 620px, 92vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-4 sm:mt-5">
                <h3
                  id={`archive-title-${activeStory.id}`}
                  className="font-serif text-xl font-light tracking-tight text-deep sm:text-2xl"
                >
                  {activeStory.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
