import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, headingClass } from "@/components/molecules/SectionHeading";
import { Reveal } from "@/components/atoms/Reveal";
import { TextLink } from "@/components/atoms/Link";
import { intro } from "@/data/home";

/** A narrow, centred column (680px) with generous space around it. */
export function BrandStatement() {
  return (
    <Section id="story" tone="ice" className="lg:py-36">
      <Container>
        <div className="mx-auto max-w-[680px] text-center">
          <Reveal>
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 className={`${headingClass} mt-5 text-deep`}>{intro.title}</h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 text-sm leading-relaxed text-steel md:text-base">{intro.description}</p>
            <div className="mt-8">
              <TextLink href={intro.cta.href}>{intro.cta.label}</TextLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
