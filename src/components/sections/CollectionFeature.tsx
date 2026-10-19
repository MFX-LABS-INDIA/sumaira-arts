import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { headingClass } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { featuredCollection as content } from "@/data/collections";
import { products } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";

/** A large banner on the start side, badged with its own name; the excerpt and a curated-picks card on the end side. */
export function CollectionFeature() {
  const picks = content.productSlugs.flatMap((slug) => products.find((product) => product.slug === slug) ?? []);

  return (
    <Section id="featured" tone="white">
      <Container>
        {/* No items-start/center: the grid's default stretch makes the banner match the text column's own
            height exactly, so there is no dead space under whichever side happens to be shorter. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="group relative h-full min-w-0 lg:col-span-7">
            <ArtImage
              art={content.art}
              scene={content.scene}
              src={content.image}
              alt={content.alt}
              zoom
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-landscape h-full lg:aspect-auto"
            />
            {content.eyebrow ? (
              <span className="absolute start-5 top-5 rounded-control bg-white/95 px-4 py-2 text-label font-medium uppercase tracking-caps text-deep shadow-raised">
                {content.eyebrow}
              </span>
            ) : null}
          </Reveal>

          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <h2 className={`${headingClass} text-deep`}>{content.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel md:text-base">{content.description}</p>
            </Reveal>

            {picks.length > 0 ? (
              <Reveal delay={150} className="mt-8">
                <p className="mb-3 text-label font-medium uppercase tracking-caps text-steel">Six featured works</p>
                <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
                  {picks.map((product, index) => (
                    <ProductCard
                      key={product.slug}
                      product={product}
                      index={index}
                      className="w-64 shrink-0 snap-start"
                    />
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={220} className="mt-8">
              <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
