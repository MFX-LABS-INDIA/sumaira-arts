"use client";

import { useState } from "react";
import { Globe, MapPin, Palette, Users, X } from "lucide-react";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { StatsBar } from "@/components/molecules/StatsBar";
import { Reveal } from "@/components/atoms/Reveal";
import { WorkshopBookingSection } from "@/components/organisms/WorkshopBookingSection";
import { WorkshopsGallery } from "@/components/organisms/WorkshopsGallery";
import { workshopsData, type WorkshopFormat } from "@/data/workshops";
import { site } from "@/constants/site";
import { useScrollLock } from "@/lib/scroll-lock";

export function WorkshopsView() {
  const [activeFormat, setActiveFormat] = useState<WorkshopFormat | null>(null);

  useScrollLock(!!activeFormat);

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
                <div className="overflow-hidden rounded-card border border-light bg-white p-2 sm:p-2.5">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-xl bg-ice">
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
                  <figcaption className="mt-2 flex items-center justify-between gap-3 px-1.5 py-1 sm:mt-2.5 sm:px-2 sm:py-1.5">
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-steel sm:text-micro sm:tracking-caps">
                        Resident Tutor · The Workshop Dubai, Jumeirah
                      </span>
                      <span className="mt-0.5 block truncate font-serif text-xs font-light text-deep sm:text-sm">
                        Traditional qalam script &amp; layered textured canvas classes.
                      </span>
                    </span>
                    <a
                      href={site.instagram.workshops}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-ice px-2.5 py-1 font-mono text-[11px] font-medium text-brand transition-colors hover:bg-brand hover:text-white sm:px-3 sm:py-1.5"
                    >
                      @sumaira_workshops
                    </a>
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
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveFormat(format)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveFormat(format);
                      }
                    }}
                    aria-label={`View image for ${format.title}`}
                    className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-ice"
                  >
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
                    <h3
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveFormat(format)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveFormat(format);
                        }
                      }}
                      className="mt-2 cursor-pointer font-serif text-base font-medium leading-snug tracking-tight text-deep transition-colors hover:text-brand sm:text-lg"
                    >
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

      {/* Consistent Image and Title Modal */}
      {activeFormat && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          aria-label={activeFormat.title}
          onClick={() => setActiveFormat(null)}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-deep/80 p-3 sm:p-6 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="custom-scrollbar relative my-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-y-auto rounded-card border border-light bg-white shadow-artwork animate-modal-pop will-change-transform"
          >
            {/* Sticky Header with Category Badge and Close Button */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-light/60 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-3.5">
              <span className="rounded-full bg-ice px-3 py-1 text-micro font-semibold uppercase tracking-caps text-brand">
                {activeFormat.eyebrow}
              </span>
              <button
                type="button"
                onClick={() => setActiveFormat(null)}
                aria-label="Close image preview"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-deep transition-all duration-200 hover:border-steel/30 hover:bg-ice hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body: Full Image & Title Only */}
            <div className="p-4 sm:p-6">
              <div className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[68vh] w-full overflow-hidden rounded-control bg-ice shadow-xs">
                <SkeletonImage
                  src={activeFormat.image}
                  alt={activeFormat.alt}
                  fill
                  sizes="(min-width: 1024px) 672px, 95vw"
                  className="object-contain bg-deep/5"
                />
              </div>

              <div className="mt-4 sm:mt-5">
                <h3 className="font-serif text-xl font-light tracking-tight text-deep sm:text-2xl">
                  {activeFormat.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
