---
id: ADR-0006
title: Smooth scrolling is lazy-loaded and for mouse and trackpad visitors only
status: accepted
date: 2026-09-25
affects:
  - src/components/layout
tags: [performance, scroll, lenis]
---

# ADR-0006: Smooth scrolling is lazy-loaded and for mouse and trackpad visitors only

- **Status:** Accepted
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

The design calls for smooth, eased scrolling, provided by Lenis (~12.5 KB gzipped). The first
implementation wrapped the whole page in a client provider, which had three costs: the library loaded
for everyone on the critical path, it ran a per-frame loop even on phones where native scrolling is
already smooth, and wrapping the tree in a client component pulled more of the page into the client
boundary.

## Decision

- `SmoothScroll` is a tiny client component that renders **nothing** and does **not** wrap the page. It
  checks `(hover: hover) and (pointer: fine)` and `prefers-reduced-motion`, and only when both say yes
  does it load `LenisRoot` — via `next/dynamic` with `ssr: false`, in its own chunk.
- Touch devices and reduced-motion visitors never download the library.
- Anchor jumps are `anchors: true`, with **no manual offset**: Lenis already honours each section's
  `scroll-margin-top` (`scroll-mt-19`). Without Lenis, native `scroll-behavior: smooth` (in
  `globals.css`, behind the reduced-motion query) does the same job.

## Consequences

**Good:** the library is off the critical path for everyone and absent for phones and reduced-motion
visitors; the page is not wrapped in a client boundary; native scrolling is used where it is best.

**Bad / accepted costs:** two scroll behaviours to keep consistent (Lenis vs native); Lenis loads a moment
after first paint on desktop, so the first scroll gesture is briefly native.

**Now harder to change:** none significant.

## Alternatives considered

| Option                                | Why not                                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Wrap the page in `<ReactLenis root>`  | Loads for everyone, runs on phones, widens the client boundary                     |
| No smooth scrolling                   | Loses a deliberate part of the feel; native smooth-scroll covers only anchors      |
| CSS `scroll-behavior: smooth` only    | Eases anchor jumps but not wheel/trackpad scrolling                                |

## Revisit when

Lenis is dropped, or a native, scroll-linked animation API is broadly available and makes it redundant.
A manual anchor offset must **not** be re-added while `scroll-margin-top` is in place: it double-counts
(found and fixed during the performance work: targets landed 152 px down instead of 76 px).
