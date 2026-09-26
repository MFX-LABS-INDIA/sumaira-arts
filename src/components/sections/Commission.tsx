import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { commission } from "@/data/commission";

export function Commission() {
  return (
    <Section id="commission" tone="light">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow={commission.eyebrow} title={commission.title} description={commission.description} />
            <ol className="mt-10 space-y-5 border-t border-soft pt-8">
              {commission.steps.map((step) => (
                <li key={step.number} className="flex gap-5">
                  <span className="font-serif text-xl leading-tight text-brand">{step.number}</span>
                  <p className="text-body-sm leading-relaxed text-steel">
                    <span className="font-medium text-deep">{step.title}.</span> {step.text}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <ButtonLink href={commission.cta.href}>{commission.cta.label}</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <ArtImage
              art={commission.art}
              scene={commission.scene}
              src={commission.image}
              alt="A commissioned artwork in an office interior"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-landscape"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
