import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Link";
import { intro } from "@/data/home";

export function BrandStatement() {
  return (
    <Section id="story" tone="ice">
      <Container className="text-center">
        <Reveal>
          <span aria-hidden className="mx-auto block h-px w-14 bg-brand" />
          <Eyebrow className="mt-8">{intro.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <h2 className={`${headingClass} mx-auto mt-6 max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] text-deep`}>
            {intro.title}
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-steel md:text-lg">{intro.description}</p>
          <div className="mt-10">
            <TextLink href={intro.cta.href}>{intro.cta.label}</TextLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
