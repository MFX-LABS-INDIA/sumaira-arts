import Image from "next/image";
import { HeroControls } from "@/components/common/HeroControls";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Link";
import { heroControls, heroSlides } from "@/data/home";

const fade = "opacity-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none data-[active=true]:opacity-100";

/**
 * A full-bleed photograph carousel. The words sit bottom-start on a navy gradient so the artwork above stays
 * clear. Every slide is rendered on the server; `HeroControls` only toggles which one is active (the first
 * slide shows with no JavaScript). Only the first photograph is `priority`: it is the LCP image.
 */
export function Hero() {
  const count = heroSlides.length;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={heroControls.label}
      className="relative isolate flex min-h-[max(34rem,calc(100svh-4.75rem))] flex-col overflow-hidden bg-deep text-white"
    >
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image.src}
            data-hero-slide
            data-index={index}
            data-active={index === 0}
            inert={index !== 0}
            className={`group/slide absolute inset-0 ${fade}`}
          >
            <div className="absolute inset-0 scale-[1.06] transition-transform duration-[8000ms] ease-out group-data-[active=true]/slide:scale-100 motion-reduce:transform-none">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "low"}
                sizes="100vw"
                className="object-cover"
                style={slide.focus ? { objectPosition: slide.focus } : undefined}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-deep/95 via-deep/65 to-deep/10 md:from-deep/90 md:via-deep/35 md:to-deep/5" />
        <div className="absolute inset-0 bg-linear-to-r from-deep/50 to-transparent max-md:hidden" />
      </div>

      <Container className="flex flex-1 flex-col justify-end">
        <div data-hero-content className="grid pb-8 pt-24 md:pb-12">
          {heroSlides.map((slide, index) => {
            const Title = index === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.lead}
                data-hero-slide
                data-index={index}
                data-active={index === 0}
                inert={index !== 0}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} ${heroControls.of} ${count}`}
                className="translate-y-5 self-end opacity-0 transition duration-700 ease-out [grid-area:1/1] motion-reduce:transform-none motion-reduce:transition-none data-[active=true]:translate-y-0 data-[active=true]:opacity-100 data-[active=true]:delay-300"
              >
                <div className="flex items-center gap-4">
                  <span aria-hidden className="h-px w-10 bg-soft/70" />
                  <Eyebrow tone="dark">{slide.eyebrow}</Eyebrow>
                </div>

                <Title className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white">
                  {slide.lead} <em className="font-normal italic text-soft md:block">{slide.accent}</em>
                </Title>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{slide.description}</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <ButtonLink href={slide.primary.href} variant="inverse" tone="dark">
                    {slide.primary.label}
                  </ButtonLink>
                  <TextLink href={slide.secondary.href} tone="dark">
                    {slide.secondary.label}
                  </TextLink>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {heroSlides.map((slide, index) => (
        <p
          key={slide.caption.title}
          data-hero-slide
          data-index={index}
          data-active={index === 0}
          inert={index !== 0}
          className={`absolute bottom-24 end-12 z-10 hidden text-end lg:block ${fade}`}
        >
          <span className="block text-[0.62rem] font-medium uppercase tracking-eyebrow text-soft">{slide.caption.kicker}</span>
          <span className="mt-1 block font-serif text-base italic text-white">{slide.caption.title}</span>
        </p>
      ))}

      <div className="relative z-10 border-t border-white/20">
        <Container className="py-3">
          <HeroControls count={count} labels={heroControls} />
        </Container>
      </div>
    </section>
  );
}
