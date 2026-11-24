"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";

interface FormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}

export function FormDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  bodyClassName = "subtle-scrollbar flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-0 sm:px-6",
}: FormDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden="true"
        data-lenis-prevent
        onClick={onClose}
        className={`fixed inset-0 z-[60] touch-none bg-deep/45 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col bg-white shadow-raised transition-all duration-300 ease-out-soft md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[calc(100dvh-3rem)] md:w-[calc(100%-2rem)] md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:overflow-hidden md:rounded-2xl md:border md:border-light ${
          isOpen
            ? "translate-x-0 md:scale-100 md:opacity-100"
            : "pointer-events-none invisible translate-x-full md:translate-x-0 md:scale-95 md:opacity-0"
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-light px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {icon}
              <h2
                id={titleId}
                className="font-serif text-lg font-medium text-deep sm:text-xl"
              >
                {title}
              </h2>
            </div>
            {subtitle && (
              <p className="mt-0.5 text-xs leading-snug text-steel">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="-me-1.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-ice hover:text-deep"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div data-lenis-prevent className={bodyClassName}>
          {children}
        </div>
      </aside>
    </>,
    document.body,
  );
}
