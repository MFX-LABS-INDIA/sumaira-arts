import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/Link";
import { StarRating } from "@/components/ui/StarRating";
import { reviewSummary, reviews, testimonialsIntro } from "@/data/reviews";

/** Swipe carousel on phones, a four-column masonry on desktop. Photo, stars, date, product and reply show only when present. */
export function ReviewsWall() {
  return (
    <Section id="stories" tone="ice">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} />
          {reviewSummary ? (
            <p className="mt-6 text-center text-body-sm text-steel">
              <span className="font-serif text-xl text-deep">{reviewSummary.rating} / 5</span> from {reviewSummary.count} reviews
            </p>
          ) : null}
        </Reveal>

        <div
          role="region"
          aria-label={testimonialsIntro.title}
          tabIndex={0}
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-5 px-5 pb-8 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-16 md:block md:columns-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:columns-4"
        >
          {reviews.map((review, index) => (
            <Reveal
              key={index}
              delay={(index % 4) * 100}
              className="w-[80vw] max-w-80 shrink-0 snap-start md:mb-6 md:w-auto md:max-w-none md:break-inside-avoid"
            >
              <figure className="overflow-hidden rounded-card border border-light bg-white">
                {review.photo ? (
                  <ArtImage
                    art={review.photo.art}
                    scene={review.photo.scene}
                    src={review.photo.image}
                    alt={review.photo.alt}
                    sizes="(min-width: 1024px) 25vw, 80vw"
                    className="aspect-landscape"
                  />
                ) : null}
                <div className="p-6">
                  {review.rating !== undefined ? <StarRating rating={review.rating} className="mb-3" /> : null}
                  <blockquote className="font-serif text-lg leading-relaxed text-deep">{review.quote}</blockquote>
                  <figcaption className="mt-5 text-micro font-medium uppercase tracking-caps text-steel">
                    {review.author}
                    {review.verified ? <span className="ms-2 text-brand">· Verified</span> : null}
                    {review.date ? <span className="mt-1 block normal-case tracking-normal">{review.date}</span> : null}
                  </figcaption>
                  {review.product ? (
                    <p className="mt-3 text-body-sm">
                      <SmartLink href={review.product.href} className="text-brand underline-offset-4 hover:underline">
                        {review.product.label}
                      </SmartLink>
                    </p>
                  ) : null}
                  {review.reply ? (
                    <p className="mt-4 border-s-2 border-soft ps-3 text-body-sm leading-relaxed text-steel">{review.reply}</p>
                  ) : null}
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
