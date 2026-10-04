# Architecture

## Shape

One Next.js application (App Router), statically prerendered, deployed as one unit behind a CDN.
There is no database and no authenticated area. Deliberately not a monorepo or a CMS yet — see
[ADR-0010](./adr/0010-sections-data-and-common-components.md). The rule of thumb:

> **Routes compose sections; sections read data; shared UI knows nothing about either.**

```
src/
├── app/                        Routing only. No content or logic here.
│   ├── layout.tsx              <html>, fonts, metadata, the shared artwork sprite
│   ├── globals.css             Design tokens (colours, type, shadows, animations)
│   ├── (site)/                 Route group: pages that share the header + footer
│   │   ├── layout.tsx          Wraps pages in <SiteChrome>
│   │   ├── page.tsx            Home. Only decides the order of sections
│   │   └── error.tsx           Route-level error boundary
│   ├── not-found.tsx           Branded 404
│   └── sitemap.ts, robots.ts   Generated from constants/
│
├── components/
│   ├── sections/               The large blocks a page is made of: Hero, Journal, Commission, …
│   ├── common/                 Composed pieces reused by sections or the layout:
│   │                           ProductCard, WishlistButton
│   ├── layout/                 Header, Footer, Logo, SiteChrome, RevealController, SmoothScroll
│   ├── ui/                     Primitives: Container, Section, SectionHeading, Link, Icons, Reveal
│   └── art/                    Placeholder artwork: sprite, rooms, ArtImage
│
├── data/                       Static content, one file per topic:
│                               home, products, collections, inspiration, commission, artist,
│                               reviews, journal, social, navigation
├── constants/                  site.ts (name, url, currency, hero photo), routes.ts
├── types/                      Shared TypeScript types (content.ts)
└── lib/                        Helpers: format, forms, webhook — and actions/ (server actions)
docs/                           The rules; read before writing code
scripts/                        Machine checks: size, contrast, docs, Lighthouse
```

## Layering

```
app (compose)  →  components (sections → common → layout · ui · art)  →  data · lib · constants · types
```

Imports flow **one way**, left to right. Within `components/`: a section may use common, layout, ui
and art; `common` may use ui and art; `ui` and `art` use nothing above them. No file imports "up".
Nothing in `components/`, `data/`, `lib/` or `constants/` imports from `app/`.

| Concern                                             | Lives in                                           |
| --------------------------------------------------- | -------------------------------------------------- |
| Which sections a page shows, and in what order      | `src/app/(site)/**/page.tsx`                       |
| A large block of a page (markup, behaviour)         | `src/components/sections/<Name>.tsx`               |
| A card or form reused across sections or the footer | `src/components/common/`                           |
| Headlines, descriptions, lists, prices, alt text    | `src/data/<topic>.ts`                              |
| The shape of that data                              | `src/types/content.ts`                             |
| Form validation and submission                      | `src/lib/actions/<name>.ts` (server action)        |
| Header, footer, page frame, scroll behaviour        | `src/components/layout`                            |
| Buttons, links, headings, layout primitives, icons  | `src/components/ui`                                |
| Anything drawn as placeholder artwork               | `src/components/art`                               |
| Site name, canonical URL, currency, route list      | `src/constants`                                    |
| Colours, type scale, shadows, animation             | `src/app/globals.css` (tokens)                     |
| Helpers with no UI (formatting, form state, webhook) | `src/lib`                                          |

`sections` vs `common`: a **section** is a block a page places; **common** is a piece that sections (or
the layout) place inside themselves. If you find yourself importing one section from another, the shared
part belongs in `common`.

## Content

Copy and data live in `src/data/`, not inside components. A component receives what it shows; it does not
contain it. Two reasons, both about the future: a CMS later replaces only these files, and a second
language needs the copy separable from the markup.

Data files are typed by `src/types/content.ts`. Every card, tile and banner takes a `Visual`:
`{ art, scene?, image? }`. Without `image` the drawn placeholder shows; with `image` (a path under
`/public`) the real photograph does. Nothing else changes.

## Rendering

Static by default; the home page is prerendered at build time and served from the CDN. Server components
are the default. A `'use client'` file needs a reason a server component cannot serve — state, an effect,
or a browser API. Today the complete list is:

| Client component                         | Why it must be                                              |
| ---------------------------------------- | ----------------------------------------------------------- |
| `layout/Header`                          | reads scroll position and route, owns the mobile menu state |
| `layout/RevealController`                | one `IntersectionObserver` for every scroll reveal          |
| `layout/SmoothScroll`, `LenisRoot`       | `matchMedia` gate, then the lazily loaded smooth-scroll lib |
| `common/WishlistButton`                  | a toggle (local state)                                      |
| `(site)/error.tsx`                       | Next requires an error boundary to be a client component    |

Everything else — including the collection grid, the product cards and every reveal wrapper — is
server-rendered with no hydration cost. Adding to this table is an architectural decision: say why in the PR.

## State

| Kind             | Where                                                                            |
| ---------------- | -------------------------------------------------------------------------------- |
| Content          | `src/data`, at build time                                                        |
| Form result      | `useActionState` + a server action returning `FormState`                        |
| URL state        | anchors (`#collections`) and, later, route segments                              |
| Local UI         | `useState` in the lowest component that needs it (menu open, wishlist heart)     |
| Filters / toggles / reveals | CSS where it can be (`<details>`, `:has`, radios) — see [ADR-0007](./adr/0007-css-only-collection-filter.md) and [ADR-0012](./adr/0012-home-page-redesign.md) |

No global client store. A concrete need an ADR can describe is the bar.

## Path aliases

`@/*` → `src/*`, and that is the only alias. Use it for anything outside the current folder; use `./`
only for a sibling in the same folder. A deep relative import (`../../../lib/x`) means the file is in the
wrong place.

## Add a page

1. Create `src/app/(site)/<name>/page.tsx`. Export `metadata`, and compose sections from
   `components/sections/` — the page holds no copy of its own.
2. Add it to `constants/routes.ts` (this feeds the sitemap) and to `data/navigation.ts`.
3. Same-page links use `#id`. From another page they must be `/#id`, so once real pages exist, change
   the menu entries to `/#collections` and so on. (`SmartLink` already routes `/#…` through the router
   and leaves `#…` to the browser.)
4. `npm run verify`, and `npm run perf` if the page adds client JS, fonts or large media.

## Add a section

1. Write its data first: `src/data/<topic>.ts` (and its types in `src/types/content.ts`).
2. Write `src/components/sections/<Name>.tsx` that renders it. Reuse `ui`, `common` and `art`; do not restyle them.
3. Compose it in a page. If it needs a piece another section also needs, put that piece in `common/`.
4. If it has a form, follow [Add an enquiry form](#add-an-enquiry-form) — there is no form on the site yet.

## Add an enquiry form (the main conversion path)

There is no form on the site today (the newsletter was removed). `lib/forms.ts` (`FormState`) and
`lib/webhook.ts` (`postToWebhook`) are the shared plumbing kept for the enquiry form. To build it:

1. `src/lib/actions/enquiry.ts` — a server action that validates on the **server**, then
   `postToWebhook(process.env.ENQUIRY_ENDPOINT, data)` and returns a `FormState`. Handle all three
   `WebhookResult`s (`sent`, `not-configured`, `failed`) so the UI never claims a success it does not have.
   See [ERROR_HANDLING.md](./ERROR_HANDLING.md).
2. `src/components/common/EnquiryForm.tsx` — `useActionState(action, idleForm)`.
3. `src/app/(site)/contact/page.tsx`, then point the "Start a commission" buttons at `/contact`.
4. Walk [SECURITY_HYGIENE.md](./SECURITY_HYGIENE.md) end to end: this form collects personal data, and
   there is no spam protection yet (see its known gaps).

## Page with different chrome

Add another route group, e.g. `app/(landing)/layout.tsx` with no header or footer. The root layout is
untouched. Do not branch on the pathname inside `SiteChrome` to hide things.

## Real photographs

Everything visual goes through `components/art/ArtImage`. To replace a placeholder, put the photo in
`public/assets/images/<group>/` (see `public/assets/README.md`) and set `image: "/assets/images/<group>/..."` on the
matching item in `src/data/`. The hero uses `heroImage` in `constants/site.ts`. See
[PERFORMANCE.md](./PERFORMANCE.md#images) for what a photo must carry (`sizes`, dimensions, `priority` only
for the LCP image).

## Environment

Copy `.env.example` to `.env.local`.

| Variable               | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Public origin — metadata, sitemap, robots. `NEXT_PUBLIC_*` is published to every visitor |
| `ENQUIRY_ENDPOINT`     | Same pattern, for the future enquiry form. Server-only          |

Env vars are read directly from `process.env` today. A validated env module (schema, fail at boot) is the
next step once there are more than a handful — see the gaps in [ERROR_HANDLING.md](./ERROR_HANDLING.md).

## Scaling path (deliberately deferred)

Written down so nobody "prepares" for it prematurely:

1. **A CMS** → replace the `src/data` files with fetches in the same shape. Components do not change.
   Keep pages static (revalidate on publish) to stay inside the performance budget.
2. **Arabic / more languages** → path-based `app/[locale]/`. See INTERNATIONALIZATION.
3. **Shop (cart, checkout)** → a separate route group and its own ADR; it brings state, auth and payments,
   and the docs that go with them (Jethur's isolation and error docs).
4. **Real-user monitoring** → report Core Web Vitals from production to see what Lighthouse cannot.
5. **`hooks/`** → create it the day a hook is needed in more than one place. Today two small ones
   (`Header`'s scroll store, `SmoothScroll`'s media-query store) are each used once and live beside their component.

Each is possible because of a boundary that exists today. None is built today.
