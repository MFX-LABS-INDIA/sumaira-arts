import { ArrowDownRight } from "lucide-react";
import type { ArtistMilestone } from "@/data/artist";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RecognitionCarouselController } from "./RecognitionCarouselController";

export function RecognitionTimeline({
  milestones,
}: {
  milestones: ArtistMilestone[];
}) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Recognition"
          title="Exhibition History & Collaborations"
          description="A journey through exhibitions, creative partnerships, and the community shaped along the way."
        />
        <div className="hidden shrink-0 items-center gap-3 border-s border-soft pb-1 ps-5 lg:flex">
          <span className="font-serif text-4xl font-light text-brand">
            {String(milestones.length).padStart(2, "0")}
          </span>
          <span className="max-w-24 text-micro font-medium uppercase leading-relaxed tracking-caps text-steel">
            selected milestones
          </span>
        </div>
      </div>

      <RecognitionCarouselController milestoneCount={milestones.length}>
        {milestones.map((item, index) => (
          <article
            key={item.title}
            data-milestone-slide
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${milestones.length}: ${item.title}`}
            aria-hidden={index !== 0}
            className="grid min-w-full grid-cols-1 md:min-h-[22rem] md:grid-cols-12"
          >
            <div className="relative flex min-h-72 flex-col overflow-hidden p-6 sm:min-h-80 sm:p-9 md:col-span-7 md:min-h-0 md:p-12">
              <span
                className="absolute -end-3 -top-10 select-none font-serif text-[10rem] font-light leading-none text-ice sm:-end-5 sm:-top-14 sm:text-[14rem]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative flex items-center gap-3">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <span className="text-micro font-semibold uppercase tracking-caps text-brand">
                  {item.category}
                </span>
              </div>
              <h3 className="relative mt-8 max-w-xl font-serif text-3xl font-light leading-tight tracking-tight text-deep sm:mt-10 sm:text-4xl lg:text-5xl">
                {item.title}
              </h3>
              <p className="relative mt-5 max-w-xl text-sm leading-relaxed text-steel sm:mt-6 sm:text-base sm:leading-8">
                {item.description}
              </p>
              {item.highlight && (
                <p className="relative mt-auto flex items-center gap-2 pt-8 text-xs font-medium leading-relaxed text-steel">
                  <ArrowDownRight className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {item.highlight}
                </p>
              )}
            </div>

            <div className="relative flex min-h-52 flex-col justify-between overflow-hidden bg-brand p-6 text-white sm:min-h-60 sm:p-9 md:col-span-5 md:min-h-0 md:p-10">
              <span
                className="absolute -bottom-16 -end-10 select-none font-serif text-[15rem] font-light leading-none text-white/[0.06]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <span className="text-micro font-medium uppercase tracking-caps text-light">
                  {item.category}
                </span>
                <div className="mt-6 h-px w-full bg-white/25" />
              </div>
              <div className="relative mt-8 md:mt-0">
                {item.highlight && (
                  <p className="font-serif text-2xl font-light leading-snug sm:text-3xl">
                    {item.highlight}
                  </p>
                )}
                <p className="mt-3 text-xs leading-relaxed text-light sm:text-sm">
                  {item.title}
                </p>
              </div>
              <span className="relative mt-8 text-micro font-medium uppercase tracking-caps text-light/80 md:mt-10">
                Sumaira Arts · Dubai
              </span>
            </div>
          </article>
        ))}
      </RecognitionCarouselController>
    </div>
  );
}
