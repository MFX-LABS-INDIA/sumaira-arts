# `src/components/sections` — the blocks a page is made of

Auto-loaded when you work in `src/components/sections`.

## What this folder is

One file per large block a page places: `Hero`, `BrandStatement`, `CategoryCards`, `FeaturedProducts`,
`FeaturedCollection`, `InteriorShowcase`, `CollectionGallery`, `Commission`, `BrandStory`, `Testimonials`,
`Journal`, `SocialGallery`. A page (`src/app/(site)/**/page.tsx`) composes them.

A section **reads its words from `src/data/`** and renders them with `ui`, `common` and `art` pieces. It
does not fetch, and it holds no marketing text of its own.

## Before you add anything

Search first (Glob + Grep, by concept and synonym — vocabulary is in the root `CLAUDE.md`). The answer is
often "extend a section" or "add an item to a `data/` list", not a new file.

## Non-negotiable here

- **Copy lives in `src/data/`.** Write the data (and its type in `src/types/content.ts`) first, then the
  section that renders it. No headlines, descriptions or CTAs in JSX.
- **A section never imports another section.** If two need the same piece, it belongs in
  `components/common/`. (This is the rule that made `ProductCard` "common".)
- **Server components by default.** `'use client'` needs a reason a server component cannot serve, and the
  full list is in ARCHITECTURE. Never pass a whole `data/` list into a client component.
- **Cards take a `Visual`** (`{ art, scene?, image? }`). Never hard-wire a drawn artwork into a section: a
  real photograph must be a one-field swap in `data/`.
- **Compose primitives; do not restyle them.** A new look is a new `variant` on the primitive — a
  `components/ui` change.
- **A form validates on the server** (`lib/forms.ts`, `lib/webhook.ts`): (`lib/actions/`), `postToWebhook`, return a
  `FormState`, never report a success that did not happen. Read ERROR_HANDLING and SECURITY_HYGIENE first.
- Use `Reveal` for scroll entrances and give each section an `id` if a nav link targets it.

## What people get wrong

- **Repeating a card in JSX** instead of mapping over a `data/` list. The list is the data.
- **Putting the filter in JavaScript.** The collection filter is CSS (radios + `:has`); it ships no JS. See
  ADR-0007 before adding client state to a gallery.
- **An image without `sizes`** or without the wrapper's aspect ratio — the wrong size downloads or the
  layout shifts. PERFORMANCE §Images.
- **Product prices, the rating, the review count and the testimonials are placeholders.** They are labelled
  in `data/`; replace them before launch.

## Decisions that constrain this code

- [ADR-0010](../../../docs/adr/0010-sections-data-and-common-components.md) — sections, data, common
- [ADR-0004](../../../docs/adr/0004-logical-properties-and-externalised-copy.md) — logical properties, copy as data
- [ADR-0007](../../../docs/adr/0007-css-only-collection-filter.md) — the gallery filter (`CollectionGallery`)
- [ADR-0011](../../../docs/adr/0011-header-is-always-solid-white.md) — the hero sits below the white header

Rules: [ARCHITECTURE](../../../docs/ARCHITECTURE.md) · [PERFORMANCE](../../../docs/PERFORMANCE.md) · [CONVENTIONS](../../../docs/CONVENTIONS.md)
