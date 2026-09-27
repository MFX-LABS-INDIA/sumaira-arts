---
id: ADR-0012
title: Home page redesign — fixed section order, no collection filter, 1280px container
status: accepted
date: 2026-09-27
affects:
  - src/components/sections
  - src/components/common
  - src/data
tags: [design, home, performance]
---

# ADR-0012: Home page redesign

- **Status:** Accepted. Supersedes [ADR-0007](./0007-css-only-collection-filter.md).
- **Date:** 2026-09-27
- **Deciders:** project owner

## Context

The owner asked for a new home layout (hero panel, brand intro, product lines, most-loved artworks, a featured
collection, commission and Mirage, the artist, collections, reviews) using Sumaira's own content and navy palette.
The navbar and footer stay.

## Decision

- Order: Hero, BrandStatement, CategoryCards, FeaturedProducts, CollectionFeature, Commission, Mirage,
  FounderBlock, CollectionGrid, ReviewsWall, then the existing InteriorShowcase, Journal and SocialGallery.
- `Container` is 1280 px wide site-wide.
- The collection filter, `CollectionTag` and per-collection `ratio` are removed. `CollectionGrid` shows six
  collections and a native `<details>` reveals the rest. Carousels are CSS scroll-snap. Still no client JavaScript added.
- `common/ImageWithText` (with `isReversed`) serves both Commission and Mirage.
- Product and review fields (`rating`, `reviewCount`, `soldOut`, `titleAr`, review photo/date/reply) are optional and
  render only when data exists.

## Consequences

**Good:** simpler code and data; same JS budget; the layout matches the brief.

**Bad / accepted costs:** collections can no longer be filtered by tag. Restoring it means a new ADR.
