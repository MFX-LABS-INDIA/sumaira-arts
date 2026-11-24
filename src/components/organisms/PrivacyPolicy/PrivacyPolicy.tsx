import Link from "next/link";
import { privacyPolicy } from "@/data/privacy";
import { Container } from "@/components/atoms/Container";
import { Section } from "@/components/atoms/Section";
import { SectionHeading } from "@/components/molecules/SectionHeading";

export function PrivacyPolicy({ contactEmail }: { contactEmail: string }) {
  return (
    <Section tone="white" className="py-10 sm:py-14 md:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Sumaira Arts"
          title={privacyPolicy.title}
          description={privacyPolicy.introduction}
        />

        <div className="mt-8 space-y-8 sm:mt-10">
          {privacyPolicy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-xl font-light text-deep">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-steel sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="text-sm leading-relaxed text-steel sm:text-base">
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-brand underline underline-offset-4"
              >
                Email the studio
              </a>
            ) : (
              <Link
                href="/#contact"
                className="font-medium text-brand underline underline-offset-4"
              >
                Contact the studio
              </Link>
            )}
          </p>
        </div>
      </Container>
    </Section>
  );
}
