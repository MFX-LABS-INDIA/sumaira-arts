import { ArrowRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, SectionHeading } from "@/components/molecules/SectionHeading";
import { SmartLink } from "@/components/atoms/Link";
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
        <div className="mt-6 -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 no-scrollbar sm:mx-0 sm:mt-10 sm:px-0 sm:scroll-px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {artworkCategories.map((category) => {
            const artwork = allProducts.find((product) => product.slug === category.productSlug)!;

            return (
              <article key={category.id} className="group relative flex h-full w-[82vw] max-w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand sm:w-auto sm:max-w-none">
                <div className="relative aspect-[16/10] overflow-hidden bg-ice">
                  <SkeletonImage
                    src={artwork.image}
                    alt={`${artwork.title} from ${category.title}`}
                    fill
                    sizes="(min-width: 1280px) 379px, (min-width: 1024px) 31vw, (min-width: 640px) 90vw, 82vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3.5 sm:p-5">
                  <Eyebrow className="tracking-widest text-[10px] sm:text-label">{category.eyebrow}</Eyebrow>
                  <h3 className="mt-1 sm:mt-2 text-base sm:text-xl font-medium leading-snug tracking-tight text-deep">
                    <SmartLink href={categoryHref(category.id)} className="after:absolute after:inset-0 after:rounded-card">
                      {category.title}
                    </SmartLink>
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-steel line-clamp-2">{category.description}</p>
                  <div className="mt-auto pt-3 sm:pt-4">
                    <span className="flex min-h-9 items-center justify-between gap-3 border-t border-light pt-2.5 sm:pt-3 text-xs sm:text-sm font-semibold text-brand" aria-hidden="true">
                      {categoryIntro.browse}<ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
