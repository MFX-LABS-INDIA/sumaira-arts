@AGENTS.md

# Sumaira Arts — Agent & Contributor Instructions

Marketing and enquiry site for a contemporary art studio: Next.js (App Router), React,
TypeScript, Tailwind CSS v4. Read this before writing code. It is short on purpose; it
routes to the rules that are long on purpose.

The rule system follows the Jethur one (rules → docs → ADRs → per-folder context), scaled to
what a public marketing site needs. What Jethur has that this site has no use for
(workspace isolation, a database, TanStack Query) is listed in
[docs/00-INDEX.md](docs/00-INDEX.md#not-carried-over-from-jethur).

## The rules that are not negotiable

1. **Routes compose sections; sections read data.** `src/app` only composes. Copy and data live in
   `src/data/`; the blocks that render them live in `src/components/sections/`. → [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. **Forms never fake success.** A server action returns a `FormState`; expected failures
   are returned, not thrown. → [docs/ERROR_HANDLING.md](docs/ERROR_HANDLING.md)
3. **Fixing an error follows the protocol.** No exceptions, including one-line fixes.
   → [docs/ERROR_FIXING_PROTOCOL.md](docs/ERROR_FIXING_PROTOCOL.md)
4. **Security hygiene runs at every completion.** Not weekly — every task.
   → [docs/SECURITY_HYGIENE.md](docs/SECURITY_HYGIENE.md)
5. **Performance is a gate, not polish.** This site is public and static; a regression
   costs every visitor. Budgets are enforced by `npm run verify`.
   → [docs/PERFORMANCE.md](docs/PERFORMANCE.md)
6. **Tokens only; the component vocabulary is closed.** `variant` / `tone` / `align`,
   never `type` / `kind` / `left`. → [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) ·
   [docs/COMPONENT_CONTRACT.md](docs/COMPONENT_CONTRACT.md)

## Reading about a folder

Each of these has its own short `CLAUDE.md` that loads automatically when you edit there.
Read the one for the folder you are in, not all of them:

`src/app/` · `src/components/` · `src/components/sections/` · `src/components/art/` · `src/data/`

They are hand-maintained (there is no generator here yet) — see
[docs/CONTEXT_ARCHITECTURE.md](docs/CONTEXT_ARCHITECTURE.md). If you change what a folder
promises, change its `CLAUDE.md` in the same commit.

## Before you write a component

There is no generated manifest to query, so search by hand and search by _concept_:

1. Glob `src/components/**` and `src/data/**`; Grep for the thing and its synonyms
   (vocabulary table below). People say "painting card", the code says `ProductCard`.
2. Escalation order — creating new is the **last** resort:
   use as-is → add a variant value → extend props → compose in a section → create new.
3. A new component's PR says why the four cheaper options failed.

Users describe things casually ("the gallery bit", "the buy button"). Translate their words
into this codebase's vocabulary _before_ searching, or the search comes back empty and you
build a duplicate.

## Before you finish anything

```bash
npm run verify
```

It runs lint (zero warnings), typecheck, build, the size budgets, the contrast check and the
docs check. Then fill in the security hygiene checklist. Both, every time.

Also, by the kind of change:

- **Any visible change:** look at it at 375, 768 and 1440 px, with the header at the top and scrolled
  (the header is always white; a shadow appears once scrolled).
- **New client JS, a font, a script, an image above the fold, or a new section:**
  `npm run build && npm run perf`, and say in the PR what moved.

## Task routing

| Task                                       | Read first                                                     |
| ------------------------------------------ | -------------------------------------------------------------- |
| New page                                   | ARCHITECTURE §Add a page · PERFORMANCE                         |
| New section on an existing page            | ARCHITECTURE · DESIGN_SYSTEM · PERFORMANCE                     |
| New component                              | DESIGN_SYSTEM · COMPONENT_CONTRACT · AI_GENERATION_PROTOCOL    |
| Copy or content change                     | ARCHITECTURE §Content · INTERNATIONALIZATION                   |
| Form, enquiry, or any server action        | **ERROR_HANDLING** · **SECURITY_HYGIENE**                      |
| Artwork, placeholder art, real photographs | `src/components/art/CLAUDE.md` · PERFORMANCE                   |
| Fonts, scripts, images, client JS          | **PERFORMANCE** (all of it)                                    |
| Fixing a bug, test, or red build           | **ERROR_FIXING_PROTOCOL** (before editing)                     |
| Reviewing a PR                             | CODE_REVIEW                                                    |
| Anything structural                        | ARCHITECTURE · adr/                                            |
| Adding a language                          | INTERNATIONALIZATION                                           |
| Finishing a task                           | DEFINITION_OF_DONE · SECURITY_HYGIENE                          |

## Hard prohibitions

- `'use client'` without a reason a server component cannot serve (state, an effect, a
  browser API). Server is the default; keep client leaves small.
- Importing the art internals (`components/art/variants/*`, `furniture`, `Sprite`) from
  anywhere but `components/art`. Use `ArtImage`; `ArtPiece` / `RoomScene` / `buildScene`
  only when composing a bespoke layout (the hero, the product hover).
- An inline `<svg>` that redraws a whole artwork or room. Reference the sprite.
- `content-visibility: auto` on sections — measured and rejected
  ([ADR-0008](docs/adr/0008-content-visibility-auto-rejected.md)).
- A third-party script, tracker, embed or webfont family without an ADR (each is a
  performance _and_ a privacy cost).
- Colour literals — hex, `rgb()`, `hsl()` — outside `globals.css`. Use tokens; SVG artwork
  uses `var(--color-*)`.
- An arbitrary Tailwind value that appears three or more times. Promote it to a token in
  `globals.css`. One-off editorial measurements are fine.
- Physical direction utilities (`ml-4`, `text-left`, `left-0`) — use `ms-4`, `text-start`,
  `start-0`. Known exceptions and why: [docs/INTERNATIONALIZATION.md](docs/INTERNATIONALIZATION.md).
- New marketing copy (headlines, descriptions, CTAs) inside a component. It lives in
  `src/data/` and arrives as props.
- A server action that reports success it did not achieve, or leaks internals in a message.
- `any`, non-null `!`, `enum`, an empty `catch`, `throw new Error(...)` for an expected failure.
- Prop names outside the contract vocabulary.
- Suppressing a symptom instead of fixing a cause. See ERROR_FIXING_PROTOCOL's banned-fixes table.
- `eslint-disable` or `@ts-expect-error` without an inline justification and a removal condition.
- Editing an accepted ADR. Supersede it with a new one.
- Files over 800 lines — `max-lines` fails `npm run lint` (and so `verify`). Treat ~300 as the point to split
  (extract a component, a data file), don't write up to the ceiling.

## Domain vocabulary

One word per concept. Synonyms in a domain model are how the same feature gets built twice.

| Say            | Not                                    | In code                                              |
| -------------- | -------------------------------------- | ---------------------------------------------------- |
| **artwork**    | painting, piece, item, product (copy)  | UI copy says artwork; the type is `Product`; data in `data/products.ts` |
| **collection** | series, range, category                | `Collection`; `data/collections.ts`                  |
| **commission** | custom order, bespoke request          | `data/commission.ts`, `sections/Commission`; a submission is an _enquiry_ |
| **enquiry**    | inquiry, lead, contact request, ticket | `lib/actions/enquiry.ts` (planned)                  |
| **journal**    | blog, news, articles                   | `data/journal.ts`, `sections/Journal`               |
| **collector**  | customer, buyer, user                  | reviews copy                                         |
| **the artist** | owner, founder                         | `data/artist.ts`, `sections/FounderBlock`           |

British spelling in copy (colour, enquiry, artefact).

## Decisions

Each folder's `CLAUDE.md` lists the ADRs that constrain it. If a decision is in your way,
supersede it with a new ADR — do not work around it. Index: [docs/adr/index.md](docs/adr/index.md).

## When the rules seem wrong

They sometimes are. The response is an ADR (`docs/adr/`), not a local exception. Local
exceptions are invisible individually and fatal collectively.
