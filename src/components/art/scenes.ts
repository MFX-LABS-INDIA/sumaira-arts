import type { Item } from "./furniture";
import type { ArtVariant } from "./variants";

/**
 * Rooms are drawn once into the shared sprite (see Sprite.tsx) and referenced with <use>.
 * A SceneLayout is the part of a room that never changes: size, floor line and furniture.
 * A Scene is one instance of it: which layout, plus the artwork hung on the wall.
 */
export type SceneKind = "living" | "bedroom" | "office" | "hall";
export type SceneKey = SceneKind | "heroDesktop" | "heroMobile";

export type SceneLayout = { w: number; h: number; floorY: number; items: Item[] };

export type Frame = {
  art: ArtVariant;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Dark frame instead of white. */
  dark?: boolean;
  /** Tailwind classes on the frame group, e.g. "max-xl:hidden" to drop it on smaller screens. */
  className?: string;
};

export type Scene = { key: SceneKey; frames: Frame[] };

/** Artwork sits near the centre of the 800x600 rooms so tall crops still work. */
export const layouts: Record<SceneKey, SceneLayout> = {
  living: {
    w: 800,
    h: 600,
    floorY: 470,
    items: [
      { type: "rug", x: 400, size: 600 },
      { type: "plant", x: 112, size: 250 },
      { type: "sofa", x: 400, size: 500 },
      { type: "lamp", x: 690, size: 320 },
    ],
  },
  bedroom: {
    w: 800,
    h: 600,
    floorY: 470,
    items: [
      { type: "rug", x: 400, size: 640 },
      { type: "nightstand", x: 116 },
      { type: "nightstand", x: 684 },
      { type: "bed", x: 400, size: 470 },
    ],
  },
  office: {
    w: 800,
    h: 600,
    floorY: 470,
    items: [
      { type: "plant", x: 118, size: 250 },
      { type: "desk", x: 400, size: 400 },
      { type: "chair", x: 430 },
      { type: "lamp", x: 690, size: 300 },
    ],
  },
  hall: {
    w: 800,
    h: 600,
    floorY: 470,
    items: [
      { type: "sideboard", x: 400, size: 440 },
      { type: "plant", x: 108, size: 240 },
      { type: "lamp", x: 700, size: 310 },
    ],
  },
  // One wide layout serves desktop and tablet; frames toggle with breakpoint classes.
  heroDesktop: {
    w: 1600,
    h: 900,
    floorY: 740,
    items: [
      { type: "rug", x: 1220, size: 820 },
      { type: "sideboard", x: 1220, size: 600 },
      { type: "plant", x: 1500, size: 270 },
    ],
  },
  // A near-square box: the phone hero stacks this above the text. Keep the subject clear of the very top edge.
  heroMobile: {
    w: 800,
    h: 784,
    floorY: 690,
    items: [
      { type: "rug", x: 400, size: 640 },
      { type: "sideboard", x: 400, size: 480 },
      { type: "plant", x: 110, size: 210 },
      { type: "lamp", x: 700, size: 320 },
    ],
  },
};

const companions: Record<ArtVariant, [ArtVariant, ArtVariant]> = {
  names: ["letters", "star"],
  enso: ["dunes", "arches"],
  shadow: ["enso", "orbs"],
  horizon: ["dunes", "orbs"],
  bloom: ["ink", "orbs"],
  ink: ["enso", "shadow"],
  letters: ["names", "star"],
  arches: ["star", "dunes"],
  seasons: ["dunes", "horizon"],
  dunes: ["horizon", "seasons"],
  ash: ["letters", "enso"],
  orbs: ["ink", "bloom"],
  mosaic: ["star", "seasons"],
  rings: ["orbs", "ink"],
  star: ["names", "arches"],
};

/** Hangs `art` in one of the four everyday rooms. */
export function buildScene(kind: SceneKind, art: ArtVariant): Scene {
  const [a, b] = companions[art];
  switch (kind) {
    case "bedroom":
      return { key: "bedroom", frames: [{ art, x: 250, y: 44, w: 300, h: 196 }] };
    case "office":
      return { key: "office", frames: [{ art, x: 290, y: 48, w: 220, h: 280, dark: true }] };
    case "hall":
      return {
        key: "hall",
        frames: [
          { art: a, x: 151, y: 80, w: 150, h: 200 },
          { art, x: 325, y: 60, w: 150, h: 200, dark: true },
          { art: b, x: 499, y: 80, w: 150, h: 200 },
        ],
      };
    default:
      return { key: "living", frames: [{ art, x: 284, y: 34, w: 232, h: 290, dark: true }] };
  }
}

/**
 * The landing scene. Wide screens get a gallery wall; tablets and small laptops get one
 * hero piece so nothing sits behind the headline; phones stack the art above the text.
 */
export function heroScene(layout: "desktop" | "mobile"): Scene {
  if (layout === "mobile") {
    return {
      key: "heroMobile",
      frames: [
        { art: "dunes", x: 96, y: 268, w: 88, h: 116 },
        { art: "letters", x: 260, y: 172, w: 280, h: 350, dark: true },
        { art: "arches", x: 616, y: 268, w: 88, h: 116 },
      ],
    };
  }
  return {
    key: "heroDesktop",
    frames: [
      { art: "dunes", x: 850, y: 160, w: 130, h: 165, className: "max-xl:hidden" },
      { art: "star", x: 850, y: 350, w: 130, h: 165, className: "max-xl:hidden" },
      { art: "letters", x: 1036, y: 140, w: 368, h: 460, dark: true },
      { art: "horizon", x: 1448, y: 220, w: 100, h: 132, className: "xl:hidden" },
    ],
  };
}
