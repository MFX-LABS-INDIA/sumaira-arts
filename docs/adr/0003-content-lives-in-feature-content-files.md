---
id: ADR-0003
title: Copy and data live in each feature's content.ts, not in components
status: superseded
date: 2026-09-25
affects:
  - src/features
  - src/config
  - src/types
tags: [content, cms, i18n]
---

# ADR-0003: Copy and data live in each feature's `content.ts`, not in components

- **Status:** Superseded by [ADR-0010](./0010-sections-data-and-common-components.md)
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

A marketing site is mostly words and lists: headlines, product titles, prices, collection descriptions,
alt text. If that copy is written inside JSX, three things get harder at once: changing a sentence means
reading a component; a second language means editing every component; and moving to a CMS means
rewriting them.

## Decision

Each feature has a `content.ts` holding its copy, its lists and their **types**. Components import from
it and render it; they do not contain marketing text. Cards, tiles and banners take a `Visual`
(`{ art, scene?, image? }`), so a real photograph replaces a placeholder by setting one field.

Site-wide facts (name, canonical URL, currency, navigation, the hero photo) live in `src/config`.
Shared shapes (`Cta`, `Visual`, `ImageRef`) live in `src/types`.

## Consequences

**Good:** one place to edit a sentence; a CMS, or a second language, replaces data files rather than
components; the data is typed at its boundary, so a wrong field is a build error.

**Bad / accepted costs:** a little indirection (open `content.ts` to see the words). UI **microcopy**
(button verbs, aria-labels, form labels) is _not yet_ moved — it is recorded as known debt in
`INTERNATIONALIZATION.md` and must be paid before a second language ships.

**Now harder to change:** none significant; this is the reversible, low-risk end of the spectrum.

## Alternatives considered

| Option                                        | Why not                                                                           |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| Copy in JSX                                   | Untranslatable, and changes require touching components                           |
| One global `content.ts`                       | Every feature branch edits the same file; it becomes the merge-conflict magnet     |
| A CMS now                                     | No editors, no need yet, and it pulls runtime fetching into a static site          |
| `next-intl` / i18next now                     | Premature. Externalised copy is what makes adopting one later a swap, not a rewrite |

## Revisit when

Non-developers need to edit content (CMS behind the same shapes), or a second language is added
(introduce a locale layer over these files).
