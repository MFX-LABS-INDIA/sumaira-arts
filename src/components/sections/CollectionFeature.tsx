import Image from "next/image";
import { ArtImage } from "@/components/art/ArtImage";
import { ArtPiece } from "@/components/art/ArtPiece";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import { ButtonLink, SmartLink } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import { featuredCollection as content } from "@/data/collections";
import { products } from "@/data/products";
import type { Product } from "@/types/content";

// TODO: point at `/artwork/${product.slug}` once product pages exist.
const productHref = "#";

/** One line of the picks list: a small thumbnail, the title, the price, and an arrow that nudges on hover. */
function PickRow({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal delay={200 + index * 90}>
      <SmartLink
        href={productHref}
        className="group/pick flex items-center gap-4 rounded-control border border-light bg-white p-3 transition-colors duration-300 hover:border-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
      >
        <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-control bg-ice">
          {product.image ? (
            <Image src={product.image} alt="" fill sizes="4rem" className="object-contain p-1.5" />
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
    </Reveal>
  );
}

/** A large banner on the start side; the excerpt and a scannable list of the collection's artworks on the end side. */
export function CollectionFeature() {
  const picks = content.productSlugs.flatMap((slug) => products.find((product) => product.slug === slug) ?? []);

  return (
    <Section id="featured" tone="white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="group lg:col-span-7">
            <ArtImage
              art={content.art}
              scene={content.scene}
              src={content.image}
              alt={content.alt}
              zoom
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-landscape lg:aspect-[5/4]"
            />
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <SectionHeading eyebrow={content.eyebrow ?? ""} title={content.title} description={content.description} />
              {picks.length > 0 ? (
                <p className="mt-5 text-label font-medium uppercase tracking-caps text-steel">{picks.length} pieces from the collection</p>
              ) : null}
            </Reveal>

            <div className="mt-6 space-y-3">
              {picks.map((product, index) => (
                <PickRow key={product.slug} product={product} index={index} />
              ))}
            </div>

            <Reveal delay={200 + picks.length * 90} className="mt-10">
              <ButtonLink href={content.cta.href}>{content.cta.label}</ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
