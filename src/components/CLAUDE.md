# `src/components` — sections, common, layout, ui, art

Auto-loaded when you work anywhere under `src/components`.

## What this folder is

```
components/sections/  the large blocks a page is made of (Hero, Journal, …) — see sections/CLAUDE.md
components/common/    pieces reused by sections or the layout: ProductCard, WishlistButton, NewsletterForm
components/layout/    page chrome: Header, Footer, Logo, SiteChrome, RevealController, SmoothScroll
components/ui/        primitives: Container, Section, SectionHeading, ButtonLink, TextLink, Icons, Reveal
components/art/       placeholder artwork and rooms — read art/CLAUDE.md before touching it
```

Only `sections/` may know which content it renders (it reads `src/data/`). `common`, `layout`, `ui` and `art` know
nothing about a route or the content they display; they receive what to show as props. Imports flow one way:
sections → common → layout · ui · art. No file imports "up".

## Before you create anything

Search (Glob `src/components/**`, Grep the concept and its synonyms). Escalation order — creating new is
the **last** resort: use as-is → add a variant value → extend props → compose in a section → create new.
A library with three buttons has no design system, however good each button is.

## Non-negotiable here

- **The prop vocabulary is closed:** `variant` / `tone` / `align` — never `type`, `kind`, `color`, `left`.
  [COMPONENT_CONTRACT](../../docs/COMPONENT_CONTRACT.md). Note `tone` means **the surface the component
  sits on** (`light` | `dark`), not a semantic intent.
- **Tokens are the only legal values.** No hex / `rgb()`, and no arbitrary Tailwind value used three or
  more times — add the token to `globals.css` (that is where `text-label`, `tracking-caps`, `aspect-portrait`
  came from). One-off editorial measurements are fine.
- **No external margins.** A component never positions itself; its parent does.
- **Logical direction utilities only:** `ms-4`, `text-start`, `start-0`, `border-s`. `rtl:` variants are
  fine for a glyph that must mirror (an arrow). Known LTR-only spots: INTERNATIONALIZATION §1.
- **Copy comes in as props.** Never hard-code marketing text. (UI microcopy — "Subscribe", aria-labels —
  is recorded debt; do not add to it.)
- **Server by default.** Only `layout/Header`, `RevealController`, `SmoothScroll`/`LenisRoot` and `common/NewsletterForm`, `WishlistButton` are client
  components, each for a stated reason. Anything new needs one.
- `className` is always accepted and merged. Shared class strings are named constants next to their
  component (`buttonBase`, `headingClass`), not copied.
- Accessibility is part of done: real `<button>`/`<a>`, a visible focus ring (set globally, `mist`), labels,
  `aria-hidden` on decoration, `motion-reduce:` on any animation.

## What people get wrong

- **`Reveal` is a server component.** It only marks `data-reveal`; the single `RevealController` in
  `SiteChrome` does the observing. Do not make it a client component "to be safe" — that is 50 hydrated
  components again.
- **Header height is coupled.** `h-19` (Header), `top-19` (mobile menu) and `scroll-mt-19` (Section, Footer) all
  assume 4.75rem. Change one, change all three. The header is always white (ADR-0011).
- **The mobile menu is a side drawer** (slides in from the end edge, backdrop fades, links stagger in). It animates only
  `transform` and `opacity`, locks page scroll while open, and closes on Escape, backdrop tap, a link, or growing to desktop width.
- **The mobile menu is a _sibling_ of the header, on purpose.** `backdrop-filter` on an ancestor traps
  `position: fixed` descendants. Do not nest it.
- **Do not add `content-visibility: auto` to `Section`.** Measured and rejected (ADR-0008).
- **Hash links are plain `<a>`, others use `next/link`** — `SmartLink` decides. Do not hand-roll it.

## Decisions that constrain this code

- [ADR-0010](../../docs/adr/0010-sections-data-and-common-components.md) — the layers
- [ADR-0004](../../docs/adr/0004-logical-properties-and-externalised-copy.md) — logical properties, copy as data
- [ADR-0006](../../docs/adr/0006-smooth-scroll-is-lazy-and-desktop-only.md) — smooth scroll (`layout`)
- [ADR-0008](../../docs/adr/0008-content-visibility-auto-rejected.md) — no `content-visibility` (`ui/Section`)
- [ADR-0011](../../docs/adr/0011-header-is-always-solid-white.md) — the header (`layout`)

Rules: [DESIGN_SYSTEM](../../docs/DESIGN_SYSTEM.md) · [COMPONENT_CONTRACT](../../docs/COMPONENT_CONTRACT.md) · [PERFORMANCE](../../docs/PERFORMANCE.md)
