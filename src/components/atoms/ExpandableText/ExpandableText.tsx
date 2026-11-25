"use client";

import { useEffect, useRef, useState } from "react";

interface ExpandableTextProps {
  text: string;
  className?: string;
}

/**
 * Clamps multi-line descriptions to 3 lines with an inline "Read more" / "Show less" toggle
 * whenever the paragraph exceeds 3 lines (suppressing the hover tooltip).
 */
export function ExpandableText({ text, className = "" }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!expanded) {
        setCanExpand(el.scrollHeight > el.clientHeight + 1);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, expanded]);

  return (
    <div className={className}>
      <p
        ref={textRef}
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
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 inline-block cursor-pointer text-[11px] font-semibold text-brand transition-colors hover:text-deep focus-visible:outline-none focus-visible:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
