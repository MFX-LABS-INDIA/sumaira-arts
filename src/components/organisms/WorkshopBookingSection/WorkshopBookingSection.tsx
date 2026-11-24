"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { FormDrawer } from "@/components/molecules/FormDrawer";
import { StickyBookingBar } from "@/components/molecules/StickyBookingBar";
import { WorkshopBookingForm } from "@/components/organisms/WorkshopBookingForm";
import { WORKSHOP_FORMATS } from "@/types/workshop-booking";

export function WorkshopBookingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormat, setModalFormat] = useState<string>("");

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#book-workshop") {
        setIsModalOpen(true);
      }
    };
    syncFromHash();

    const handleWorkshopTrigger = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest("[data-workshop-format], a[href]");
      if (!trigger) return;

      const pickedFormat = trigger.getAttribute("data-workshop-format");
      let isWorkshopAnchor = false;
      if (trigger instanceof HTMLAnchorElement) {
        const url = new URL(trigger.href, window.location.href);
        isWorkshopAnchor =
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash === "#book-workshop";
      }

      if (!pickedFormat && !isWorkshopAnchor) return;

      event.preventDefault();
      if (
        pickedFormat &&
        (WORKSHOP_FORMATS as readonly string[]).includes(pickedFormat)
      ) {
        setModalFormat(pickedFormat);
      }
      setIsModalOpen(true);
    };

    document.addEventListener("click", handleWorkshopTrigger, true);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      document.removeEventListener("click", handleWorkshopTrigger, true);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  return (
    <>
      <StickyBookingBar
        title="Arabic Calligraphy & Art Workshops"
        subtitle="All materials included · Studio classes in Jumeirah, UAE corporate & online live"
        buttonLabel="Book a Workshop"
        icon={<Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
        hidden={isModalOpen}
        onAction={() => setIsModalOpen(true)}
      />

      <FormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Book a Workshop"
        subtitle="Dubai studio, onsite UAE, or online live sessions"
        icon={<Calendar className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />}
      >
        {isModalOpen && (
          <WorkshopBookingForm
            initialFormat={modalFormat || undefined}
            idPrefix="ws-modal"
            stickySubmit
          />
        )}
      </FormDrawer>
    </>
  );
}
