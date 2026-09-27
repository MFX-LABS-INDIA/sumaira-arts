import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={`text-label font-medium uppercase tracking-eyebrow ${
        tone === "dark" ? "text-soft" : "text-steel"
      } ${className}`}
    >
      {children}
    </p>
  );
}

// Manrope is a tall-x-height grotesque, not the narrow serif this scale was tuned for: a lighter
// weight, tighter (negative) tracking and more line-height keep a big headline from reading dense.
export const headingClass =
  "font-serif text-[clamp(2.1rem,4.7vw,3.75rem)] font-light leading-[1.2] tracking-[-0.01em]";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`${headingClass} mt-6 ${tone === "dark" ? "text-white" : "text-deep"}`}>{title}</h2>
      {description ? (
        <p
          className={`mt-6 text-base leading-relaxed md:text-lg ${
            center ? "mx-auto max-w-xl" : "max-w-xl"
          } ${tone === "dark" ? "text-light/80" : "text-steel"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
