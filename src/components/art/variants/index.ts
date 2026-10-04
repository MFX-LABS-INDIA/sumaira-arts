import type { ReactNode } from "react";
import { enso, shadow, bloom, ink, orbs, mosaic, rings } from "./abstract";
import { star } from "./calligraphy";
import { allah, noor, salaam } from "./script";
import { horizon, seasons, dunes, ash } from "./landscape";

export { palette } from "./_kit";

/**
 * Placeholder artworks, drawn in code from the brand palette. Each paints a 400x500 canvas and is
 * drawn once into the shared sprite (../Sprite.tsx). Replace any of them with a real photograph
 * by setting `image` on the matching item in that feature's content.ts.
 *
 * Adding one: draw it in the file that fits (calligraphy, landscape, abstract), add its name to
 * `ArtVariant`, and register it below. The sprite picks it up from `variants`.
 */
export type ArtVariant =
  | "enso"
  | "shadow"
  | "horizon"
  | "bloom"
  | "ink"
  | "seasons"
  | "dunes"
  | "ash"
  | "orbs"
  | "mosaic"
  | "rings"
  | "star"
  | "allah"
  | "noor"
  | "salaam";

export const variants: Record<ArtVariant, (id: string) => ReactNode> = {
  enso,
  shadow,
  horizon,
  bloom,
  ink,
  seasons,
  dunes,
  ash,
  orbs,
  mosaic,
  rings,
  star,
  allah,
  noor,
  salaam,
};
