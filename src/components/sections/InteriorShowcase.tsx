import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { inspiration, interiors } from "@/data/inspiration";

export function InteriorShowcase() {
  return (
    <Section id="inspiration" tone="white">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow={inspiration.eyebrow} title={inspiration.title} description={inspiration.description} />
          </Reveal>
          <Reveal delay={120}>
            <TextLink href={inspiration.cta.href}>{inspiration.cta.label}</TextLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          {interiors.map((room, index) => {
            const large = index === 0;
            return (
              <Reveal
                key={room.label}
                delay={index * 120}
                className={large ? "md:col-span-2 lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}
              >
                <figure className="group relative h-full">
                  <ArtImage
                    art={room.art}
                    scene={room.scene}
                    src={room.image}
                    alt={`${room.label} with artwork`}
                    zoom
                    sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 50vw"}
                    className={large ? "aspect-landscape lg:aspect-auto lg:h-full lg:min-h-[34rem]" : "aspect-landscape"}
                  />
                  <figcaption className="absolute bottom-4 start-4 rounded-control bg-white/90 px-3.5 py-2 text-micro font-medium uppercase tracking-caps text-deep">
                    {room.label}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
