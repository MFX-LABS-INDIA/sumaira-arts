import { Globe, MapPin, Palette, Users } from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { StatsBar } from "@/components/molecules/StatsBar";
import { Reveal } from "@/components/atoms/Reveal";
import { WorkshopBookingSection } from "@/components/organisms/WorkshopBookingSection";
import { WorkshopsGallery } from "@/components/organisms/WorkshopsGallery";
import { workshopsData } from "@/data/workshops";

export function WorkshopsView() {
  const {
    hero,
    formatsIntro,
    formats,
    curriculumIntro,
    steps,
    galleryIntro,
    gallery,
  } = workshopsData;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <Section id="workshops-hero" tone="ice" className="overflow-hidden py-6 sm:py-10 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-5">
            <div className="min-w-0 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
              <Reveal>
                <Eyebrow>{hero.eyebrow}</Eyebrow>
                <h1 className="mt-3 max-w-2xl font-serif text-[1.85rem] font-light leading-[1.12] tracking-tight text-deep text-balance sm:mt-4 sm:text-4xl lg:text-[3.25rem]">
                  {hero.title}
                </h1>
              </Reveal>
            </div>

            <Reveal delay={150} className="min-w-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
              <figure className="relative mx-auto w-full max-w-xl">
                <div
                  className="pointer-events-none absolute -inset-3 hidden rounded-card border border-soft/70 sm:block"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-card border border-light bg-white">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3]">
                    <SkeletonImage
                      src={hero.image}
                      alt={hero.imageAlt}
                      fill
                      preload
                      instantReveal
                      sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, 92vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between gap-3 border-t border-light bg-white p-3 sm:absolute sm:inset-x-4 sm:bottom-4 sm:rounded-control sm:border sm:border-white/70 sm:bg-white/95 sm:p-3 sm:shadow-sm sm:backdrop-blur-xs">
                    <span>
                      <span className="block text-micro font-medium uppercase tracking-caps text-steel">
                        Resident Tutor · The Workshop Dubai, Jumeirah
                      </span>
                      <span className="mt-0.5 block font-serif text-xs font-light text-deep sm:text-sm">
                        Traditional qalam script &amp; layered textured canvas classes.
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>

            <div className="min-w-0 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
              <Reveal delay={100}>
                <p className="max-w-xl text-sm leading-relaxed text-steel sm:text-base sm:leading-7">
                  {hero.description}
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={200}>
            <StatsBar
              className="mt-6 sm:mt-8"
              items={hero.stats.map((stat, idx) => ({
                ...stat,
                icon:
                  idx === 0 ? (
                    <Users className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : idx === 1 ? (
                    <Globe className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : idx === 2 ? (
                    <MapPin className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : (
                    <Palette className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Workshop Formats */}
      <Section id="formats" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...formatsIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4">
            {formats.map((format, index) => (
              <Reveal key={format.id} delay={index * 60} className="flex w-[80vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised motion-reduce:transform-none">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ice">
                    <SkeletonImage
                      src={format.image}
                      alt={format.alt}
                      fill
                      sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 80vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <Eyebrow className="truncate text-[10px] tracking-wider">{format.eyebrow}</Eyebrow>
                    <h3 className="mt-2 font-serif text-base font-medium leading-snug tracking-tight text-deep sm:text-lg">
                      {format.title}
                    </h3>
                    <ExpandableText text={format.description} className="mt-2 flex-1" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery — Inside the Classroom */}
      <Section id="gallery" tone="ice" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...galleryIntro} />
          </Reveal>

          <WorkshopsGallery items={gallery} />
        </Container>
      </Section>

      {/* Curriculum — How Every Session Unfolds */}
      <Section id="curriculum" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...curriculumIntro} />
          </Reveal>

          <ol className="relative mt-8 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, index) => (
              <li
                key={step.step}
                className="relative flex w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                {index < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute start-10 top-10 hidden h-px w-[calc(100%-1.25rem)] bg-soft lg:block"
                    aria-hidden="true"
                  />
                )}
                <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white p-5 transition-all duration-500 ease-out-soft hover:-translate-y-2 hover:border-brand/40 hover:shadow-raised sm:p-6 motion-reduce:transform-none motion-reduce:transition-none">
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ice/75 via-white/40 to-white opacity-0 transition-opacity duration-500 ease-out-soft group-hover:opacity-100 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out-soft group-hover:scale-x-100 motion-reduce:transition-none"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-soft bg-ice font-mono text-xs font-semibold text-brand transition-all duration-500 ease-out-soft group-hover:scale-110 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none">
                      {step.step}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-steel/70 transition-colors duration-500 ease-out-soft group-hover:text-brand">
                      Stage {step.step}
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-5 font-serif text-lg font-medium leading-snug tracking-tight text-deep transition-all duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:text-brand sm:mt-6 sm:text-xl motion-reduce:transform-none motion-reduce:transition-none">
                    {step.title}
                  </h3>

                  <p className="relative z-10 mt-3 border-t border-light pt-3 text-sm leading-relaxed text-steel transition-colors duration-500 ease-out-soft group-hover:border-brand/15 group-hover:text-deep/85 sm:mt-4 sm:pt-4">
                    {step.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <WorkshopBookingSection />
    </div>
  );
}
