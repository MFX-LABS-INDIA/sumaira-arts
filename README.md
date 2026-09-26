# Sumaira Arts

Marketing and enquiry website for Sumaira Arts, built with Next.js (App Router), React, TypeScript
and Tailwind CSS v4. Statically prerendered; no database.

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # lint, typecheck, build, size budgets, contrast, docs check
npm run perf         # Lighthouse (mobile), median of 3. Needs Chrome; run after a build
```

## Where things are

| You want to…                          | Look at                                             |
| ------------------------------------- | --------------------------------------------------- |
| Understand the structure              | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)        |
| Change copy, lists or prices          | `src/data/<topic>.ts`                              |
| Change colours, type or motion        | `src/app/globals.css` (design tokens)               |
| Add a page or a form                  | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#add-a-page) |
| Swap placeholder art for photographs  | [`src/components/art/CLAUDE.md`](src/components/art/CLAUDE.md) |
| See the performance budgets           | [docs/PERFORMANCE.md](docs/PERFORMANCE.md)          |
| Read every rule, and why              | [docs/00-INDEX.md](docs/00-INDEX.md)                |
| See why a decision was made           | [docs/adr/](docs/adr/index.md)                      |

The rules for contributors and AI agents start at [CLAUDE.md](CLAUDE.md). Each of `src/app`,
`src/components`, `src/components/sections`, `src/components/art` and `src/data` has its own short `CLAUDE.md` that loads when
you work there.

## Environment

Copy `.env.example` to `.env.local`.

| Variable               | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public origin — metadata, sitemap, robots                  |
| `NEWSLETTER_ENDPOINT`  | Receives `{ email }` as a JSON POST. Until set, the form says signup "isn't connected yet" rather than pretending it worked |
| `ENQUIRY_ENDPOINT`     | Same pattern, for the future enquiry form                  |

## Before launch

Things that are deliberately placeholders and must be replaced. All are labelled in the code:

- **Artwork images** — drawn placeholders; swap in photographs (see the art `CLAUDE.md`).
- **Prices, the 4.9 / 5 rating, the review count and the testimonials** — placeholders in `src/data/`.
- **Links** — social, product, collection and footer support pages point to `#`.
- **`NEWSLETTER_ENDPOINT`** and a privacy policy page, before any form goes live.
- **Spam protection** for the enquiry form — a known gap in [SECURITY_HYGIENE](docs/SECURITY_HYGIENE.md).
