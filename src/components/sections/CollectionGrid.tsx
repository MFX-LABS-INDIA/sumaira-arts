import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/Link";
import { collections, collectionsIntro } from "@/data/collections";
import type { Collection } from "@/types/content";

const INITIAL = 6;
const gridClass = "grid grid-cols-2 gap-6 lg:grid-cols-3";

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <article className="group relative">
      <div className="relative">
        <ArtImage
          art={collection.art}
          src={collection.image}
          alt=""
          zoom
          sizes="(min-width: 1024px) 30vw, 46vw"
          className="aspect-portrait"
        />
        <h3 className="absolute inset-x-3 bottom-3 rounded-control bg-white/95 px-4 py-3 text-center font-serif text-lg font-light leading-snug tracking-tight text-deep">
          <SmartLink href={collection.href} className="after:absolute after:inset-0 after:content-['']">
            {collection.name}
          </SmartLink>
        </h3>
      </div>
      <p className="mt-4 truncate text-body-sm text-steel">{collection.description}</p>
    </article>
  );
}

/**
 * Six collections, then "View all collections" opens the rest. A native <details>: no JavaScript, keyboard and
 * screen-reader support for free. The summary hides itself once the rest is showing.
 */
export function CollectionGrid() {
  const first = collections.slice(0, INITIAL);
  const rest = collections.slice(INITIAL);

  return (
    <Section id="collections" tone="ice">
      <Container>
        <SectionHeading eyebrow={collectionsIntro.eyebrow} title={collectionsIntro.title} description={collectionsIntro.description} />

        <div className={`${gridClass} mt-12 md:mt-16`}>
          {first.map((collection) => (
            <CollectionCard key={collection.name} collection={collection} />
          ))}
        </div>

        {rest.length > 0 ? (
          <details className="group/all">
            <div className={`${gridClass} mt-6`}>
              {rest.map((collection) => (
                <CollectionCard key={collection.name} collection={collection} />
              ))}
            </div>
            <summary className="mt-12 flex cursor-pointer list-none justify-center group-open/all:hidden [&::-webkit-details-marker]:hidden">
              <span className="border-b border-brand/30 pb-1.5 text-label font-medium uppercase tracking-caps text-brand transition-colors hover:border-brand">
                {collectionsIntro.viewAll}
              </span>
            </summary>
          </details>
        ) : null}
      </Container>
    </Section>
  );
}
