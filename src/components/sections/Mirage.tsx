import { ImageWithText } from "@/components/common/ImageWithText";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { mirage } from "@/data/collections";

/** The commission layout, mirrored: words on the start side, picture on the end side. */
export function Mirage() {
  return (
    <Section id="mirage" tone="white">
      <Container>
        <ImageWithText feature={mirage} isReversed />
      </Container>
    </Section>
  );
}
