# Component API Contract

**A fixed prop vocabulary. One concept, one name, everywhere.**

Most UI inconsistency is not visual — it is lexical. One component takes `variant`, the next
`type`, a third `kind`. All mean the same thing. Consumers guess, autocomplete stops helping, and
every new component becomes a small research task. This file closes the vocabulary.

Jethur generates this table from `design-system/contract.json`. This site is small enough to keep
it by hand; if it grows past a screen, generate it.

---

## 1. The prop vocabulary

These names have **exactly one meaning** in this codebase. Never redefine one, never substitute a
synonym. This is _this site's_ contract: it deliberately differs from Jethur's where the two
products differ (see `tone`).

| Prop          | Type                              | Meaning                                                                                         |
| ------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `variant`     | `'solid' \| 'outline'`            | Visual weight / emphasis (`ButtonLink`).                                                        |
| `tone`        | `'light' \| 'dark'`               | **The surface the component sits on**, so it can pick readable colours. Not a semantic intent.  |
| `align`       | `'start' \| 'center'`             | Inline-axis alignment. Never `left` / `right` — they do not survive RTL.                        |
| `className`   | `string`                          | Merged onto the root; always accepted.                                                          |
| `href`        | `string`                          | Destination. `#…` is a same-page anchor (plain `<a>`); anything else goes through `next/link`.  |
| `children`    | `ReactNode`                       | Content.                                                                                        |
| `eyebrow`     | `string`                          | The small-caps line above an editorial heading.                                                 |
| `title`       | `string`                          | The heading of an editorial block (`SectionHeading`). Not a tooltip.                            |
| `description` | `string`                          | The supporting paragraph under a heading.                                                       |
| `label`       | `string`                          | Short UI text (a filter, a wall label).                                                         |
| `delay`       | `number` (ms)                     | Stagger offset for `Reveal`.                                                                    |
| `id`          | `string`                          | Anchor target or form-control id.                                                               |

**Artwork props** — used only by `ArtImage` (and mirrored by the `Visual` type in `types/content.ts`):

| Prop       | Type         | Meaning                                                                          |
| ---------- | ------------ | -------------------------------------------------------------------------------- |
| `art`      | `ArtVariant` | Which drawn placeholder to show.                                                 |
| `scene`    | `SceneKind`  | Hang the artwork in a room (`living`, `bedroom`, `office`, `hall`).              |
| `src`      | `string`     | A real photograph (a path under `/public`). Replaces the drawing.                |
| `alt`      | `string`     | Text alternative. Required.                                                      |
| `sizes`    | `string`     | The `next/image` `sizes` attribute. Required for a real photo.                   |
| `priority` | `boolean`    | The single LCP image only. Mirrors `next/image`.                                 |
| `zoom`     | `boolean`    | Slow 1 → 1.03 scale when an ancestor `group` is hovered.                         |

`Container`, `Section` (`id`, `tone`, `className`), `Reveal` (`delay`, `className`) and the icons
take a subset of the above.

### Banned names

`kind` · `appearance` · `color` · `colour` · `theme` · `status` · `intent` · `scale` · `leftIcon` ·
`rightIcon` · `mt` · `mb` · `ml` · `mr` · `margin` · `spacing` · `wrapperProps` · `containerProps`

**Exceptions:**

- `type` — legal **only** as a native DOM attribute passthrough (`type="submit"`). Never for visual
  style; use `variant`.
- Values `left` / `right` — never as a prop value; use `start` / `end`.

### Boolean prefixes

New booleans use `is`, `has`, `can`, `should` or `allow`, default to `false`, and `false` is the
safe/normal state. Never `isNotX` or `hideX`. The existing `zoom`, `stacked` and `priority` predate
this rule (the last mirrors `next/image`); rename opportunistically, not in a drive-by.

## 2. Handler naming

`on<Thing><Event>` on the component; `handle<Thing><Event>` for the implementation. A semantic
handler passes the value, a DOM passthrough passes the event. Never both for the same concept.

## 3. Required shape for a component

- Extend the native element's props when it wraps one; never re-declare `onClick`, `id`, `aria-*`
  by hand.
- Union literals, never `string`, for a closed set. `variant?: string` defeats the contract.
- A TSDoc line on any prop whose meaning is not obvious from its name, with the `@default`.
- No `any`, no `object`, no `Function`.
- A component takes a **subset** of the vocabulary; it may not take a name outside it without
  adding that name here first.
- Slots are `ReactNode`, not render props, unless the child genuinely needs parent state.

## 4. What is not allowed in a primitive's API

- Anything route-, data- or feature-aware below the page layer. Data comes in as props.
  A `Button` that knows about a collection is a bug.
- Fetching, `useRouter`, `cookies()` or environment access in `components/ui`.
- External margin props. Parents own spacing.
- Passthrough grab-bags (`wrapperProps`). Use slots.

## 5. Adding to the vocabulary

Requires: a change to this file, and a reason no existing name fits. Adding a synonym for an
existing concept is refused. The vocabulary is small on purpose — that is what makes it
memorable, and a vocabulary nobody can recite is not a contract.
