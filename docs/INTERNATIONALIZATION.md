# Internationalisation (LTR / RTL)

**Today the site is English, left-to-right.** This document is about keeping it _ready_ for Arabic
(right-to-left) without a rewrite, and about what to do the day a second language is added. The
brand sells Arabic-calligraphy artwork, so Arabic is a likely next language — but note the
distinction: Arabic script appearing **in the artwork** is content and works today; Arabic **as the
site's language** is a product decision that has not been made.

**Why some of this is enforced by habit rather than review.** RTL and translation bugs are invisible
to the people reviewing them. `ml-4` looks perfectly correct in an English review and puts the margin
on the wrong side of every Arabic page. `"Explore Collection"` looks like working code. Nobody
notices until a visitor does. So the rules below are written to be followed, and `CODE_REVIEW`
checks them. (Jethur turns both into lint errors; this site has not yet — see "Planned enforcement".)

---

## 1. Direction: use logical properties, never physical ones

| Never                      | Always                    | Why                      |
| -------------------------- | ------------------------- | ------------------------ |
| `ml-4` / `mr-4`            | `ms-4` / `me-4`           | margin-inline-start/end  |
| `pl-4` / `pr-4`            | `ps-4` / `pe-4`           | padding-inline-start/end |
| `left-0` / `right-0`       | `start-0` / `end-0`       | inset-inline-start/end   |
| `text-left` / `text-right` | `text-start` / `text-end` |                          |
| `border-l` / `border-r`    | `border-s` / `border-e`   |                          |
| `rounded-l-*`              | `rounded-s-*`             | start corners            |
| `float-left`               | `float-start`             |                          |
| a prop value `'left'`      | `'start'`                 | `SectionHeading align`   |

Logical properties resolve against the `dir` attribute at runtime, so **one class is correct in both
directions with no runtime branch to forget.** That is the whole strategy
([ADR-0004](./adr/0004-logical-properties-and-externalised-copy.md)).

`rtl:` and `ltr:` variants are allowed where they are deliberate and visible:

```tsx
// An arrow points at content, so it must mirror. A checkmark must not.
<ArrowIcon className="rtl:rotate-180" />
```

Mirror: arrows, chevrons, back/forward, progress. Do **not** mirror: the logo, checkmarks, clocks,
most brand marks, or the artwork itself.

### Known LTR-only spots

Recorded so they are found on purpose, not by a bug report. When RTL ships, fix these together:

| Where                                   | Why it is LTR-only                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Hero scrim `md:bg-linear-to-r` and the hero scene alignment `xMaxYMid` | The composition puts the text on the left and the art on the right. In RTL both must flip **together** (scrim direction and which edge the scene crops from) or the text lands on the artwork. |
| Room scenes (`components/art/scenes.ts`) | Furniture and frame positions are drawn for LTR. They are illustration, so they may stay as they are; decide per scene. |
| `formatPrice` (`lib/format.ts`)         | Hardcodes the `en-US` locale. Pass the locale through when there is one.       |

## 2. Copy: components receive text, they do not contain it

```tsx
// BANNED — untranslatable, and the English site looks perfect
export function Hero() { return <h1>Art That Gives Your Space Meaning.</h1>; }

// CORRECT — copy is content, and arrives as data
const { hero } = content;   // data/home.ts
<h1>{hero.lead} <em>{hero.accent}</em></h1>
```

Marketing copy (headlines, descriptions, CTAs, alt text) lives in `src/data/`
([ADR-0003](./adr/0003-content-lives-in-feature-content-files.md)). That is what makes a second
language, or a CMS, a swap of data rather than a rewrite of components.

### Known debt: UI microcopy still lives in components

These strings are welded into markup today and must move into `src/data/` (or a `messages` prop)
**before** a second language ships:

- Button and link verbs: "Explore Collection", "Read Article", "View artwork →", "Try again", "Back to home"
- Form: "Your email address", "Subscribe", "Sending"
- Accessible names: "Search", "Account", "Cart", "Open menu", "Close menu", "Filter collections"
- Footer: the "Privacy" and "Terms" labels; the page-not-found and error copy.

New code must not add to this list: put new copy in `src/data/`.

## 3. Things that bite

- **Never concatenate sentences.** `"Deleted " + n + " items"` is untranslatable — word order and
  plurals differ. One message per sentence, with placeholders.
- **Text expands.** German runs ~30% longer than English; check long artwork and collection names.
  Fixed-width containers break first.
- **Bidi text.** An Arabic sentence containing an English brand name needs isolation (`<bdi>`), or
  punctuation jumps to the wrong end. The brand name "Sumaira Arts" appears inside every page.
- **Icons beside text** follow start/end, never left/right.
- **Numbers, dates, currency:** always `Intl`, never hand-built. Arabic numerals (`latn` vs `arab`)
  is a product decision, not a technical one.

## 4. When a second language is added

The site is public, static and search-driven, so the locale belongs **in the URL**:

| Strategy        | URL             | Use when                                                   |
| --------------- | --------------- | ---------------------------------------------------------- |
| **`path`** (recommended) | `/ar/collections` | Shareable, crawlable, cacheable, statically generated — right for a marketing site |
| `cookie`        | unchanged       | An app behind a login where language is a profile setting (Jethur's choice; not this site's) |

Steps, in order:

1. Move the microcopy debt above into `src/data/`. Do this first; everything else depends on it.
2. `src/app/[locale]/` wrapping the `(site)` group; `generateStaticParams` for each locale, so pages
   stay prerendered.
3. `<html lang dir>` rendered from the locale, so RTL is correct on first paint — no direction flash.
4. One set of `src/data` files per locale (or files keyed by locale). A missing key must fail the build, not render
   English inside an Arabic page.
5. **Fonts.** Cormorant Garamond and Manrope have no Arabic. Adding an Arabic family (e.g. Noto Naskh
   Arabic, Amiri) is a font addition under PERFORMANCE rule 4: it needs an ADR and a measurement, and
   should load only for Arabic pages.
6. `hreflang` alternates in `metadata` and the sitemap; a language switcher that links to the
   equivalent URL (not a cookie).
7. Fix the LTR-only spots in §1 together.
8. `npm run verify`, then look at every page in both directions and at 375 px.

## 5. Planned enforcement

Not present today, listed so the gap is visible. Each would turn a habit into a build failure:

- An ESLint rule rejecting physical direction utilities in TS/TSX (`no-physical-direction`).
- An ESLint rule rejecting literal user-facing text in components (`no-literal-ui-text`) — this only
  makes sense after the microcopy debt is paid.
- A check for physical properties in hand-written CSS (`globals.css` is small enough to review).
