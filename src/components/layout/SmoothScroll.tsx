"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

// Lenis is loaded on demand, in its own chunk, and only where it helps.
const LenisRoot = dynamic(() => import("./LenisRoot"), { ssr: false });

const desktopMotion = "(hover: hover) and (pointer: fine)";
const reducedMotion = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(desktopMotion), window.matchMedia(reducedMotion)];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

/**
 * Smooth scrolling for mouse and trackpad users only. Touch devices already scroll natively
 * (which is smoother than any JavaScript), and visitors who prefer reduced motion opt out.
 * Those visitors never download the library. Renders nothing itself; it does not wrap the page.
 */
export function SmoothScroll() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(desktopMotion).matches && !window.matchMedia(reducedMotion).matches,
    () => false,
  );
  return enabled ? <LenisRoot /> : null;
}
