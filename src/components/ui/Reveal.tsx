import type { CSSProperties, ReactNode } from "react";

/**
 * Fades content up once as it scrolls into view. This is a plain server component: it only marks
 * the element. The CSS lives in globals.css and one shared <RevealController /> flips
 * data-reveal to "in", so 50+ of these cost no per-element JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger offset in milliseconds. */
  delay?: number;
  className?: string;
}) {
  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;
  return (
    <div data-reveal="" style={style} className={className}>
      {children}
    </div>
  );
}
