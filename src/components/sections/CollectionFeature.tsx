import { ArtImage } from "@/components/art/ArtImage";
import { ProductCard } from "@/components/common/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { featuredCollection as content } from "@/data/collections";
import { products } from "@/data/products";

/** A large banner on the start side; the excerpt and four of the collection's artworks on the end side. */
export function CollectionFeature() {
  const picks = content.productSlugs.flatMap((slug) => products.find((product) => product.slug === slug) ?? []);

  return (
    <Section id="featured" tone="white">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="group lg:col-span-7">
            <ArtImage
              art={content.art}
              scene={content.scene}
              src={content.image}
              alt={content.alt}
              zoom
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-landscape lg:aspect-[5/4]"
            />
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <SectionHeading eyebrow={content.eyebrow ?? ""} title={content.title} description={content.description} />
            <div className="mt-10 grid grid-cols-2 gap-6">
              {picks.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
