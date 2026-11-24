"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mask = "url(/assets/brand/logo.svg) center / contain no-repeat";

/**
 * The brand mark is an SVG used as a mask, so one file takes either surface colour:
 * brand blue on white, white on the dark footer.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      if (typeof window !== "undefined") {
        // Dispatch custom event for Lenis if listening
        window.dispatchEvent(new CustomEvent("scroll-to-top"));

        // Direct Lenis call if available
        const win = window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } };
        if (win.__lenis && typeof win.__lenis.scrollTo === "function") {
          win.__lenis.scrollTo(0, { immediate: false });
        }

        // Native smooth scroll (works on touch devices and standard scrolling)
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });

        if (window.location.hash) {
          window.history.pushState(null, "", "/");
        }
      }
    }
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="Sumaira Arts, home"
      className="inline-flex leading-none cursor-pointer"
    >
      <span
        aria-hidden
        className={`block aspect-[8/5] h-14 ${dark ? "bg-white" : "bg-brand"}`}
        style={{ mask, WebkitMask: mask }}
      />
    </Link>
  );
}
