"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SkeletonImage } from "@/components/atoms/SkeletonImage";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SmartLink, TextLink } from "@/components/atoms/Link";
import { collectionsIntro } from "@/data/collections";
import { mixedMediaProducts } from "@/data/products";
import type { Product } from "@/types/store";

const collectionArtworks = mixedMediaProducts.slice(0, 6);
const collectionHref = "/products?category=Mixed_Media_Canvas";

function CollectionCard({ product }: { product: Product; index: number }) {
  return (
    <article className="group relative flex w-[75vw] max-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-card border border-light bg-white transition-[border-color,box-shadow] duration-300 hover:border-soft sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]">
      <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-ice">
        <SkeletonImage
          src={product.image}
          alt={`${product.title} artwork in the Collections range`}
          fill
          sizes="(min-width: 1280px) 379px, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 75vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
        />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-steel">Collections</p>
        <h3 className="mt-1 text-base font-medium leading-snug tracking-tight text-deep sm:text-lg">
          <SmartLink href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:rounded-card">
            {product.title}
          </SmartLink>
        </h3>
        {product.medium && <p className="mt-1.5 line-clamp-1 text-xs leading-relaxed text-steel sm:text-sm">{product.medium}</p>}
        <div className="mt-auto pt-2.5 sm:pt-3.5">
          <span className="flex min-h-9 items-center justify-between gap-3 border-t border-light pt-2.5 text-xs sm:text-sm font-semibold text-brand" aria-hidden="true">
            {collectionsIntro.viewArtwork}
            <ArrowUpRight className="h-4 w-4 rtl:-rotate-90" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function CollectionGrid() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateControls = () => {
    const carousel = carouselRef.current;
    const first = carousel?.firstElementChild;
    const last = carousel?.lastElementChild;
    if (!carousel || !first || !last) return;

    const frame = carousel.getBoundingClientRect();
    const firstCard = first.getBoundingClientRect();
    const lastCard = last.getBoundingClientRect();
    const isRtl = getComputedStyle(carousel).direction === "rtl";
    setCanPrev(isRtl ? firstCard.right > frame.right + 4 : firstCard.left < frame.left - 4);
    setCanNext(isRtl ? lastCard.left < frame.left - 4 : lastCard.right > frame.right + 4);
  };

  const move = (direction: -1 | 1) => {
    const carousel = carouselRef.current;
    const card = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !card) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const isRtl = getComputedStyle(carousel).direction === "rtl";
    carousel.scrollBy({
      left: (card.offsetWidth + gap) * direction * (isRtl ? -1 : 1),
      behavior: "smooth",
    });
  };

  return (
    <Section id="collections" tone="white" className="border-t border-light">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={collectionsIntro.eyebrow} title={collectionsIntro.title} description={collectionsIntro.description} />
          <div className="hidden md:flex md:shrink-0 md:items-center md:gap-2">
            <button type="button" onClick={() => move(-1)} disabled={!canPrev} aria-label="Previous collection artwork" aria-controls="collection-carousel" className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={!canNext} aria-label="Next collection artwork" aria-controls="collection-carousel" className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-light bg-white text-brand transition-colors hover:border-brand hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div
          id="collection-carousel"
          ref={carouselRef}
          role="region"
          aria-label="Collection artworks"
          tabIndex={0}
          onScroll={updateControls}
          className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 sm:-mx-8 sm:mt-10 sm:gap-5 sm:scroll-px-8 sm:px-8 sm:pb-5 lg:mx-0 lg:px-0 lg:scroll-px-0"
        >
          {collectionArtworks.map((product, index) => <CollectionCard key={product.id} product={product} index={index} />)}
        </div>

        <div className="mt-4 flex justify-start sm:mt-7">
          <TextLink href={collectionHref} className="min-h-10 sm:min-h-11 text-xs sm:text-sm">{collectionsIntro.viewAll}</TextLink>
        </div>
      </Container>
    </Section>
  );
}
