"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Loaded lazily by SmoothScroll. Anchor jumps already clear the sticky header because Lenis honours
 * each section's `scroll-margin-top` (scroll-mt-19), so no manual offset here.
 */
export default function LenisRoot() {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    // When navigating to a new route, ensure scroll resets to top
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const handleScrollToTop = () => {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: false });
    };

    window.addEventListener("scroll-to-top", handleScrollToTop);
    return () => {
      window.removeEventListener("scroll-to-top", handleScrollToTop);
    };
  }, []);

  return (
    <ReactLenis
      ref={(instance) => {
        lenisRef.current = instance;
        if (instance?.lenis && typeof window !== "undefined") {
          (window as unknown as Record<string, unknown>).__lenis = instance.lenis;
        }
      }}
      root
      options={{ lerp: 0.1, anchors: true }}
    />
  );
}
