---
id: ADR-0008
title: content-visibility auto on page sections — tried and rejected
status: rejected
date: 2026-09-25
affects:
  - src/components/ui
tags: [performance, css, rejected]
---

# ADR-0008: `content-visibility: auto` on page sections — tried and rejected

- **Status:** Rejected
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

Style and layout were ~530 ms of main-thread time under Lighthouse's mobile profile, and the page is a
long stack of sections. The standard advice for that shape is `content-visibility: auto` with a
`contain-intrinsic-size` estimate, so the browser skips work for offscreen sections. It was implemented
on the shared `Section` component, then measured against an otherwise identical build.

## Decision

**Do not use `content-visibility: auto` on sections.** It was reverted.

## Measurements

Lighthouse mobile (slow 4G, 4× CPU), production build, same machine:

| Build                                  | Score | LCP   | Speed Index | TBT    | Style & Layout |
| -------------------------------------- | ----- | ----- | ----------- | ------ | -------------- |
| Without `content-visibility`           | 93    | 3.0 s | 1.5 s       | 140 ms | 531 ms         |
| With `content-visibility: auto`        | **90** | 3.2 s | **4.3 s**   | 110 ms | 483 ms         |

It saved 48 ms of layout and made Speed Index nearly three times worse. It also broke anchors: jumping to
`#commission` overshot by ~565 px, because skipped sections above the target only have an _estimated_
height, so the scroll position computed at click time was wrong once they rendered. Four of five anchor
tests landed correctly; one did not — and a failure that depends on which sections are between you and
the target is the worst kind.

## Consequences

**Good:** anchors are exact; the measured page is faster where it counts.

**Bad / accepted costs:** the ~500 ms of style/layout remains. The real levers are a smaller DOM (done:
the sprite) and less client work, not skipping layout.

## Alternatives considered

| Option                                              | Why not                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| Accurate per-section `contain-intrinsic-size`       | Heights vary by breakpoint and by content; any estimate is wrong somewhere, and the failure mode is a mis-scrolled anchor |
| Apply it only to the last few sections              | Small gain, and still breaks the anchor to the footer                    |

## Revisit when

There is a much longer page (a real product catalogue) where the skipped work is large relative to the
cost, **and** anchors no longer matter or intrinsic sizes can be made exact. Re-measure; do not assume.
