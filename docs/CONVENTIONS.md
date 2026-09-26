# Conventions

Small, boring, non-negotiable. Consistency here is worth more than any individual choice.

## Naming

| Thing                         | Convention                                  | Example                                   |
| ----------------------------- | ------------------------------------------- | ----------------------------------------- |
| Component file and export     | PascalCase, identical                       | `ProductCard.tsx` → `ProductCard`         |
| Non-component module          | lowercase, one word where possible          | `products.ts`, `journal.ts`, `webhook.ts`   |
| Folder                        | lowercase, by kind of file                  | `components/sections`, `data`             |
| Type                          | PascalCase, no `I` prefix; `type` over `interface` | `Collection`, `FormState`          |
| Constant                      | SCREAMING_SNAKE at module scope only when it is a true constant | `SOLID_AFTER`         |
| Boolean                       | `is` / `has` / `can` / `should`             | `isLoading`                               |
| Route segment                 | kebab-case                                  | `/commission-enquiry`                     |
| Design token                  | role, not appearance                        | `--color-brand`, `--tracking-caps`        |

Existing boolean props `zoom`, `stacked` and `priority` (the last mirrors `next/image`) predate
this rule; new booleans follow it.

## Vocabulary

**One word per concept.** The table is in [CLAUDE.md](../CLAUDE.md#domain-vocabulary); the reason
is here: synonyms in a domain model are how two engineers build the same feature twice, and
how a search for "painting" returns nothing while `ProductCard` sits there. When you find
yourself reaching for a new word, check the table, then check the code.

British spelling in copy (colour, enquiry). Code identifiers use the vocabulary words, not
their synonyms.

## TypeScript

- `strict` is on. `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are **not** —
  they are the right next step (Jethur runs both) and would need a pass over `variants/*` and
  the scene tables. Do not turn them on casually.
- No `any`. No non-null `!` (narrow instead). No `as` except at a parsed boundary. ESLint
  flags `any`.
- No `enum` — a const object or a union of string literals.
- Infer return types for internal functions; declare them on exported API.
- Data files are typed at the boundary (`Product`, `Collection`, `Visual`). A new field goes in
  the type first.

## Imports

`@/` for anything outside the current folder; `./` only for a sibling in the same folder. Type-only imports use
`import type`. Order: external → `@/` → relative.

## Functions and components

- One job. If the name needs "and", split it.
- An object parameter once you reach three arguments.
- Early return over `else`.
- Pure where possible; side effects at the edges (a server action, an effect).
- A component receives what it shows. Marketing copy is in `src/data/`, not JSX.

## Comments

Explain **why**. The code already says what. Comment non-obvious constraints, the reason for a
measured decision (link the ADR), workarounds (with a removal condition), and anything that will
look like a mistake to the next reader — the sprite's off-screen (not `display:none`) styling is
the canonical example. Delete commented-out code; git remembers.

## Git

- **Long-lived branches:** `main` (production, always deployable), `test` (staging, a release candidate
  under check) and `dev` (integration). Nobody commits to them directly; every change arrives by pull request.
- **Flow:** `feat/…` → `dev` → `test` → `main`. Each step is a PR that must pass `npm run verify`; `test` is also
  looked at by a person (and `npm run perf`) before it is promoted. A live bug fix branches from `main` as
  `fix/…`, merges to `main`, and is then merged back down into `test` and `dev` so they do not drift.
- Short-lived branches: `<type>/<short-description>` — `feat/`, `fix/`, `perf/`, `chore/`, `docs/`, `refactor/`.
  Delete after merging.
- Commits: conventional (`feat(hero): …`, `perf(art): …`), imperative, the _why_ in the body
  when it is not obvious. Put the numbers in the body of a `perf:` commit.
- Small PRs. A 2000-line PR does not get reviewed, it gets approved.
- Never commit: secrets, `.env.local`, `.next/`. `.env.example` is committed.

## Files

Under ~300 lines. Over that is a signal, not a violation — investigate it: pull out a
component, a hook, or a data file instead of letting one file keep growing. 800 lines is a
hard ceiling enforced by ESLint (`max-lines`, error); a file that hits it fails `npm run lint`, and so `verify`. Do not
write toward the ceiling. `components/art/variants/` is the worked example: one 478-line file
became a shared kit and three themed files.

One component per file. Give a topic the same name across `data/`, `components/sections/` and `lib/actions/`
(`journal.ts`, `Journal.tsx`) so the three are easy to find together.
