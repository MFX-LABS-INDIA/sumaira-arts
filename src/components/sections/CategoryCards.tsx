import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { offerings } from "@/data/home";
import type { Offering } from "@/types/content";

function OfferingCard({ offering }: { offering: Offering }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-light bg-white transition-colors duration-500 hover:border-soft">
      <div className="relative">
        <ArtImage
          flush
          art={offering.art}
          scene={offering.scene}
          src={offering.image}
          alt={`${offering.eyebrow}: ${offering.title}`}
          zoom
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-portrait md:aspect-landscape"
        />
        <span className="absolute start-5 top-5 rounded-control bg-white/90 px-3 py-1.5 font-serif text-lg leading-none tracking-[0.12em] text-deep">
          {offering.number}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <Eyebrow>{offering.eyebrow}</Eyebrow>
        <h3 className="mt-4 font-serif text-xl font-light leading-snug tracking-tight text-deep md:text-[1.4rem]">{offering.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{offering.description}</p>
        <div className="mt-8">
          <TextLink href={offering.cta.href}>{offering.cta.label}</TextLink>
        </div>
      </div>
    </article>
  );
}

export function CategoryCards() {
  return (
    <Section id="offerings" tone="white">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {offerings.map((offering, index) => (
            <Reveal key={offering.number} delay={index * 120}>
              <OfferingCard offering={offering} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
