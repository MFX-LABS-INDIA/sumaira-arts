---
id: ADR-0002
title: Placeholder artwork is drawn once in a shared SVG sprite and referenced with <use>
status: accepted
date: 2026-09-25
affects:
  - src/components/art
  - src/app/layout.tsx
tags: [performance, art, svg]
---

# ADR-0002: Placeholder artwork is drawn once in a shared SVG sprite and referenced with `<use>`

- **Status:** Accepted
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

There are no photographs yet, and the design is image-first, so the site ships **drawn** placeholders:
15 abstract artworks and a set of interior rooms in the brand palette. The first implementation
rendered each placement as its own inline `<svg>` with the full drawing inside.

Measured on the home page, that meant 149 inline SVGs, 52 filter definitions, **935 KB of HTML
(101 KB gzipped) and 4,722 DOM elements** — most of it the same fifteen drawings repeated. The
filterable gallery, being a client component, also pulled the whole drawing library into the client
bundle (14 KB gzipped) just to render placeholders.

## Decision

Draw everything **once**, in `components/art/Sprite.tsx`, mounted once in the root layout:

- one `<symbol id="art-<name>">` per artwork, and three symbols per room layout
  (`scene-<key>-shell`, `-back`, `-front`), plus shared gradients and one blur filter (`room-*`);
- every placement is a `<use href="#…">`. `ArtPiece` is a `<use>`; a `RoomScene` is a few `<use>`s
  plus its frames;
- `ArtImage` is the single seam: with `src` it renders a photograph, without it the drawing. Replacing
  a placeholder with a photo is a one-field change in `src/data/`;
- the sprite is off-screen (`position:absolute; width:0; height:0`), **not** `display:none`, because
  browsers skip gradients and filters that live inside a `display:none` SVG.

## Consequences

**Good:** HTML 935 → 467 KB (101 → 51 KB gzipped), DOM 4,722 → 2,076, filters 52 → 7; the art system is
no longer in the client bundle; adding a placement costs a handful of elements, not a whole drawing.

**Bad / accepted costs:** the sprite (~900 elements, 78 KB raw, ~10 KB gzipped) is in every page's HTML even if it uses few
artworks; ids are a shared namespace (`art-*`, `scene-*`, `room-*`) that must stay unique; inspecting a
placement in DevTools shows a `<use>` shadow tree rather than the shapes; a placement cannot restyle
the drawing except through inherited CSS custom properties.

**Now harder to change:** anything that assumes the artwork is inline markup (per-instance animation of
its parts, for example).

## Alternatives considered

| Option                                             | Why not                                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Inline SVG per placement (what we had)             | The 935 KB / 4,722-element page above                                              |
| An external `sprite.svg`, `<use href="/sprite.svg#id">` | Cacheable across pages, which is attractive; but external `<use>` has cross-origin/CSP and filter quirks, and there is one page today. Revisit with several pages. |
| Pre-rendered PNG/WebP via `next/image`             | A build step to keep in sync, loses crispness, and heavier than vector for flat art |
| Canvas                                             | Not server-renderable, no accessibility, needs JS                                  |

## Revisit when

Real photographs replace the placeholders (the sprite shrinks to nothing), or the site has enough pages
that an external, browser-cached sprite beats inlining it in every HTML response.
