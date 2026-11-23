import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, SmartLink, TextLink, buttonClass } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { CollaboratedBrands } from "@/components/sections/CollaboratedBrands";
import { LiveEventBookingSection } from "@/components/events/LiveEventBookingSection";
import { site } from "@/constants/site";
import { liveEventsData } from "@/data/live-events";

export function LiveEventsView() {
  const {
    hero,
    navPills,
    servicesIntro,
    services,
    packagesIntro,
    packages,
    packageFootnote,
    galleryIntro,
    gallery,
  } = liveEventsData;

  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <Section id="events-hero" tone="ice" className="overflow-hidden py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-brand" aria-hidden="true" />
                  <Eyebrow>{hero.eyebrow}</Eyebrow>
                </div>
                <h1 className="mt-3 max-w-2xl font-serif text-3xl font-light leading-[1.1] tracking-tight text-deep text-balance sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
                  {hero.title}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel sm:mt-5 sm:text-base sm:leading-7">
                  {hero.description}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-5 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-5">
                  <ButtonLink
                    href={hero.primaryCta.href}
                    variant="solid"
                    tone="light"
                    className="min-h-11 text-center"
                  >
                    {hero.primaryCta.label}
                  </ButtonLink>
                  <TextLink href={hero.secondaryCta.href} className="min-h-10 self-center">
                    {hero.secondaryCta.label}
                  </TextLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="min-w-0 lg:col-span-6">
              <figure className="relative mx-auto w-full max-w-xl">
                <div
                  className="absolute -inset-2 rounded-card border border-soft/70 sm:-inset-3"
                  aria-hidden="true"
                />
                <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-light bg-white shadow-artwork sm:aspect-[4/3]">
                  <Image
                    src={hero.image}
                    alt={hero.imageAlt}
                    fill
                    preload
                    sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, 92vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-control border border-white/70 bg-white/95 p-2.5 shadow-sm sm:inset-x-4 sm:bottom-4 sm:p-3">
                    <span>
                      <span className="block text-micro font-medium uppercase tracking-caps text-steel">
                        On-Site Calligraphy &amp; Engraving · UAE &amp; GCC
                      </span>
                      <span className="mt-0.5 block font-serif text-xs font-light text-deep sm:text-sm">
                        Luxury launches, Emirati weddings &amp; VIP activations.
                      </span>
                    </span>
                    <a
                      href={site.instagram.events}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden rounded-full bg-ice px-2.5 py-1 font-mono text-[11px] font-medium text-brand transition-colors hover:bg-brand hover:text-white sm:inline-block"
                    >
                      @sumevents.ae
                    </a>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-7 overflow-hidden rounded-card border border-light bg-white sm:mt-10">
              <div className="grid grid-cols-2 divide-x divide-y divide-light sm:grid-cols-4 sm:divide-y-0">
                {hero.highlights.map((item) => (
                  <div key={item.label} className="px-4 py-3.5 sm:px-6 sm:py-5">
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-serif text-xl font-light tracking-tight text-brand underline-offset-4 transition-colors hover:text-deep hover:underline sm:text-2xl"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="block font-serif text-xl font-light tracking-tight text-deep sm:text-2xl">
                        {item.value}
                      </span>
                    )}
                    <span className="mt-1 block text-xs leading-snug text-steel">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Jump Navigation */}
      <nav aria-label="Live events sections" className="border-b border-light bg-white">
        <Container className="no-scrollbar flex gap-2 overflow-x-auto py-3 sm:gap-3 sm:py-4">
          {navPills.map((pill) => (
            <TextLink
              key={pill.href}
              href={pill.href}
              className="min-h-11 shrink-0 rounded-full border border-light border-b-0 px-4 py-2"
            >
              {pill.label}
            </TextLink>
          ))}
        </Container>
      </nav>

      {/* Live Services */}
      <Section id="services" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...servicesIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 70} className="flex w-[84vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised motion-reduce:transform-none">
                  <div className="relative aspect-[16/11] overflow-hidden bg-ice sm:aspect-[16/10]">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 1280px) 580px, (min-width: 640px) 46vw, 84vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <Eyebrow>{service.eyebrow}</Eyebrow>
                    <h3 className="mt-2 font-serif text-xl font-medium tracking-tight text-deep sm:mt-3 sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-steel sm:mt-3 sm:text-sm sm:leading-7">
                      {service.description}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2 border-t border-light pt-4 text-xs text-deep/90 sm:text-sm">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 border-t border-light pt-4">
                      <SmartLink
                        href="#book-event"
                        data-event-tab={service.bookingTab}
                        className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-caps text-brand transition-colors hover:text-deep"
                      >
                        Book {service.title}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180" aria-hidden="true" />
                      </SmartLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Packages & Quote */}
      <Section id="packages" tone="ice" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...packagesIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <Reveal key={pkg.id} delay={index * 80} className="flex w-[84vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article
                  className={`flex h-full w-full flex-col rounded-card border p-5 transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-raised sm:p-7 motion-reduce:transform-none ${
                    pkg.featured
                      ? "border-brand/40 bg-white shadow-sm ring-1 ring-brand/15"
                      : "border-light bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-ice px-3 py-1 text-micro font-semibold uppercase tracking-caps text-brand">
                      {pkg.scriptSupport}
                    </span>
                    {pkg.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        Most Requested
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-deep sm:text-2xl">
                    {pkg.title}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2 border-b border-light pb-4">
                    <span className="font-serif text-3xl font-light tracking-tight text-deep sm:text-4xl">
                      {pkg.rate}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-steel">
                      / {pkg.unit}
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-xs font-medium text-brand">
                    {pkg.durationSummary}
                  </p>

                  <ul className="mt-4 flex-1 space-y-2.5 text-xs leading-relaxed text-steel sm:text-sm">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-2">
                    <SmartLink
                      href="#book-event"
                      data-event-tab={pkg.bookingTab}
                      aria-label={`Book ${pkg.title}`}
                      className={buttonClass({
                        variant: pkg.featured ? "solid" : "outline",
                        tone: "light",
                        className: "min-h-11 w-full px-5 text-center",
                      })}
                    >
                      Book Now
                    </SmartLink>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <p className="mt-6 rounded-card border border-light bg-white/80 px-5 py-4 text-xs leading-relaxed text-steel sm:mt-8 sm:text-sm">
              {packageFootnote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Visual Gallery */}
      <Section id="gallery" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...galleryIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4">
            {gallery.map((item) => (
              <figure
                key={item.id}
                className="group relative flex w-[76vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand/40 sm:w-auto sm:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ice">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 280px, (min-width: 1024px) 22vw, (min-width: 640px) 45vw, 76vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                  <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-caps text-brand shadow-sm">
                    {item.category}
                  </span>
                </div>
                <figcaption className="p-3.5 sm:p-4">
                  <p className="text-sm font-medium text-deep">{item.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <CollaboratedBrands tone="ice" />

      <LiveEventBookingSection />
    </div>
  );
}
