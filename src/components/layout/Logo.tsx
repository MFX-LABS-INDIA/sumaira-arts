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
        const win = window as unknown as { lenis?: { scrollTo: (target: number) => void } };
        if (win.lenis) {
          win.lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
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
      className="inline-flex leading-none"
    >
      <span
        aria-hidden
        className={`block aspect-[8/5] h-14 ${dark ? "bg-white" : "bg-brand"}`}
        style={{ mask, WebkitMask: mask }}
      />
    </Link>
  );
}
