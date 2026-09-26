# Security Hygiene

**This checklist runs at the completion of every unit of work — every PR, every task, every
AI-generated change. Not weekly, not before release. Every time.**

A public marketing site has a small attack surface and a large audience. The realistic harms are
not a database breach; they are **leaked visitor data** (enquiries, email addresses), **a
compromised third-party script** running on every page, **a leaked endpoint or key**, and **a
form that is abused** as a spam relay. The cost of running this list is minutes; the cost of
skipping it once is every visitor's trust.

Sections 1–7 are the reference. The **Completion Checklist** at the bottom is what you actually run.

---

## 1. Secrets and environment

- No secret in source, tests, fixtures, comments or commit messages. `.env.local` is never committed;
  `.env.example` (names only, no values) is.
- `NEXT_PUBLIC_*` is a **publication**, not a config prefix. Anything with that prefix is public
  forever. Today the only one is `NEXT_PUBLIC_SITE_URL` (a public origin, so fine). Confirm each
  new one deliberately.
- Server-only values (`NEWSLETTER_ENDPOINT`, `ENQUIRY_ENDPOINT`) are read only in server actions or
  server components — never passed to a client component, an error message or a log line.
- A webhook URL is a credential: anyone who has it can post to it. Treat it like a key; rotate it
  if it leaks.
- Every new env var is added to `.env.example` and to the table in ARCHITECTURE.md.

## 2. Transport and headers

- The security headers in `next.config.ts` stay intact: `nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`. They may be strengthened,
  never weakened.
- `poweredByHeader` stays `false`.
- **Known gap — no Content-Security-Policy.** It needs a nonce strategy for Next's inline scripts, so
  it is its own piece of work (and an ADR), not a one-line header. Until then, the rule that
  substitutes for it is section 5: no third-party scripts.
- Cookies: the site sets none today. If one is added, `httpOnly`, `secure`, `sameSite=lax`
  minimum, and it goes in the privacy section of the docs.

## 3. Input and output

- Every form input is **validated on the server**, at the boundary, before use. The client
  `required` and `type="email"` are conveniences.
- Cap lengths. An enquiry message with no maximum is a spam relay and a memory problem.
- Output is encoded by default. `dangerouslySetInnerHTML` is banned without a sanitiser and a comment.
  (The one inline `<style>` in `CollectionGallery` is generated from static data in `data/collections.ts`, never
  from input, which is why it is safe. Keep it that way.)
- No dynamic `import()` of a user-controlled path. No string-built shell or URL from user input.
- Redirects go to an allowlist. An open redirect is a phishing primitive.
- **Known gap — no spam protection.** A public form with no honeypot, rate limit or challenge will
  be found by bots. Add at least a honeypot field and a per-IP rate limit before the enquiry form
  goes live; a challenge (Turnstile/hCaptcha) if it is not enough. That is a third-party script, so
  it needs an ADR (section 5).

## 4. Visitor data and privacy

An enquiry is **personal data** (name, email, sometimes phone and a description of their home).
The site is subject to personal-data law wherever its visitors are (DPDP, GDPR and others), and
the obligations start the day a form goes live.

- **Collect the minimum.** If a field is not needed to answer the enquiry, do not ask for it.
- Submissions go only to the configured endpoint. They are **not** logged, not echoed back in an
  error, and not put in a URL or query string.
- Know where the data lands (the webhook's destination), who can read it, how long it is kept,
  and how to delete it on request. Write that down before launch.
- Newsletter signup is **consent**: explicit action, clear purpose, and an unsubscribe in every
  email. Do not pre-tick, and do not reuse the list for anything else.
- No analytics, tracker or advertising pixel without a decision recorded in an ADR and, where the
  law requires it, a consent banner that actually blocks the script until accepted.
- A privacy policy page exists and is linked from the footer before the first form goes live.
  (The footer links are `#` placeholders today.)

## 5. Third-party scripts, embeds and fonts

Every third-party thing on a public page is a security risk _and_ a performance cost, and it runs
with the page's full privilege. So:

- **No third-party script, tracker, chat widget, embed or webfont family without an ADR** stating
  what it is for, what data it receives, and what it costs in bytes and milliseconds.
- Fonts are self-hosted through `next/font`. Do not add a `<link>` to a font CDN.
- Prefer a first-party implementation of anything under ~30 lines.
- Subresource integrity for anything loaded from another origin.

## 6. Dependencies and supply chain

- `npm audit --omit=dev` is clean of high and critical, or each exception is documented with an expiry.
- A new dependency needs: what it replaces, its maintenance signal, its transitive count, its
  licence, and its bundle cost (`npm run size` before and after). Runtime dependencies today:
  `next`, `react`, `react-dom`, `lenis`.
- The lockfile is committed; CI installs with `npm ci`.
- No install scripts from packages you have not vetted.

## 7. Incident reflex

If a change is suspected to have leaked visitor data or exposed an endpoint: stop · do not "fix
quietly" · determine the blast radius (what data, whose, for how long) · preserve logs · rotate
the endpoint or key · notify the owner · then fix, with a regression check that fails without the
fix. Breach-notification timelines start at _detection_.

---

## Completion Checklist

Copy into every PR description. Every line is `yes` or `n/a — <reason>`. Never blank.

```
### Security hygiene (docs/SECURITY_HYGIENE.md)
- [ ] No secret added; new env vars are in .env.example; NEXT_PUBLIC_* reviewed
- [ ] Server-only values never reach a client component, message or log
- [ ] All form input validated on the server, with length limits
- [ ] No visitor data logged, echoed, or put in a URL; where it lands is known and documented
- [ ] The form reports failure honestly (no success it did not achieve)
- [ ] Security headers in next.config.ts unchanged or strengthened
- [ ] No third-party script, tracker, embed or font added (or an ADR covers it)
- [ ] New dependencies justified, bundle cost measured; npm audit clean of high+critical
- [ ] Errors show generic messages only; no internals leaked (docs/ERROR_HANDLING.md §5)
- [ ] No new eslint-disable, @ts-expect-error or any without a justification
```

**Any unchecked box blocks merge.** If a box does not apply, write why — "n/a" alone is not an
answer. The one you are tempted to wave through is the one that matters.
