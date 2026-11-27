import { MoveRight } from "lucide-react";
import { ArtImage } from "@/components/art/ArtImage";
import { Eyebrow, headingClass } from "@/components/molecules/SectionHeading";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { commission } from "@/data/commission";

/** A studio introduction followed by a clear, three-step commission journey. */
export function Commission() {
  return (
    <Section id="commission" tone="ice">
      <Container>
        <div className="overflow-hidden rounded-card border border-light bg-white sm:rounded-card">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-light p-2 sm:p-3 lg:p-4">
              <ArtImage
                art={commission.art}
                scene={commission.scene}
                src={commission.image}
                alt={commission.alt}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                className="aspect-[16/9] md:aspect-landscape lg:aspect-auto lg:h-full lg:min-h-[28rem]"
              />
            </div>

            <div className="flex flex-col justify-center p-4 sm:p-6 md:p-10 lg:p-12">
              <Eyebrow>{commission.eyebrow}</Eyebrow>
              <h2 className={`${headingClass} mt-2 sm:mt-3 md:mt-4 max-w-md text-deep text-balance`}>
                {commission.title}
              </h2>
              <p className="mt-2 sm:mt-3 md:mt-5 max-w-md text-xs sm:text-sm md:text-base leading-relaxed md:leading-8 text-steel">
                {commission.description}
              </p>
            </div>
          </div>

          {/* Mobile & sm swipe hint */}
          <div className="flex items-center justify-between border-t border-light bg-ice/40 px-4 py-2 sm:px-6 md:hidden">
            <span className="text-[11px] font-semibold uppercase tracking-caps text-steel">
              3-Step Commission Journey
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
              <span>Swipe</span>
              <MoveRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <ol
            aria-label="The commission process"
            className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-3.5 sm:scroll-px-6 sm:px-6 sm:py-4 md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:border-t md:border-light md:p-0"
          >
            {commission.steps.map((step) => (
              <li
                key={step.number}
                className="w-[78%] min-w-[230px] max-w-[280px] shrink-0 snap-start rounded-card border border-light bg-ice/35 p-3.5 sm:w-[46%] sm:max-w-[300px] md:w-auto md:min-w-0 md:max-w-none md:rounded-none md:border-0 md:border-e md:bg-transparent md:p-8 md:last:border-e-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-brand ring-1 ring-light md:h-9 md:w-9 md:bg-ice md:text-sm md:ring-0"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug text-deep sm:text-base md:text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-steel md:mt-3 md:text-sm md:leading-6">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
