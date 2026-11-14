import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Link";
import { homeClosing } from "@/data/home";

export function HomeClosing() {
  return (
    <Section tone="deep" className="!py-16 md:!py-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">{homeClosing.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-tight tracking-tight text-white">{homeClosing.title}</h2>
            <p className="mt-4 text-base leading-7 text-light">{homeClosing.description}</p>
          </div>
          <ButtonLink href={homeClosing.cta.href} variant="inverse" tone="dark" className="min-h-12 shrink-0 self-start">
            {homeClosing.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
