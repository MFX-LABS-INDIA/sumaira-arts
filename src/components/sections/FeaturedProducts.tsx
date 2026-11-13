import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { allProducts, formatCategoryLabel } from "@/data/products";
import { homeSelection } from "@/data/home-selection";

/** A steady, browsable selection with one artwork from each product category. */
export function FeaturedProducts() {
  const selection = homeSelection.slugs.flatMap((slug) => {
    const product = allProducts.find((item) => item.slug === slug);
    return product ? [product] : [];
  });

  return (
    <Section id="artwork" tone="ice">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={homeSelection.eyebrow}
            title={homeSelection.title}
            description={homeSelection.description}
          />
          <TextLink href="/products" className="min-h-11 self-start lg:shrink-0 lg:self-end">
            {homeSelection.viewAll}
          </TextLink>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-3">
          {selection.map((product) => (
            <article key={product.slug} className="flex">
              <SmartLink
                href={`/products/${product.slug}`}
                aria-label={`${homeSelection.viewArtwork}: ${product.title}`}
                className="group flex w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand focus-visible:outline-brand"
              >
                <div className="relative aspect-landscape overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1280px) 379px, (min-width: 768px) 30vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <p className="text-xs font-medium uppercase leading-5 tracking-wider text-steel md:min-h-10">
                    {formatCategoryLabel(product.category)}
                  </p>
                  <h3 className="mt-2 text-xl font-medium leading-snug tracking-tight text-deep">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-6">
                    <span className="flex min-h-11 items-center justify-between gap-3 border-t border-light pt-4 text-sm font-semibold text-brand">
                      {homeSelection.viewArtwork}
                      <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 rtl:-rotate-90" />
                    </span>
                  </div>
                </div>
              </SmartLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
