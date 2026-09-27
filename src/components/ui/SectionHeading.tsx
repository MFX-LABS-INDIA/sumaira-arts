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

// A standard section-heading scale: large enough to lead, not a hero. Manrope's tall x-height still
// gets a light weight, slight negative tracking and open leading so it doesn't read dense.
export const headingClass = "font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-light leading-[1.25] tracking-[-0.01em]";

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
      <h2 className={`${headingClass} mt-4 ${tone === "dark" ? "text-white" : "text-deep"}`}>{title}</h2>
      {description ? (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            center ? "mx-auto max-w-xl" : "max-w-xl"
          } ${tone === "dark" ? "text-light/80" : "text-steel"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
