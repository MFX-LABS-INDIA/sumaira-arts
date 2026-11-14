import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading, headingClass } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";
import { InteractiveArchive } from "@/components/about/InteractiveArchive";
import { RecognitionTimeline } from "@/components/about/RecognitionTimeline";
import { StudioTechnique } from "@/components/about/StudioTechnique";
import { ArtistFounderHero } from "@/components/about/ArtistFounderHero";

export const metadata: Metadata = {
  title: "About the Artist | Sumaira Mohammed Ashik | Sumaira Arts",
  description:
    "Discover the artistic journey of Sumaira Mohammed Ashik, Dubai-based abstract calligraphy artist, commercial designer for Landmark Group Homebox GCC, and resident tutor.",
};

export default function AboutPage() {
  return (
    <div>
      <ArtistFounderHero />
      <nav aria-label="About page sections" className="border-b border-light bg-white">
        <Container className="no-scrollbar flex gap-2 overflow-x-auto py-3 sm:gap-3 sm:py-4">
          <TextLink href="#story" className="min-h-11 shrink-0 rounded-full border border-light border-b-0 px-4 py-2">
            The story
          </TextLink>
          <TextLink href="#craft" className="min-h-11 shrink-0 rounded-full border border-light border-b-0 px-4 py-2">
            The craft
          </TextLink>
          <TextLink href="#archive" className="min-h-11 shrink-0 rounded-full border border-light border-b-0 px-4 py-2">
            Selected projects
          </TextLink>
          <TextLink href="#timeline" className="min-h-11 shrink-0 rounded-full border border-light border-b-0 px-4 py-2">
            Milestones
          </TextLink>
        </Container>
      </nav>

      <Section id="story" tone="white" className="py-8 sm:py-10 lg:py-16">
        <Container>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-6">
              <Eyebrow>{artist.eyebrow}</Eyebrow>
              <h2 className={`${headingClass} mt-2.5 text-deep sm:mt-3`}>
                A story told through script and texture
              </h2>
              <div className="mt-4 max-w-prose space-y-4 text-sm leading-relaxed text-steel sm:mt-5 sm:text-base sm:leading-7">
                {artist.bio.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <div className="flex h-full flex-col rounded-card border border-light bg-ice/60 p-5 sm:p-6 md:p-8">
                <Eyebrow>Guiding Philosophy</Eyebrow>
                <p className="mt-3 text-sm leading-relaxed text-steel sm:mt-3.5 sm:text-base sm:leading-7">
                  {artist.philosophy}
                </p>
                <blockquote className="mt-4 border-s-2 border-brand ps-4 font-serif text-base font-light italic leading-relaxed text-deep sm:mt-5 sm:ps-5 sm:text-lg">
                  &ldquo;{artist.belief}&rdquo;
                </blockquote>

                <div className="mt-auto flex items-center gap-3 border-t border-soft/40 pt-5 sm:pt-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-soft bg-white sm:h-14 sm:w-14">
                    <Image
                      src="/assets/images/artist/sumaira-portrait.webp"
                      alt={artist.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="block font-serif text-base font-light text-deep">
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

      <Section id="craft" tone="ice">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Studio Technique"
              title="From the first layer to the final detail"
              description="Each artwork is created through intentional layers of textural relief, hand-lettered calligraphy, and precious metallic highlights."
            />
          </Reveal>

          <Reveal delay={100}>
            <StudioTechnique steps={artist.craftSteps} />
          </Reveal>
        </Container>
      </Section>

      <Section id="archive" tone="white">
        <Container>
          <InteractiveArchive />
        </Container>
      </Section>

      <Section id="timeline" tone="ice">
        <Container>
          <Reveal>
            <RecognitionTimeline milestones={artist.milestones} />
          </Reveal>

          <Reveal delay={200} className="mt-10 sm:mt-14">
            <div className="rounded-card border border-light bg-white px-5 py-8 text-center sm:px-8 sm:py-10">
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-steel sm:text-base sm:leading-8">
                Interested in acquiring an original work or commissioning a bespoke canvas for your interior?
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
                <ButtonLink href="/#commission" variant="solid" tone="light">
                  Explore Bespoke Art
                </ButtonLink>
                <ButtonLink href="/products" variant="outline" tone="light">
                  Browse Gallery
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
