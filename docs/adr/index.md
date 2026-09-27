# Architecture decisions

One file per decision that is expensive to reverse. Immutable once accepted — superseded by a new ADR
rather than edited, so the reasoning history stays readable. This index is **hand-maintained**
(Jethur generates its own); `npm run docs:check` fails if an ADR is missing from it.

| ADR                                                            | Title                                                                       | Status       | Affects                                                                             |
| -------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| [ADR-0001](./0001-routes-thin-features-own-content.md)         | Routes are thin, features own their content, components are shared UI       | `superseded` by 0010 | (historical) feature folders                                                |
| [ADR-0002](./0002-shared-svg-sprite-for-placeholder-art.md)    | Placeholder artwork is drawn once in a shared SVG sprite, referenced with `<use>` | `accepted` | `src/components/art`, `src/app/layout.tsx`                                    |
| [ADR-0003](./0003-content-lives-in-feature-content-files.md)   | Copy and data live in each feature's `content.ts`, not in components        | `superseded` by 0010 | (historical) per-feature `content.ts`; the principle carries over to `src/data` |
| [ADR-0004](./0004-logical-properties-and-externalised-copy.md) | Logical CSS properties only; LTR today, RTL-ready by convention             | `accepted`   | `src/components`, `src/data`, `src/app/globals.css`                                 |
| [ADR-0005](./0005-forms-are-server-actions-posting-to-a-webhook.md) | Forms are server actions that post to a webhook, and never fake success | `accepted`   | `src/lib`, `src/components/common`                                                  |
| [ADR-0006](./0006-smooth-scroll-is-lazy-and-desktop-only.md)   | Smooth scrolling is lazy-loaded and for mouse and trackpad visitors only    | `accepted`   | `src/components/layout`                                                             |
| [ADR-0007](./0007-css-only-collection-filter.md)               | The collection filter is CSS-only, with no client JavaScript                | `superseded` by 0012 | (historical) the gallery filter |
| [ADR-0008](./0008-content-visibility-auto-rejected.md)         | `content-visibility: auto` on page sections — tried and rejected            | `rejected`   | `src/components/ui`                                                                 |
| [ADR-0009](./0009-glass-header-over-hero.md)                   | Frosted-glass header over the hero, white once scrolled, configured per route | `superseded` by 0011 | (historical) glass header |
| [ADR-0010](./0010-sections-data-and-common-components.md)      | Sections, data and common components get their own folders                  | `accepted`   | `src/app`, `src/components`, `src/data`, `src/constants`, `src/types`, `src/lib`    |
| [ADR-0011](./0011-header-is-always-solid-white.md)             | The header is always solid white                                            | `accepted`   | `src/components/layout/Header.tsx`, `src/components/sections/Hero.tsx`              |
| [ADR-0012](./0012-home-page-redesign.md)                       | Home page redesign: fixed section order, no collection filter, 1280px container | `accepted`   | `src/components/sections`, `src/components/common`, `src/data`                      |
| [ADR-0013](./0013-brand-sans-is-manrope.md)                    | The brand sans-serif is Manrope, replacing Jost                              | `accepted`   | `src/app/layout.tsx`, `src/app/globals.css`                                         |

## By area

Each of these has a back-link in its folder's `CLAUDE.md`, so the decision surfaces when you edit the code
it constrains — you do not have to come here.

- `src/app` — [ADR-0010](./0010-sections-data-and-common-components.md), [ADR-0013](./0013-brand-sans-is-manrope.md)
- `src/components` — [ADR-0004](./0004-logical-properties-and-externalised-copy.md), [ADR-0010](./0010-sections-data-and-common-components.md)
- `src/components/art` — [ADR-0002](./0002-shared-svg-sprite-for-placeholder-art.md)
- `src/components/common`, `src/lib` — [ADR-0005](./0005-forms-are-server-actions-posting-to-a-webhook.md)
- `src/components/layout` — [ADR-0006](./0006-smooth-scroll-is-lazy-and-desktop-only.md), [ADR-0011](./0011-header-is-always-solid-white.md)
- `src/components/sections` — [ADR-0012](./0012-home-page-redesign.md) (the home page layout), [ADR-0011](./0011-header-is-always-solid-white.md) (the hero sits below the header)
- `src/components/ui` — [ADR-0008](./0008-content-visibility-auto-rejected.md)
- `src/data`, `src/types`, `src/constants` — [ADR-0004](./0004-logical-properties-and-externalised-copy.md), [ADR-0010](./0010-sections-data-and-common-components.md)

## Not carried over from Jethur

Jethur's ADR-0001 (schema per workspace), 0005 (dynamic fields), 0006 (SPA + TanStack Query), 0007 (module
beside its routes), 0008 (auth as infrastructure) and 0009 (row-level security) govern a multi-tenant
application and have no subject here. The numbering in this folder is this project's own.

## Writing one

Copy `0000-template.md`. Fill in the frontmatter — `affects:` ties the decision to real paths. Write one
when a boundary changes, a hard-to-remove dependency, font or script is added, or someone asks "why is it
like this?" for the second time. Write a _rejected_ one when an experiment fails. To change an accepted
decision, write a new ADR that supersedes it (as ADR-0010 does for 0001 and 0003).
