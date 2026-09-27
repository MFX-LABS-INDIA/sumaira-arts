import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

/** The artist's words on the start side, three pictures on the end side. */
export function FounderBlock() {
  return (
    <Section id="artist" tone="light">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow={artist.eyebrow} title={artist.title} description={artist.description} />
            <blockquote className="mt-8 border-s-2 border-brand ps-5 font-serif text-lg italic leading-relaxed text-deep">
              {artist.belief}
            </blockquote>
            <div className="mt-9">
              <TextLink href={artist.cta.href}>{artist.cta.label}</TextLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:col-span-8">
            {artist.gallery.map((image, index) => (
              <Reveal key={image.alt} delay={index * 100} className="group">
                <ArtImage
                  art={image.art}
                  scene={image.scene}
                  src={image.image}
                  alt={image.alt}
                  zoom
                  sizes="(min-width: 1024px) 26vw, 30vw"
                  className="aspect-portrait"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
