---
id: ADR-0001
title: Routes are thin, features own their content, components are shared UI
status: superseded
date: 2026-09-25
affects:
  - src/app
  - src/features
  - src/components
tags: [architecture, structure]
---

# ADR-0001: Routes are thin, features own their content, components are shared UI

- **Status:** Superseded by [ADR-0010](./0010-sections-data-and-common-components.md)
- **Date:** 2026-09-25
- **Deciders:** project owner

## Context

The site started as one static page and is expected to grow into many: collections, artwork detail,
journal, about, and above all an **enquiry** funnel. The first layout put every section in
`components/home/` and every list in `data/`. That works for one page and fails for six: a "home"
folder holds things that are not home-specific, copy sits far from the component that shows it, and
nothing says where a form belongs.

## Decision

A single Next.js application with three layers and one-way imports:

```
app (compose)  →  features (sections + copy + actions)  →  components (ui · layout · art)  →  lib · config · types
```

- `src/app` holds routes only. Pages that share a header and footer live in the `(site)` route group,
  and a page needing different chrome gets its own group.
- `src/features/<area>` is one folder per area of the business, holding its `content.ts`, its section
  components and (if it has a form) its `actions.ts`.
- `src/components` is feature-agnostic UI: primitives, page chrome, and the placeholder-art system.
- A feature never imports another feature; a component never imports a feature (one recorded
  exception: the footer embeds the newsletter form).

## Consequences

**Good:** a new page is a folder and a line in `config/routes.ts`; a new section is a folder in
`features/`; the answer to "where does this go?" is mechanical. Copy sits beside the component that
shows it. A CMS later replaces `content.ts` files without touching components.

**Bad / accepted costs:** a section that two features want has to be lifted into `components/`, which
is a small chore. The layering is enforced by review and `docs/ARCHITECTURE.md`, not by a lint rule
(Jethur enforces its tiers by lint; that is a worthwhile next step, not a day-one need).

**Now harder to change:** moving to a monorepo or micro-frontends would cut along the `features/` folders.

## Alternatives considered

| Option                                        | Why not                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| Keep `components/home/*` and `data/*` (page-first) | Fine for one page; the home folder becomes a junk drawer as pages are added         |
| Jethur's atomic tiers (atoms → templates)     | Right for an app of many small controls; a marketing site is mostly _sections_, which the tiers do not describe |
| A monorepo (site, design system packages)     | Coordination cost with no second consumer                                               |
| A headless CMS now                            | Premature: no editors yet, and it would drag runtime fetching into a static site        |

## Revisit when

A second application needs to share the components (extract packages), or non-developers need to edit
content (introduce a CMS behind `content.ts`).
