---
id: ADR-0007
title: The collection filter is CSS-only (radios and :has), with no client JavaScript
status: superseded
date: 2026-09-25
affects:
  - src/components/sections
tags: [performance, accessibility, css]
---

# ADR-0007: The collection filter is CSS-only (radios and `:has`), with no client JavaScript

- **Status:** Accepted
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

The collections gallery filters fifteen collections by mood (All, Abstract, Contemporary, Classic,
Limited Editions, Custom). The obvious implementation is a client component with `useState`. Here that
had a concrete cost: it made the whole gallery, and everything it imported, part of the client bundle —
including the artwork-drawing code (14 KB gzipped) — and it hydrated on every page load.

## Decision

The filter is a `fieldset` of native radio inputs. Selecting one hides the collections that lack its tag,
with a CSS rule using `:has()`:

```css
[data-filter-root]:has(input[value="abstract"]:checked) [data-collection]:not([data-tags~="abstract"]) { display: none }
```

The rules are generated from the filter list in `data/collections.ts` (an inline `<style>`, built only from static
data), so the CSS cannot drift from the data. The gallery is a **server component**: it ships no
JavaScript and never hydrates.

## Consequences

**Good:** zero JS and zero hydration for the gallery; the art code stays out of the client bundle; native
radios give keyboard navigation (arrow keys) and screen-reader semantics for free; it works before
hydration and without JavaScript.

**Bad / accepted costs:** filtering is instant with no transition; state is not in the URL (a filtered
view cannot be shared); a browser without `:has()` shows all collections (the filters are a no-op, not
broken); the pattern is less familiar than `useState`.

**Now harder to change:** adding search, sorting or a shareable filtered URL needs JavaScript or
server-side params — at that point revisit.

## Alternatives considered

| Option                                              | Why not                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| A client component with `useState`                  | Brings the gallery and the art system into the bundle; hydrates on load      |
| A client filter receiving server-rendered children  | Smaller bundle, but still hydrates and duplicates the markup in the RSC payload |
| Server-side filtering via search params             | Needs a round trip and dynamic rendering for a small, static list            |

## Revisit when

Filtering needs to be shareable (URL state), searchable, or the list grows beyond what a static page
should carry.
