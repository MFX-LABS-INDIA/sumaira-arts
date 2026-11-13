# Assets

Static files served as-is from the site root: `public/assets/brand/logo.svg` is `/assets/brand/logo.svg`.
Next.js only serves static files from `public/`, which is why this folder lives here and not in `src/`.

```
assets/
├── brand/          logo (SVG preferred), logo variants, favicon sources
└── images/
    ├── artist/      the artist's portrait and studio shots (data/artist.ts)
    ├── mixed-media-samples/       product galleries, one folder per artwork
    ├── mixed-media-collections/   product galleries, one folder per artwork
    ├── original-texture-artworks/ original artwork galleries
    └── prototype/   TEMPORARY stand-ins the site uses until final photos exist (crops/ = artwork and room cut-outs made from them)
```

## Naming

Lowercase, hyphenated, descriptive: `golden-calligraphy-gold-frame.jpg`, not `IMG_4021.JPG`.

## Using a file

Set `image: "/assets/images/<group>/<artwork>/1.webp"` on the matching item in `src/data/`. `ArtImage` renders it with
`next/image`. See [docs/PERFORMANCE.md](../../docs/PERFORMANCE.md#images) for what a photo must carry.

## Before you upload

- Export photos as WebP. Keep every image in `images/` below 20,000 bytes.
- Reduce quality and dimensions as needed to meet the size limit; retain originals outside `public/`.
- Use SVG for the logo so it stays sharp at every size.

## Not here

The site icon is `src/app/favicon.ico` (App Router convention). Replace that file with yours; it does not go in `assets/`.
