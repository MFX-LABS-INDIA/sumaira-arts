---
id: ADR-0013
title: The brand sans-serif is Manrope, replacing Jost
status: accepted
date: 2026-09-27
affects:
  - src/app/layout.tsx
  - src/app/globals.css
tags: [design, fonts, performance]
---

# ADR-0013: The brand sans-serif is Manrope

- **Status:** Accepted.
- **Date:** 2026-09-27
- **Deciders:** project owner

## Context

The owner asked for Manrope as the brand font. Jost was the sans-serif used for `--font-sans` (body copy, UI
labels, navigation); Cormorant Garamond stays as the serif for headings and italic accents.

## Decision

- `--font-sans` is Manrope, loaded the same way Jost was: `next/font/google`, self-hosted, `display: "swap"`,
  the `latin` subset only, one variable weight range (no manual weight list — Manrope ships as a variable font).
- No other font changes. Cormorant Garamond, the weights it loads (300/400, normal/italic), and the pairing
  rule in [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) are unchanged.

## Consequences

**Good:** Manrope is a similarly geometric, minimal grotesque to Jost, so no layout or token widths needed
retuning; `next/font` keeps it self-hosted with no new network origin, so the performance budgets
([PERFORMANCE.md](../PERFORMANCE.md)) are unaffected.

**Bad / accepted costs:** none identified. Like Jost, Manrope has no Arabic glyphs — the existing gap noted
in [INTERNATIONALIZATION.md](../INTERNATIONALIZATION.md) §5 is unchanged.
