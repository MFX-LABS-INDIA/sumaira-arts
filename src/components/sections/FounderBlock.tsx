import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { artist } from "@/data/artist";

const frame = [
  { ratio: "aspect-[3/4]", offset: "" },
  { ratio: "aspect-[3/4]", offset: "sm:mt-8" },
  { ratio: "aspect-[3/4]", offset: "sm:-mt-4" },
];

export function FounderBlock() {
  return (
    <Section id="artist" tone="light">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Eyebrow>{artist.eyebrow}</Eyebrow>
              <h2 className={`${headingClass} mt-4 text-deep`}>{artist.title}</h2>
            </div>
            <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-brand">
              {artist.name}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-sm font-medium text-brand uppercase tracking-wider">{artist.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-steel md:text-base">
              {artist.bio[0]}
            </p>
            
            <blockquote className="mt-6 border-s-2 border-brand ps-5 font-serif text-base font-light italic leading-relaxed text-deep">
              &ldquo;{artist.belief}&rdquo;
            </blockquote>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-sand/30 pt-6">
              {artist.stats.slice(0, 4).map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-2xl font-light text-deep">{stat.value}</div>
                  <div className="text-xs text-steel/80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <TextLink href="/about">Discover Her Full Story & Milestones &rarr;</TextLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:col-span-7">
            {artist.gallery.map((image, index) => (
              <Reveal key={image.alt} delay={200 + index * 100} className={`group ${frame[index]?.offset ?? ""}`}>
                <div className={`relative overflow-hidden rounded-sm bg-sand/20 shadow-sm ${frame[index]?.ratio ?? "aspect-[3/4]"}`}>
                  <Image
                    src={image.image}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-xs text-steel/70 line-clamp-1">{image.alt}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
