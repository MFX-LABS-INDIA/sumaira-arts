import Link from "next/link";

const mask = "url(/assets/brand/logo.svg) center / contain no-repeat";

/**
 * The brand mark is an SVG used as a mask, so one file takes either surface colour:
 * brand blue on white, white on the dark footer.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="Sumaira Arts, home" className="inline-flex leading-none">
      <span
        aria-hidden
        className={`block aspect-[8/5] h-14 ${dark ? "bg-white" : "bg-brand"}`}
        style={{ mask, WebkitMask: mask }}
      />
    </Link>
  );
}
