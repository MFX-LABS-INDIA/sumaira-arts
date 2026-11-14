import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink, SmartLink, TextLink } from "@/components/ui/Link";
import { homeHero } from "@/data/home";
import { artworkCategories, categoryHref } from "@/data/artwork-categories";
import { allProducts, formatCategoryLabel } from "@/data/products";

/** A steady introduction keeps the artwork and the next step visible together. */
export function Hero() {
  const artwork = allProducts.find((product) => product.slug === homeHero.featuredSlug)!;

  return (
    <section aria-labelledby="home-title" className="overflow-hidden border-b border-light bg-ice/50">
      <Container className="py-6 sm:py-12 lg:py-14">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <Eyebrow>{homeHero.eyebrow}</Eyebrow>
            <h1 id="home-title" className="mt-3 sm:mt-5 text-[clamp(1.85rem,6.5vw,2.75rem)] sm:text-[clamp(2.5rem,4.5vw,4rem)] font-medium leading-[1.15] sm:leading-[1.12] tracking-tight text-deep text-balance">
              {homeHero.title}
              <span className="mt-1 sm:mt-2 block font-light text-brand">{homeHero.accent}</span>
            </h1>
            <p className="mt-3 sm:mt-6 max-w-lg text-sm sm:text-base leading-relaxed sm:leading-8 text-steel">{homeHero.description}</p>
            <div className="mt-5 sm:mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-7">
              <ButtonLink href={homeHero.primary.href} className="min-h-11 sm:min-h-12">{homeHero.primary.label}</ButtonLink>
              <TextLink href={homeHero.secondary.href} className="min-h-10 sm:min-h-11 self-center">{homeHero.secondary.label}</TextLink>
            </div>
          </div>

          <figure className="group relative overflow-hidden rounded-2xl border border-light bg-white shadow-artwork">
            <div className="relative aspect-[16/11] sm:aspect-square">
              <Image
                src={artwork.image}
                alt={homeHero.imageAlt}
                fill
                preload
                sizes="(min-width: 1280px) 564px, (min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                className="object-cover"
              />
              <span className="absolute start-3 top-3 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-brand sm:start-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">{homeHero.featuredLabel}</span>
            </div>
            <figcaption className="flex items-center justify-between gap-3 p-3.5 sm:p-5 sm:px-6">
              <div>
                <p className="text-[11px] sm:text-xs leading-relaxed text-steel">{formatCategoryLabel(artwork.category)}</p>
                <h2 className="mt-0.5 sm:mt-1 text-base sm:text-lg font-medium text-deep">
                  <SmartLink href={`/products/${artwork.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                    {artwork.title}
                  </SmartLink>
                </h2>
              </div>
              <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-light text-brand transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white" aria-hidden="true">
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 rtl:-rotate-90" />
              </span>
            </figcaption>
          </figure>
        </div>

        <nav aria-label={homeHero.categoryNavLabel} className="mt-6 border-t border-light pt-3.5 sm:mt-10 sm:pt-5 lg:mt-12">
          <ul className="grid gap-1.5 sm:gap-2 md:grid-cols-3 md:gap-6">
            {artworkCategories.map((category, index) => (
              <li key={category.id}>
                <SmartLink href={categoryHref(category.id)} className="group flex min-h-10 sm:min-h-12 items-center gap-2.5 sm:gap-3 rounded-control px-2 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-deep transition-colors hover:bg-white hover:text-brand">
                  <span className="text-[11px] sm:text-xs text-steel" aria-hidden="true">0{index + 1}</span>
                  <span className="flex-1">{category.title}</span>
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-brand rtl:-rotate-90" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
