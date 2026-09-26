import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { featured, products } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";

export function FeaturedProducts() {
  return (
    <Section id="artwork" tone="ice">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={featured.eyebrow} title={featured.title} description={featured.description} />
        </Reveal>

        {/* Phones: a swipeable snap carousel (CSS only, no JS). From md up it is a grid. */}
        <div
          role="region"
          aria-label={featured.title}
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-8 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-8 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12"
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

        <Reveal className="mt-14 text-center md:mt-20">
          <ButtonLink href={featured.cta.href} variant="outline">
            {featured.cta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
