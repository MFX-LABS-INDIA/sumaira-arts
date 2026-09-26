---
id: ADR-0005
title: Forms are server actions that post to a webhook, and never fake success
status: accepted
date: 2026-09-25
affects:
  - src/lib
  - src/components/common
tags: [forms, enquiry, server-actions, privacy]
---

# ADR-0005: Forms are server actions that post to a webhook, and never fake success

- **Status:** Accepted
- **Date:** 2026-09-25
- **Deciders:** project owner

> **Update 2026-09-26:** the newsletter form this ADR first served was removed. No form exists today; the pattern
> and its plumbing remain for the planned enquiry form.

## Context

The site has no backend and no database, yet its purpose is to turn visitors into enquiries and
subscribers. Submissions must reach the owner — in an email tool, a CRM, or a spreadsheet — without the
site owning that infrastructure. A placeholder form that shows "Thank you" while sending nothing is the
easiest thing to build and the worst: an enquiry is lost and everyone believes it was received.

## Decision

- A form is a **server action** returning a `FormState` (`lib/forms.ts`), driven by `useActionState`.
- The action validates on the server, then calls `postToWebhook(process.env.<X>_ENDPOINT, payload)`
  (`lib/webhook.ts`), which returns a closed union: `sent | not-configured | failed`.
- The action maps every result to a message, including a `default`. **`not-configured` says so**
  ("isn't connected yet") rather than pretending to succeed.
- The endpoint is a server-only env var. Any service that accepts a JSON POST works: Zapier, Make,
  Formspree, a CRM's form endpoint, a serverless function.

## Consequences

**Good:** no backend to run; the form is honest in every state, including an unwired one during
development; one small pattern (`lib/forms.ts` + `lib/webhook.ts`) serves every form; the endpoint never
reaches the client.

**Bad / accepted costs:** the site depends on an external service for delivery; there is no retry or
queue (a `failed` result asks the visitor to try again); spam protection is not included and must be
added before an enquiry form goes live (a documented gap in `SECURITY_HYGIENE.md`).

**Now harder to change:** moving to a first-party API route or a database would change the action's
internals, not its callers.

## Alternatives considered

| Option                                          | Why not                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------- |
| An API route plus a client `fetch`              | More code, a public endpoint to defend, and a client component with effects       |
| An ESP/CRM SDK directly in the action           | A dependency and credentials in the codebase, and lock-in to one vendor           |
| An embedded third-party form                    | A third-party script on every page: a performance and privacy cost (ADR required) |
| `mailto:`                                       | Not a form; depends on the visitor's mail client; no confirmation                 |
| A stub that always says "Thank you"             | Loses enquiries silently. Rejected outright                                       |

## Revisit when

Enquiry volume or a compliance need calls for a queue, a first-party store, or retries — at which point
the database docs Jethur carries (isolation, schema) become relevant.
