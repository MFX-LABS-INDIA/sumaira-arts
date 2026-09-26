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

export const headingClass =
  "font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[0.01em]";

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
      <h2 className={`${headingClass} mt-5 ${tone === "dark" ? "text-white" : "text-deep"}`}>{title}</h2>
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
