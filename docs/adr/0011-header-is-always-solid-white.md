---
id: ADR-0011
title: The header is always solid white (replaces the glass header)
status: accepted
date: 2026-09-26
affects:
  - src/components/layout/Header.tsx
  - src/components/sections/Hero.tsx
tags: [header, hero, design, performance]
---

# ADR-0011: The header is always solid white

- **Status:** Accepted. Supersedes [ADR-0009](./0009-glass-header-over-hero.md).
- **Date:** 2026-09-26
- **Deciders:** project owner

## Context

ADR-0009 made the header frosted glass over the hero and white once scrolled, which needed the hero to run
under the header, a per-route list (`glassHeaderRoutes`), a scrim, and four coupled height constants. The
owner decided the header should simply be white at all times.

## Decision

- The header is `sticky`, `bg-white`, with a hairline `border-light` bottom edge, on every page and at every
  scroll position. Its links and icons are always navy (`text-deep`).
- A soft shadow (`shadow-raised`) fades in once the page has scrolled 40 px or the mobile menu is open, so a
  white bar over white content still reads as raised. This is the only state change.
- The hero sits **below** the header (`min-h-[calc(100svh-4.75rem)]`), not under it. `glassHeaderRoutes`, the
  hero's `-mt-19`, and the dark scrim behind the bar are removed.

## Consequences

**Good:** one header on every page, so a new page needs no route registration and no hero offset; no
per-frame `backdrop-filter` blur at any time; simpler code (no pathname read, no colour switching).

**Bad / accepted costs:** the first screen no longer runs edge to edge under the navigation; the hero is
76 px shorter than the viewport.

**Now harder to change:** returning to a translucent header would reintroduce the coupling ADR-0009 described.

## Alternatives considered

| Option                                   | Why not                                                          |
| ---------------------------------------- | ---------------------------------------------------------------- |
| Keep the glass header on the home page   | Explicitly not wanted: the header is to be white always          |
| Solid white but keep the hero underneath | The header would hide the top 76 px of the artwork               |

## Revisit when

A design direction calls for a header that floats over full-bleed imagery again.
