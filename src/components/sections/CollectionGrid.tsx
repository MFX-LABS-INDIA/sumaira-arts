"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { collectionsIntro } from "@/data/collections";
import { mixedMediaProducts } from "@/data/products";
import type { Product } from "@/types/store";

const collectionArtworks = mixedMediaProducts.slice(0, 6);
const collectionHref = "/products?category=Mixed_Media_Canvas";

function CollectionCard({ product, index }: { product: Product; index: number }) {
  return (
    <article className="group relative flex w-[75vw] max-w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-light bg-white shadow-xs transition-[border-color,box-shadow] duration-300 hover:border-soft hover:shadow-raised sm:w-[calc((100%-1.25rem)/2)] sm:max-w-none lg:w-[calc((100%-2.5rem)/3)]">
      <div className="relative aspect-[5/6] sm:aspect-[4/5] overflow-hidden bg-ice">
        <Image
          src={product.image}
          alt={`${product.title} artwork in the Collections range`}
          fill
          sizes="(min-width: 1280px) 379px, (min-width: 1024px) 31vw, (min-width: 640px) 45vw, 75vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
        />
        <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-brand shadow-xs sm:start-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
          {String(index + 1).padStart(2, "0")} / {String(collectionArtworks.length).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-steel">Collections</p>
        <h3 className="mt-1.5 sm:mt-2 text-lg font-medium leading-snug tracking-tight text-deep sm:text-2xl">
          <SmartLink href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
            {product.title}
          </SmartLink>
        </h3>
        {product.medium && <p className="mt-2 sm:mt-3 line-clamp-2 text-xs sm:text-sm leading-relaxed sm:leading-6 text-steel">{product.medium}</p>}
        <div className="mt-auto pt-3 sm:pt-6">
          <span className="flex min-h-10 sm:min-h-11 items-center justify-between gap-3 border-t border-light pt-3 sm:pt-4 text-xs sm:text-sm font-semibold text-brand" aria-hidden="true">
            {collectionsIntro.viewArtwork}
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 rtl:-rotate-90" />
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
          <div className="flex items-center gap-2 sm:shrink-0">
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
