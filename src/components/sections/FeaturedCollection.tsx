import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { featuredCollection as content } from "@/data/collections";

/**
 * Dark editorial split. On desktop the image breaks the grid twice: it starts left of the
 * text column's gutter and hangs below the section into the next one (which pads for it).
 */
export function FeaturedCollection() {
  return (
    <section id="featured" className="relative scroll-mt-19 bg-deep py-16 text-white md:py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative z-10 lg:col-span-7 lg:-ms-12 lg:translate-y-24">
            <div className="relative">
              <div aria-hidden className="absolute -bottom-5 -end-5 hidden h-full w-full rounded-card border border-soft/40 lg:block" />
              <ArtImage
                art={content.art}
                scene={content.scene}
                src={content.image}
                alt={content.title}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="aspect-landscape lg:aspect-[5/4]"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <Eyebrow tone="dark">{content.eyebrow}</Eyebrow>
            <h2 className={`${headingClass} mt-5 text-white`}>{content.title}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-light/80 md:text-lg">{content.description}</p>
            <div className="mt-10">
              <ButtonLink href={content.cta.href} tone="dark">
                {content.cta.label}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
