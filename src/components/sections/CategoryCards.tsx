import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { artworkCategories, categoryHref } from "@/data/artwork-categories";
import { categoryIntro } from "@/data/home";
import { allProducts } from "@/data/products";

export function CategoryCards() {
  return (
    <Section id="offerings" tone="white">
      <Container>
        <div>
          <SectionHeading {...categoryIntro} />
        </div>
        <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {artworkCategories.map((category) => {
            const artwork = allProducts.find((product) => product.slug === category.productSlug)!;
            const count = allProducts.filter((product) => product.category === category.id).length;

            return (
              <article key={category.id} className="group relative flex h-full w-[82vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand sm:w-auto sm:max-w-none">
                <div className="relative aspect-[16/11] overflow-hidden bg-ice sm:aspect-[4/3]">
                  <Image
                    src={artwork.image}
                    alt={`${artwork.title} from ${category.title}`}
                    fill
                    sizes="(min-width: 1280px) 379px, (min-width: 1024px) 31vw, (min-width: 640px) 90vw, 82vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                  <span className="absolute start-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-brand sm:start-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">{count} artworks</span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
                  <Eyebrow className="tracking-widest text-[10px] sm:text-label">{category.eyebrow}</Eyebrow>
                  <h3 className="mt-1.5 sm:mt-3 text-lg sm:text-2xl font-medium leading-snug tracking-tight text-deep sm:min-h-16">
                    <SmartLink href={categoryHref(category.id)} className="after:absolute after:inset-0 after:rounded-card">
                      {category.title}
                    </SmartLink>
                  </h3>
                  <p className="mt-2 text-xs sm:text-base leading-relaxed sm:leading-7 text-steel line-clamp-2 sm:line-clamp-none">{category.description}</p>
                  <div className="mt-auto pt-3 sm:pt-7">
                    <span className="flex min-h-10 sm:min-h-11 items-center justify-between gap-3 border-t border-light pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-brand" aria-hidden="true">
                      {categoryIntro.browse}<ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-5 sm:mt-8 flex flex-col gap-2 sm:gap-3 rounded-card bg-ice/60 px-4 py-3 sm:px-6 sm:py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-base text-deep">{categoryIntro.help}</p>
          <TextLink href={categoryIntro.helpLink.href} className="min-h-9 sm:min-h-11 self-start sm:self-auto text-xs sm:text-sm">{categoryIntro.helpLink.label}</TextLink>
        </div>
      </Container>
    </Section>
  );
}
