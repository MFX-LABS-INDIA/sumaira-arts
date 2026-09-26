import { ArtImage } from "@/components/art/ArtImage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Link";
import { collectionFilters, collections, collectionsIntro } from "@/data/collections";

const ratioClass = {
  "4/5": "aspect-portrait",
  "3/4": "aspect-tall",
  "1/1": "aspect-square",
  "4/3": "aspect-landscape",
  "2/3": "aspect-[2/3]",
} as const;

/** Each radio hides the collections that do not carry its tag. Built from the data so it cannot drift. */
const filterCss = collectionFilters
  .filter((filter) => filter.value !== "all")
  .map(
    ({ value }) =>
      `[data-filter-root]:has(input[value="${value}"]:checked) [data-collection]:not([data-tags~="${value}"]){display:none}`,
  )
  .join("");

/**
 * Filterable masonry with no client JavaScript: the pills are radio buttons and the filtering is CSS
 * (:has). It ships zero JS and never hydrates, and native radios give keyboard and screen-reader support for free.
 */
export function CollectionGallery() {
  return (
    <Section id="collections" tone="ice">
      <Container>
        <div data-filter-root>
          <style>{filterCss}</style>
          <SectionHeading eyebrow={collectionsIntro.eyebrow} title={collectionsIntro.title} description={collectionsIntro.description} />

          <fieldset className="-mx-5 mt-10 flex min-w-0 gap-2.5 no-scrollbar overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <legend className="sr-only">Filter collections</legend>
            {collectionFilters.map((filter) => (
              <div key={filter.value} className="relative shrink-0">
                <input
                  type="radio"
                  name="collection-filter"
                  id={`collection-filter-${filter.value}`}
                  value={filter.value}
                  defaultChecked={filter.value === "all"}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`collection-filter-${filter.value}`}
                  className="block cursor-pointer rounded-full border border-steel/40 px-5 py-2.5 text-micro font-medium uppercase tracking-caps text-steel transition-colors duration-300 hover:border-brand hover:text-brand peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-mist"
                >
                  {filter.label}
                </label>
              </div>
            ))}
          </fieldset>

          {/* CSS columns give a true masonry: every image keeps its own shape. */}
          <div className="mt-12 columns-1 gap-x-6 sm:columns-2 lg:columns-3 lg:gap-x-8">
            {collections.map((collection) => (
              <article key={collection.name} data-collection data-tags={collection.tags.join(" ")} className="group mb-12 break-inside-avoid">
                <ArtImage
                  art={collection.art}
                  src={collection.image}
                  alt={collection.name}
                  zoom
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={ratioClass[collection.ratio]}
                />
                <h3 className="mt-5 font-serif text-[1.65rem] leading-tight text-deep">{collection.name}</h3>
                <p className="mt-2 line-clamp-2 max-w-sm text-body-sm leading-relaxed text-steel">{collection.description}</p>
                <div className="mt-4">
                  <TextLink href={collection.href}>Explore Collection</TextLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
