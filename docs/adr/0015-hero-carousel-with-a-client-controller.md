---
id: ADR-0015
title: The hero is an autoplaying carousel, driven by a small client controller
status: accepted
date: 2026-10-04
affects:
  - src/components/sections
  - src/components/common
  - src/data
tags: [design, home, performance]
---

# ADR-0015: The hero is an autoplaying carousel, driven by a small client controller

- **Status:** Accepted. Narrows [ADR-0012](./0012-home-page-redesign.md) ("carousels are CSS scroll-snap") for the hero only.
- **Date:** 2026-10-04
- **Deciders:** project owner

## Context

The owner asked for a modern hero with several photographs and a title layout that leads. A scroll-snap strip cannot
autoplay, show a progress timer or fade between full-bleed photographs, so the hero needs a little client code.

## Decision

- `sections/Hero` is a server component. Every slide (photo, title, copy, links, caption) is rendered on the server
  from `data/home.ts` (`heroSlides`), so no copy or image list reaches the client and the first slide shows with no JS.
- `common/HeroControls` is the only client piece. It flips `data-active` and `inert` on the slide elements; the
  fade and the title entrance are CSS. The progress bar's CSS animation is the timer (`animationend` advances), so
  pausing the animation pauses the carousel and there is no `setInterval`.
- It pauses on hover and focus, has a pause button, supports swipe, and does not animate under `prefers-reduced-motion`.
- Only the first photograph is `priority` (the LCP image); the others use `fetchPriority="low"`.

## Consequences

**Good:** a modern hero with no copy in JS; one small client leaf; accessible (carousel and slide roles, inert
inactive slides, live region only when paused).
**Bad / accepted costs:** one more client component in the ARCHITECTURE table, and the other photographs download
after the first, at low priority.
**Now harder to change:** a CMS-driven slide list would need the data to stay serialisable on the server only.

## Alternatives considered

| Option | Why not |
| ------ | ------- |
| CSS scroll-snap strip | No autoplay, no fade, no timer |
| A carousel library | A new dependency and far more client JS than a controller that toggles attributes |
| Slide state in React, slides rendered by the client | Ships all the copy and images to the client |

## Revisit when

The slide count grows past about five, or the hero photographs move to a CMS.
