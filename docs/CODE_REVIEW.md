# Code Review Standard

Review is the last human gate. It is not a style argument — lint already settled those, and if
you are discussing formatting in a PR, a config is missing.

Review order matters. Stop at the first level that fails; there is no point discussing naming in
a form that loses enquiries.

---

## Level 1 — Correctness & safety (blocking)

- Does it do what the PR says? Does the PR say what it does?
- Forms: validated on the server, honest about failure, no visitor data in logs or URLs
  (`ERROR_HANDLING.md`, `SECURITY_HYGIENE.md`). **Every** change to a form gets read twice.
- Security checklist filled in, honestly.
- Edge cases: empty, one, many, very long strings · no JavaScript · reduced motion · slow network ·
  failed request · non-Latin text (Arabic calligraphy names) · a 320 px screen · text zoom to 200%.
- Anything a test can hold is held by one, and the test **fails without the change**.

## Level 2 — Reusability & duplication (blocking)

The question is never "is this good code" but "is this the _third_ time we've written it".

- Did the author search first? Does this duplicate an existing component, helper or `src/data` shape?
- Is the abstraction earned? **Two occurrences is a coincidence; three is a pattern.** Premature
  abstraction costs more than duplication.
- Does shared code belong in `components/` or `lib/` (used by two or more features, knows nothing
  about any of them)? If it imports a section, it is not shared.
- Is the abstraction leaking? A helper with a `mode` flag that switches its whole behaviour is
  two functions.
- Does anything reimplement a platform or library primitive we already ship?

## Level 3 — Design & boundaries

- Right folder; imports flow one way (`app → components → data · lib · constants · types`, and within components sections → common → layout · ui · art). No section imports another section.
- `'use client'` as low as possible, and only with a reason. Is the client list in ARCHITECTURE still true?
- Copy is in `src/data/`. Tokens, not literals. Logical direction utilities.
- Is the unit of change small? Would a future change touch one file or seven?
- Naming uses the vocabulary (`artwork`, `collection`, `enquiry`), not synonyms.

## Level 4 — Readability

- Can a new engineer follow it without asking the author?
- Names say _what_ and _why_; comments explain **why**, never what.
- Early returns over nesting. No cleverness that needs a comment to be legible.
- No dead code, commented-out blocks, or stray `TODO` without a ticket.
- Files under ~300 lines, or a reason.

## Level 5 — Performance & scale

This site's equivalent of "does it hold at 10× data" is "does it hold for every visitor on a phone".

- Bundle impact of any new client code or dependency (`npm run size`; is the number in the PR?).
- Does it add DOM? A repeated block should be a reference to shared markup (the sprite), not a copy.
- Images: `next/image`, real `sizes`, an aspect ratio, `priority` only for the LCP image.
- Fonts and scripts: any new one has an ADR.
- Animation: `transform`/`opacity` only; nothing that delays the first paint of text.
- Does it move the Lighthouse numbers? If it touches the fold, the PR says by how much.

---

## Reviewer conduct

- **Distinguish blocking from preference.** Prefix non-blocking comments with `nit:`. A review
  where everything is blocking teaches authors to ignore reviews.
- Ask, don't assert, when you might be missing context: "what happens if X is empty?"
- Suggest the concrete alternative. "This is confusing" is not actionable.
- Approve when it is better than what is there now, not when it is perfect.
- Praise good work explicitly. Reviews that only ever contain criticism decay into theatre.

## Author checklist before requesting review

```
- [ ] `npm run verify` green locally
- [ ] Security hygiene checklist filled in (every line answered)
- [ ] Searched for existing code first; stated what was considered and why it didn't fit
- [ ] Self-reviewed the full diff on the PR page, not just in the editor
- [ ] PR description says what changed, why, and what a reviewer should look at hardest
- [ ] Screenshots at 375 / 768 / 1440 for any visual change
- [ ] `npm run perf` numbers for anything that touches the fold, JS, fonts or media
- [ ] No new eslint-disable, @ts-expect-error or any without a justification
- [ ] Docs, the folder's CLAUDE.md, or an ADR updated if behaviour or a convention changed
```

## Generated code

Reviewed to the _same_ standard, with extra attention to: invented prop names, silently added
dependencies, plausible-but-wrong error handling (especially a form that reports success it did
not achieve), a duplicated component, a colour literal or repeated arbitrary value, and confident
code paths for cases that cannot occur. It reads better than human code and is wrong in subtler
ways — spend your attention accordingly.
