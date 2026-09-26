# Error Fixing Protocol

**Read this before changing any code in response to a failing check, a red build, a stack trace,
a lint error, a layout bug, a budget failure or a bug report. Every time. No exceptions.**

This exists because the default reflex — human or AI — when facing a red screen is to make the
red go away. That reflex produces `try/catch` around the symptom, an `any` cast, a `?.` that
hides a null that should never have existed, or a check that is quietly switched off. Each of
those trades a loud failure for a silent one. On a public site a silent failure means a form
that swallows enquiries, or a page that is slow for everyone and red for nobody.

---

## The protocol

### Step 1 — Reproduce before you theorise

Do not edit code you have not seen fail. Get the failing case in front of you: the command that
goes red, the viewport that breaks, the submission that misbehaves. If a test can hold it, write
the test — that is the deliverable, and the fix is a side effect of it passing. If you cannot
reproduce it, say so explicitly and stop; do not ship a speculative fix.

### Step 2 — Name the layer

Where does the error _originate_, not where it surfaced?

`input validation` · `content/data` · `rendering` · `styling/layout` · `config/env` ·
`third-party (webhook, font, script)` · `build/tooling` · `performance/budget`

A layout bug seen in the browser often originates in a token or a parent's overflow. An
overflow on the page is rarely the element that looks wide — find the one that _causes_ the
width. Fix it where it originates.

### Step 3 — Classify against the taxonomy

Using [ERROR_HANDLING.md](./ERROR_HANDLING.md) §1: **Expected**, **Unexpected**, or **Fatal**?

- **Expected** and it threw → the bug is the _missing branch in the type_, not the throw.
  Convert it to a returned result and let the compiler find the callers.
- **Unexpected** → find the invariant that was violated. Something upstream let through a value
  that should have been impossible.
- **Fatal** → the bug is that the site kept running. Make it fail at build.

### Step 4 — Find the root cause, then go one level further

State it in a sentence: _"X happened because Y, which was possible because Z."_ `Z` is the real
fix. If you cannot write that sentence, you have not found it yet.

> Example from this repo: _"The page scrolled sideways because the filter's hidden radio inputs
> were absolutely positioned against the page instead of the scrolling row, which was possible
> because the pill wrapper was not `relative`."_ Fixing the fieldset's width alone would have
> hidden it at one viewport and shipped it at another.

### Step 5 — Fix the class, not the instance

Ask: **can this bug exist anywhere else in the codebase right now?** Grep for the pattern. If it
can, fix every occurrence, or add a check that makes it unrepresentable, and note it in the PR.

Preference order for the fix itself:

1. Make the bad state **unrepresentable** (types, closed unions, a token instead of a literal)
2. Make it **fail at build** (a schema, a type error)
3. Make it **fail in `verify`** (lint rule, `npm run size`, `npm run contrast`, `npm run docs:check`)
4. Make it **fail loudly at runtime** (an assertion, a thrown error for an Unexpected failure)
5. Handle it (only when it is genuinely an Expected failure)

### Step 6 — Prove the fix

- The reproduction from Step 1 now passes, and **fails again if you revert the fix**. An
  unverified fix is a guess.
- `npm run verify` is green.
- For a visual or performance fix: look at it at 375, 768 and 1440 px; for performance, re-run
  `npm run perf` (three runs, median) and record before and after.
- No new `@ts-expect-error`, `eslint-disable` or `any`. If one is truly unavoidable it needs an
  inline justification and a reviewer's explicit sign-off.

### Step 7 — Close the loop

- Run the [SECURITY_HYGIENE.md](./SECURITY_HYGIENE.md) checklist if the fix touched a form, an
  env var, a header or a dependency.
- If the root cause was a gap in these docs, **update the doc in the same PR**.
- If it revealed an architectural decision, write an ADR — including a _rejected_ one.
  [ADR-0008](./adr/0008-content-visibility-auto-rejected.md) exists so nobody re-runs an
  experiment that already failed.

---

## Banned "fixes"

Rejected in review on sight. No discussion needed.

| Anti-fix                                                    | Why it is worse than the bug                                            |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| `try/catch` around a symptom                                | Converts a diagnosable crash into corrupted state                       |
| `as any` / `as unknown as T`                                | Deletes the check that was about to save you                            |
| Adding `?.` to silence a null                               | The null is the bug; now it spreads                                     |
| `?? []` / `?? ''` on an unexpected empty                    | Renders "nothing here" instead of failing — the site looks fine and is wrong |
| `catch { return null }`                                     | The caller can no longer tell "none" from "broken"                      |
| Widening a type until it compiles                           | Moves the failure to production                                         |
| Showing "Thank you" when the submission did not go anywhere | The worst outcome: a lost enquiry that everyone believes was received   |
| `overflow-x: hidden` on `body` to hide a wide element       | Hides the symptom on one device; the element is still wrong, and clips focus rings and shadows |
| Fixed pixel heights to stop a layout shift                  | Breaks at the next language, font size or viewport                      |
| Removing the thing a budget measures to pass the budget     | The number is green and the visitor's page is not                       |
| `will-change` / `content-visibility` sprinkled over jank    | Guessing at the renderer. Measure; see ADR-0008                         |
| Raising a budget without saying what grew                   | The budget stops meaning anything                                       |
| `eslint-disable` without a justification and removal condition | Local exceptions are invisible individually and fatal collectively   |
| Fixing the test or the budget to match the wrong output     | —                                                                       |

## When the fix is genuinely a workaround

Sometimes it is (an upstream bug, a deadline). Then it must have, in the code:

```ts
// WORKAROUND(<ticket>): <what is actually broken upstream>
// Remove when: <specific, checkable condition>
// Risk if left: <consequence>
```

…plus a tracked ticket. A workaround without a removal condition is permanent.

---

## For AI-assisted fixes

Every prompt that asks for a fix must carry this file. The output is rejected unless it states,
explicitly:

1. the reproduction,
2. the layer,
3. the classification,
4. the one-sentence root cause,
5. whether the class of bug exists elsewhere, and where you checked,
6. which of the five preference levels the fix sits at, and why not a higher one.

"It works now" is not an acceptable justification.
