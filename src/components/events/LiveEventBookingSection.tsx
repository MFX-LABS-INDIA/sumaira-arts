"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { LiveEventBookingForm } from "@/components/events/LiveEventBookingForm";
import { FormDrawer } from "@/components/ui/FormDrawer";
import { StickyBookingBar } from "@/components/ui/StickyBookingBar";
import type { EventBookingTab } from "@/types/event-booking";

export function LiveEventBookingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<EventBookingTab>("engraving");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#book-event") {
        setIsModalOpen(true);
      }
    };
    syncFromHash();

    const handleBookingTrigger = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest("[data-event-tab], a[href]");
      if (!trigger) return;

      const dataTab = trigger.getAttribute("data-event-tab");
      let isBookAnchor = false;
      if (trigger instanceof HTMLAnchorElement) {
        const url = new URL(trigger.href, window.location.href);
        isBookAnchor =
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash === "#book-event";
      }

      if (!dataTab && !isBookAnchor) return;

      event.preventDefault();
      if (
        dataTab === "engraving" ||
        dataTab === "products" ||
        dataTab === "sketching"
      ) {
        setModalTab(dataTab);
      }
      setIsModalOpen(true);
    };

    document.addEventListener("click", handleBookingTrigger, true);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      document.removeEventListener("click", handleBookingTrigger, true);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  return (
    <>
      <StickyBookingBar
        title="Live Calligraphy, Engraving & Sketching"
        subtitle="From 500 AED/hr · Weddings, brand launches & VIP events across UAE & GCC"
        buttonLabel="Book Live Event"
        icon={<Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
        hidden={isModalOpen}
        onAction={() => setIsModalOpen(true)}
      />

      <FormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Live Event"
        subtitle="Select a station and reserve your event date"
        icon={<Sparkles className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
      >
        {isModalOpen && (
          <LiveEventBookingForm
            initialTab={modalTab}
            idPrefix="ev-modal"
            stickySubmit
          />
        )}
      </FormDrawer>
    </>
  );
}
