import { Award, Calendar, Palette, Store } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { artist } from "@/data/artist";
import { ButtonLink } from "@/components/atoms/Link";
import { Container } from "@/components/atoms/Container";
import { Eyebrow } from "@/components/molecules/SectionHeading";
import { StatsBar } from "@/components/molecules/StatsBar";
import { Reveal } from "@/components/atoms/Reveal";
import { Section } from "@/components/atoms/Section";

export function ArtistFounderHero() {
  return (
    <Section id="artist-hero" tone="ice" className="overflow-hidden py-8 sm:py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:gap-7 md:grid-cols-12 md:gap-x-8 md:gap-y-4 lg:gap-x-12">
          <div className="md:col-span-6 md:col-start-1 md:row-start-1 md:self-end">
            <Reveal>
              <Eyebrow>{artist.eyebrow}</Eyebrow>
              <h1 className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.08] tracking-tight text-deep text-balance sm:mt-4 sm:text-5xl lg:text-6xl">
                {artist.name}
              </h1>
              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-brand sm:mt-4 sm:text-base lg:text-lg">
                {artist.role}
              </p>
            </Reveal>
          </div>

          <Reveal delay={150} className="md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1 md:self-center">
            <figure className="relative mx-auto w-full max-w-xl">
              <div className="pointer-events-none absolute -inset-2 hidden rounded-card border border-soft/70 sm:-inset-3 sm:block" aria-hidden="true" />
              <div className="overflow-hidden rounded-card border border-light bg-white p-2 sm:p-2.5">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl bg-ice">
                  <SkeletonImage
                    src="/assets/images/artist/sumaira-about-hero.webp"
                    alt="Sumaira Mohammed Ashik painting contemporary Arabic calligraphy on textured canvas in her studio"
                    fill
                    preload
                    instantReveal
                    sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, 92vw"
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="mt-2 flex items-center justify-between gap-3 px-1.5 py-1 sm:mt-2.5 sm:px-2 sm:py-1.5">
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-steel sm:text-micro sm:tracking-caps">
                      Artist &amp; Founder · Dubai, UAE
                    </span>
                    <span className="mt-0.5 block truncate font-serif text-xs font-light text-deep sm:text-sm">
                      Metallic textured acrylics &amp; contemporary Arabic script.
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-ice px-2.5 py-1 font-mono text-[11px] font-medium text-brand">
                    01 / 01
                  </span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="md:col-span-6 md:col-start-1 md:row-start-2 md:self-start">
            <Reveal delay={120}>
              <p className="max-w-xl text-sm leading-relaxed text-steel sm:text-base sm:leading-7">
                {artist.tagline}
              </p>
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
        </div>

        <Reveal delay={220}>
          <StatsBar
            className="mt-6 sm:mt-8"
            items={artist.stats.map((stat, idx) => ({
              ...stat,
              icon:
                idx === 0 ? (
                  <Calendar className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : idx === 1 ? (
                  <Store className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : idx === 2 ? (
                  <Palette className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : (
                  <Award className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ),
            }))}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
