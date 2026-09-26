---
id: ADR-0004
title: Logical CSS properties only; the site is LTR today and RTL-ready by convention
status: accepted
date: 2026-09-25
affects:
  - src/components
  - src/data
  - src/app/globals.css
tags: [i18n, rtl, arabic, accessibility]
---

# ADR-0004: Logical CSS properties only; the site is LTR today and RTL-ready by convention

- **Status:** Accepted (adapted from Jethur's ADR-0004)
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

The brand sells Arabic-calligraphy artwork, so Arabic as a site language is a likely future. Two classes
of defect make a later RTL launch expensive, and both are **invisible to the people reviewing the code**:

1. Physical direction properties (`ml-4`, `text-left`, `left-0`) look correct in an English review and put
   content on the wrong side in Arabic.
2. Copy welded into markup is untranslatable, and the English site looks perfect.

Review cannot catch what it cannot see.

## Decision

1. **Logical properties only:** `ms-*`, `text-start`, `border-s`, `start-0`, and a prop value `start`
   rather than `left`. `rtl:` / `ltr:` variants stay allowed where deliberate (mirroring an arrow).
2. **Marketing copy lives in `src/data/`** (see ADR-0010). UI microcopy currently does not, and is
   listed as debt to clear before a second language ships.
3. The hero composition is **LTR-only for now** and recorded as such (scrim direction and scene
   alignment flip together when RTL ships).

Unlike Jethur, this is **not lint-enforced yet**. It is a written rule checked in review
(`CODE_REVIEW.md`); the lint rules are listed under "Planned enforcement" in `INTERNATIONALIZATION.md`.

## Consequences

**Good:** one class is correct in both directions with no runtime branch; adding Arabic later is data and
a font, not a layout rewrite.

**Bad / accepted costs:** contributors must learn the logical vocabulary; without a lint rule, a slip is
caught only by a reviewer who remembers; the microcopy debt is real and dated.

**Now harder to change:** adopting a component library that hardcodes physical properties.

## Alternatives considered

| Option                                             | Why not                                                                            |
| -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Physical properties and a later RTL pass           | The retrofit touches every component and is invisible to English reviewers          |
| A PostCSS RTL plugin that mirrors the stylesheet   | Doubles the CSS, and breaks for inline styles and JS-computed positions             |
| Lint-enforce now                                   | Right eventually; premature while the microcopy debt would make the copy rule fail everywhere |

## Revisit when

Arabic (or any RTL language) is scheduled — pay the microcopy debt, add the two lint rules, and fix the
recorded LTR-only spots together.
