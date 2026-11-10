"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { artist, type ArchiveStory } from "@/data/artist";

const categories = ["All", "Exhibitions", "Product Design", "Workshops", "Awards"] as const;

export function InteractiveArchive() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedStory, setSelectedStory] = useState<ArchiveStory | null>(null);

  const filteredStories =
    activeCategory === "All"
      ? artist.archiveStories
      : artist.archiveStories.filter((s) => s.category === activeCategory);

  return (
    <div>
      <div>
        <SectionHeading
          eyebrow="Visual Archive"
          title="Curated Exhibitions & Collaborative Design"
          description="Selected masterworks, regional retail collections, and juried international showcases."
        />

        {/* Filter Pills in a new line below */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-control px-4 py-2 text-label font-medium uppercase tracking-caps transition-colors duration-300 ${
                  active
                    ? "border border-brand bg-brand text-white"
                    : "border border-light bg-white text-steel hover:border-soft hover:text-deep"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Archive Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            className="group flex flex-col overflow-hidden rounded-card border border-light bg-white transition-colors duration-500 hover:border-soft"
          >
            <div className="relative aspect-landscape overflow-hidden bg-ice">
              <Image
                src={story.image}
                alt={story.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute start-4 top-4 rounded-control bg-white/95 px-3 py-1.5 text-micro font-medium uppercase tracking-caps text-deep shadow-sm">
                {story.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-8">
              <span className="text-micro font-medium uppercase tracking-caps text-mist">
                {story.location}
              </span>
              <h3 className="mt-3 font-serif text-xl font-light leading-snug tracking-tight text-deep">
                {story.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">
                {story.description}
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedStory(story)}
                  className="inline-flex items-center gap-2 text-label font-medium uppercase tracking-caps text-brand transition-colors hover:text-deep"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Dialog */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedStory(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-light bg-white p-6 shadow-artwork sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStory(null)}
              className="absolute end-6 top-6 flex h-9 w-9 items-center justify-center rounded-control border border-light text-steel transition-colors hover:border-brand hover:text-deep"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <div className="relative aspect-landscape w-full overflow-hidden rounded-control bg-ice">
              <Image
                src={selectedStory.image}
                alt={selectedStory.title}
                fill
                sizes="(min-width: 640px) 600px, 90vw"
                className="object-cover"
              />
            </div>

            <div className="mt-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Eyebrow>{selectedStory.category}</Eyebrow>
                <span className="text-micro font-medium uppercase tracking-caps text-mist">
                  {selectedStory.location}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-deep sm:text-3xl">
                {selectedStory.title}
              </h3>
              <p className="mt-2 text-sm italic text-steel">
                {selectedStory.subtitle}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-steel md:text-base">
                {selectedStory.description}
              </p>

              <div className="mt-6 rounded-control border border-light bg-ice/60 p-5">
                <span className="block text-micro font-semibold uppercase tracking-caps text-deep">
                  Exhibition & Design Highlights
                </span>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-steel">
                  {selectedStory.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-brand font-serif italic" aria-hidden="true">
                        —
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="rounded-control border border-steel/40 px-6 py-3 text-label font-medium uppercase tracking-caps text-steel transition-colors hover:border-brand hover:bg-brand hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

