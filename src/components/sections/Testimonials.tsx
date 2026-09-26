import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { reviewSummary, testimonials, testimonialsIntro } from "@/data/reviews";

export function Testimonials() {
  return (
    <Section id="stories" tone="ice">
      <Container>
        <Reveal>
          <SectionHeading align="center" eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} />
          {reviewSummary ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="flex items-baseline gap-2 text-deep">
                <span className="font-serif text-5xl leading-none">{reviewSummary.rating}</span>
                <span className="text-sm text-steel">/ 5</span>
              </div>
              <div className="flex gap-1 text-brand" role="img" aria-label={`${reviewSummary.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-label font-medium uppercase tracking-caps text-steel">{reviewSummary.count} Reviews</p>
            </div>
          ) : null}
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 120}>
              <figure className="flex h-full flex-col rounded-card border border-light bg-white p-8 md:p-10">
                <span aria-hidden className="font-serif text-6xl leading-none text-soft">
                  “
                </span>
                <blockquote className="-mt-2 flex-1 font-serif text-xl leading-relaxed text-deep md:text-[1.4rem]">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 text-micro font-medium uppercase tracking-caps text-steel">
                  {testimonial.author}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
