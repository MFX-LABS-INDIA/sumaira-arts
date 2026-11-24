"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { LiveEventBookingForm } from "@/components/organisms/LiveEventBookingForm";
import { FormDrawer } from "@/components/molecules/FormDrawer";
import { StickyBookingBar } from "@/components/molecules/StickyBookingBar";
import {
  EVENT_CATEGORY_OPTIONS,
  type EventCategoryId,
} from "@/types/event-booking";

export function LiveEventBookingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<EventCategoryId | "">("");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#book-event") {
        setIsModalOpen(true);
      }
    };
    syncFromHash();

    const handleBookingTrigger = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest("[data-event-category], a[href]");
      if (!trigger) return;

      const dataCategory = trigger.getAttribute("data-event-category");
      let isBookAnchor = false;
      if (trigger instanceof HTMLAnchorElement) {
        const url = new URL(trigger.href, window.location.href);
        isBookAnchor =
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash === "#book-event";
      }

      if (!dataCategory && !isBookAnchor) return;

      event.preventDefault();
      if (
        dataCategory &&
        EVENT_CATEGORY_OPTIONS.some((opt) => opt.id === dataCategory)
      ) {
        setModalCategory(dataCategory as EventCategoryId);
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
        buttonLabel="Book Live Event"
        icon={<Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
        hidden={isModalOpen}
        onAction={() => setIsModalOpen(true)}
      />

      <FormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book Live Event"
        subtitle="Share your contact details and preferred event category"
        icon={<Sparkles className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
      >
        {isModalOpen && (
          <LiveEventBookingForm
            key={modalCategory}
            initialCategory={modalCategory}
            idPrefix="ev-modal"
            stickySubmit
          />
        )}
      </FormDrawer>
    </>
  );
}
