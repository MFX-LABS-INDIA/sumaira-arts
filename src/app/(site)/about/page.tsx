import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading, headingClass } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";
import { InteractiveArchive } from "@/components/about/InteractiveArchive";

export const metadata: Metadata = {
  title: "About the Artist | Sumaira Mohammed Ashik | Sumaira Arts",
  description:
    "Discover the artistic journey of Sumaira Mohammed Ashik, Dubai-based abstract calligraphy artist, commercial designer for Landmark Group Homebox GCC, and resident tutor.",
};

export default function AboutPage() {
  return (
    <div>
      {/* 1. HERO SECTION: Light/Ice tone matching BrandStatement / FounderBlock */}
      <Section id="artist-hero" tone="ice" className="py-8 sm:py-14 lg:py-28">
        <Container>
          <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>{artist.eyebrow}</Eyebrow>
                <h1 className="mt-2.5 sm:mt-4 text-3xl font-medium leading-tight tracking-tight text-deep text-balance sm:text-5xl lg:text-6xl">
                  {artist.name}
                </h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base font-medium leading-relaxed sm:leading-7 text-brand md:text-lg">
                  {artist.role}
                </p>
                <p className="mt-3 sm:mt-6 max-w-xl text-xs sm:text-base leading-relaxed sm:leading-8 text-steel md:text-base">
                  {artist.tagline}
                </p>
              </Reveal>

              {/* Four Architectural Stats */}
              <Reveal delay={120}>
                <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-6 border-t border-soft/50 pt-5 sm:pt-8 sm:grid-cols-4">
                  {artist.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="font-serif text-2xl sm:text-4xl font-light tracking-tight text-deep">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 sm:mt-1 block text-micro font-medium uppercase tracking-caps text-steel">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <ButtonLink href="/products" variant="solid" tone="light" className="min-h-11 sm:min-h-12 text-xs sm:text-label text-center">
                    View Available Works
                  </ButtonLink>
                  <ButtonLink href="/#commission" variant="outline" tone="light" className="min-h-11 sm:min-h-12 text-xs sm:text-label text-center">
                    Explore Bespoke Art
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            {/* Studio Portrait Framed like ProductCard & InteriorShowcase */}
            <Reveal delay={150} className="lg:col-span-5">
              <div className="relative aspect-[16/11] sm:aspect-portrait overflow-hidden rounded-card border border-light bg-white shadow-artwork">
                <Image
                  src="/assets/images/artist/sumaira-studio-calligraphy.webp"
                  alt="Sumaira Mohammed Ashik at her easel in Dubai"
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 start-3 end-3 sm:bottom-5 sm:start-5 sm:end-5 rounded-control bg-white/95 p-3 sm:p-4 shadow-sm backdrop-blur-sm">
                  <span className="block text-[10px] sm:text-micro font-medium uppercase tracking-caps text-steel">
                    Studio Practice · Dubai, UAE
                  </span>
                  <span className="mt-0.5 sm:mt-1 block font-serif text-xs sm:text-sm font-light text-deep">
                    Metallic textured acrylics & contemporary Arabic script.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <nav aria-label="About page sections" className="border-b border-light bg-white">
        <Container className="flex flex-wrap gap-x-5 sm:gap-x-8 gap-y-2 py-3 sm:py-4 text-xs sm:text-sm">
          <TextLink href="#story" className="min-h-10 sm:min-h-11">The story</TextLink>
          <TextLink href="#craft" className="min-h-10 sm:min-h-11">The craft</TextLink>
          <TextLink href="#archive" className="min-h-10 sm:min-h-11">Selected projects</TextLink>
          <TextLink href="#timeline" className="min-h-10 sm:min-h-11">Milestones</TextLink>
        </Container>
      </nav>

      {/* 2. THE STORY & PHILOSOPHY: White tone matching CategoryCards / InteriorShowcase */}
      <Section id="story" tone="white">
        <Container>
          <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <Eyebrow>{artist.eyebrow}</Eyebrow>
              <h2 className={`${headingClass} mt-2.5 sm:mt-4 text-deep`}>
                A story told through script and texture
              </h2>
              <div className="mt-4 sm:mt-6 max-w-prose space-y-4 sm:space-y-6 text-xs sm:text-base leading-relaxed sm:leading-8 text-steel">
                {artist.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <div className="rounded-card border border-light bg-ice/50 p-5 sm:p-8 md:p-10">
                <Eyebrow>Guiding Philosophy</Eyebrow>
                <p className="mt-2.5 sm:mt-4 text-xs sm:text-base leading-relaxed sm:leading-8 text-steel md:text-base">
                  {artist.philosophy}
                </p>
                <blockquote className="mt-4 sm:mt-6 border-s-2 border-brand ps-4 sm:ps-5 font-serif text-base sm:text-lg font-light italic leading-relaxed text-deep">
                  &ldquo;{artist.belief}&rdquo;
                </blockquote>

                <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 border-t border-soft/40 pt-4 sm:pt-6">
                  <div className="relative h-11 w-11 sm:h-14 sm:w-14 overflow-hidden rounded-full border border-soft bg-white">
                    <Image
                      src="/assets/images/artist/sumaira-portrait.webp"
                      alt={artist.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-sm sm:text-base font-light text-deep">
                      {artist.name}
                    </span>
                    <span className="block text-micro uppercase tracking-caps text-steel">
                      Artist & Founder
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 3. STUDIO CRAFT & TECHNIQUE: Structured like Commission's 4 numbered steps */}
      <Section id="craft" tone="ice">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Studio Technique"
              title="From the first layer to the final detail"
              description="Each artwork is created through intentional layers of textural relief, hand-lettered calligraphy, and precious metallic highlights."
            />
          </Reveal>

          <div className="mt-6 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 md:mt-16">
            {artist.craftSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 100}>
                <div className="flex h-full flex-col rounded-card border border-light bg-white p-4 sm:p-7 transition-colors duration-500 hover:border-soft">
                  <span className="font-serif text-xl sm:text-2xl font-light italic text-brand" aria-hidden="true">
                    {step.step}
                  </span>
                  <h3 className="mt-2 sm:mt-4 text-base sm:text-xl font-medium leading-snug tracking-tight text-deep">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-3 flex-1 text-xs sm:text-base leading-relaxed sm:leading-8 text-steel">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4. INTERACTIVE ARCHIVE: Filterable cards with modal view */}
      <Section id="archive" tone="white">
        <Container>
          <InteractiveArchive />
        </Container>
      </Section>

      {/* 5. TIMELINE / MILESTONES: Minimal editorial format */}
      <Section id="timeline" tone="ice">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Recognition"
              title="Exhibition History & Collaborations"
              description="Milestones across public exhibitions, commercial design, and creative mentorship."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {artist.milestones.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="flex h-full flex-col rounded-card border border-light bg-white p-7 transition-colors duration-500 hover:border-soft">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-micro font-medium uppercase tracking-caps text-steel">
                      {item.category}
                    </span>
                    {item.highlight && (
                      <span className="rounded-control bg-light/50 px-2 py-0.5 text-micro font-medium uppercase tracking-caps text-brand">
                        {item.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-medium leading-snug tracking-tight text-deep">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-8 text-steel">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-14 text-center">
            <p className="text-base leading-8 text-steel">
              Interested in acquiring an original work or commissioning a bespoke canvas for your interior?
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <ButtonLink href="/#commission" variant="solid" tone="light">
                Explore Bespoke Art
              </ButtonLink>
              <ButtonLink href="/products" variant="outline" tone="light">
                Browse Gallery
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
