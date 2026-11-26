"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";
import { EnquiryForm } from "@/components/organisms/EnquiryForm";

const emptySubscribe = () => () => {};

export function ContactDialog() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [isOpen, setIsOpen] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    const handleContactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const url = new URL(link.href, window.location.href);
      if (
        url.origin !== window.location.origin ||
        url.hash !== "#contact" ||
        (url.pathname !== "/" && url.pathname !== window.location.pathname)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
    };

    document.addEventListener("click", handleContactClick, true);
    return () => document.removeEventListener("click", handleContactClick, true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        data-lenis-prevent
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] touch-none bg-deep/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      {/* Slide-over drawer on mobile, centered modal on desktop */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className={`fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col bg-white text-deep shadow-raised transition-all duration-300 ease-out-soft md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[calc(100dvh-3rem)] md:w-[calc(100%-2rem)] md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-card md:border md:border-light ${
          isOpen
            ? "translate-x-0 md:scale-100 md:opacity-100"
            : "pointer-events-none invisible translate-x-full md:translate-x-0 md:scale-95 md:opacity-0"
        }`}
      >
        <div className="relative shrink-0 border-b border-light px-5 pb-5 pt-6 sm:px-8 sm:pt-7">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close contact form"
            className="absolute end-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-steel transition-colors hover:bg-ice hover:text-deep"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          <h2
            id="contact-dialog-title"
            className="pe-12 font-serif text-2xl font-light text-deep sm:text-3xl"
          >
            Contact the studio
          </h2>
          <p className="mt-1.5 pe-8 text-sm leading-relaxed text-steel">
            Share your contact details and the studio will be in touch.
          </p>
        </div>

        <div data-lenis-prevent className="subtle-scrollbar flex-1 overflow-y-auto overscroll-contain pt-5 pb-0 md:pb-8">
          {isOpen && <EnquiryForm />}
        </div>
      </aside>
    </>
  );
}
