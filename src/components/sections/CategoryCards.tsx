import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink, TextLink } from "@/components/ui/Link";
import { artworkCategories, categoryHref } from "@/data/artwork-categories";
import { categoryIntro } from "@/data/home";
import { allProducts } from "@/data/products";

export function CategoryCards() {
  return (
    <Section id="offerings" tone="white">
      <Container>
        <div id="collections" className="scroll-mt-24">
          <SectionHeading {...categoryIntro} />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {artworkCategories.map((category) => {
            const artwork = allProducts.find((product) => product.slug === category.productSlug)!;
            const count = allProducts.filter((product) => product.category === category.id).length;

            return (
              <article key={category.id} className="group relative flex h-full flex-col overflow-hidden rounded-card border border-light bg-white transition-colors hover:border-brand">
                <div className="relative aspect-[4/3] overflow-hidden bg-ice">
                  <Image
                    src={artwork.image}
                    alt={`${artwork.title} from ${category.title}`}
                    fill
                    sizes="(min-width: 1280px) 379px, (min-width: 1024px) 31vw, (min-width: 640px) 90vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                  <span className="absolute start-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-brand">{count} artworks</span>
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <Eyebrow className="tracking-widest">{category.eyebrow}</Eyebrow>
                  <h3 className="mt-3 text-2xl font-medium leading-snug tracking-tight text-deep lg:min-h-16">
                    <SmartLink href={categoryHref(category.id)} className="after:absolute after:inset-0 after:rounded-card">
                      {category.title}
                    </SmartLink>
                  </h3>
                  <p className="mt-4 text-base leading-7 text-steel">{category.description}</p>
                  <div className="mt-auto pt-7">
                    <span className="flex min-h-11 items-center justify-between gap-3 border-t border-light pt-4 text-sm font-semibold text-brand" aria-hidden="true">
                      {categoryIntro.browse}<ArrowRight className="h-4 w-4 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-card bg-ice/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base text-deep">{categoryIntro.help}</p>
          <TextLink href={categoryIntro.helpLink.href} className="min-h-11 self-start sm:self-auto">{categoryIntro.helpLink.label}</TextLink>
        </div>
      </Container>
    </Section>
  );
}
