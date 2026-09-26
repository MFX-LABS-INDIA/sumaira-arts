import Link from "next/link";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" aria-label="Sumaira Arts, home" className="inline-flex flex-col leading-none">
      <span className={`font-serif text-[1.7rem] font-normal uppercase tracking-caps ${dark ? "text-white" : "text-deep"}`}>
        Sumaira
      </span>
      <span className={`mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.5em] ${dark ? "text-white/85" : "text-steel"}`}>
        Arts
      </span>
    </Link>
  );
}
