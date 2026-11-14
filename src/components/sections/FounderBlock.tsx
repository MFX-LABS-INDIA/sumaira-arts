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
        <div className="grid items-center gap-6 sm:gap-9 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-16">
          <div className="relative mx-auto aspect-[16/11] sm:aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card bg-ice lg:mx-0 lg:max-w-md">
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
            <h2 className={`${headingClass} mt-2.5 sm:mt-4 text-deep`}>{homeArtist.title}</h2>
            <p className="mt-3 sm:mt-6 text-base sm:text-lg font-medium text-deep">{artist.name}</p>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-steel">{artist.role}</p>
            <p className="mt-3 sm:mt-6 text-xs sm:text-base leading-relaxed sm:leading-8 text-steel">{homeArtist.description}</p>
            <div className="mt-4 sm:mt-8">
              <TextLink href={homeArtist.cta.href} className="min-h-10 sm:min-h-11 text-xs sm:text-sm">{homeArtist.cta.label}</TextLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
