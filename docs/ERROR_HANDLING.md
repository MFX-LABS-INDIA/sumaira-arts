# Error Handling Pattern

**Status: FIXED. Not open to per-feature adjustment.**

This document defines the _only_ way failures are represented, propagated and surfaced in this
codebase. If a situation appears not to fit, that is a signal to raise an ADR (`docs/adr/`) — not
to invent a local variant. Local variants are how a codebase ends up with six error shapes and
no reliable way to tell a visitor the truth.

There is no database and no authenticated area here, so the surface is small: **forms and server
actions**, the **error and not-found pages**, and **environment configuration**. The rules are
the same ones Jethur applies at larger scale, cut down to fit.

---

## 1. The three kinds of failure

Classify before you write code.

| Kind           | Meaning                                                                              | Who caused it   | Surfaced as                                                         |
| -------------- | ------------------------------------------------------------------------------------ | --------------- | ------------------------------------------------------------------- |
| **Expected**   | A modelled outcome: invalid email, endpoint not configured, upstream said no.        | Visitor / setup | A typed result, **returned** — not thrown                           |
| **Unexpected** | A bug or a broken dependency: null dereference, the webhook host is down mid-request. | Us / infra      | Thrown; caught by the route boundary; generic message to the visitor |
| **Fatal**      | The site cannot run correctly: a required env var is missing.                        | Config          | Fail at build or boot. Do **not** degrade silently                   |

The most common mistake is treating an Expected failure as Unexpected: throwing for an invalid
email and catching it three layers up. Expected failures are part of a function's return type.
They are data.

## 2. Forms and server actions

Every form is a server action returning `FormState` (`src/lib/forms.ts`):

```ts
export type FormState = { status: 'idle' | 'success' | 'error'; message: string };
```

An action does three things, in order, and returns at the first that fails:

1. **Validate** input on the server (a client `required` attribute is a convenience, not a check).
2. **Send** it (`postToWebhook` from `src/lib/webhook.ts`).
3. **Map the result** to a message with a `switch`, including a `default`.

```ts
switch (await postToWebhook(process.env.ENQUIRY_ENDPOINT, { email, message })) {
  case 'sent':           return { status: 'success', message: "Thank you. You're on the list." };
  case 'not-configured': return { status: 'error',   message: "Enquiries aren't connected yet." };
  default:               return { status: 'error',   message: 'Something went wrong. Please try again in a moment.' };
}
```

**A form never fakes success.** If nothing was sent, the visitor is told so. A "Thank you" that
went nowhere loses the enquiry _and_ the trust — the worst outcome available, and the one a
placeholder handler produces by default. `not-configured` exists so that an unwired form says
so during development instead of quietly succeeding.

`WebhookResult` is a closed union (`sent | not-configured | failed`). Adding a value is a
deliberate act: update every `switch` on it (the compiler will list them).

## 3. Catching

A `catch` block must do exactly one of:

1. **Recover** — a real fallback, with a comment saying why it is safe.
2. **Return a typed failure** — as `postToWebhook` does: network error → `'failed'`.
3. **Translate and rethrow** — only when the caller needs an exception to reach a boundary.

Never allowed: an empty `catch`; `catch (e) { console.error(e) }` as the whole body; catching
without narrowing (`e` is `unknown`). **Logging is not handling.**

`throw new Error(...)` is for the _Unexpected_ and _Fatal_ kinds only, never for an expected
outcome.

## 4. Boundaries

An error stops travelling at exactly one of these:

| Boundary          | File                        | Behaviour                                                                                      |
| ----------------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| Server action     | `lib/actions/*.ts`     | Returns a `FormState`. Never throws for an expected failure.                                   |
| Route error       | `src/app/(site)/error.tsx`  | Renders inside the site chrome with a retry. Shows only the opaque `digest`, never the message. |
| Not found         | `src/app/not-found.tsx`     | Branded 404 with a way home.                                                                   |
| Root layout       | none (Next's default)       | Gap: add `global-error.tsx` if the root layout ever does more than render fonts.               |

Everywhere else, errors propagate. Do not catch just because you are nervous.

## 5. What never appears in a visitor-facing message

Stack traces · file paths · env var names or values · the endpoint URL · an upstream vendor's
error body · the word "undefined". Messages are written for the visitor, in the site's voice,
and say what they can do next.

## 6. Configuration

`process.env` is read directly today (`NEXT_PUBLIC_SITE_URL` today, `ENQUIRY_ENDPOINT` when the form exists). A missing
optional value degrades _honestly_ (the form says it is not connected). **Gap:** there is no
validated `config/env.ts` that fails the build on a malformed value. Add one (a schema, read
once, typed) before the number of variables passes a handful, and list each in `.env.example`.

## 7. Logging

There is no logger yet and no `console.*` in `src/`. Next logs unhandled server errors with the
`digest` shown on the error page, which is enough to tie a visitor's report to a log line. When
a logger is added, log an error **once**, at the boundary that handles it, and never log a form
submission's contents (they are personal data — SECURITY_HYGIENE §4).

---

**Related:** [ERROR_FIXING_PROTOCOL.md](./ERROR_FIXING_PROTOCOL.md) — how to _fix_ an error once
it happens. Read that one before touching failing code.
