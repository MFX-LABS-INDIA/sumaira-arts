# Testing

Tests exist to let you change code confidently. A test that breaks on every refactor without
catching a bug is a liability — it teaches people to delete tests.

**This site has no test runner yet.** That is a gap, stated plainly rather than papered over. What
it has instead is a set of mechanical checks (below), and this document says what to add, in what
order, and what each layer is _for_.

---

## What is checked today

`npm run verify` runs all of these. None needs a browser except `perf`.

| Check               | Command              | What it catches                                                                 |
| ------------------- | -------------------- | ------------------------------------------------------------------------------- |
| Lint                | `npm run lint`       | Next/React/a11y rules, `any`, files over 800 lines. **Zero warnings allowed.**  |
| Types               | `npm run typecheck`  | The rest. `strict` is on.                                                       |
| Build               | `npm run build`      | Anything that fails to prerender; broken imports; route/type errors             |
| Size budgets        | `npm run size`       | Initial JS, HTML, CSS or DOM passing their budget                               |
| Contrast            | `npm run contrast`   | A token pair used for text dropping below WCAG AA                               |
| Docs                | `npm run docs:check` | Dead links, ADRs pointing at paths that no longer exist, unindexed docs         |
| Performance (lab)   | `npm run perf`       | Lighthouse mobile, median of 3. **Manual**, not in `verify` (slow, needs Chrome) |

Plus, by hand, at the end of every task: look at it at 375 / 768 / 1440 px in both header states
(DEFINITION_OF_DONE).

## What to add, in order

Ordered by risk per hour of effort. Each is small; none is built yet.

1. **Unit tests for `src/lib/`** (Vitest). Pure and fast: `formatPrice`, `EMAIL_PATTERN`,
   `postToWebhook` with a stubbed `fetch` (`sent` / `not-configured` / `failed` / network error).
   These hold the exact behaviour ERROR_HANDLING promises.
2. **Server-action tests** for the enquiry action, once it exists: an invalid email,
   an unset endpoint, a failing endpoint, and a success — asserting the message and `status` for each.
   The "never fake success" rule needs evidence.
3. **End-to-end tests** (Playwright), critical journeys only: the anchor links land under the header,
   the collection filter shows the right counts, the mobile menu opens and closes with Escape, the
   enquiry form (once it exists) shows the honest "not connected" message, and the 404 renders.
4. **Accessibility** (axe, inside the Playwright run) on the home page and any form.
5. **Performance in CI:** a scheduled Lighthouse run against the deployed site, alerting on a drop
   of more than a few points or an LCP regression. Lab numbers are noisy (±2 points); alert on the
   median, not a single run.
6. **Visual regression**, only if design drift becomes a real problem — it is expensive to maintain.

## Non-negotiable suites, once a runner exists

1. **Forms** — each state of every server action, including "not configured" and "failed".
2. **Error boundaries** — the error page shows a `digest` and never the message.
3. **Anchor navigation** — every in-page link lands with its target just under the header.
   (This is the test that would have caught the doubled scroll offset found during the performance work.)

## Rules

- Test **behaviour**, not implementation. If a refactor with no behaviour change breaks a test, the
  test was wrong.
- Every bug fix starts with a failing test (ERROR_FIXING_PROTOCOL step 1) when a test can hold it.
  Verify it fails when the fix is reverted — an unverified test proves nothing.
- Arrange–Act–Assert, visibly separated. One reason to fail per test. Names read as sentences:
  `reports "not connected" when no endpoint is set`.
- No shared mutable state between tests. Deterministic: fixed clock, no network, no sleeps.
- Query by role and label, never by class name.
- Coverage is a diagnostic, not a target. The forms suite passing proves more than 100% coverage of
  getters.
