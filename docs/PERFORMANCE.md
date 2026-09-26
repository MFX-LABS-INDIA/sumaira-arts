# Performance

**Status: a gate, not polish.** This is a public, static site that many people will open on
phones over mobile networks. Every kilobyte and every DOM node is paid for by every visitor, on
every visit. The equivalent of Jethur's workspace isolation is here: the one property the
product cannot afford to lose quietly.

Enforced by `npm run size` (budgets, part of `npm run verify`) and measured with
`npm run perf` (Lighthouse). Anything that adds client JS, a font, a script, media above the
fold, or a section says in its PR what moved.

---

## Where we are

Lighthouse, **mobile profile** (simulated slow 4G, 4× CPU slowdown), production build, home page.
"Before" is the first measurement, before any optimisation; "now" is the median of three runs
from `npm run perf`.

| Metric                  | Before | Now (median of 3)  | Good                |
| ----------------------- | ------ | ------------------ | ------------------- |
| Performance score       | 83     | **92** (92–93)     | ≥ 90                |
| Largest Contentful Paint | 3.5 s  | **3.1 s** (3.0–3.1) | ≤ 2.5 s **not met** |
| First Contentful Paint  | 1.4 s  | 1.2 s              | ≤ 1.8 s             |
| Total Blocking Time     | 300 ms | **114 ms**         | ≤ 200 ms            |
| Cumulative Layout Shift | 0      | 0                  | ≤ 0.1               |
| Speed Index             | 3.4 s  | 2.9 s (1.5–2.9)    | ≤ 3.4 s             |
| Transferred             | 449 KiB | 370 KiB           | —                   |

What the page weighs (`npm run size`, from the build):

|                              | Before   | Now           | Budget  |
| ---------------------------- | -------- | ------------- | ------- |
| HTML                         | 935 KB (101 KB gzip) | 467 KB (**49.9 KB** gzip) | 60 KB gzip |
| DOM elements                 | 4,722    | **2,077**     | 2,300   |
| Inline SVG filters           | 52       | 7             | —       |
| Initial JS (gzip, modern browsers) | ~160 KB | **144.7 KB** | 160 KB |
| CSS (gzip)                   | —        | 9.3 KB        | 15 KB   |

**The honest gap: LCP is 3.1 s against a 2.5 s target.** In real, unthrottled conditions the
page paints at ~250 ms. Lighthouse's lab number is a _model_ that charges the LCP for everything
requested before first paint under slow-4G/4×-CPU: about 100 KB of fonts, ~145 KB of framework and
app JS, and the page's layout. See [What would move LCP](#what-would-move-lcp).

Lab numbers move ±2 points run to run. Trust the median and the direction, not one run.

---

## The rules

1. **Server components by default.** `'use client'` needs a reason a server component cannot
   serve. The full client list is in [ARCHITECTURE.md](./ARCHITECTURE.md#rendering); adding to it
   is a decision. Never import the art system, a large library or a `src/data` list into a
   client component — that ships it to every visitor. (This is exactly how 14 KB of drawing code
   once reached the browser: a client component imported `ArtImage`.)
2. **Artwork and rooms are `<use>` references to the sprite, never inline SVG.** One artwork
   drawn once in `components/art/Sprite.tsx` serves every card. An inline copy per placement is
   what made the page 935 KB. See [ADR-0002](./adr/0002-shared-svg-sprite-for-placeholder-art.md).
3. **SVG filters are expensive.** `feTurbulence` and blurs are rasterised on the CPU. There are
   seven, all inside the sprite. Adding one needs a measurement.
4. **Fonts:** only the weights the design uses, `display: swap`, and no more than three files
   above the fold. A new family is an ADR — it is ~30 KB each and it delays first paint.
5. **Animation** is `transform` and `opacity` only. Never animate the LCP element from
   `opacity: 0` with a long delay: hero text used to wait up to 1.25 s before it began to appear,
   which set the LCP floor. Respect `prefers-reduced-motion` (CSS `motion-reduce:` and the media query).
6. **No third-party script, tracker or embed without an ADR.** Each costs performance _and_ privacy.
7. **The header is solid white, with no `backdrop-filter`.** A blur on a sticky element re-blurs the page every
   scroll frame. Keep it that way ([ADR-0011](./adr/0011-header-is-always-solid-white.md)).
8. **No `content-visibility: auto` on sections.** Tried and rejected — see the log below and
   [ADR-0008](./adr/0008-content-visibility-auto-rejected.md).
9. **Stay inside the budgets.** `npm run size` fails the build. Raising a budget needs a reason
   in the PR; the default answer is to find what grew.

## Images

There are no photographs yet (the art is drawn). When they arrive:

- Always `next/image` through `components/art/ArtImage` — never `<img>`.
- **`sizes` is required** and must describe the real layout, or the browser downloads the
  largest candidate. `ArtImage` has a default; override it per placement.
- **`priority` only for the single LCP image** (the hero). Everything else lazy-loads.
- The wrapper sets the aspect ratio (`aspect-portrait` etc.), so nothing shifts when an image
  loads. Do not remove it.
- AVIF/WebP are on (`next.config.ts`) and optimised images cache for 30 days. Export sources at
  no more than ~2× the largest displayed size.
- Re-run `npm run perf` when the first real photos land: it will change the LCP element.

## Scripts and fonts

Fonts come from `next/font` (self-hosted, no request to Google). Smooth scrolling loads only
for mouse and trackpad visitors, in its own chunk ([ADR-0006](./adr/0006-smooth-scroll-is-lazy-and-desktop-only.md)).
A reveal is one shared observer for the whole page, not one per element.

---

## How to measure

```bash
npm run build
npm run size      # budgets: initial JS, HTML, CSS, DOM — fast, no browser needed
npm run perf      # Lighthouse mobile, 3 runs, prints the median and the range
```

- `perf` needs Chrome (set `CHROME_PATH` if it is not found) and starts its own `next start`.
- **Do not run other heavy work while it measures.** CPU contention inflates the trace, and the
  score with it.
- Compare like with like: same script, same machine, three runs. If a number is worse than the
  last with no code change to explain it, **suspect the instrument first**. The first version of
  `perf` reported 87 for code that scores 92, because Chrome's flags were split by an unquoted
  shell argument; it also left a server running. The instrument had two bugs, the site had none.
- Lighthouse is a lab. It cannot see your users' devices or networks; real-user monitoring
  (Core Web Vitals from production) is the missing half — see the gaps below.

---

## The log: what was tried, and what it did

Kept so nobody re-runs an experiment without evidence. Numbers are Lighthouse mobile unless
noted. The first four changes shipped together, so their effect was measured **as a set**
(score 83 → 91–93, TBT 300 → ~140 ms); the per-row numbers are the direct measurements each one
allows, not isolated score contributions.

| Change                                                         | Direct measurement                                                                            | Kept |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---- |
| Draw each artwork/room **once** in a sprite; placements are `<use>` | HTML 935 → 467 KB (gzip 101 → 51), DOM 4,722 → 2,076, filters 52 → 7                         | yes  |
| Gallery filter as CSS (`:has` + radios), not a client component | Art system out of the client bundle (−14 KB gzip); the gallery ships no JS                    | yes  |
| Scroll reveal: one shared observer, not 52 client components   | 52 hydrated components → 1                                                                    | yes  |
| Smooth scroll lazy-loaded, mouse/trackpad visitors only        | −12.5 KB gzip off the critical path; nothing at all on touch devices                          | yes  |
| Shorter hero entrance (text starts at 100–440 ms, not 500–1250)  | Text is painted (and counted for LCP) sooner. Not isolated                                    | yes  |
| Header blur only while over the hero (later removed: the header is now always white) | No per-frame page blur while scrolling. Not isolated                                          | yes  |
| Fonts trimmed to used weights                                  | Fewer `@font-face` rules; the browser already fetched only used faces, so a small win         | yes  |
| **`content-visibility: auto` on every section**                | **Score 93 → 90, Speed Index 1.5 → 4.3 s, LCP 3.0 → 3.2 s.** Style/layout fell only 48 ms. Anchor jumps overshot by ~565 px (skipped sections only have estimated heights). Measured against an otherwise identical build. | **no — reverted** |

The `content-visibility` result is the useful one: it is the standard advice for a long page,
and here it made things measurably worse. The lesson is the method — measure before and after —
not the specific verdict; a different page might differ.

## What would move LCP

In rough order of leverage. None is done; each needs a measurement and, for the first two, a
design decision.

1. **Fonts (~103 KB, three files, all requested before first paint).** Options: drop the 300
   weight for headings (a visible change to the hero), use `display: optional` (first visit shows
   the fallback serif), or subset harder. The biggest lever, and the one with a brand cost.
2. **Framework and app JS (~145 KB gzip).** Mostly React and Next's runtime; not ours to cut. Ours:
   keep `'use client'` rare and small, and watch the budget.
3. **Real photographs**, once they exist, become the LCP element and change everything above.
   Prefer a single well-sized hero image with `priority` over several.

## Known gaps

- **No real-user monitoring.** Lighthouse is one synthetic device. Add Core Web Vitals reporting
  (`useReportWebVitals`, or the host's analytics) before launch, sampled and consent-aware.
- **LCP misses its target** (3.1 s vs 2.5 s) — see above.
- **DOM is ~2,100 elements, about 900 of them the sprite** (drawn once; 78 KB raw, ~10 KB gzipped) and the rest
  the page. Lighthouse's DOM-size insight passes today, so the budget in `npm run size` (2,300) is the guard.
  Splitting the sprite per route would help once there are several pages; today one page uses nearly all of it.
- **No CDN/compression policy is checked in.** Brotli and long-lived caching for `/_next/static`
  come from the host; confirm them after the first deploy.
- **No performance gate in CI yet.** `npm run size` runs in `verify`; a scheduled Lighthouse run
  against production is the natural next step.
