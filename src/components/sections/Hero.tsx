import Image from "next/image";
import { RoomScene } from "@/components/art/RoomScene";
import { heroScene } from "@/components/art/scenes";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Link";
import { hero } from "@/data/home";
import { site } from "@/constants/site";

const enter = "animate-fade-up motion-reduce:animate-none";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden bg-deep md:flex-row md:items-end">
      {/* Artwork: the top block on phones, full-bleed behind the text from md up. */}
      <div className="relative min-h-[max(24rem,70vw)] flex-1 overflow-hidden md:absolute md:inset-0 md:-z-20 md:min-h-0 md:flex-none">
        <div className="absolute inset-0 animate-scale-in motion-reduce:animate-none">
          {site.heroImage ? (
            <Image src={site.heroImage.src} alt={site.heroImage.alt} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <>
              <RoomScene scene={heroScene("desktop")} align="xMaxYMid" className="hidden h-full w-full md:block" />
              <RoomScene scene={heroScene("mobile")} className="h-full w-full md:hidden" />
            </>
          )}
        </div>
        {/* Phones only: dissolve the artwork into the navy text block below it. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-deep to-transparent md:hidden" />
      </div>

      {/* md and up: navy wash keeps the type readable while the artwork stays the focus. */}
      <div className="absolute inset-0 -z-10 hidden bg-linear-to-r from-deep/85 via-deep/45 to-deep/0 md:block" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-1/3 bg-linear-to-t from-deep/60 to-transparent md:block" />

      <Container className="pb-14 pt-8 md:pb-24 md:pt-32 lg:pb-28">
        <div className="max-w-[26rem] xl:max-w-2xl">
          <div className={`${enter} flex items-center gap-4`} style={{ animationDelay: "100ms" }}>
            <span aria-hidden className="h-px w-10 bg-soft" />
            <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            className={`${enter} mt-6 font-serif text-[clamp(2.5rem,7.2vw,5.5rem)] font-light leading-[1.02] tracking-[0.005em] text-white`}
            style={{ animationDelay: "200ms" }}
          >
            {hero.lead} <em className="font-normal italic text-soft">{hero.accent}</em>
          </h1>

          <p className={`${enter} mt-7 max-w-lg text-base leading-relaxed text-ice md:text-lg`} style={{ animationDelay: "320ms" }}>
            {hero.description}
          </p>

          <div className={`${enter} mt-10 flex flex-wrap items-center gap-x-9 gap-y-5`} style={{ animationDelay: "440ms" }}>
            <ButtonLink href={hero.primary.href} tone="dark">
              {hero.primary.label}
            </ButtonLink>
            <TextLink href={hero.secondary.href} tone="dark" className="text-white">
              {hero.secondary.label}
            </TextLink>
          </div>
        </div>
      </Container>

      <div
        className="absolute bottom-10 end-12 hidden animate-fade-in text-end motion-reduce:animate-none lg:block"
        style={{ animationDelay: "800ms" }}
      >
        <p className="text-[0.62rem] font-medium uppercase tracking-eyebrow text-soft">{hero.caption.kicker}</p>
        <p className="mt-2 font-serif text-xl italic text-white">{hero.caption.title}</p>
      </div>
    </section>
  );
}
