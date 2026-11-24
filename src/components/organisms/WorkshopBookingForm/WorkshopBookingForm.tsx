"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, Sparkles } from "lucide-react";
import { CountrySelect } from "@/components/molecules/CountrySelect";
import { useCountryDetection } from "@/components/molecules/CountrySelect/useCountryDetection";
import { submitWorkshopBooking } from "@/lib/actions/workshop-booking";
import { idleForm } from "@/lib/forms";
import {
  WORKSHOP_SESSION_MODE_CARDS,
  type WorkshopSessionMode,
} from "@/types/workshop-booking";

const fieldClassName =
  "h-11 w-full rounded-control border border-light bg-white px-3.5 text-sm text-deep transition-all duration-200 hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none sm:h-12";
const labelClassName =
  "mb-1.5 block text-xs font-medium uppercase tracking-caps text-steel";

function WorkshopSessionGrid({
  value,
  onChange,
  hasError,
}: {
  value: WorkshopSessionMode | "";
  onChange: (next: WorkshopSessionMode) => void;
  hasError: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Workshop Session Mode"
      aria-invalid={hasError || undefined}
      className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5"
    >
      <input type="hidden" name="workshopFormat" value={value} />
      {WORKSHOP_SESSION_MODE_CARDS.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:rounded-xl ${
              isSelected
                ? "border-brand bg-ice/70 shadow-sm ring-2 ring-brand/20"
                : hasError
                  ? "border-red-300 bg-white hover:border-brand/50"
                  : "border-light bg-white hover:border-brand/40 hover:shadow-xs"
            }`}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ice sm:aspect-[4/3]">
              {option.image ? (
                <Image
                  src={option.image}
                  alt={option.shortTitle}
                  fill
                  sizes="(min-width: 640px) 110px, 30vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ice to-light/60 text-brand">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
              )}

              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white shadow-xs sm:right-1.5 sm:top-1.5 sm:h-5 sm:w-5"
                >
                  <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </span>
              )}
            </div>

            <div className="flex flex-1 items-center justify-center px-1.5 py-1.5 sm:px-2 sm:py-2">
              <span className="text-[10px] font-medium leading-tight text-deep sm:text-[11px]">
                {option.shortTitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
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
  const [formState, formAction, isPending] = useActionState(
    submitWorkshopBooking,
    idleForm,
  );
  const { country, selectCountry } = useCountryDetection();
  const initialValid = WORKSHOP_SESSION_MODE_CARDS.find(
    (opt) => opt.value === initialFormat,
  )?.value;
  const [session, setSession] = useState<WorkshopSessionMode | "">(
    initialValid ?? "",
  );
  const [sessionError, setSessionError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  if (formState.status === "success") {
    return (
      <div className="rounded-xl border border-light bg-ice/50 p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-normal text-deep sm:text-2xl">
          Workshop Request Received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-steel sm:text-sm">
          {formState.message}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="cursor-pointer rounded-control border border-light bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-caps text-brand transition-colors hover:border-brand hover:bg-ice"
          >
            Submit Another Request
          </button>
          <Link
            href="/products"
            className="rounded-control bg-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-caps text-white transition-colors hover:bg-deep"
          >
            Browse Artworks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      key={resetKey}
      action={formAction}
      onSubmit={(event) => {
        if (!session) {
          event.preventDefault();
          setSessionError("Please select a workshop session.");
        }
      }}
      className="flex flex-col"
      noValidate={false}
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClassName}>
            Name *
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Your full name"
            className={fieldClassName}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
            Email *
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            className={fieldClassName}
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
            Mobile Number *
          </label>
          <input type="hidden" name="countryCode" value={country.code} />
          <div className="flex gap-2.5">
            <div className="w-32 shrink-0 sm:w-36">
              <CountrySelect value={country.code} onChange={selectCountry} />
            </div>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              required
              maxLength={30}
              autoComplete="tel"
              placeholder="50 123 4567"
              className={fieldClassName}
            />
          </div>
        </div>

        {/* Workshop Session Mode 4-Card Visual Grid */}
        <div>
          <span className={labelClassName}>Workshop Session Mode *</span>
          <WorkshopSessionGrid
            value={session}
            hasError={Boolean(sessionError)}
            onChange={(next) => {
              setSession(next);
              setSessionError("");
            }}
          />
          {sessionError && (
            <p role="alert" className="mt-1.5 text-xs text-red-600">
              {sessionError}
            </p>
          )}
        </div>

        {formState.status === "error" && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700"
          >
            {formState.message}
          </p>
        )}
      </div>

      <div
        className={
          stickySubmit
            ? "sticky bottom-0 -mx-5 mt-6 flex justify-end border-t border-light bg-white/95 px-5 py-4 backdrop-blur-xs sm:-mx-6 sm:px-6 sm:py-5"
            : "mt-6 flex justify-end"
        }
      >
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-control bg-brand px-7 text-xs font-semibold uppercase tracking-caps text-white shadow-raised transition-colors hover:bg-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isPending ? "Sending..." : "Request Workshop"}
        </button>
      </div>
    </form>
  );
}
