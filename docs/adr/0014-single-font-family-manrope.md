---
id: ADR-0014
title: One font family everywhere — Manrope replaces Cormorant Garamond too
status: accepted
date: 2026-09-27
affects:
  - src/app/layout.tsx
  - src/app/globals.css
tags: [design, fonts, performance]
---

# ADR-0014: One font family everywhere

- **Status:** Accepted. Supersedes [ADR-0013](./0013-brand-sans-is-manrope.md).
- **Date:** 2026-09-27
- **Deciders:** project owner

## Context

ADR-0013 moved `--font-sans` from Jost to Manrope and kept Cormorant Garamond as the serif for headings and
italic accents. The owner then asked for every font on the site to be a Manrope variation, removing the
second family entirely.

## Decision

- `layout.tsx` loads Manrope only (`next/font/google`, self-hosted, `display: "swap"`, `latin` subset,
  variable weight axis). Cormorant Garamond is removed.
- `--font-serif` in `globals.css` now points at `var(--font-manrope)`, the same stack as `--font-sans`. The
  `font-serif` / `font-sans` **class names are unchanged** — components using either still work — but both
  now render Manrope; headings are told apart from body copy by weight (`font-light` / `font-normal` /
  `font-medium`), not by a second face.
- Manrope has no italic face on Google Fonts. `italic` / `<em>` (the hero accent, the founder's quoted
  belief, the commission step numerals) fall back to the browser's synthesised oblique. This is visually
  softer than a true italic serif but avoids loading a second family for a handful of accents.

## Consequences

**Good:** one font request instead of two — a small download-weight and connection-cost saving; a simpler
typographic system (one variable font, weight-driven) that is easier to keep consistent across new sections.

**Bad / accepted costs:** the editorial serif/sans contrast that gave headings a gallery feel is gone;
headings now read as a heavier sans. Italic accents are synthesised, not a true italic. Reversing this
(bringing back a serif) is a new ADR, not an edit to this one or to 0013.
