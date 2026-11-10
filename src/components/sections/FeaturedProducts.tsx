"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featured, mostLovedProducts, products } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";

const AUTO_ADVANCE_MS = 4000;

export function FeaturedProducts() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lovedSlugs = new Set(mostLovedProducts.map((product) => product.slug));
  const lovedProducts = products.filter((product) => lovedSlugs.has(product.slug)).sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));

  const moveTo = (index: number) => {
    const carousel = carouselRef.current;
    const item = carousel?.children[index] as HTMLElement | undefined;
    if (!carousel || !item) return;
    carousel.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = window.setInterval(() => moveTo(activeIndex === lovedProducts.length - 1 ? 0 : activeIndex + 1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [activeIndex, lovedProducts.length]);

  return (
    <Section id="artwork" tone="ice">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={featured.eyebrow} title={featured.title} description={featured.description} />
          <div className="flex items-center gap-4">
            <p className="text-label font-medium uppercase tracking-caps text-steel">Eight collector favourites</p>
            <button type="button" onClick={() => moveTo(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Previous most loved artwork" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light bg-white text-deep hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={() => moveTo(activeIndex === lovedProducts.length - 1 ? 0 : activeIndex + 1)} aria-label="Next most loved artwork" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-light bg-white text-deep hover:border-brand hover:text-brand"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div
          ref={carouselRef}
          role="region"
          aria-label={featured.title}
          tabIndex={0}
          onScroll={(event) => {
            const carousel = event.currentTarget;
            const firstCard = carousel.children[0] as HTMLElement | undefined;
            if (!firstCard) return;
            const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
            setActiveIndex(Math.max(0, Math.min(lovedProducts.length - 1, Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap)))));
          }}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:px-0"
        >
          {lovedProducts.map((product, index) => <ProductCard key={product.slug} product={product} index={index} homeCard className="w-[72vw] max-w-72 shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] sm:max-w-none md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]" />)}
        </div>
      </Container>
    </Section>
  );
}
