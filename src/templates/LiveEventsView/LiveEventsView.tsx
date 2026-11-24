import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { ButtonLink, SmartLink, TextLink } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { CollaboratedBrands } from "@/components/organisms/CollaboratedBrands";
import { LiveEventBookingSection } from "@/components/organisms/LiveEventBookingSection";
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
      <Section id="events-hero" tone="ice" className="overflow-hidden py-6 sm:py-10 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <Reveal>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="h-px w-6 bg-brand sm:w-8" aria-hidden="true" />
                  <Eyebrow>{hero.eyebrow}</Eyebrow>
                </div>
                <h1 className="mt-3 max-w-2xl font-serif text-[1.85rem] font-light leading-[1.12] tracking-tight text-deep text-balance sm:mt-4 sm:text-4xl lg:text-[3.25rem]">
                  {hero.title}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel sm:mt-5 sm:text-base sm:leading-7">
                  {hero.description}
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-7 sm:flex sm:flex-row sm:items-center sm:gap-5">
                  <ButtonLink
                    href={hero.primaryCta.href}
                    variant="solid"
                    tone="light"
                    className="min-h-12 w-full justify-center shadow-sm sm:w-auto"
                  >
                    {hero.primaryCta.label}
                  </ButtonLink>
                  <TextLink
                    href={hero.secondaryCta.href}
                    className="min-h-11 w-full justify-center rounded-control border border-light bg-white/90 px-4 sm:w-auto sm:rounded-none sm:border-0 sm:border-b sm:bg-transparent sm:px-0"
                  >
                    {hero.secondaryCta.label}
                  </TextLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150} className="min-w-0 lg:col-span-6">
              <figure className="relative mx-auto w-full max-w-xl">
                <div
                  className="pointer-events-none absolute -inset-3 hidden rounded-card border border-soft/70 sm:block"
                  aria-hidden="true"
                />
                <div className="relative overflow-hidden rounded-card border border-light bg-white shadow-artwork">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3]">
                    <SkeletonImage
                      src={hero.image}
                      alt={hero.imageAlt}
                      fill
                      preload
                      instantReveal
                      sizes="(min-width: 1280px) 576px, (min-width: 1024px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex flex-wrap items-center justify-between gap-2.5 border-t border-light bg-white p-3 sm:absolute sm:inset-x-4 sm:bottom-4 sm:flex-nowrap sm:rounded-control sm:border sm:border-white/70 sm:bg-white/95 sm:p-3 sm:shadow-sm sm:backdrop-blur-xs">
                    <span className="min-w-0">
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
                      className="shrink-0 rounded-full bg-ice px-2.5 py-1 font-mono text-[11px] font-medium text-brand transition-colors hover:bg-brand hover:text-white"
                    >
                      @sumevents.ae
                    </a>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-6 overflow-hidden rounded-card border border-light bg-white sm:mt-10">
              <div className="grid grid-cols-2 divide-x divide-y divide-light sm:grid-cols-4 sm:divide-y-0">
                {hero.highlights.map((item) => (
                  <div key={item.label} className="px-3.5 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate font-serif text-lg font-light tracking-tight text-brand underline-offset-4 transition-colors hover:text-deep hover:underline sm:text-xl lg:text-2xl"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="block truncate font-serif text-lg font-light tracking-tight text-deep sm:text-xl lg:text-2xl">
                        {item.value}
                      </span>
                    )}
                    <span className="mt-0.5 block text-[11px] leading-snug text-steel sm:mt-1 sm:text-xs">
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
                    <SkeletonImage
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
                  aria-labelledby={pkg.id + '-title'}
                  className={`relative flex h-full w-full flex-col rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${
                    pkg.featured
                      ? "border-brand/60 shadow-[0_8px_30px_-18px_rgba(27,58,107,0.35)]"
                      : "border-light hover:border-brand/40 hover:shadow-sm"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 right-5 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold leading-4 text-white sm:right-6">
                      <Sparkles className="h-3 w-3 shrink-0" aria-hidden="true" />
                      Most requested
                    </span>
                  )}

                  <div className="pt-2">
                    <p className="flex min-h-8 items-start text-[11px] font-semibold uppercase leading-4 tracking-[0.12em] text-steel">
                      {pkg.scriptSupport}
                    </p>
                    <h3 id={pkg.id + '-title'} className="mt-1 min-h-14 text-xl font-medium leading-7 tracking-tight text-deep sm:min-h-[3.75rem] sm:text-[23px] sm:leading-[1.3]">
                      {pkg.title}
                    </h3>
                  </div>

                  <div className="mt-4 rounded-xl bg-ice/70 p-4">
                    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-[2rem] font-medium leading-none tracking-tight text-deep tabular-nums sm:text-[2.25rem]">
                        {pkg.rate}
                      </span>
                      <span className="text-xs text-steel">/ {pkg.unit}</span>
                    </p>
                    <p className="mt-3 border-t border-light pt-3 text-xs font-medium leading-5 text-brand">
                      {pkg.durationSummary}
                    </p>
                  </div>

                  <ul className="mt-5 flex-1 space-y-3 text-[13px] leading-6 text-steel sm:text-sm">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ice">
                          <Check className="h-3 w-3 text-brand" aria-hidden="true" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 border-t border-light pt-5">
                    <SmartLink
                      href="#book-event"
                      data-event-tab={pkg.bookingTab}
                      aria-label={`Request booking for ${pkg.title}`}
                      className={`group inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${pkg.featured
                        ? "border-brand bg-brand text-white hover:border-deep hover:bg-deep"
                        : "border-light bg-white text-brand hover:border-brand hover:bg-ice"
                      }`}
                    >
                      Request booking
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none rtl:rotate-180" aria-hidden="true" />
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
                  <SkeletonImage
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
