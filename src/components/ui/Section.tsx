import type { ReactNode } from "react";

const tones = {
  white: "bg-white",
  ice: "bg-ice",
  light: "bg-light",
  deep: "bg-deep text-white",
} as const;

export type SectionTone = keyof typeof tones;

/**
 * Vertical rhythm: 64px mobile, 96px tablet, 128px desktop.
 *
 * Deliberately no `content-visibility: auto` here. It was measured and rejected: Lighthouse mobile
 * fell 93 to 90 (Speed Index 1.5s to 4.3s) for a 48ms layout saving, and anchor jumps overshot
 * because skipped sections only have estimated heights. See docs/PERFORMANCE.md.
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
    <section id={id} className={`scroll-mt-19 py-16 md:py-24 lg:py-32 ${tones[tone]} ${className}`}>
      {children}
    </section>
  );
}
