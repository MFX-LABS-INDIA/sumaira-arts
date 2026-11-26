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
            className="group flex w-[84vw] max-w-96 shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-[border-color,box-shadow] duration-500 hover:border-soft hover:shadow-raised sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]"
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
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 84vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-deep/65 via-transparent to-deep/10 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-micro font-semibold uppercase tracking-caps text-brand shadow-sm sm:start-4 sm:top-4">
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
              <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-deep sm:mt-3 sm:text-xl">
                {story.title}
              </h3>
              <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-steel sm:mt-3 sm:text-sm">
                {story.description}
              </p>
              <button
                type="button"
                onClick={() => setActiveStory(story)}
                className="mt-4 inline-flex min-h-10 items-center gap-2 self-start border-t border-light pt-3 text-xs font-semibold text-brand transition-colors hover:text-deep sm:mt-5 sm:text-sm cursor-pointer"
              >
                View project details
                <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
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
            className="custom-scrollbar relative my-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-card border border-light bg-white shadow-artwork"
          >
            {/* Sticky Header with Category Badge and Close Button */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-light/60 bg-white/95 px-5 py-3.5 backdrop-blur-md sm:px-7 sm:py-4">
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

            {/* Modal Body */}
            <div className="p-5 sm:p-7">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-control bg-ice shadow-sm sm:aspect-[16/10]">
                <SkeletonImage
                  src={activeStory.image}
                  alt={activeStory.title}
                  fill
                  sizes="(min-width: 640px) 620px, 92vw"
                  className="object-cover"
                />
              </div>

              <div className="mt-6">
                <h3
                  id={`archive-title-${activeStory.id}`}
                  className="font-serif text-2xl font-light tracking-tight text-deep sm:text-3xl"
                >
                  {activeStory.title}
                </h3>
                <p className="mt-1.5 text-sm italic text-steel">{activeStory.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-steel sm:text-base">
                  {activeStory.description}
                </p>

                <div className="mt-6 rounded-control border border-light bg-ice/50 p-5 sm:p-6">
                  <span className="block text-micro font-semibold uppercase tracking-caps text-deep">
                    Exhibition & Design Highlights
                  </span>
                  <ul className="mt-3.5 space-y-2.5 text-sm leading-relaxed text-steel">
                    {activeStory.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <span className="font-serif font-bold italic text-brand" aria-hidden="true">—</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
