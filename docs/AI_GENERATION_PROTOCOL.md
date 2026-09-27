# AI Generation Protocol

How code gets generated here without the site drifting. Three layers: **ground the model before it
writes**, **catch drift deterministically after it writes**, **make regeneration cheaper than
patching**.

The premise: a model follows concrete examples far more reliably than written rules, and follows a
failing check more reliably than either. So effort goes into examples and checks, not longer prose.

Jethur grounds generation with a generated manifest and a `ds:neighbors` search tool. This site has
neither — it is small enough that the equivalent is a manual search of a handful of folders. The
_discipline_ is the same; the machinery is lighter.

---

## Layer 1 — Ground the model before it generates

### 1.1 Context that is always required

A generation prompt is not valid without:

1. `CLAUDE.md` (root) and the `CLAUDE.md` of the folder being changed — the rules and the traps.
2. The **source of the 1–3 closest existing components** (see 1.2) — the examples.
3. The relevant `src/data/` file (and `src/types/content.ts`) if the change involves copy or data — the shape.
4. `src/app/globals.css` — the legal token values.
5. The docs the task routes to (the routing table in `CLAUDE.md`).

Do not hand-assemble this from memory. A hand-assembled prompt is one that quietly omits the
document that would have prevented the mistake.

### 1.2 First question is always "does this exist?"

Before writing a component, search — by concept, not by the word the request used:

- Glob `src/components/**` and `src/data/**`.
- Grep for the thing and its synonyms (the vocabulary table in `CLAUDE.md`).

The correct outcome is often **"extend `ButtonLink` with a variant"**, not a new `PrimaryCta`. A model
asked to create will always create; it has to be told to search first, and to say what it found.

Escalation order: **use as-is → add a variant value → extend props → compose in a section → create
new.** Creating new is the last resort, and the PR says why the four cheaper options were rejected.

### 1.3 Few-shot from the nearest neighbours

Show the model the full source of the closest existing components — a new section is shown an
existing section (`Journal`, `ReviewsWall`) and its `src/data` file; a new primitive is shown
primitives. Models mimic concrete code far more reliably than they follow style prose.

### 1.4 Output rules given to the generator

- Follow the folder layout: the `src/data` file first, then the section; server component unless a
  reason is stated for `'use client'`.
- Use only prop names from COMPONENT_CONTRACT, and only tokens from `globals.css`.
- No new dependencies, fonts or scripts. No colour literals. No arbitrary value used three times.
- Logical direction utilities. Marketing copy in `src/data/`, not in JSX.
- State which existing components were considered and why they were insufficient.
- For a form: return a `FormState`; never report a success that did not happen.

## Layer 2 — Catch drift deterministically, after generation

Nothing here relies on a human noticing. In order:

| #   | Gate                     | Command                                 | Catches                                                              |
| --- | ------------------------ | --------------------------------------- | -------------------------------------------------------------------- |
| 1   | Lint                     | `npm run lint`                          | React/a11y rules, `any`, oversized files, unused code                |
| 2   | Types                    | `npm run typecheck`                     | Wrong props, wrong shapes, the rest                                  |
| 3   | Build + budgets          | `npm run build && npm run size`         | Anything that will not prerender; a JS/HTML/DOM budget breach        |
| 4   | Contrast                 | `npm run contrast`                      | An unreadable colour pairing                                         |
| 5   | Docs                     | `npm run docs:check`                    | A doc or ADR the change made stale                                   |
| 6   | Look at it               | a browser at 375 / 768 / 1440 px        | Code that passes every check but _looks_ wrong — spacing, overlap    |
| 7   | Critique pass            | a separate, narrow AI call              | Judgement-level deviation the above cannot express                   |

Gates 1–5 are `npm run verify`. Gate 6 is manual and is not optional: several defects in this codebase
(a hero headline over the artwork, a page that scrolled sideways) passed 1–5 and were found only by looking.

### 2.1 The critique pass is a _separate_ call

Do not ask the generating call to police itself — a model that just wrote code is the worst available
judge of it, and self-review inside one call reliably rubber-stamps. The critique call gets **only**:
the vocabulary, the new code, its nearest neighbours, and one instruction:

> List deviations from the contract, the tokens and the nearest existing components. For each: file,
> line, the rule broken, and the minimal correction. Report only deviations. Do not rewrite the
> component. If there are none, say "no deviations".

Its checklist: prop names outside the vocabulary · a concept already solved elsewhere · a colour
literal or repeated arbitrary value · copy inside a component · a needless `'use client'` · a
duplicated inline SVG · a missing state (empty, long content, reduced motion) · error handling that
departs from ERROR_HANDLING.

## Layer 3 — Make regeneration cheaper than drift

**When validation fails, regenerate against the flagged failure. Do not hand-patch.**

Hand-patching produces one-off exceptions, invisible individually and fatal collectively: after fifty
of them the docs describe a site that no longer exists.

```
request
  └─> search neighbours ──> generate ──> gates 1–6 ──> critique
          ▲                                               │
          └──── regenerate with the failures as input ◀───┘   (max 3 rounds)
                                  │
                       still failing after 3?
                                  ▼
                STOP. The system is missing something.
                Fix the token / doc / contract, then regenerate.
```

Three failed rounds is a signal about the _system_, not the component — a missing token, an ambiguous
contract entry, an absent primitive. Fix the source of truth. That is what makes consistency compound
instead of decay.

## Non-UI generation

| For                              | Required context                                                            |
| -------------------------------- | --------------------------------------------------------------------------- |
| A form or server action          | `ERROR_HANDLING.md` + `SECURITY_HYGIENE.md` + `lib/forms.ts` + `lib/webhook.ts` (the shared form plumbing) |
| Fonts, scripts, images, client JS | `PERFORMANCE.md` — and numbers before/after                                |
| Any bug fix                      | `ERROR_FIXING_PROTOCOL.md` — and the output must answer its seven points    |
| Every completed task             | `SECURITY_HYGIENE.md` completion checklist, filled in                       |

## Rules for the human in the loop

- You own the merged code. "The AI wrote it" is not a review outcome.
- Read the diff, not the summary of the diff.
- Reviewing generated code is harder than reviewing human code: it is fluent, plausible, and
  confidently wrong in ways that read well. Slow down at the parts that look most obvious.
- **Trust a measurement only after checking the instrument.** A tool that reports a worse number for
  the same code is more likely broken than the code (see the note in PERFORMANCE.md).
- If you find yourself approving because it "looks like the others", check that it _is_ like the
  others.
