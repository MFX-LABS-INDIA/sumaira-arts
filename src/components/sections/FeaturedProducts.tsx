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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={homeSelection.eyebrow}
            title={homeSelection.title}
            description={homeSelection.description}
          />
          <TextLink href="/products" className="min-h-10 sm:min-h-11 self-start lg:shrink-0 lg:self-end text-xs sm:text-sm">
            {homeSelection.viewAll}
          </TextLink>
        </div>

        <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {selection.map((product) => (
            <article key={product.slug} className="flex w-[80vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <SmartLink
                href={`/products/${product.slug}`}
                aria-label={`${homeSelection.viewArtwork}: ${product.title}`}
                className="group flex w-full flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand focus-visible:outline-brand"
              >
                <div className="relative aspect-[16/11] sm:aspect-landscape overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 1280px) 379px, (min-width: 768px) 30vw, (min-width: 640px) calc(100vw - 64px), 80vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
                  <p className="text-[10px] sm:text-xs font-medium uppercase leading-tight sm:leading-5 tracking-wider text-steel sm:min-h-10">
                    {formatCategoryLabel(product.category)}
                  </p>
                  <h3 className="mt-1 sm:mt-2 text-base sm:text-xl font-medium leading-snug tracking-tight text-deep">
                    {product.title}
                  </h3>
                  <div className="mt-auto pt-3 sm:pt-6">
                    <span className="flex min-h-10 sm:min-h-11 items-center justify-between gap-3 border-t border-light pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-brand">
                      {homeSelection.viewArtwork}
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 rtl:-rotate-90" />
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
