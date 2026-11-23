"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { CountrySelect } from "@/components/checkout/CountrySelect";
import { useCountryDetection } from "@/components/checkout/useCountryDetection";
import { DatePickerField, getTodayLocalIso } from "@/components/ui/DatePickerField";
import { SelectField } from "@/components/ui/SelectField";
import { submitEventBooking } from "@/lib/actions/event-booking";
import { idleForm } from "@/lib/forms";
import {
  BOOKING_DURATIONS,
  EVENT_BOOKING_TABS,
  getTabConfig,
  type EventBookingTab,
} from "@/types/event-booking";

const fieldClassName =
  "h-11 w-full rounded-control border border-light bg-white px-3.5 text-sm text-deep transition-all duration-200 hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none sm:h-12";
const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-caps text-steel";

function getStationPlaceholders(tabId: EventBookingTab) {
  if (tabId === "engraving") {
    return {
      quantityLabel: "Est. Pieces",
      quantityPlaceholder: "e.g. 50 perfume bottles",
      notesPlaceholder:
        "Share fragrance brands, bottle/glass dimensions, dates/monograms, or floral etching requests...",
    };
  }
  if (tabId === "products") {
    return {
      quantityLabel: "Est. Pieces",
      quantityPlaceholder: "e.g. 100 Finjan cups / fans",
      notesPlaceholder:
        "Share items to customize (Finjan, clay mabkhara, wedding hand fans, mugs, gift bags) and event theme colors...",
    };
  }
  return {
    quantityLabel: "Est. Portraits",
    quantityPlaceholder: "e.g. 25–30 guest portraits",
    notesPlaceholder:
      "Tell us if it's for a bride & groom portrait, guest live sketching, digital delivery, or gold-embellished frames...",
  };
}

function StepIndicator({
  step,
  step1Label,
  step2Label,
  onSelectStep1,
  onSelectStep2,
}: {
  step: 1 | 2;
  step1Label: string;
  step2Label: string;
  onSelectStep1: () => void;
  onSelectStep2: () => void;
}) {
  return (
    <div
      aria-label="Booking progress"
      className="grid grid-cols-2 gap-2 rounded-xl border border-light bg-ice/50 p-1.5"
    >
      <button
        type="button"
        onClick={onSelectStep1}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
          step === 1
            ? "bg-white text-deep shadow-xs ring-1 ring-brand/10"
            : "text-brand hover:bg-white/70"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${
            step === 1
              ? "bg-brand text-white"
              : "bg-brand/15 text-brand"
          }`}
        >
          {step === 2 ? <Check className="h-3 w-3" aria-hidden="true" /> : "01"}
        </span>
        <span className="truncate">{step1Label}</span>
      </button>

      <button
        type="button"
        onClick={onSelectStep2}
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
          step === 2
            ? "bg-white text-deep shadow-xs ring-1 ring-brand/10"
            : "text-steel hover:bg-white/70 hover:text-deep"
        }`}
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${
            step === 2
              ? "bg-brand text-white"
              : "bg-light/70 text-steel"
          }`}
        >
          02
        </span>
        <span className="truncate">{step2Label}</span>
      </button>
    </div>
  );
}

function BookingTabPanel({
  tabId,
  onSelectTab,
  idPrefix,
  compactTabs,
  stickySubmit,
  onReset,
}: {
  tabId: EventBookingTab;
  onSelectTab: (tab: EventBookingTab) => void;
  idPrefix: string;
  compactTabs: boolean;
  stickySubmit: boolean;
  onReset: () => void;
}) {
  const [formState, formAction, isPending] = useActionState(
    submitEventBooking,
    idleForm,
  );
  const { country, selectCountry } = useCountryDetection();
  const tabConfig = getTabConfig(tabId);
  const placeholders = getStationPlaceholders(tabId);

  const [step, setStep] = useState<1 | 2>(1);
  const [stepError, setStepError] = useState<string>("");

  const [eventDate, setEventDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [minDate] = useState<string>(() => getTodayLocalIso());

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabListRef = useRef<HTMLDivElement>(null);

  const durationOptions = BOOKING_DURATIONS.map((item) => item.label);
  const fieldKey = `${idPrefix}-${tabId}`;

  const updateScrollIndicators = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    if (step !== 1) return;
    updateScrollIndicators();
    window.addEventListener("resize", updateScrollIndicators);
    return () => window.removeEventListener("resize", updateScrollIndicators);
  }, [step, updateScrollIndicators]);

  const scrollTabs = (direction: "left" | "right") => {
    const el = tabListRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "right" ? 180 : -180,
      behavior: "smooth",
    });
  };

  const handleNextStep = () => {
    if (!eventDate) {
      setStepError("Please choose your event date before continuing.");
      return;
    }
    if (!duration) {
      setStepError("Please select the event duration before continuing.");
      return;
    }
    if (location.trim().length < 2) {
      setStepError("Please enter your event venue or city before continuing.");
      return;
    }
    setStepError("");
    setStep(2);
  };

  const activeIndex = EVENT_BOOKING_TABS.findIndex((t) => t.id === tabId);
  const hintVisibility = compactTabs ? "flex" : "flex sm:hidden";
  const arrowVisibility = compactTabs ? "hidden md:flex" : "hidden";

  if (formState.status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-brand/25 bg-ice/50 p-6 text-start sm:p-8"
      >
        <div className="flex items-start gap-3.5">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-brand"
            aria-hidden="true"
          />
          <div>
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-caps text-brand shadow-xs">
              {tabConfig.title}
            </span>
            <h3 className="mt-3 font-serif text-xl font-medium text-deep sm:text-2xl">
              Booking request sent
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel sm:text-base">
              {formState.message}
            </p>
            <button
              type="button"
              onClick={onReset}
              className="mt-5 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-control border border-brand px-4 py-2 text-xs font-medium uppercase tracking-caps text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Submit another request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onKeyDown={(event) => {
        if (
          step === 1 &&
          event.key === "Enter" &&
          event.target instanceof HTMLInputElement
        ) {
          event.preventDefault();
          handleNextStep();
        }
      }}
      className="space-y-5"
    >
      <input type="hidden" name="tab" value={tabId} />

      <StepIndicator
        step={step}
        step1Label="Event Details"
        step2Label="Contact Details"
        onSelectStep1={() => {
          setStepError("");
          setStep(1);
        }}
        onSelectStep2={handleNextStep}
      />

      {/* Step 1 Station Switcher */}
      {step === 1 && (
        <div className="space-y-2">
          <div className={`${hintVisibility} items-center justify-between gap-2 px-0.5`}>
            <span className="text-[11px] font-semibold uppercase tracking-caps text-steel">
              Choose Station ({activeIndex + 1}/{EVENT_BOOKING_TABS.length})
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand">
              <span>Swipe</span>
              <MoveRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <div className="relative">
            {canScrollLeft && (
              <div
                className={`${arrowVisibility} pointer-events-none absolute inset-y-0 left-0 z-10 w-10 items-center justify-start bg-gradient-to-r from-white via-white/85 to-transparent pb-1`}
              >
                <button
                  type="button"
                  onClick={() => scrollTabs("left")}
                  aria-label="Scroll stations left"
                  className="pointer-events-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-brand shadow-sm transition-colors hover:bg-ice"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {canScrollRight && (
              <div
                className={`${arrowVisibility} pointer-events-none absolute inset-y-0 right-0 z-10 w-10 items-center justify-end bg-gradient-to-l from-white via-white/85 to-transparent pb-1`}
              >
                <button
                  type="button"
                  onClick={() => scrollTabs("right")}
                  aria-label="Scroll stations right"
                  className="pointer-events-auto flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-light bg-white text-brand shadow-sm transition-colors hover:bg-ice"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            <div
              ref={tabListRef}
              onScroll={updateScrollIndicators}
              role="tablist"
              aria-label="Choose live event station"
              className={`no-scrollbar flex w-full min-w-0 snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 pr-8 ${
                compactTabs ? "" : "sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:pr-0"
              }`}
            >
              {EVENT_BOOKING_TABS.map((tab) => {
                const isActive = tabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectTab(tab.id)}
                    className={`group flex min-w-[160px] shrink-0 snap-start cursor-pointer flex-col items-start rounded-xl border p-3 text-start transition-all duration-300 ease-out-soft ${
                      compactTabs ? "" : "sm:min-w-0 sm:p-3.5"
                    } ${
                      isActive
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-light bg-ice/40 text-deep hover:-translate-y-0.5 hover:border-brand/40 hover:bg-ice/80"
                    }`}
                  >
                    <span className="flex w-full items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${
                          isActive ? "text-soft" : "text-brand"
                        }`}
                      >
                        {tab.hourlyRateAed} AED / hr
                      </span>
                      {tab.id === "engraving" && (
                        <Sparkles
                          className={`h-3.5 w-3.5 ${isActive ? "text-soft" : "text-brand"}`}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="mt-1.5 font-serif text-base font-medium leading-snug">
                      {tab.title}
                    </span>
                    <span
                      className={`mt-1 text-[11px] ${
                        isActive ? "text-light/85" : "text-steel"
                      }`}
                    >
                      {tab.capacitySummary}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 Selected Event Summary Pill */}
      {step === 2 && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-light bg-ice/45 px-3.5 py-2.5 text-xs">
          <div className="min-w-0">
            <p className="font-semibold text-deep truncate">{tabConfig.title}</p>
            <p className="mt-0.5 truncate text-steel">
              {eventDate} · {duration} · {location}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="shrink-0 cursor-pointer rounded-md border border-light bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand transition-colors hover:border-brand hover:bg-ice"
          >
            Edit
          </button>
        </div>
      )}

      {/* Group 01: Event Details (Kept mounted so FormData always submits all values) */}
      <div className={step === 1 ? "space-y-4" : "hidden"}>
        <div className="flex items-center gap-2 border-b border-light pb-2">
          <span className="font-mono text-xs font-semibold text-brand">01</span>
          <h3 className="text-xs font-semibold uppercase tracking-caps text-deep">
            Event Details
          </h3>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-date`} className={labelClassName}>
              Event Date *
            </label>
            <DatePickerField
              id={`${fieldKey}-date`}
              name="eventDate"
              value={eventDate}
              onChange={(val) => {
                setEventDate(val);
                if (stepError) setStepError("");
              }}
              minDate={minDate}
              placeholder="Select event date"
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-duration`} className={labelClassName}>
              Duration *
            </label>
            <SelectField
              id={`${fieldKey}-duration`}
              name="duration"
              options={durationOptions}
              value={duration}
              onChange={(val) => {
                setDuration(val);
                if (stepError) setStepError("");
              }}
              placeholder="Select duration"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-location`} className={labelClassName}>
              Venue / Emirate or City *
            </label>
            <input
              id={`${fieldKey}-location`}
              name="location"
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                if (stepError) setStepError("");
              }}
              maxLength={200}
              required
              placeholder="e.g. St. Regis Saadiyat Island, Abu Dhabi"
              className={fieldClassName}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-guests`} className={labelClassName}>
              {placeholders.quantityLabel}{" "}
              <span className="normal-case tracking-normal text-steel/80">
                (optional)
              </span>
            </label>
            <input
              id={`${fieldKey}-guests`}
              name="guestCount"
              type="text"
              maxLength={80}
              placeholder={placeholders.quantityPlaceholder}
              className={fieldClassName}
            />
          </div>
        </div>

        {stepError && (
          <p
            role="alert"
            className="rounded-control border border-brand/25 bg-ice/70 px-4 py-2.5 text-xs leading-relaxed text-deep sm:text-sm"
          >
            {stepError}
          </p>
        )}
      </div>

      {/* Group 02: Your Contact Details */}
      <div className={step === 2 ? "space-y-4" : "hidden"}>
        <div className="flex items-center gap-2 border-b border-light pb-2">
          <span className="font-mono text-xs font-semibold text-brand">02</span>
          <h3 className="text-xs font-semibold uppercase tracking-caps text-deep">
            Your Contact Details
          </h3>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-name`} className={labelClassName}>
              Full Name *
            </label>
            <input
              id={`${fieldKey}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              required
              placeholder="Your full name"
              className={fieldClassName}
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${fieldKey}-email`} className={labelClassName}>
              Email *
            </label>
            <input
              id={`${fieldKey}-email`}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder="you@company.com"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="min-w-0">
          <label htmlFor={`${fieldKey}-phone`} className={labelClassName}>
            Mobile Number *
          </label>
          <div className="flex gap-2">
            <div className="w-[112px] shrink-0 sm:w-32">
              <CountrySelect value={country.code} onChange={selectCountry} />
            </div>
            <input type="hidden" name="countryCode" value={country.code} />
            <input
              id={`${fieldKey}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              required
              placeholder={
                country.code === "AE" ? "e.g. 50 123 4567" : "Mobile number"
              }
              className={`${fieldClassName} min-w-0 flex-1`}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${fieldKey}-notes`} className={labelClassName}>
            Customization Notes{" "}
            <span className="normal-case tracking-normal text-steel/80">
              (optional)
            </span>
          </label>
          <textarea
            id={`${fieldKey}-notes`}
            name="notes"
            maxLength={1000}
            rows={2}
            placeholder={placeholders.notesPlaceholder}
            className="w-full resize-y rounded-control border border-light bg-white px-3.5 py-2.5 text-sm text-deep transition-all duration-200 hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
          />
        </div>

        <p className="text-xs leading-relaxed text-steel">
          Submitting sends a confirmation email and logs your request in our{" "}
          <span className="font-medium text-deep">{tabConfig.sheetTabName}</span>{" "}
          booking schedule. Read our{" "}
          <Link
            href="/privacy"
            className="font-medium text-brand underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {formState.status === "error" && formState.message && (
          <p
            role="alert"
            className="rounded-control border border-brand/25 bg-ice/70 px-4 py-3 text-sm leading-relaxed text-deep"
          >
            {formState.message}
          </p>
        )}
      </div>

      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />

      {/* Sticky Footer Action Bar */}
      <div
        className={
          stickySubmit
            ? "sticky bottom-0 z-20 -mx-5 border-t border-light bg-white/95 px-5 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] shadow-[0_-6px_18px_-12px_rgba(13,24,42,0.18)] backdrop-blur-xs sm:-mx-6 sm:px-6"
            : "pt-1"
        }
      >
        {step === 1 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-control bg-brand px-5 py-3 text-sm font-medium uppercase tracking-caps text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control border border-light bg-white px-4 py-3 text-xs font-medium uppercase tracking-caps text-deep transition-colors hover:border-brand/50 hover:bg-ice"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isPending}
              aria-label={`Book ${tabConfig.title}`}
              className="flex min-h-12 flex-1 cursor-pointer items-center justify-center rounded-control bg-brand px-5 py-3 text-sm font-medium uppercase tracking-caps text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Book Now"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

interface LiveEventBookingFormProps {
  initialTab?: EventBookingTab;
  idPrefix?: string;
  compactTabs?: boolean;
  stickySubmit?: boolean;
}

export function LiveEventBookingForm({
  initialTab = "engraving",
  idPrefix = "ev",
  compactTabs = false,
  stickySubmit = false,
}: LiveEventBookingFormProps) {
  const [activeTab, setActiveTab] = useState<EventBookingTab>(initialTab);
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleTabSelect = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest("[data-event-tab]");
      if (!trigger) return;
      const tab = trigger.getAttribute("data-event-tab");
      if (tab === "engraving" || tab === "products" || tab === "sketching") {
        setActiveTab(tab);
      }
    };

    document.addEventListener("click", handleTabSelect);
    return () => document.removeEventListener("click", handleTabSelect);
  }, []);

  return (
    <BookingTabPanel
      key={`${activeTab}-${resetCount}`}
      tabId={activeTab}
      onSelectTab={setActiveTab}
      idPrefix={idPrefix}
      compactTabs={compactTabs}
      stickySubmit={stickySubmit}
      onReset={() => setResetCount((c) => c + 1)}
    />
  );
}
