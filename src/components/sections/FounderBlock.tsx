import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

// One image sits lower than its neighbours and a shade taller, so the row of three reads as a
// hung arrangement, not a grid of identical frames.
const frame = [
  { ratio: "aspect-portrait", offset: "" },
  { ratio: "aspect-tall", offset: "sm:mt-10" },
  { ratio: "aspect-square", offset: "sm:-mt-4" },
];

/** The title runs the full width so it stays on one line; the words and the hung pictures sit in a row below. */
export function FounderBlock() {
  return (
    <Section id="artist" tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{artist.eyebrow}</Eyebrow>
          <h2 className={`${headingClass} mt-4 text-deep lg:whitespace-nowrap`}>{artist.title}</h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={120} className="lg:col-span-4">
            <p className="max-w-xl text-sm leading-relaxed text-steel md:text-base">{artist.description}</p>
            <blockquote className="mt-6 border-s-2 border-brand ps-5 font-serif text-base font-light italic leading-relaxed text-deep">
              {artist.belief}
            </blockquote>
            <div className="mt-9">
              <TextLink href={artist.cta.href}>{artist.cta.label}</TextLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:col-span-8">
            {artist.gallery.map((image, index) => (
              <Reveal key={image.alt} delay={220 + index * 100} className={`group ${frame[index]?.offset ?? ""}`}>
                <ArtImage
                  art={image.art}
                  scene={image.scene}
                  src={image.image}
                  alt={image.alt}
                  zoom
                  sizes="(min-width: 1024px) 26vw, 30vw"
                  className={frame[index]?.ratio ?? "aspect-portrait"}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
