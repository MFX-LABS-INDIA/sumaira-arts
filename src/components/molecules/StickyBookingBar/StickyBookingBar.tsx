"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/atoms/Container";
import { InstagramIcon } from "@/components/atoms/Icons";

interface StickyBookingBarProps {
  title?: string;
  subtitle?: string;
  buttonLabel: string;
  icon: ReactNode;
  hidden: boolean;
  onAction: () => void;
  instagramUrl?: string;
  instagramHandle?: string;
}

export function StickyBookingBar({
  title,
  subtitle,
  buttonLabel,
  icon,
  hidden,
  onAction,
  instagramUrl,
  instagramHandle,
}: StickyBookingBarProps) {
  const hasCopy = Boolean(title || subtitle);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-light bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-sticky backdrop-blur-md transition-all duration-300 ease-out-soft sm:border-white/30 sm:bg-white/30 sm:shadow-sticky sm:backdrop-blur-md ${
        hidden
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <Container className="flex items-center justify-between gap-3 py-2.5 sm:gap-6 sm:py-3 lg:justify-end">
        {hasCopy && !instagramUrl && (
          <div className="min-w-0 mr-auto">
            {title && (
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-brand"
                  aria-hidden="true"
                />
                <p className="truncate text-xs font-semibold text-deep sm:text-sm">
                  {title}
                </p>
              </div>
            )}
            {subtitle && (
              <p className="mt-0.5 truncate text-[11px] text-steel sm:text-xs">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="flex w-full items-center justify-between gap-3 lg:w-auto lg:justify-end lg:gap-4">
          {instagramUrl && (
            <>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${instagramHandle || "Instagram"} profile`}
                className="group flex h-11 w-1/2 flex-1 items-center justify-center gap-2 rounded-control border border-steel/20 bg-white px-3 text-center text-[11px] font-semibold tracking-wider text-deep shadow-xs transition-all duration-300 hover:border-brand/50 hover:bg-ice/50 hover:text-brand hover:shadow-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-2.5 sm:px-5 sm:text-xs sm:tracking-caps lg:w-auto lg:flex-initial"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-control bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <InstagramIcon className="h-3 w-3" />
                </span>
                <span className="truncate text-[11px] font-semibold text-deep transition-colors group-hover:text-brand sm:text-xs">
                  {instagramHandle || "@instagram"}
                </span>
              </a>

              {/* Vertical divider */}
              <div
                className="h-7 w-px shrink-0 bg-light/90"
                aria-hidden="true"
              />
            </>
          )}

          <button
            type="button"
            onClick={onAction}
            className="inline-flex h-11 w-1/2 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-control bg-brand px-3 text-[11px] font-semibold uppercase tracking-wider text-white shadow-raised transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:gap-2 sm:px-6 sm:text-xs sm:tracking-caps lg:w-auto lg:flex-initial"
          >
            {icon}
            <span className="truncate">{buttonLabel}</span>
            <ArrowRight
              className="hidden h-3.5 w-3.5 shrink-0 sm:inline-block"
              aria-hidden="true"
            />
          </button>
        </div>
      </Container>
    </div>
  );
}
