"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, headingClass } from "@/components/ui/SectionHeading";
import { buttonClass } from "@/components/ui/Link";

/**
 * Route-level error boundary. It renders inside the site chrome, so the header and footer stay
 * usable. Details never reach the visitor; `digest` is an opaque id that matches a server log line.
 */
export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section tone="ice" className="lg:py-44">
      <Container className="text-center">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className={`${headingClass} mx-auto mt-5 max-w-2xl text-deep`}>We could not show this page</h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-steel md:text-lg">
          Please try again. If it keeps happening, let us know and quote the reference below.
        </p>
        {error.digest ? <p className="mt-4 text-micro font-medium uppercase tracking-caps text-steel">Reference {error.digest}</p> : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button type="button" onClick={reset} className={buttonClass()}>
            Try again
          </button>
          <Link href="/" className={buttonClass({ variant: "outline" })}>
            Back to home
          </Link>
        </div>
      </Container>
    </Section>
  );
}
