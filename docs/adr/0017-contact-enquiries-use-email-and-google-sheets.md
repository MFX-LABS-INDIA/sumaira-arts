---
id: ADR-0017
title: Contact enquiries are emailed and stored in a dedicated Google Sheet tab
status: accepted
date: 2026-11-15
affects:
  - src/app
  - src/components/layout
  - src/components/sections
  - src/lib
  - src/services
  - src/data
tags: [forms, enquiry, email, google-sheets, privacy]
---

# ADR-0017: Contact enquiries are emailed and stored in a dedicated Google Sheet tab

- **Status:** Accepted. Supersedes ADR-0005 for the Contact Us form's delivery destinations.
- **Date:** 2026-11-15
- **Deciders:** project owner

## Context

The Contact Us form must deliver name, email, mobile number and optional address to the studio and
record the enquiry in a new Google Sheets tab. ADR-0005 established webhook delivery for forms, but
the requested destinations are the existing SMTP and Google Sheets integrations.

## Decision

- Keep the server-action and `FormState` boundary from ADR-0005.
- Validate all fields on the server, including the selected country and phone number.
- Send a plain-text email to `ENQUIRY_ADMIN_EMAIL` and append to a separate `enquiries` sheet tab.
- Do not use order-sheet header migration for the enquiries tab.
- Report success only when both destinations accept the enquiry. On partial or failed delivery,
  return a generic message that makes it clear the enquiry may have been received.
- Use a honeypot and process-local per-IP rate limit. Lazy-load the contact form so its country
  selector does not increase initial route JavaScript.
- Link a privacy notice that identifies the email and sheet destinations, access controls, current
  retention behavior and deletion-request contact.

## Consequences

**Good:** the studio receives email notifications and has a sheet record; no new dependency or
public webhook endpoint is introduced; order-sheet columns are isolated from enquiry columns.

**Bad / accepted costs:** email and sheet writes are not transactional, so partial delivery is
possible; the rate limit is not shared across instances; data retention remains manual and is
described transparently in the privacy notice.

**Now harder to change:** changing either destination requires updating the action, its service and
the privacy notice together.

## Alternatives considered

| Option | Why not |
| ------ | ------- |
| Webhook endpoint from ADR-0005 | Does not directly satisfy the requested email and dedicated sheet destinations |
| Client-side email or Sheets API | Would expose service credentials and bypass server-side validation |
| New database or queue | Unneeded infrastructure for the current enquiry volume; revisit if delivery guarantees become necessary |

## Revisit when

The studio needs retries, deduplication, distributed rate limiting, or a defined automatic retention
period.
