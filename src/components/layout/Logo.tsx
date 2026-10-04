import Image from "next/image";
import Link from "next/link";

/** The brand mark is black on transparent; on a dark surface it is flipped to white. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="Sumaira Arts, home" className="inline-flex leading-none">
      <Image
        src="/assets/brand/logo.png"
        alt=""
        width={400}
        height={250}
        className={`h-14 w-auto ${dark ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}
