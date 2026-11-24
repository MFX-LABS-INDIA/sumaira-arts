import { Check } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { CollaboratedBrands } from "@/components/organisms/CollaboratedBrands";
import { LiveEventBookingSection } from "@/components/organisms/LiveEventBookingSection";
import { LiveEventsGallery } from "@/components/organisms/LiveEventsGallery";
import { site } from "@/constants/site";
import { liveEventsData } from "@/data/live-events";

export function LiveEventsView() {
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
                <div className="relative overflow-hidden rounded-card border border-light bg-white">
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

            <div className="min-w-0 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
              <Reveal delay={100}>
                <p className="max-w-xl text-sm leading-relaxed text-steel sm:text-base sm:leading-7">
                  {hero.description}
                </p>
              </Reveal>
            </div>
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

      {/* Live Services */}
      <Section id="services" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...servicesIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 60} className="flex w-[80vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised motion-reduce:transform-none">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ice">
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
                    <h3 className="mt-1.5 font-serif text-lg font-medium leading-snug tracking-tight text-deep sm:mt-2 sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-steel">
                      {service.description}
                    </p>
                    <ul className="mt-3.5 flex-1 space-y-1.5 border-t border-light pt-3 text-xs text-deep/90">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                          <span>{point}</span>
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
    </div>
  );
}
