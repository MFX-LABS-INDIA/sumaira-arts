## What & why

<!-- What changed, and why. Not a restatement of the diff. -->

## What should a reviewer look at hardest?

<!-- Point them at the risky part. -->

---

### Definition of done (docs/DEFINITION_OF_DONE.md)

- [ ] `npm run verify` green (lint, typecheck, build, size, contrast, docs check)
- [ ] Looked at in 375 / 768 / 1440 px, in both header states — screenshots attached for visual changes
- [ ] Docs, the folder's `CLAUDE.md`, or an ADR updated if a convention, boundary or decision changed
- [ ] Marketing copy is in `src/data/`; tokens (not literals); logical direction utilities

### Security hygiene (docs/SECURITY_HYGIENE.md) — answer every line

- [ ] No secret added; new env vars are in `.env.example`; `NEXT_PUBLIC_*` reviewed
- [ ] Server-only values never reach a client component, message or log
- [ ] All form input validated on the server, with length limits
- [ ] No visitor data logged, echoed or put in a URL; where it lands is known and documented
- [ ] The form reports failure honestly (no success it did not achieve)
- [ ] Security headers in `next.config.ts` unchanged or strengthened
- [ ] No third-party script, tracker, embed or font added (or an ADR covers it)
- [ ] New dependencies justified, bundle cost measured; `npm audit` clean of high+critical
- [ ] Errors show generic messages only; no internals leaked
- [ ] No new `eslint-disable`, `@ts-expect-error` or `any` without a justification

### Performance (docs/PERFORMANCE.md)

<!-- Delete this section if the change touches no client JS, font, script, media or section. -->

- [ ] `npm run size` within budget
- [ ] `npm run perf` before → after (median of 3): score `__ → __`, LCP `__ → __`, TBT `__ → __`
- [ ] Any real image has `sizes`, an aspect ratio, and `priority` only if it is the LCP image
- [ ] New `'use client'` file is justified in the PR (and added to the client list in ARCHITECTURE.md)

### If this is a bug fix (docs/ERROR_FIXING_PROTOCOL.md)

- **Reproduction:**
- **Layer it originates in:**
- **Classification (expected / unexpected / fatal):**
- **Root cause — "X happened because Y, which was possible because Z":**
- **Can this bug class exist elsewhere? Where did you check?**
- **Fix level (1 unrepresentable → 5 handled), and why not higher:**

### Component work (docs/AI_GENERATION_PROTOCOL.md)

- [ ] Searched first; existing components considered:
- [ ] Reason a new component was needed (if it was):
- [ ] Prop names are from the contract vocabulary
