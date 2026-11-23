import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink, SmartLink, TextLink } from "@/components/ui/Link";
import { homeHero } from "@/data/home";
import { allProducts, formatCategoryLabel } from "@/data/products";

/** A steady introduction keeps the artwork and the next step visible together. */
export function Hero() {
  const artwork = allProducts.find((product) => product.slug === homeHero.featuredSlug)!;

  return (
    <section aria-labelledby="home-title" className="overflow-hidden border-b border-light bg-ice/50">
      <Container className="py-6 sm:py-10 lg:py-14">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-6 bg-brand sm:w-8" aria-hidden="true" />
              <Eyebrow>{homeHero.eyebrow}</Eyebrow>
            </div>
            <h1 id="home-title" className="mt-3 sm:mt-4 text-[clamp(1.85rem,6.5vw,2.75rem)] sm:text-[clamp(2.35rem,4.5vw,4rem)] font-medium leading-[1.12] tracking-tight text-deep text-balance">
              {homeHero.title}
              <span className="mt-1 sm:mt-2 block font-light text-brand">{homeHero.accent}</span>
            </h1>
            <p className="mt-3 sm:mt-5 max-w-lg text-sm sm:text-base leading-relaxed sm:leading-8 text-steel">{homeHero.description}</p>
            <div className="mt-5 sm:mt-7 grid grid-cols-1 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={homeHero.primary.href} className="min-h-12 w-full justify-center shadow-sm sm:w-auto">
                {homeHero.primary.label}
              </ButtonLink>
              <TextLink
                href={homeHero.secondary.href}
                className="min-h-11 w-full justify-center rounded-control border border-light bg-white/90 px-4 sm:w-auto sm:rounded-none sm:border-0 sm:border-b sm:bg-transparent sm:px-0"
              >
                {homeHero.secondary.label}
              </TextLink>
            </div>
          </div>

          <figure className="group relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-light bg-white shadow-artwork lg:max-w-none">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square">
              <Image
                src={artwork.image}
                alt={homeHero.imageAlt}
                fill
                preload
                sizes="(min-width: 1280px) 564px, (min-width: 1024px) 46vw, (min-width: 640px) 80vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
              <span className="absolute start-3 top-3 rounded-full border border-white/70 bg-white/92 px-3 py-1.5 text-[11px] font-medium text-brand shadow-xs backdrop-blur-xs sm:start-5 sm:top-5 sm:px-4 sm:py-2 sm:text-xs">
                {homeHero.featuredLabel}
              </span>
            </div>
            <figcaption className="flex items-center justify-between gap-3 p-3.5 sm:p-5 sm:px-6">
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs leading-relaxed text-steel">{formatCategoryLabel(artwork.category)}</p>
                <h2 className="mt-0.5 sm:mt-1 truncate text-base sm:text-lg font-medium text-deep">
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
      </Container>
    </section>
  );
}
