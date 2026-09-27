import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { featured, products } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";

/** Eight artworks: a swipe carousel on phones, then 3 columns at 768px and 4 at 1024px. */
export function FeaturedProducts() {
  return (
    <Section id="artwork" tone="ice">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading eyebrow={featured.eyebrow} title={featured.title} description={featured.description} />
          </Reveal>
          <Reveal delay={120}>
            <TextLink href={featured.cta.href}>{featured.cta.label}</TextLink>
          </Reveal>
        </div>

        <div
          role="region"
          aria-label={featured.title}
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-8 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-y-10"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              index={index}
              className="w-[72vw] max-w-72 shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
