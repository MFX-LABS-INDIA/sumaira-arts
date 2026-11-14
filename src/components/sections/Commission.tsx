import { ArtImage } from "@/components/art/ArtImage";
import { ButtonLink } from "@/components/ui/Link";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { commission } from "@/data/commission";

/** A studio introduction followed by a clear, three-step commission journey. */
export function Commission() {
  return (
    <Section id="commission" tone="ice">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-light bg-white shadow-raised">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-light p-3 sm:p-4">
              <ArtImage
                art={commission.art}
                scene={commission.scene}
                src={commission.image}
                alt={commission.alt}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                className="aspect-landscape lg:aspect-auto lg:h-full lg:min-h-[28rem]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <Eyebrow>{commission.eyebrow}</Eyebrow>
              <h2 className={`${headingClass} mt-4 max-w-md text-deep text-balance`}>{commission.title}</h2>
              <p className="mt-5 max-w-md text-base leading-8 text-steel">{commission.description}</p>
              <div className="mt-8">
                <ButtonLink href={commission.cta.href} className="min-h-12 w-full px-5 sm:w-auto">
                  {commission.cta.label}
                </ButtonLink>
              </div>
            </div>
          </div>
          <ol aria-label="The commission process" className="grid border-t border-light md:grid-cols-3">
            {commission.steps.map((step) => (
              <li key={step.number} className="border-b border-light p-6 last:border-b-0 sm:p-8 md:border-b-0 md:border-e md:last:border-e-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ice text-sm font-semibold text-brand" aria-hidden="true">{step.number}</span>
                <h3 className="mt-4 text-lg font-semibold text-deep">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-steel">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
