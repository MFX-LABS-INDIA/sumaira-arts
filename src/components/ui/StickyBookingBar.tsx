"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface StickyBookingBarProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  icon: ReactNode;
  hidden: boolean;
  onAction: () => void;
}

export function StickyBookingBar({
  title,
  subtitle,
  buttonLabel,
  icon,
  hidden,
  onAction,
}: StickyBookingBarProps) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-light bg-white/95 shadow-[0_-8px_28px_-14px_rgba(13,24,42,0.22)] backdrop-blur-md transition-all duration-300 ease-out-soft pb-[env(safe-area-inset-bottom)] ${
        hidden
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <Container className="flex items-center justify-between gap-3 py-2.5 sm:gap-6 sm:py-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
              aria-hidden="true"
            />
            <p className="truncate text-xs font-semibold text-deep sm:text-sm">
              {title}
            </p>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-steel sm:text-xs">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onAction}
          className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control bg-brand px-3.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-2 sm:px-6 sm:text-xs sm:tracking-caps"
        >
          {icon}
          <span>{buttonLabel}</span>
          <ArrowRight
            className="hidden h-3.5 w-3.5 shrink-0 sm:inline-block"
            aria-hidden="true"
          />
        </button>
      </Container>
    </div>
  );
}
