import { SiteChrome } from "@/templates/SiteChrome";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { Eyebrow, headingClass } from "@/components/molecules/SectionHeading";
import { ButtonLink } from "@/components/atoms/Link";

export default function NotFound() {
  return (
    <SiteChrome>
      <Section tone="ice" className="lg:py-44">
        <Container className="text-center">
          <Eyebrow>Page not found</Eyebrow>
          <h1 className={`${headingClass} mx-auto mt-5 max-w-2xl text-deep`}>This page has wandered off the wall</h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-steel md:text-lg">
            The page you are looking for may have moved. Let us take you back to the collection.
          </p>
          <div className="mt-10">
            <ButtonLink href="/">Back to home</ButtonLink>
          </div>
        </Container>
      </Section>
    </SiteChrome>
  );
}
