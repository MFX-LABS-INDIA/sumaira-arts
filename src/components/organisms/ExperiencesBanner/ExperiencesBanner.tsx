import { ArrowRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { SmartLink } from "@/components/atoms/Link";
import { experienceCards, experiencesIntro } from "@/data/experiences";

export function ExperiencesBanner() {
  return (
    <Section id="experiences" tone="white">
      <Container>
        <SectionHeading {...experiencesIntro} />

        <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0">
          {experienceCards.map((card) => (
            <article
              key={card.id}
              className="group relative flex w-[84vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand sm:w-auto sm:max-w-none motion-reduce:transform-none"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ice">
                <SkeletonImage
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1280px) 580px, (min-width: 640px) 46vw, 84vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
                <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-brand shadow-raised sm:start-4 sm:top-4 sm:text-xs">
                  {card.meta}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
                <Eyebrow className="text-[10px] tracking-widest sm:text-label">
                  {card.eyebrow}
                </Eyebrow>
                <h3 className="mt-1.5 text-lg font-medium leading-snug tracking-tight text-deep sm:mt-3 sm:text-2xl">
                  <SmartLink href={card.href} className="after:absolute after:inset-0 after:rounded-card">
                    {card.title}
                  </SmartLink>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-steel sm:text-base sm:leading-7">
                  {card.description}
                </p>
                <div className="mt-auto pt-4 sm:pt-6">
                  <span
                    className="flex min-h-10 items-center justify-between gap-3 border-t border-light pt-3 text-xs font-semibold text-brand sm:min-h-11 sm:pt-4 sm:text-sm"
                    aria-hidden="true"
                  >
                    {card.ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
