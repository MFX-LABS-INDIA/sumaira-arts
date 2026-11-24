import type { ReactNode } from "react";

const tones = {
  white: "bg-white",
  ice: "bg-ice",
  light: "bg-light",
  deep: "bg-deep text-white",
} as const;

export type SectionTone = keyof typeof tones;

/**
 * Standard editorial vertical rhythm: 40px mobile, 48px sm, 64px tablet, 80px desktop.
 *
 * Deliberately no `content-visibility: auto` here. It was measured and rejected: Lighthouse mobile
 * fell 93 to 90 (Speed Index 1.5s to 4.3s) for a 48ms layout saving, and anchor jumps overshot
 * because skipped sections only have estimated heights.
 */
export function Section({
  id,
  tone = "white",
  className = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-19 py-10 sm:py-12 md:py-16 lg:py-20 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
