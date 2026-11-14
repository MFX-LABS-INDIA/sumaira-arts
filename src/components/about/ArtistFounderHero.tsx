import Image from "next/image";
import { artist } from "@/data/artist";
import { ButtonLink } from "@/components/ui/Link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function ArtistFounderHero() {
  return (
    <Section id="artist-hero" tone="ice" className="overflow-hidden py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-6 sm:gap-9 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <Eyebrow>{artist.eyebrow}</Eyebrow>
              </div>
              <h1 className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.08] tracking-tight text-deep text-balance sm:mt-4 sm:text-5xl lg:text-6xl">
                {artist.name}
              </h1>
              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-brand sm:mt-4 sm:text-base lg:text-lg">
                {artist.role}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel sm:mt-4 sm:text-base sm:leading-7">
                {artist.tagline}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3">
                <ButtonLink
                  href="/products"
                  variant="solid"
                  tone="light"
                  className="min-h-10 text-center sm:min-h-11"
                >
                  View Available Works
                </ButtonLink>
                <ButtonLink
                  href="/#commission"
                  variant="outline"
                  tone="light"
                  className="min-h-10 text-center sm:min-h-11"
                >
                  Explore Bespoke Art
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="md:col-span-6">
            <figure className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-2 rounded-card border border-soft/70 sm:-inset-3" aria-hidden="true" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-light bg-white shadow-artwork sm:aspect-[4/3]">
                <Image
                  src="/assets/images/artist/sumaira-studio-calligraphy.webp"
                  alt="Sumaira Mohammed Ashik at her easel in Dubai"
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top"
                />
                <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-control border border-white/70 bg-white/95 p-2.5 shadow-sm sm:inset-x-4 sm:bottom-4 sm:p-3">
                  <span>
                    <span className="block text-micro font-medium uppercase tracking-caps text-steel">
                      Studio Practice · Dubai, UAE
                    </span>
                    <span className="mt-1 block font-serif text-xs font-light text-deep sm:text-sm">
                      Metallic textured acrylics &amp; contemporary Arabic script.
                    </span>
                  </span>
                  <span className="font-mono text-xs text-brand" aria-hidden="true">
                    01 / 01
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="mt-7 overflow-hidden rounded-card border border-light bg-white sm:mt-9">
            <div className="grid grid-cols-2 divide-x divide-y divide-light sm:grid-cols-4 sm:divide-y-0">
              {artist.stats.map((stat) => (
                <div key={stat.label} className="px-4 py-3.5 sm:px-5 sm:py-4 lg:px-7">
                  <span className="block font-serif text-2xl font-light tracking-tight text-deep sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-micro font-medium uppercase tracking-caps text-steel">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
