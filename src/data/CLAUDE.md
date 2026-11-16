# `src/data` — the site's words and lists

Auto-loaded when you work in `src/data`.

## What this folder is

Static content, one file per topic: `home`, `products`, `collections`, `inspiration`, `commission`,
`artist`, `reviews`, `social`, `navigation`, `privacy`. Each exports the copy and lists a
section renders. The **shapes** live in `src/types/content.ts`; site-wide facts (name, URL, currency, the
hero photo, the route list) live in `src/constants/`.

## Non-negotiable here

- **Data only.** No JSX, no React, no fetching, no logic beyond building a constant. A file here must be
  importable by a server component, a script, or (later) a CMS adapter.
- **Type it at the boundary.** A new list gets its type in `types/content.ts` first, so a wrong field is a
  build error.
- **One topic per file, named for the topic** — never `content.ts`. If a file passes ~300 lines, split it by
  sub-topic.
- **Cards carry a `Visual`** (`art`, optional `scene`, optional `image`). `image` is a path under `/public`.
- **Placeholders are labelled.** Prices, ratings and testimonials are not real; keep the `PLACEHOLDER`
  comments until they are replaced. Mock product scores in `products.json` are labelled "Sample rating";
  do not add mock review counts.
- **British spelling**, and the vocabulary in the root `CLAUDE.md` (artwork, collection, commission, enquiry).

## What people get wrong

- **Adding review or product fields without the type.** `rating`, `reviewCount`, `soldOut`, `titleAr` and the
  review extras are optional in `types`; the UI renders them only when present.
- **Putting a whole list into a client component's props.** It ships the list to every visitor.
- **Adding copy to a component** because it "is only one string". It is exactly how a second language gets
  expensive (INTERNATIONALIZATION).

## Decisions that constrain this code

- [ADR-0010](../../docs/adr/0010-sections-data-and-common-components.md) — data lives here
- [ADR-0004](../../docs/adr/0004-logical-properties-and-externalised-copy.md) — copy as data
- [ADR-0016](../../docs/adr/0016-journal-feature-removed.md) — the Journal feature is retired
- [ADR-0017](../../docs/adr/0017-contact-enquiries-use-email-and-google-sheets.md) — enquiry data destinations and privacy copy

Rules: [ARCHITECTURE §Content](../../docs/ARCHITECTURE.md#content) · [INTERNATIONALIZATION](../../docs/INTERNATIONALIZATION.md)
