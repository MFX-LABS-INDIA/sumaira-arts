import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { artist } from "@/data/artist";
import { homeArtist } from "@/data/home";

export function FounderBlock() {
  const portrait = artist.gallery[0];

  return (
    <Section id="artist" tone="white">
      <Container>
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-card bg-ice lg:mx-0">
            <Image
              src={portrait.image}
              alt={portrait.alt}
              fill
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <Eyebrow>{artist.eyebrow}</Eyebrow>
            <h2 className={`${headingClass} mt-4 text-deep`}>{homeArtist.title}</h2>
            <p className="mt-6 text-lg font-medium text-deep">{artist.name}</p>
            <p className="mt-1 text-sm text-steel">{artist.role}</p>
            <p className="mt-6 text-base leading-8 text-steel">{homeArtist.description}</p>
            <div className="mt-8">
              <TextLink href={homeArtist.cta.href} className="min-h-11">{homeArtist.cta.label}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
