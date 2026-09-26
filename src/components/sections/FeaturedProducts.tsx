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

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:mt-16 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
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
