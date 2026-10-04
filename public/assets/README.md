# Assets

Static files served as-is from the site root: `public/assets/brand/logo.svg` is `/assets/brand/logo.svg`.
Next.js only serves static files from `public/`, which is why this folder lives here and not in `src/`.

```
assets/
├── brand/          logo (SVG preferred), logo variants, favicon sources
└── images/
    ├── hero/        home page hero
    ├── artworks/    one photo per artwork (data/products.ts)
    ├── collections/ collection banners and covers (data/collections.ts)
    ├── artist/      the artist's portrait and studio shots (data/artist.ts)
    ├── journal/     journal post covers (data/journal.ts)
    ├── commission/  commission process and examples (data/commission.ts)
    ├── social/      Open Graph / share image (1200×630)
    └── prototype/   TEMPORARY stand-ins the site uses until final photos exist (crops/ = artwork and room cut-outs made from them)
```

## Naming

Lowercase, hyphenated, descriptive: `golden-calligraphy-gold-frame.jpg`, not `IMG_4021.JPG`.

## Using a file

Set `image: "/assets/images/artworks/<file>"` on the matching item in `src/data/`. `ArtImage` renders it with
`next/image`. See [docs/PERFORMANCE.md](../../docs/PERFORMANCE.md#images) for what a photo must carry.

## Before you upload

- Export photos as JPG or WebP, longest edge about 2400 px. Next.js serves smaller sizes itself.
- Keep each file under about 500 KB where you can.
- Use SVG for the logo so it stays sharp at every size.

## Not here

The site icon is `src/app/favicon.ico` (App Router convention). Replace that file with yours; it does not go in `assets/`.
