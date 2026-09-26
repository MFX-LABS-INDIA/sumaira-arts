import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

export function BrandStory() {
  return (
    <Section id="artist" tone="white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative pb-10 pe-6 lg:col-span-6 lg:pe-0">
            <ArtImage
              art={artist.art}
              src={artist.image}
              alt="Artwork from the studio"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-portrait max-w-xl"
            />
            <div className="absolute bottom-0 end-0 w-2/5 max-w-56 overflow-hidden rounded-card border-8 border-white lg:end-[8%]">
              <ArtImage art={artist.accentArt} alt="Detail of a studio piece" sizes="20vw" className="aspect-tall" />
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
            <SectionHeading eyebrow={artist.eyebrow} title={artist.title} description={artist.description} />
            <blockquote className="mt-10 border-s-2 border-brand ps-6 font-serif text-xl italic leading-relaxed text-deep md:text-2xl">
              {artist.belief}
            </blockquote>
            <div className="mt-10">
              <TextLink href={artist.cta.href}>{artist.cta.label}</TextLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
