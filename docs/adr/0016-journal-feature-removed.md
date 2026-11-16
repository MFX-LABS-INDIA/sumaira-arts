---
id: ADR-0016
title: Journal feature and routes removed
status: accepted
date: 2026-11-15
affects:
  - src/app
  - src/components/sections
  - src/data
  - src/constants
  - src/types
tags: [content, routes]
---

# ADR-0016: Journal feature and routes removed

- **Status:** Accepted. Supersedes the Journal entry in [ADR-0012](./0012-home-page-redesign.md).
- **Date:** 2026-11-15
- **Deciders:** project owner

## Context

The owner requested removing the Journal and all of its content from the public website. Journal routes,
homepage content, navigation and article data should no longer be published or linked.

## Decision

- Remove the Journal section, index and article routes, article data and `JournalPost` type.
- Remove Journal links from the header and footer and exclude article URLs from the sitemap.
- Keep the commission steps on the homepage and link commission/category help to the existing contact anchor.
- Retire links and references to Journal from current contributor guidance. Historical ADRs remain unchanged.

## Consequences

**Good:** The site has no Journal content, routes or internal links to retired articles.
**Bad / accepted costs:** Previously shared Journal URLs now resolve to the standard not-found page.
**Now harder to change:** Reintroducing articles requires a new route, content model and design decision.

## Alternatives considered

| Option | Why not |
| ------ | ------- |
| Keep article routes but hide Journal from navigation | The request was to remove the complete feature, not just its menu entry. |
| Redirect every retired article to the homepage | The homepage is not an equivalent destination for every article; the standard not-found route is more honest. |

## Revisit when

The owner requests a new editorial or educational content feature.
