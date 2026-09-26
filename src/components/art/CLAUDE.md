# `src/components/art` — the placeholder artwork system

Auto-loaded when you work anywhere under `src/components/art`. **Read all of it — the rules here fail
silently.**

## What this folder is

There are no photographs yet, so the site ships **drawn** artwork and rooms in the brand palette. They
are drawn **once**, in a shared SVG sprite, and everything else is a reference to it
([ADR-0002](../../../docs/adr/0002-shared-svg-sprite-for-placeholder-art.md)).

```
variants/        the 15 drawings: _kit (palette + helpers), calligraphy, landscape, abstract, index (registry)
furniture.tsx    sofa, bed, desk, plant, lamp… drawn inside rooms
scenes.ts        room LAYOUTS (size, floor, furniture) and scene builders (which art hangs on which wall)
Sprite.tsx       draws every artwork and room ONCE, as <symbol>s   (mounted in app/layout.tsx)
ArtPiece.tsx     one artwork  = <svg><use href="#art-<name>"/></svg>
RoomScene.tsx    a room       = a few <use>s + its frames
ArtImage.tsx     THE seam: a real photo when `src` is set, otherwise the drawing (optionally in a room)
```

## The one rule

**Never inline a drawing.** A placement is a `<use>`. An inline copy of an artwork or room per placement
is what made the page 935 KB and 4,722 elements. If you need the art somewhere, use `ArtImage` (or
`ArtPiece` / `RoomScene` for a bespoke layout like the hero or the product hover).

Outside this folder, import only `ArtImage`, `ArtPiece`, `RoomScene`, and the `scenes.ts` API
(`buildScene`, `heroScene`, `SceneKind`) plus the `ArtVariant` type. **Never** import `variants/*`,
`furniture`, or `Sprite` — that ships the drawing code to wherever you import it, including the client bundle.

## Adding an artwork

1. Draw it in the file that fits (`calligraphy`, `landscape`, `abstract`) as an exported
   `(id: string) => ReactNode`, painting a **400×500** canvas. Use `c.*` colours (`var(--color-*)`),
   never a hex.
2. Give any `<filter>` / `<linearGradient>` an id built from the `id` argument (`` `${id}-blur` ``): the
   sprite passes `art-<name>`, which keeps every id unique. Never a bare id like `blur`.
3. Add the name to `ArtVariant` and register it in `variants/index.ts`.
4. Look at it at several crops: it is drawn with `preserveAspectRatio="xMidYMid slice"`, so a wide card
   shows only the middle band. Keep the subject central.

## Adding a room or moving a frame

Rooms are `SceneLayout`s in `scenes.ts` (furniture, drawn once) plus frames per instance (the art on the
wall). To change a layout, edit `layouts`; to hang different art, edit the builder. A frame can carry
`className` (e.g. `max-xl:hidden`) so one hero layout serves desktop and tablet.

## Replacing a placeholder with a real photograph

Put the photo in `public/images/` and set `image: "/images/…"` on the matching item in `src/data/`.
`ArtImage` then renders it with `next/image`. Give it real `sizes` and let the parent's aspect-ratio class
size the box. When the last placeholder is gone, delete this folder and the sprite mount.

## What breaks it

- **`display: none` on the sprite.** Browsers skip gradients and filters inside a `display:none` SVG, so
  the art renders blank. It is `position:absolute; width:0; height:0`, on purpose.
- **A duplicate id** (`art-*`, `scene-*`, `room-*`). The first definition wins and the others quietly
  point at it.
- **A new SVG filter.** `feTurbulence` and blurs are rasterised on the CPU. There are seven. Adding one
  needs a measurement (PERFORMANCE §rules 3).
- **Importing the drawing code into a client component** — for example, a client gallery that imports
  `ArtImage` and pulls in `variants/*`. Keep the gallery a server component (ADR-0007).
- **The layout files are 400×500 / 800×600 / 1600×900 / 800×784 in _scene units_**, not pixels. Frame
  coordinates are in the layout's own units; the SVG scales.

## Decisions that constrain this code

- [ADR-0002](../../../docs/adr/0002-shared-svg-sprite-for-placeholder-art.md) — the shared sprite
- [ADR-0007](../../../docs/adr/0007-css-only-collection-filter.md) — why the gallery is a server component

Rules: [PERFORMANCE](../../../docs/PERFORMANCE.md) · [DESIGN_SYSTEM](../../../docs/DESIGN_SYSTEM.md)
