"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, SmartLink } from "@/components/ui/Link";
import { collectionsIntro } from "@/data/collections";
import { mixedMediaProducts } from "@/data/products";
import type { Product } from "@/types/store";

const INITIAL = 6;
const mixedMediaCollectionHref = "/products?category=Mixed_Media_Canvas";

function CollectionCard({ product }: { product: Product }) {
  return (
    <article className="group relative w-[72vw] max-w-72 shrink-0 snap-start md:w-72">
      <div className="relative">
        <ArtImage
          art={(product.artVariant || "allah") as never}
          src={product.image}
          alt=""
          zoom
          sizes="(min-width: 1024px) 30vw, 46vw"
          className="aspect-portrait"
        />
        <h3 className="absolute inset-x-3 bottom-3 rounded-control bg-white/95 px-4 py-2.5 text-center font-serif text-base font-light leading-snug tracking-tight text-deep">
          <SmartLink href={mixedMediaCollectionHref} className="after:absolute after:inset-0 after:content-['']">
            {product.title}
          </SmartLink>
        </h3>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-steel">{product.description}</p>
    </article>
  );
}

/**
 * A concise collection carousel keeps the home page focused; the CTA opens the complete collection catalogue.
 */
export function CollectionGrid() {
  const first = mixedMediaProducts.slice(0, INITIAL);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const moveTo = (index: number) => {
    const carousel = carouselRef.current;
    const item = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !item) return;
    carousel.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const moveBy = (direction: -1 | 1) => {
    moveTo(Math.max(0, Math.min(first.length - 1, activeIndex + direction)));
  };

  return (
    <Section id="collections" tone="ice">
      <Container>
        <SectionHeading eyebrow={collectionsIntro.eyebrow} title={collectionsIntro.title} description={collectionsIntro.description} />

        <div
          ref={carouselRef}
          onScroll={(event) => {
            const carousel = event.currentTarget;
            const firstCard = carousel.children[0] as HTMLElement | undefined;
            if (!firstCard) return;
            const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
            setActiveIndex(Math.max(0, Math.min(first.length - 1, Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap)))));
          }}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:mt-16 md:mx-0 md:px-0"
        >
          {first.map((product) => (
            <CollectionCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => moveBy(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous collection"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-deep transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2" aria-label="Collection carousel pages">
            {first.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => moveTo(index)}
                aria-label={`Show ${product.title}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-brand" : "w-2 bg-mist hover:bg-steel"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => moveBy(1)}
            disabled={activeIndex === first.length - 1}
            aria-label="Next collection"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-deep transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={mixedMediaCollectionHref}>{collectionsIntro.viewAll}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
