import Image from "next/image";
import { ArtImage } from "@/components/art/ArtImage";
import { ArtPiece } from "@/components/art/ArtPiece";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { headingClass } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink, SmartLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import { featuredCollection as content } from "@/data/collections";
import { products } from "@/data/products";
import type { Product } from "@/types/content";

// TODO: point at `/artwork/${product.slug}` once product pages exist.
const productHref = "#";

/** One row inside the picks card: a small thumbnail, the title, the price, and an arrow that nudges on hover. */
function PickRow({ product }: { product: Product }) {
  return (
    <SmartLink
      href={productHref}
      className="group/pick flex items-center gap-4 px-5 py-3.5 transition-colors duration-300 hover:bg-ice focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mist"
    >
      <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-control bg-ice">
        {product.image ? (
          <Image src={product.image} alt="" fill sizes="3.5rem" className="object-contain p-1.5" />
        ) : (
          <div role="img" aria-label="" className="absolute inset-[14%]">
            <ArtPiece variant={product.art} className="h-full w-full" />
          </div>
        )}
      </div>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-serif text-base font-light tracking-tight text-deep">{product.title}</span>
        <span className="mt-0.5 block text-sm text-steel">{formatPrice(product.price)}</span>
      </span>
      <ArrowIcon className="h-4 w-4 shrink-0 text-brand opacity-0 transition-[opacity,transform] duration-300 group-hover/pick:translate-x-1 group-hover/pick:opacity-100 group-focus-visible/pick:translate-x-1 group-focus-visible/pick:opacity-100 motion-reduce:transition-none" />
    </SmartLink>
  );
}

/** A large banner on the start side, badged with its own name; the excerpt and a curated-picks card on the end side. */
export function CollectionFeature() {
  const picks = content.productSlugs.flatMap((slug) => products.find((product) => product.slug === slug) ?? []);

  return (
    <Section id="featured" tone="white">
      <Container>
        {/* No items-start/center: the grid's default stretch makes the banner match the text column's own
            height exactly, so there is no dead space under whichever side happens to be shorter. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="group relative h-full lg:col-span-7">
            <ArtImage
              art={content.art}
              scene={content.scene}
              src={content.image}
              alt={content.alt}
              zoom
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-landscape h-full lg:aspect-auto"
            />
            {content.eyebrow ? (
              <span className="absolute start-5 top-5 rounded-control bg-white/95 px-4 py-2 text-label font-medium uppercase tracking-caps text-deep shadow-raised">
                {content.eyebrow}
              </span>
            ) : null}
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <h2 className={`${headingClass} text-deep`}>{content.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-steel md:text-base">{content.description}</p>
            </Reveal>

            {picks.length > 0 ? (
              <Reveal delay={150} className="mt-8 overflow-hidden rounded-card border border-light">
                <div className="flex items-center justify-between border-b border-light bg-ice px-5 py-3">
                  <span className="text-label font-medium uppercase tracking-caps text-steel">Featured pieces</span>
                  <span className="text-label font-medium uppercase tracking-caps text-steel">{picks.length}</span>
                </div>
                <div className="divide-y divide-light">
                  {picks.map((product) => (
                    <PickRow key={product.slug} product={product} />
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={220} className="mt-8">
              <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
