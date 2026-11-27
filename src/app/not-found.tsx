import Image from "next/image";
import { SiteChrome } from "@/components/templates/SiteChrome";
import { Container } from "@/components/atoms/Container";
import { ButtonLink, TextLink } from "@/components/atoms/Link";

export default function NotFound() {
  return (
    <SiteChrome>
      <section aria-labelledby="missing-page-title" className="bg-[#fbf8f2] text-deep">
        <Container className="flex min-h-screen flex-col items-center justify-center py-10 text-center supports-[height:100dvh]:min-h-dvh sm:py-16 lg:py-20">
          <Image
            src="/assets/brand/calligraphy-404.svg"
            width={452}
            height={224}
            alt="404"
            unoptimized
            className="h-auto w-64 max-w-full sm:w-96 lg:w-[28.25rem]"
          />
          <h1 id="missing-page-title" className="mt-5 text-3xl font-medium tracking-tight sm:mt-7 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-steel">
            This link may have changed. You can still explore the artworks in our gallery.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <ButtonLink href="/products">Browse artworks</ButtonLink>
            <TextLink href="/" className="min-h-11">Back to home</TextLink>
          </div>
        </Container>
      </section>
    </SiteChrome>
  );
}
