import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, SmartLink } from "@/components/ui/Link";
import { collections, collectionsIntro } from "@/data/collections";
import type { Collection } from "@/types/content";

const INITIAL = 6;
function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <article className="group relative w-[72vw] max-w-72 shrink-0 snap-start md:w-72">
      <div className="relative">
        <ArtImage
          art={collection.art}
          src={collection.image}
          alt=""
          zoom
          sizes="(min-width: 1024px) 30vw, 46vw"
          className="aspect-portrait"
        />
        <h3 className="absolute inset-x-3 bottom-3 rounded-control bg-white/95 px-4 py-2.5 text-center font-serif text-base font-light leading-snug tracking-tight text-deep">
          <SmartLink href={collection.href} className="after:absolute after:inset-0 after:content-['']">
            {collection.name}
          </SmartLink>
        </h3>
      </div>
      <p className="mt-4 truncate text-sm text-steel">{collection.description}</p>
    </article>
  );
}

/**
 * A concise collection carousel keeps the home page focused; the CTA opens the complete collection catalogue.
 */
export function CollectionGrid() {
  const first = collections.slice(0, INITIAL);

  return (
    <Section id="collections" tone="ice">
      <Container>
        <SectionHeading eyebrow={collectionsIntro.eyebrow} title={collectionsIntro.title} description={collectionsIntro.description} />

        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 md:mt-16 md:mx-0 md:px-0">
          {first.map((collection) => (
            <CollectionCard key={collection.name} collection={collection} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/products?category=Collections">{collectionsIntro.viewAll}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
