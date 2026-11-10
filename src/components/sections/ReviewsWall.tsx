"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/Link";
import { StarRating } from "@/components/ui/StarRating";
import { reviewSummary, reviews, testimonialsIntro } from "@/data/reviews";

export function ReviewsWall() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(reviews.length - 1);
  const getMaxIndex = () => {
    const carousel = carouselRef.current;
    const firstCard = carousel?.children[0] as HTMLElement | undefined;
    if (!carousel || !firstCard) return reviews.length - 1;
    const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
    const visibleCards = Math.max(1, Math.floor((carousel.clientWidth + gap) / (firstCard.offsetWidth + gap)));
    return Math.max(0, reviews.length - visibleCards);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const observer = new ResizeObserver(() => {
      const lastIndex = getMaxIndex();
      setMaxIndex(lastIndex);
      setActiveIndex((current) => Math.min(current, lastIndex));
    });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  const moveTo = (index: number) => {
    const carousel = carouselRef.current;
    const safeIndex = Math.max(0, Math.min(getMaxIndex(), index));
    const item = carousel?.children[safeIndex] as HTMLElement | undefined;
    if (!carousel || !item) return;
    carousel.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setActiveIndex(safeIndex);
  };
  const moveBy = (direction: -1 | 1) => moveTo(Math.max(0, Math.min(maxIndex, activeIndex + direction)));

  return (
    <Section id="stories" tone="ice">
      <Container>
        <SectionHeading align="center" eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} />
        {reviewSummary ? <p className="mt-6 text-center text-body-sm text-steel"><span className="font-serif text-xl text-deep">{reviewSummary.rating} / 5</span> from {reviewSummary.count} reviews</p> : null}
        <div
          ref={carouselRef}
          role="region"
          aria-label={testimonialsIntro.title}
          tabIndex={0}
          onScroll={(event) => {
            const carousel = event.currentTarget;
            const firstCard = carousel.children[0] as HTMLElement | undefined;
            if (!firstCard) return;
            const gap = Number.parseFloat(getComputedStyle(carousel).gap) || 0;
            setActiveIndex(Math.max(0, Math.min(getMaxIndex(), Math.round(carousel.scrollLeft / (firstCard.offsetWidth + gap)))));
          }}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-4 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:px-0"
        >
          {reviews.map((review) => (
            <figure key={review.id} className="flex w-[82vw] max-w-96 shrink-0 snap-start flex-col rounded-card border border-light bg-white p-6 sm:p-7 md:w-[calc((100%-3rem)/3)] md:max-w-none">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-xs font-bold text-white">{review.avatar}</span>
                <figcaption><p className="font-medium text-deep">{review.name}</p><p className="mt-0.5 text-xs text-steel">{review.date}</p></figcaption>
              </div>
              <StarRating rating={review.rating} className="mt-6" />
              <blockquote className="mt-4 flex-1 font-serif text-lg font-light leading-relaxed text-deep">“{review.description}”</blockquote>
              <p className="mt-6 border-t border-light pt-4 text-sm text-steel">Collected <SmartLink href={`/products/${review.productSlug}`} className="font-medium text-brand hover:underline">{review.productName}</SmartLink></p>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => moveBy(-1)} disabled={activeIndex === 0} aria-label="Previous testimonial" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-deep transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"><ChevronLeft className="h-5 w-5" /></button>
          <div className="flex items-center gap-2" aria-label="Testimonial carousel pages">
            {reviews.slice(0, maxIndex + 1).map((review, index) => <button key={review.id} type="button" onClick={() => moveTo(index)} aria-label={`Show testimonial from ${review.name}`} aria-current={activeIndex === index ? "true" : undefined} className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-6 bg-brand" : "w-2 bg-mist hover:bg-steel"}`} />)}
          </div>
          <button type="button" onClick={() => moveBy(1)} disabled={activeIndex === maxIndex} aria-label="Next testimonial" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light bg-white text-deep transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-35"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </Container>
    </Section>
  );
}
