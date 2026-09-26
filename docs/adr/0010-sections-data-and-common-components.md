---
id: ADR-0010
title: Sections, data and common components get their own folders (replaces feature folders)
status: accepted
date: 2026-09-26
affects:
  - src/app
  - src/components
  - src/data
  - src/constants
  - src/types
  - src/lib
tags: [architecture, structure]
---

# ADR-0010: Sections, data and common components get their own folders

- **Status:** Accepted. Supersedes [ADR-0001](./0001-routes-thin-features-own-content.md) and
  [ADR-0003](./0003-content-lives-in-feature-content-files.md).
- **Date:** 2026-09-26
- **Deciders:** project owner

## Context

ADR-0001 organised the site by _feature_: `features/<area>/` held a section, its `content.ts`, and any
form action together. In use it had costs the project owner did not want to keep paying:

- ten files all named `content.ts`, so search results, editor tabs and imports were indistinguishable;
- one folder mixing three different kinds of thing (UI, static data, server code), so "where is the
  copy?" and "where are the sections?" had no single answer;
- a reusable piece (`ProductCard`, the newsletter form) buried inside a feature, so the footer had to
  reach into a feature, a recorded exception to our own layering;
- `config/` named differently from the `constants/` the owner prefers, and `ui/Layout.tsx` colliding
  in name with `components/layout/`.

## Decision

Organise by **kind of file**, keeping the one-way layering:

```
app (routes)  →  components (sections · common · layout · ui · art)  →  data · lib · constants · types
```

- `components/sections/` — the large blocks a page is made of (`Hero`, `Journal`, …).
- `components/common/` — composed pieces reused by more than one section or by the layout
  (`ProductCard`, `WishlistButton`, `NewsletterForm`).
- `components/layout/` — page chrome and its behaviour. `components/ui/` — primitives.
  `components/art/` — the placeholder-art system (unchanged).
- `data/` — static content, one file per topic (`home.ts`, `products.ts`, `collections.ts`, …).
- `constants/` — site-wide facts (`site.ts`, `routes.ts`). `types/` — shared TypeScript types.
- `lib/` — helpers, including server actions in `lib/actions/`.
- `app/` keeps the `(site)` route group, because it is what lets a future page have different chrome
  without branching inside the layout. URLs are unchanged.

What does **not** change: copy still lives outside components ([ADR-0003]'s principle stands, in
`data/`), server components remain the default, and imports still flow one way.

## Consequences

**Good:** every file has a unique, descriptive name; "where is the copy / the sections / the form
logic?" each has one answer; the footer no longer imports from a feature; the layering has no recorded
exception.

**Bad / accepted costs:** touching one area (say, the journal) now edits three places —
`components/sections/Journal.tsx`, `data/journal.ts`, and possibly `types/content.ts` — where before it
was one folder. That is the trade the owner chose for a predictable, by-kind layout.

**Now harder to change:** none significant. The move was verified as a pure reorganisation: rendered HTML
and CSS were byte-identical before and after.

## Alternatives considered

| Option                                        | Why not                                                                         |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| Keep `features/` (ADR-0001)                   | The costs above                                                                 |
| Also add `hooks/`                             | Only two tiny hooks exist, each used once; a folder for them is not yet useful  |
| A `routes/` folder inside `app/`              | Would become a URL segment; routing already lives in `app/`                     |
| Flatten the `(site)` group into the root      | Loses the ability to give a future page different chrome                        |

## Revisit when

Sections and their data start needing to change together often enough that the split hurts, or a
second consumer (another app) needs the components.
