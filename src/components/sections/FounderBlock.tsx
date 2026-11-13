import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

export function FounderBlock() {
  return (
    <Section id="artist" tone="ice" className="relative overflow-hidden">
      <Container>
        <Reveal className="max-w-4xl">
          <Eyebrow>{artist.eyebrow}</Eyebrow>
          <h2 className={`${headingClass} mt-5 text-deep sm:text-[clamp(2.25rem,4.5vw,4rem)]`}>{artist.title}</h2>
        </Reveal>

        <div className="mt-10 grid items-center gap-8 md:mt-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <Reveal delay={100}>
            <div className="relative rounded-[1.75rem] border border-white/80 bg-white/50 p-3 shadow-xs sm:p-4">
              <div className="absolute -start-5 top-12 hidden h-24 w-px bg-brand lg:block" />
              <div className="grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
              {artist.gallery.map((image, index) => (
                <div
                  key={image.alt}
                  className={`relative overflow-hidden rounded-card bg-light ${
                    index === 0
                      ? "col-span-3 row-span-2 aspect-[4/5]"
                      : "col-span-2 aspect-[5/4]"
                  }`}
                >
                  <Image
                    src={image.image}
                    alt={image.alt}
                    fill
                    sizes={index === 0
                      ? "(min-width: 1280px) 340px, (min-width: 1024px) 26vw, 56vw"
                      : "(min-width: 1280px) 220px, (min-width: 1024px) 18vw, 37vw"}
                    className="object-cover"
                  />
                </div>
              ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="rounded-[1.75rem] border border-light bg-white p-7 shadow-xs sm:p-10">
              <p className="text-label font-medium uppercase tracking-eyebrow text-brand">Artist&apos;s practice</p>
              <div className="mt-6 border-s-2 border-brand ps-5">
                <h3 className="font-serif text-2xl font-medium leading-snug text-deep sm:text-3xl">
                {artist.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel">{artist.role}</p>
              </div>
              <p className="mt-7 font-serif text-xl font-light leading-relaxed text-deep sm:text-2xl">{artist.tagline}</p>
              <p className="mt-5 text-sm leading-7 text-steel">{artist.bio[0]}</p>
              <div className="mt-8 border-t border-light pt-6">
                <TextLink href={artist.cta.href} className="min-h-11">{artist.cta.label}</TextLink>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={220} className="mt-10 rounded-[1.75rem] border border-soft bg-white/60 p-6 md:mt-12 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16">
            <blockquote className="border-s-2 border-brand ps-5 font-serif text-lg font-light leading-relaxed text-deep sm:text-xl">
              &ldquo;{artist.belief}&rdquo;
            </blockquote>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {artist.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-light bg-white px-4 py-4">
                  <dt className="text-xs leading-relaxed text-steel">{stat.label}</dt>
                  <dd className="mt-2 font-serif text-2xl font-light tracking-tight text-deep sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
