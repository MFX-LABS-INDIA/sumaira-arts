---
id: ADR-0009
title: The header is frosted glass over the hero, white once scrolled, and configured per route
status: superseded
date: 2026-09-25
affects:
  - src/components/layout/Header.tsx
  - src/components/sections/Hero.tsx
  - src/constants/routes.ts
tags: [header, hero, design, performance]
---

# ADR-0009: The header is frosted glass over the hero, white once scrolled, and configured per route

- **Status:** Superseded by [ADR-0011](./0011-header-is-always-solid-white.md)
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

The design wants the artwork to fill the first screen with the navigation floating over it — a
translucent, colourless frosted glass — turning solid white once the visitor scrolls. That needs the hero
to run _under_ the header, which is wrong for any page that does not open with a hero.

## Decision

- The header is `sticky` and 4.75rem (`h-19`) tall. On a route in `glassHeaderRoutes`
  (`constants/routes.ts`, currently `["/"]`) it is glass — `bg-white/10` with `backdrop-blur-xl`, a faint
  border, white type — until the page scrolls 40 px or the mobile menu opens; then it is `bg-white/95` with
  dark type and a shadow. Every other route gets the solid white header.
- A page that opts in puts `-mt-19` on its hero so it slides under the header, and gives the hero a soft
  dark scrim behind the bar so white links stay legible over a bright wall.
- **Colourless, not blue.** The glass carries no brand tint; the blur is the effect.
- The blur applies **only while glass**. Scrolled, there is no `backdrop-filter`: re-blurring the page every
  frame of a scroll is costly, and 95% white hides it anyway.

## Consequences

**Good:** the full-bleed hero the design wants, without an unreadable header on plain pages; the costly
blur runs only over a static hero.

**Bad / accepted costs:** the header height is a coupled constant — `h-19` (Header), `-mt-19` (hero),
`top-19` (mobile menu), `scroll-mt-19` (sections). Changing it means changing all four. The hero's white
text depends on the scrim; a very bright photo may need a stronger one.

**Now harder to change:** a page with a hero must remember `-mt-19` and its `glassHeaderRoutes` entry.

## Alternatives considered

| Option                                      | Why not                                                                             |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Always-solid white header                   | Loses the full-bleed hero the design is built around                                |
| A navy-tinted glass                         | Read as a blue bar, not glass — explicitly not wanted                               |
| Transparent header on every page            | Unreadable over plain, light pages                                                  |
| Keep the blur when scrolled                 | A per-frame page blur on a sticky element; measurable cost for no visible gain       |

## Revisit when

A second hero page is added (lift the four coupled sizes into one token), or a real photograph replaces the
drawn hero (re-check legibility over it).
