"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipState {
  text: string;
  left: number;
  top: number;
  placement: "top" | "bottom";
}

function findTruncatedElement(target: EventTarget | null): HTMLElement | null {
  let node = target instanceof HTMLElement ? target : null;
  let depth = 0;

  while (node && depth < 5) {
    if (node.hasAttribute("data-no-tooltip")) {
      return null;
    }
    const className = typeof node.className === "string" ? node.className : "";
    const isClampedClass =
      className.includes("truncate") || className.includes("line-clamp-");

    if (isClampedClass) {
      const isOverflowing =
        node.scrollWidth > node.clientWidth + 1 ||
        node.scrollHeight > node.clientHeight + 1;
      if (isOverflowing && node.innerText.trim().length > 0) {
        return node;
      }
    }

    node = node.parentElement;
    depth += 1;
  }

  return null;
}

/**
 * Global zero-config tooltip that automatically reveals the full text whenever a user
 * hovers or focuses any truncated (`truncate` / `line-clamp-*`) element across the site.
 */
export function TruncatedTooltipProvider() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    let activeEl: HTMLElement | null = null;

    const showFor = (el: HTMLElement) => {
      const text = el.innerText.trim();
      if (!text) return;
      const rect = el.getBoundingClientRect();
      const viewportW = window.innerWidth;
      const halfMax = 150;
      const centerX = rect.left + rect.width / 2;
      const clampedLeft = Math.min(
        Math.max(centerX, halfMax + 12),
        viewportW - halfMax - 12,
      );
      const placement = rect.top > 96 ? "top" : "bottom";
      const top = placement === "top" ? rect.top - 10 : rect.bottom + 10;

      activeEl = el;
      setTooltip({ text, left: clampedLeft, top, placement });
    };

    const hide = () => {
      activeEl = null;
      setTooltip(null);
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const match = findTruncatedElement(event.target);
      if (match) {
        if (match !== activeEl) showFor(match);
      } else if (activeEl) {
        hide();
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!activeEl) return;
      const related = event.relatedTarget as Node | null;
      if (!related || !activeEl.contains(related)) {
        hide();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      const match = findTruncatedElement(event.target);
      if (match) showFor(match);
    };

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("focusin", handleFocusIn, true);
    document.addEventListener("focusout", hide, true);
    window.addEventListener("scroll", hide, { passive: true, capture: true });

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("focusin", handleFocusIn, true);
      document.removeEventListener("focusout", hide, true);
      window.removeEventListener("scroll", hide, true);
    };
  }, []);

  if (!tooltip || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="tooltip"
      style={{
        left: `${tooltip.left}px`,
        top: `${tooltip.top}px`,
        transform:
          tooltip.placement === "top"
            ? "translate(-50%, -100%)"
            : "translate(-50%, 0)",
      }}
      className="pointer-events-none fixed z-[100] max-w-[300px] rounded-control border border-white/10 bg-deep/95 px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-raised backdrop-blur-xs"
    >
      {tooltip.text}
    </div>,
    document.body,
  );
}
