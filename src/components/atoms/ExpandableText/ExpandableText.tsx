"use client";

import { useEffect, useRef, useState } from "react";

interface ExpandableTextProps {
  text: string;
  className?: string;
}

/**
 * Clamps multi-line descriptions to 3 lines with an inline "Read more" / "Show less" toggle.
 * Uses an unclamped hidden sizer + ResizeObserver so iOS Safari / mobile WebKit (where
 * `-webkit-line-clamp` clamps `scrollHeight` to `clientHeight`) and responsive viewport
 * switches always detect overflow accurately.
 */
export function ExpandableText({ text, className = "" }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  // Pre-seed true for long copy (>140 chars always exceeds 3 lines on mobile/4-col cards) so SSR paints "Read more" immediately.
  const [canExpand, setCanExpand] = useState(() => text.trim().length > 140);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const updateOverflow = () => {
      const computed = window.getComputedStyle(el);
      const lineHeight = parseFloat(computed.lineHeight) || 19.5;
      const maxThreeLinesHeight = lineHeight * 3 + 4;
      setCanExpand(el.offsetHeight > maxThreeLinesHeight);
    };

    updateOverflow();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateOverflow)
        : null;
    observer?.observe(el);

    document.fonts?.ready?.then(updateOverflow).catch(() => {});

    return () => observer?.disconnect();
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      <p
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute inset-x-0 top-0 -z-10 select-none text-xs leading-relaxed"
      >
        {text}
      </p>
      <p
        data-no-tooltip="true"
        className={`text-xs leading-relaxed text-steel ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      {canExpand && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1.5 inline-flex cursor-pointer items-center py-0.5 text-xs font-semibold text-brand underline-offset-2 transition-colors hover:text-deep hover:underline active:opacity-75 focus-visible:outline-none focus-visible:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
