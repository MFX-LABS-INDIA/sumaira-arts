import Image from "next/image";
import { RoomScene } from "@/components/art/RoomScene";
import { heroScene } from "@/components/art/scenes";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink, TextLink } from "@/components/ui/Link";
import { hero } from "@/data/home";
import { site } from "@/constants/site";

const enter = "animate-fade-up motion-reduce:animate-none";

/**
 * Full-bleed artwork with a clean white panel for the words. On phones the artwork sits on top and the
 * panel follows it (a separate crop), so nothing covers the picture.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white md:min-h-[calc(100svh-4.75rem)]">
      <div className="relative min-h-[max(22rem,72vw)] overflow-hidden md:absolute md:inset-0 md:-z-10 md:min-h-0">
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
      </div>

      <Container className="md:flex md:min-h-[calc(100svh-4.75rem)] md:items-center">
        <div className="py-10 md:max-w-[28rem] md:rounded-card md:bg-white md:p-9 lg:max-w-[30rem] lg:p-10">
          <div className={enter} style={{ animationDelay: "100ms" }}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            className={`${enter} mt-4 font-serif text-[clamp(1.875rem,3.6vw,2.75rem)] font-light leading-[1.2] tracking-[-0.015em] text-deep`}
            style={{ animationDelay: "200ms" }}
          >
            {hero.lead} <em className="font-normal italic text-brand">{hero.accent}</em>
          </h1>

          <p className={`${enter} mt-4 text-sm leading-relaxed text-steel md:text-base`} style={{ animationDelay: "320ms" }}>
            {hero.description}
          </p>

          <div className={`${enter} mt-8 flex flex-wrap items-center gap-x-8 gap-y-4`} style={{ animationDelay: "440ms" }}>
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <TextLink href={hero.secondary.href}>{hero.secondary.label}</TextLink>
          </div>
        </div>
      </Container>

      <p
        className="absolute bottom-8 end-12 hidden animate-fade-in text-end motion-reduce:animate-none lg:block"
        style={{ animationDelay: "800ms" }}
      >
        <span className="block text-[0.62rem] font-medium uppercase tracking-eyebrow text-steel">{hero.caption.kicker}</span>
        <span className="mt-1 block font-serif text-base italic text-deep">{hero.caption.title}</span>
      </p>
    </section>
  );
}
