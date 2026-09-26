# `src/app` — routes only

Auto-loaded when you work anywhere under `src/app`.

## What this folder is

The route tree, and nothing else. A `page.tsx` **composes sections** from `src/components/sections` in the
order the page shows them. It holds no copy, no lists, no logic. If a page file is growing, the
growth belongs in a section.

```
app/layout.tsx        <html>, fonts, metadata, the shared artwork sprite
app/(site)/           route group: header + footer via <SiteChrome>  (no URL segment)
app/(site)/error.tsx  route error boundary — inside the chrome, shows only a digest
app/not-found.tsx     branded 404
app/sitemap.ts, robots.ts   generated from constants/routes.ts
```

## Adding a page

Checklist in [ARCHITECTURE.md](../../docs/ARCHITECTURE.md#add-a-page). In short: a folder under
`(site)`, `metadata`, sections from `components/sections/`, one line in `constants/routes.ts`, one in
`data/navigation.ts`.

## What people get wrong

- **Same-page links are `#id`, cross-page links are `/#id`.** Once a second page exists, the menu
  entries must become `/#collections` etc. or they break off the home page.
- **Do not fetch or compute here.** Data comes from `src/data/`; a form is a server action in `lib/actions/`.
- **Do not add `'use client'` to a page.** Put the interactive leaf in a section or `common/` and import it.
- The root layout owns the fonts and the `<ArtSprite />`. A page that renders artwork without going
  through the root layout would have empty references.

## Non-negotiable here

- Pages are server components. Prerendered by default; anything that makes a route dynamic
  (`cookies()`, `headers()`, an uncached `fetch`) is a performance decision — say so in the PR.
- Every page exports `metadata` (title, description). The root layout supplies the template and `metadataBase`.
- `error.tsx` never shows `error.message` — only the opaque `digest` (ERROR_HANDLING §5).

## Decisions that constrain this code

- [ADR-0010](../../docs/adr/0010-sections-data-and-common-components.md) — routes compose sections; data lives in `src/data`

Rules: [ARCHITECTURE](../../docs/ARCHITECTURE.md) · [PERFORMANCE](../../docs/PERFORMANCE.md) · [ERROR_HANDLING](../../docs/ERROR_HANDLING.md)
