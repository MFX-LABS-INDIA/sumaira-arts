import { ImageWithText } from "@/components/common/ImageWithText";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { commission } from "@/data/commission";

/** Picture on the start side (60%), the words and the three steps on the end side (40%). */
export function Commission() {
  return (
    <Section id="commission" tone="light">
      <Container>
        <ImageWithText feature={commission}>
          <ol className="mt-8 space-y-4">
            {commission.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-serif text-lg italic text-brand" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-sm font-medium text-deep">{step.title}</span>
                  <span className="block text-sm leading-relaxed text-steel">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </ImageWithText>
      </Container>
    </Section>
  );
}
