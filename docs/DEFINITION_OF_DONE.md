# Definition of Done

A task is done when **all** of the following are true. Not "code written". Not "it works on my
machine". Not "it looked fine at my window size".

---

```
## 1. It works
- [ ] Does what was asked, including the boring parts (empty, error, no-JavaScript, reduced-motion)
- [ ] Exercised in a browser, not just type-checked
- [ ] Looked at in 375, 768 and 1440 px, with the header at the top and scrolled
- [ ] A form: submitted for real, including the "not configured" and "failed" paths

## 2. It is safe
- [ ] docs/SECURITY_HYGIENE.md completion checklist filled in — every line answered
- [ ] No secret, visitor data, or internal detail added to logs, errors or the client bundle
- [ ] No third-party script, tracker or embed added without an ADR

## 3. It is correct under failure
- [ ] Failures follow docs/ERROR_HANDLING.md — no local variants, no faked success
- [ ] If this was a bug fix: docs/ERROR_FIXING_PROTOCOL.md steps 1–7 answered in the PR
- [ ] The failing case was reproduced first, and fails again if the fix is reverted

## 4. It is consistent
- [ ] docs/COMPONENT_CONTRACT.md vocabulary respected — no new prop synonyms
- [ ] Tokens only: no colour literals, no arbitrary Tailwind value used three or more times
- [ ] Logical direction utilities (ms-, text-start), no physical ones
- [ ] Marketing copy is in src/data, not in the component
- [ ] Right folder; imports flow one way (docs/ARCHITECTURE.md)

## 5. It is fast
- [ ] `npm run size` within budget (it runs in `npm run verify`)
- [ ] New client JS, font, script or above-the-fold media: `npm run perf` before and after, numbers in the PR
- [ ] Any real photo has `sizes`, an aspect ratio and (only if it is the LCP image) `priority`

## 6. It is verifiable
- [ ] `npm run verify` green: lint (zero warnings), typecheck, build, size, contrast, docs check
- [ ] Anything a test can hold is held by one (docs/TESTING.md says what exists today)

## 7. It is legible
- [ ] Someone else could change this in six months without asking you
- [ ] Docs / the folder's CLAUDE.md / an ADR updated if a convention, boundary or decision changed
- [ ] The PR description explains why, not just what
```

---

**The completion ritual.** At the end of every task — including every AI-assisted one — run the
security hygiene checklist. Not at release. Not at sprint end. At completion, every time. A
checklist run once a month is a document; run every time, it is a control.
