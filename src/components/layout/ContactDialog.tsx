"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { X } from "lucide-react";

const EnquiryForm = dynamic(
  () => import("./EnquiryForm").then((module) => module.EnquiryForm),
  { loading: () => <p className="px-5 pb-6 text-sm text-steel">Loading the form...</p> },
);

export function ContactDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

      const dialog = dialogRef.current;
      if (!dialog || dialog.open || typeof dialog.showModal !== "function") return;

      event.preventDefault();
      event.stopPropagation();
      dialog.showModal();
      setIsOpen(true);
    };

    document.addEventListener("click", handleContactClick, true);
    return () => document.removeEventListener("click", handleContactClick, true);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="contact-dialog-title"
      onClose={() => setIsOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-card border border-light bg-white p-0 text-deep shadow-raised backdrop:bg-deep/50"
    >
      <div className="relative px-5 pb-6 pt-7 sm:px-8 sm:pb-8">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close contact form"
          className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-steel transition-colors hover:bg-ice hover:text-deep"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
        <h2
          id="contact-dialog-title"
          className="pe-12 font-serif text-2xl font-light text-deep sm:text-3xl"
        >
          Contact the studio
        </h2>
        <p className="mt-2 pe-8 text-sm leading-relaxed text-steel">
          Share your contact details and the studio will be in touch.
        </p>
      </div>
      {isOpen && <EnquiryForm />}
    </dialog>
  );
}
