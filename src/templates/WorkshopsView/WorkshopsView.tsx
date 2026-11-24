import { ArrowRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { ButtonLink, SmartLink, TextLink } from "@/components/atoms/Link";
import { Reveal } from "@/components/atoms/Reveal";
import { WorkshopBookingSection } from "@/components/organisms/WorkshopBookingSection";
import { workshopsData } from "@/data/workshops";

export function WorkshopsView() {
  const {
    hero,
    navPills,
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
          </div>

          <Reveal delay={200}>
            <div className="mt-6 overflow-hidden rounded-card border border-light bg-white sm:mt-10">
              <div className="grid grid-cols-2 divide-x divide-y divide-light sm:grid-cols-4 sm:divide-y-0">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="px-3.5 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
                    <span className="block truncate font-serif text-lg font-light tracking-tight text-deep sm:text-xl lg:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-steel sm:mt-1 sm:text-xs">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Jump Navigation */}
      <nav aria-label="Workshops sections" className="border-b border-light bg-white">
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

      {/* Workshop Formats */}
      <Section id="formats" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...formatsIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0">
            {formats.map((format, index) => (
              <Reveal key={format.id} delay={index * 70} className="flex w-[84vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <article className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-all duration-500 ease-out-soft hover:-translate-y-1 hover:border-brand/40 hover:shadow-raised motion-reduce:transform-none">
                  <div className="relative aspect-[16/11] overflow-hidden bg-ice sm:aspect-[16/10]">
                    <SkeletonImage
                      src={format.image}
                      alt={format.alt}
                      fill
                      sizes="(min-width: 1280px) 580px, (min-width: 640px) 46vw, 84vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    />
                    <span className="absolute start-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-caps text-brand shadow-sm sm:start-4 sm:top-4">
                      {format.audience}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-7">
                    <Eyebrow>{format.eyebrow}</Eyebrow>
                    <h3 className="mt-2 font-serif text-xl font-medium tracking-tight text-deep sm:mt-3 sm:text-2xl">
                      {format.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-xs leading-relaxed text-steel sm:mt-3 sm:text-sm sm:leading-7">
                      {format.description}
                    </p>
                    <div className="mt-5 border-t border-light pt-4">
                      <SmartLink
                        href="#book-workshop"
                        data-workshop-format={format.bookingFormat}
                        className="group/link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-caps text-brand transition-colors hover:text-deep"
                      >
                        Book this workshop
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1 rtl:rotate-180"
                          aria-hidden="true"
                        />
                      </SmartLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Curriculum / 4-Step Learning Journey */}
      <Section id="curriculum" tone="ice" className="overflow-x-clip">
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

      {/* Gallery */}
      <Section id="gallery" tone="white" className="overflow-x-clip">
        <Container>
          <Reveal>
            <SectionHeading {...galleryIntro} />
          </Reveal>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 lg:grid-cols-3">
            {gallery.map((item) => (
              <figure
                key={item.id}
                className="group relative flex w-[78vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand/40 sm:w-auto sm:max-w-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ice">
                  <SkeletonImage
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
                  />
                </div>
                <figcaption className="p-4 sm:p-5">
                  <p className="text-sm font-medium text-deep sm:text-base">{item.title}</p>
                  <p className="mt-1 text-xs text-steel">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <WorkshopBookingSection />
    </div>
  );
}
