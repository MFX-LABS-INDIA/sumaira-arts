import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { newsletter } from "@/data/newsletter";

export function Newsletter() {
  return (
    <Section id="newsletter" tone="deep">
      <Container className="text-center">
        <Reveal>
          <Eyebrow tone="dark">{newsletter.eyebrow}</Eyebrow>
          <h2 className={`${headingClass} mt-5 text-white`}>{newsletter.title}</h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-light/80 md:text-lg">{newsletter.description}</p>
          <div className="mx-auto mt-10 max-w-xl text-start">
            <NewsletterForm id="newsletter-email" />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
