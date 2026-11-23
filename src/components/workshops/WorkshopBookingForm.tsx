"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { CountrySelect } from "@/components/checkout/CountrySelect";
import { useCountryDetection } from "@/components/checkout/useCountryDetection";
import { DatePickerField, getTodayLocalIso } from "@/components/ui/DatePickerField";
import { SelectField } from "@/components/ui/SelectField";
import { submitWorkshopBooking } from "@/lib/actions/workshop-booking";
import { idleForm } from "@/lib/forms";
import {
  WORKSHOP_FORMATS,
  WORKSHOP_GROUP_SIZES,
  WORKSHOP_SESSION_MODES,
  WORKSHOP_SKILL_LEVELS,
} from "@/types/workshop-booking";

const fieldClassName =
  "h-11 w-full rounded-control border border-light bg-white px-3.5 text-sm text-deep transition-all duration-200 hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none sm:h-12";
const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-caps text-steel";

function isValidFormat(value: string | undefined): value is string {
  return Boolean(value && (WORKSHOP_FORMATS as readonly string[]).includes(value));
}

function StepIndicator({
  step,
  onSelectStep1,
  onSelectStep2,
}: {
  step: 1 | 2;
  onSelectStep1: () => void;
  onSelectStep2: () => void;
}) {
  return (
    <div
      aria-label="Workshop booking progress"
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
        <span className="truncate">Workshop Details</span>
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
        <span className="truncate">Contact Details</span>
      </button>
    </div>
  );
}

function WorkshopBookingFields({
  initialFormat,
  idPrefix,
  stickySubmit,
  onReset,
}: {
  initialFormat?: string;
  idPrefix: string;
  stickySubmit: boolean;
  onReset: () => void;
}) {
  const [formState, formAction, isPending] = useActionState(
    submitWorkshopBooking,
    idleForm,
  );
  const { country, selectCountry } = useCountryDetection();

  const [step, setStep] = useState<1 | 2>(1);
  const [stepError, setStepError] = useState<string>("");

  const [workshopFormat, setWorkshopFormat] = useState<string>(() =>
    isValidFormat(initialFormat) ? initialFormat : "",
  );
  const [sessionMode, setSessionMode] = useState<string>("");
  const [groupSize, setGroupSize] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [minDate] = useState<string>(() => getTodayLocalIso());

  useEffect(() => {
    if (isValidFormat(initialFormat)) {
      setWorkshopFormat(initialFormat);
    }
  }, [initialFormat]);

  useEffect(() => {
    const handleFormatPick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest("[data-workshop-format]");
      if (!trigger) return;
      const picked = trigger.getAttribute("data-workshop-format");
      if (isValidFormat(picked ?? undefined)) {
        setWorkshopFormat(picked!);
      }
    };

    document.addEventListener("click", handleFormatPick);
    return () => document.removeEventListener("click", handleFormatPick);
  }, []);

  const handleNextStep = () => {
    if (!workshopFormat) {
      setStepError("Please choose a workshop format before continuing.");
      return;
    }
    if (!sessionMode) {
      setStepError("Please choose a session mode before continuing.");
      return;
    }
    if (!groupSize) {
      setStepError("Please select your group size before continuing.");
      return;
    }
    if (!skillLevel) {
      setStepError("Please select a skill level before continuing.");
      return;
    }
    if (!preferredDate) {
      setStepError("Please select your preferred workshop date before continuing.");
      return;
    }
    setStepError("");
    setStep(2);
  };

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
              Workshop Booking
            </span>
            <h3 className="mt-3 font-serif text-xl font-medium text-deep sm:text-2xl">
              Workshop request received
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-steel sm:text-base">
              {formState.message}
            </p>
            <button
              type="button"
              onClick={onReset}
              className="mt-5 inline-flex min-h-10 cursor-pointer items-center justify-center rounded-control border border-brand px-4 py-2 text-xs font-medium uppercase tracking-caps text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Submit another workshop request
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
      <StepIndicator
        step={step}
        onSelectStep1={() => {
          setStepError("");
          setStep(1);
        }}
        onSelectStep2={handleNextStep}
      />

      {/* Step 2 Summary Pill */}
      {step === 2 && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-light bg-ice/45 px-3.5 py-2.5 text-xs">
          <div className="min-w-0">
            <p className="truncate font-semibold text-deep">{workshopFormat}</p>
            <p className="mt-0.5 truncate text-steel">
              {preferredDate} · {groupSize}
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

      {/* Group 01: Workshop Preferences (Kept mounted for FormData submission) */}
      <div className={step === 1 ? "space-y-4" : "hidden"}>
        <div className="flex items-center gap-2 border-b border-light pb-2">
          <span className="font-mono text-xs font-semibold text-brand">01</span>
          <h3 className="text-xs font-semibold uppercase tracking-caps text-deep">
            Workshop Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-format`} className={labelClassName}>
              Workshop Format *
            </label>
            <SelectField
              id={`${idPrefix}-format`}
              name="workshopFormat"
              options={WORKSHOP_FORMATS}
              value={workshopFormat}
              onChange={(val) => {
                setWorkshopFormat(val);
                if (stepError) setStepError("");
              }}
              placeholder="Select workshop format"
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-mode`} className={labelClassName}>
              Session Mode *
            </label>
            <SelectField
              id={`${idPrefix}-mode`}
              name="sessionMode"
              options={WORKSHOP_SESSION_MODES}
              value={sessionMode}
              onChange={(val) => {
                setSessionMode(val);
                if (stepError) setStepError("");
              }}
              placeholder="Select session mode"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-group`} className={labelClassName}>
              Group Size *
            </label>
            <SelectField
              id={`${idPrefix}-group`}
              name="groupSize"
              options={WORKSHOP_GROUP_SIZES}
              value={groupSize}
              onChange={(val) => {
                setGroupSize(val);
                if (stepError) setStepError("");
              }}
              placeholder="Select group size"
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-skill`} className={labelClassName}>
              Skill Level *
            </label>
            <SelectField
              id={`${idPrefix}-skill`}
              name="skillLevel"
              options={WORKSHOP_SKILL_LEVELS}
              value={skillLevel}
              onChange={(val) => {
                setSkillLevel(val);
                if (stepError) setStepError("");
              }}
              placeholder="Select skill level"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-end gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-date`} className={labelClassName}>
              Preferred Date *
            </label>
            <DatePickerField
              id={`${idPrefix}-date`}
              name="preferredDate"
              value={preferredDate}
              onChange={(val) => {
                setPreferredDate(val);
                if (stepError) setStepError("");
              }}
              minDate={minDate}
              placeholder="Select preferred date"
              required
            />
          </div>

          <div className="min-w-0">
            <label htmlFor={`${idPrefix}-location`} className={labelClassName}>
              Venue / City{" "}
              <span className="normal-case tracking-normal text-steel/80">
                (optional)
              </span>
            </label>
            <input
              id={`${idPrefix}-location`}
              name="location"
              type="text"
              maxLength={200}
              placeholder="e.g. The Workshop Dubai / Office venue"
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
            <label htmlFor={`${idPrefix}-name`} className={labelClassName}>
              Full Name *
            </label>
            <input
              id={`${idPrefix}-name`}
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
            <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
              Email *
            </label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              placeholder="you@example.com"
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="min-w-0">
          <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
            Mobile Number *
          </label>
          <div className="flex gap-2">
            <div className="w-[112px] shrink-0 sm:w-32">
              <CountrySelect value={country.code} onChange={selectCountry} />
            </div>
            <input type="hidden" name="countryCode" value={country.code} />
            <input
              id={`${idPrefix}-phone`}
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
          <label htmlFor={`${idPrefix}-notes`} className={labelClassName}>
            Session Goals &amp; Notes{" "}
            <span className="normal-case tracking-normal text-steel/80">
              (optional)
            </span>
          </label>
          <textarea
            id={`${idPrefix}-notes`}
            name="notes"
            maxLength={1000}
            rows={2}
            placeholder="Share preferred timing, occasion (Emirati Women's Day, team building, birthday), or questions about materials..."
            className="w-full resize-y rounded-control border border-light bg-white px-3.5 py-2.5 text-sm text-deep transition-all duration-200 hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
          />
        </div>

        <p className="text-xs leading-relaxed text-steel">
          Submitting sends a confirmation email and logs your request in our{" "}
          <span className="font-medium text-deep">Book Workshops</span>{" "}
          schedule. Read our{" "}
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
              aria-label="Request workshop booking"
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

interface WorkshopBookingFormProps {
  initialFormat?: string;
  idPrefix?: string;
  stickySubmit?: boolean;
}

export function WorkshopBookingForm({
  initialFormat,
  idPrefix = "ws",
  stickySubmit = false,
}: WorkshopBookingFormProps) {
  const [formKey, setFormKey] = useState(0);
  return (
    <WorkshopBookingFields
      key={formKey}
      initialFormat={initialFormat}
      idPrefix={idPrefix}
      stickySubmit={stickySubmit}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}
