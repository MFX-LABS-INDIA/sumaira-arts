"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Loaded lazily by SmoothScroll. Anchor jumps already clear the sticky header because Lenis honours
 * each section's `scroll-margin-top` (scroll-mt-19), so no manual offset here.
 */
export default function LenisRoot() {
  return <ReactLenis root options={{ lerp: 0.1, anchors: true }} />;
}
