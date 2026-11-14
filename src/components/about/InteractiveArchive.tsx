import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { artist } from "@/data/artist";
import { ArchiveCarouselController } from "./ArchiveCarouselController";

const categories = ["All", "Exhibitions", "Product Design", "Workshops", "Awards"] as const;

export function InteractiveArchive() {
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
        {artist.archiveStories.map((story, index) => (
            <article
              key={story.id}
              data-archive-slide
              data-category={story.category}
              className="group flex w-[84vw] max-w-96 shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-[border-color,box-shadow] duration-500 hover:border-soft hover:shadow-raised sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]"
            >
              <button
                type="button"
                data-archive-open={story.id}
                aria-label={`View details: ${story.title}`}
                className="relative block aspect-[16/11] w-full overflow-hidden bg-ice text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand"
              >
                <Image
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
                <span className="absolute end-3 top-3 rounded-full bg-deep/50 px-3 py-1.5 font-mono text-micro text-white backdrop-blur-sm sm:end-4 sm:top-4">
                  {String(index + 1).padStart(2, "0")} / {String(artist.archiveStories.length).padStart(2, "0")}
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
                  data-archive-open={story.id}
                  className="mt-4 inline-flex min-h-10 items-center gap-2 self-start border-t border-light pt-3 text-xs font-semibold text-brand transition-colors hover:text-deep sm:mt-5 sm:text-sm"
                >
                  View project details
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>

              <dialog
                data-archive-dialog={story.id}
                aria-labelledby={`archive-title-${story.id}`}
                className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-card border border-light bg-white p-5 text-start shadow-artwork backdrop:bg-deep/60 backdrop:backdrop-blur-sm sm:p-8"
              >
                <div className="relative aspect-landscape w-full overflow-hidden rounded-control bg-ice">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 640px) 600px, 90vw"
                    className="object-cover"
                  />
                </div>

                <div className="mt-6 sm:mt-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-micro font-semibold uppercase tracking-caps text-brand">
                      {story.category}
                    </span>
                    <span className="text-micro font-medium uppercase tracking-caps text-steel">
                      {story.location}
                    </span>
                  </div>

                  <h3
                    id={`archive-title-${story.id}`}
                    className="mt-3 font-serif text-2xl font-light tracking-tight text-deep sm:text-3xl"
                  >
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm italic text-steel">{story.subtitle}</p>
                  <p className="mt-5 text-sm leading-relaxed text-steel md:text-base">
                    {story.description}
                  </p>

                  <div className="mt-6 rounded-control border border-light bg-ice/60 p-5">
                    <span className="block text-micro font-semibold uppercase tracking-caps text-deep">
                      Exhibition & Design Highlights
                    </span>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-steel">
                      {story.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5">
                          <span className="font-serif italic text-brand" aria-hidden="true">—</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    data-archive-close
                    className="mt-6 min-h-11 rounded-control border border-light px-5 text-sm font-medium text-brand transition-colors hover:border-brand hover:bg-ice"
                  >
                    Close project details
                  </button>
                </div>
              </dialog>
            </article>
        ))}
      </ArchiveCarouselController>
    </div>
  );
}
