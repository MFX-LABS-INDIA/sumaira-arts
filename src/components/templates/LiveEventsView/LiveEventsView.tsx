"use client";

import { useState } from "react";
import { Award, Building2, Check, Languages, X } from "lucide-react";
import { InstagramIcon } from "@/components/atoms/Icons";
import { ExpandableText } from "@/components/atoms/ExpandableText";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { StatsBar } from "@/components/molecules/StatsBar";
import { Reveal } from "@/components/atoms/Reveal";
import { CollaboratedBrands } from "@/components/organisms/CollaboratedBrands";
import { LiveEventBookingSection } from "@/components/organisms/LiveEventBookingSection";
import { LiveEventsGallery } from "@/components/organisms/LiveEventsGallery";
import { site } from "@/constants/site";
import { useScrollLock } from "@/lib/scroll-lock";
import { liveEventsData, type LiveEventService } from "@/data/live-events";

export function LiveEventsView() {
  const [activeImage, setActiveImage] = useState<LiveEventService | null>(null);

  useScrollLock(!!activeImage);

  const {
    hero,
    servicesIntro,
    services,
    galleryIntro,
    gallery,
  } = liveEventsData;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <Section id="events-hero" tone="ice" className="overflow-hidden py-6 sm:py-10 lg:py-16">
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
                  {/* 3-photo luxury event bento showcase */}
                  <div className="grid aspect-[4/3] grid-cols-12 grid-rows-2 gap-1.5 sm:gap-2.5">
                    {/* Tall left feature: live artist engraving activation */}
                    <div className="group relative col-span-7 row-span-2 overflow-hidden rounded-card bg-ice">
                      <SkeletonImage
                        src={hero.image}
                        alt={hero.imageAlt}
                        fill
                        preload
                        instantReveal
                        sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, 55vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-deep/70 via-deep/20 to-transparent p-3 sm:block">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                          Live Engraving
                        </span>
                      </span>
                    </div>

                    {/* Top-right: framed live wedding sketching */}
                    <div className="group relative col-span-5 row-span-1 overflow-hidden rounded-card bg-ice">
                      <SkeletonImage
                        src="/assets/images/events/service-sketching.webp"
                        alt="Framed live portrait sketch of an Emirati wedding couple with gold details"
                        fill
                        preload
                        instantReveal
                        sizes="(min-width: 1280px) 240px, (min-width: 1024px) 20vw, 40vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-deep/70 via-transparent to-transparent p-2.5 sm:block">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                          Live Sketching
                        </span>
                      </span>
                    </div>

                    {/* Bottom-right: botanical floral glass etching */}
                    <div className="group relative col-span-5 row-span-1 overflow-hidden rounded-card bg-ice">
                      <SkeletonImage
                        src="/assets/images/events/gallery-perfume-floral.webp"
                        alt="Botanical floral motif diamond-engraved onto an amber perfume bottle"
                        fill
                        sizes="(min-width: 1280px) 240px, (min-width: 1024px) 20vw, 40vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-deep/70 via-transparent to-transparent p-2.5 sm:block">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                          Perfume Engraving
                        </span>
                      </span>
                    </div>
                  </div>

                  <figcaption className="mt-2 flex items-center justify-between gap-3 px-1.5 py-1 sm:mt-2.5 sm:px-2 sm:py-1.5">
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold uppercase tracking-wider text-steel sm:text-micro sm:tracking-caps">
                        On-Site Activations · UAE &amp; GCC
                      </span>
                      <span className="mt-0.5 block truncate font-serif text-xs font-light text-deep sm:text-sm">
                        Luxury launches, weddings &amp; VIP events.
                      </span>
                    </span>
                    <a
                      href={site.instagram.events}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-ice px-2.5 py-1 font-mono text-[11px] font-medium text-brand transition-colors hover:bg-brand hover:text-white sm:px-3 sm:py-1.5"
                    >
                      @sumaira_calligraphy
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
              items={hero.highlights.map((item, idx) => ({
                ...item,
                icon:
                  idx === 0 ? (
                    <Award className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : idx === 1 ? (
                    <Building2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : idx === 2 ? (
                    <Languages className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ) : (
                    <InstagramIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  ),
              }))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* Live Services */}
      <Section id="services" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...servicesIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 60} className="flex w-[80vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 motion-reduce:transform-none">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveImage(service)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveImage(service);
                      }
                    }}
                    aria-label={`View image for ${service.title}`}
                    className="relative aspect-[16/10] cursor-pointer overflow-hidden bg-ice"
                  >
                    <SkeletonImage
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1280px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 80vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <Eyebrow className="text-[10px]">{service.eyebrow}</Eyebrow>
                    <h3
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveImage(service)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveImage(service);
                        }
                      }}
                      className="mt-1.5 cursor-pointer font-serif text-lg font-medium leading-snug tracking-tight text-deep transition-colors hover:text-brand sm:mt-2 sm:text-xl"
                    >
                      {service.title}
                    </h3>
                    <ExpandableText text={service.description} className="mt-2" />
                    <ul className="mt-3.5 flex-1 space-y-2 border-t border-light pt-3 text-xs text-deep/90">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-soft/80 bg-ice text-brand transition-colors duration-300 group-hover:border-brand/30 group-hover:bg-brand/10"
                          >
                            <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                          </span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Visual Gallery */}
      <Section id="gallery" tone="ice" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...galleryIntro} />
          </Reveal>

          <LiveEventsGallery items={gallery} />
        </Container>
      </Section>

      <CollaboratedBrands tone="white" />

      <LiveEventBookingSection />

      {/* Consistent Image and Title Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          aria-label={activeImage.title}
          onClick={() => setActiveImage(null)}
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
                {activeImage.eyebrow}
              </span>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
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
                  src={activeImage.image}
                  alt={activeImage.alt}
                  fill
                  sizes="(min-width: 1024px) 672px, 95vw"
                  className="object-contain bg-deep/5"
                />
              </div>

              <div className="mt-4 sm:mt-5">
                <h3 className="font-serif text-xl font-light tracking-tight text-deep sm:text-2xl">
                  {activeImage.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
