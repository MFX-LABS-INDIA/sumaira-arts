# Design System

Consistency here is not aesthetic preference. It is the mechanism that keeps a partly
AI-generated site comprehensible: when every component draws from the same tokens and takes the
same props, a reviewer can hold the whole system in their head, and a generator has one obvious
right answer instead of ten plausible ones.

The brand is a navy/blue palette on white and ice, editorial serif headings, a clean sans for
everything else, and **the artwork as the visual hero**. The UI supports the art; it does not
compete with it.

---

## 1. Layers

Jethur uses atoms → molecules → organisms → templates. A marketing site is mostly _sections_,
so the layers here are shaped to that:

| Layer          | Location                       | Definition                                                                            | Rules                                                                 |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Primitives** | `src/components/ui`            | The smallest reusable pieces: `Container`, `Section`, `SectionHeading`, `ButtonLink`, `TextLink`, icons, `Reveal`. | No content, no feature knowledge, no data. Accept `className`.        |
| **Chrome**     | `src/components/layout`        | The frame around a page: `Header`, `Footer`, `Logo`, `SiteChrome`, scroll behaviour.  | Compose primitives. May read the route and scroll.                    |
| **Art**        | `src/components/art`           | Placeholder artwork and rooms, and the one component that shows either them or a photograph (`ArtImage`). | Special rules — read `components/art/CLAUDE.md`.                       |
| **Common**     | `src/components/common`        | Composed pieces reused by sections or the layout: `ProductCard`, `WishlistButton`. | Compose primitives and art. Receive data as props. |
| **Sections**   | `src/components/sections`      | A large block of a page: `Hero`, `Journal`, `Commission`.                             | Compose the layers above. Copy comes from `src/data/`. |
| **Pages**      | `src/app/(site)/**/page.tsx`   | A route: the order of sections.                                                       | Composition only. The only layer that knows about routing.            |

**Dependency direction is one-way:**

```
pages → sections (features) → chrome · art · primitives → lib · config · types
```

A primitive that imports a section is a bug, and no file imports "up" the layers.

## 2. Tokens are the only legal source of value

`src/app/globals.css` → `@theme static` → Tailwind utilities. Components use utilities, never a
literal. There is one theme; a second (dark) would be an ADR.

### Colour

| Token            | Value     | Role                                                        |
| ---------------- | --------- | ----------------------------------------------------------- |
| `brand`          | `#1B3A6B` | Primary: CTAs, links, accents                               |
| `deep`           | `#0D182A` | Headings, dark sections, footer                             |
| `steel`          | `#3D5A80` | Body text, secondary accents                                |
| `mist`           | `#6B8CAE` | Details, icons, borders — **not body text on light surfaces** |
| `soft`           | `#A8C5E0` | Accents and eyebrows on dark, subtle borders                |
| `light`          | `#CDE1F2` | Hairlines, soft section backgrounds                         |
| `ice`            | `#EBF1FA` | Page and section backgrounds                                |
| `white`          | `#FFFFFF` | Cards, mats, artwork surfaces                               |

The page should stay **white + ice + navy**. Blue is an accent and an identity, not a wash
across everything. Avoid gold and beige as a dominant colour.

### Type, spacing and effects

| Token                      | Value                 | Use                                             |
| -------------------------- | --------------------- | ----------------------------------------------- |
| `font-serif` / `font-sans` | Cormorant Garamond / Jost | Headings / everything else                  |
| `text-label`               | 0.72rem               | Buttons, links, nav, eyebrows                   |
| `text-micro`               | 0.66rem               | Tiny meta: category, wall labels, pills         |
| `text-body-sm`             | 0.95rem               | Card descriptions                               |
| `tracking-caps`            | 0.22em                | Small-caps labels                               |
| `tracking-eyebrow`         | 0.3em                 | Eyebrows                                        |
| `rounded-control` / `rounded-card` | 0.5rem · 1rem | Buttons, inputs, chips · cards and imagery. Pills and the heart button are `rounded-full` |
| `aspect-portrait` / `-landscape` / `-tall` | 4/5 · 4/3 · 3/4 | Artwork shapes                             |
| `shadow-raised` / `shadow-artwork` | navy-tinted   | Header · matted artwork. Never plain black      |
| `animate-fade-up` / `-fade-in` / `-scale-in` | —   | Entrances                                       |
| `ease-out-soft`             | cubic-bezier(0.22, 0.61, 0.36, 1) | One deceleration curve for UI motion (drawer, icon turn) |

Section headings use `headingClass` (`components/ui/SectionHeading.tsx`): `clamp(2rem, 4.5vw, 3.5rem)`.
The hero heading is `clamp(2.5rem, 7.2vw, 5.5rem)`.

**Banned in component code:**

- hex / `rgb()` / `hsl()` colour literals — use a token; SVG artwork uses `var(--color-*)`;
- an arbitrary Tailwind value used **three or more times** — that is a missing token; add it to
  `globals.css` (this is how `text-label`, `tracking-caps` and the aspect tokens came about, after a
  sweep found `text-[0.72rem]` five times and `tracking-[0.22em]` five times, drifting by 0.02em);
- inline `style={{ }}` for anything a token covers. (Allowed: a per-element CSS variable such as
  `--reveal-delay`, and animation delays.)

A one-off editorial measurement (`max-w-[26rem]`) is fine. If you need a value that does not exist and
will reuse it, **add the token**. The five minutes that costs is the reason the system stays coherent.

### Contrast

`npm run contrast` checks the pairs the design uses against WCAG AA (4.5:1 text, 3:1 UI), reading the
colours from `globals.css`. It runs in `verify`. Two facts worth knowing:

- `mist` on white is **3.5:1**. It is for icons and borders only; never for text on a light surface.
- Everything else in use is well above AA (body `steel` on white is 7.1:1).

Add a pair to `scripts/contrast.mjs` when you start using a new foreground/background combination.

## 3. Composition over configuration

A component that has grown a fourth boolean flag is two components.

```tsx
// no — configuration sprawl
<Card showHeader showFooter headerIcon="user" dense collapsible />

// yes — composition
<Card><Card.Header icon={<UserIcon />} /><Card.Body /></Card>
```

Prefer slots (`ReactNode` props) to boolean toggles. Prefer one variant axis with named values to
several booleans that can contradict each other. `ButtonLink` has one `variant` axis (`solid` |
`outline`) and one `tone` axis (the surface it sits on) rather than four booleans.

## 4. Styling and behaviour rules

- Tailwind utilities in the component. Shared class strings live as a named constant next to the
  component that owns them (`buttonBase`, `headingClass`), not copy-pasted.
- **No external margins.** A component never positions itself; its parent does.
- Logical direction utilities only ([ADR-0004](./adr/0004-logical-properties-and-externalised-copy.md)).
- **Accessibility is part of done:** keyboard reachable, a visible focus ring (`globals.css` sets
  one, `mist`), correct roles and labels, real `<button>`/`<a>`, and `prefers-reduced-motion`
  respected. Decorative SVG is `aria-hidden`; an image carries its `alt`.
- Semantic HTML first: a filter is a `fieldset` of radios, not a row of clickable `div`s.
- Server components by default (see PERFORMANCE and ARCHITECTURE).

## 5. Adding a component

1. **Search first** — Glob `src/components/**` and `src/data/**`, Grep the concept and its
   synonyms. Does this exist? Extend before you add.
2. If new: pick the layer (a primitive that knows nothing, or a section).
3. Conform to [COMPONENT_CONTRACT.md](./COMPONENT_CONTRACT.md). Do not invent a new prop vocabulary.
4. Take copy as props (or from `src/data/`); never hardcode marketing text.
5. Check it at 375 / 768 / 1440 px, with long content (an artwork title that wraps to four lines
   at 375), and with reduced motion.
6. `npm run verify`.

Step 1 is the one that gets skipped and the one that matters most. A library with three buttons has
no design system, however good each button is.
