"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CountrySelect } from "@/components/molecules/CountrySelect";
import { useCountryDetection } from "@/components/molecules/CountrySelect/useCountryDetection";
import { idleForm } from "@/lib/forms";
import { submitEnquiry } from "@/lib/actions/enquiry";

const fieldClassName =
  "h-12 w-full rounded-control border border-light bg-white px-3 text-sm text-deep focus:border-brand focus:outline-none";
const labelClassName = "mb-1.5 block text-xs font-medium uppercase tracking-caps text-steel";

export function EnquiryForm() {
  const [formState, formAction, isPending] = useActionState(submitEnquiry, idleForm);
  const { country, selectCountry } = useCountryDetection();

  return (
    <form action={formAction} className="space-y-4 px-5 pb-0 sm:px-8 md:pb-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="enquiry-name" className={labelClassName}>
            Name *
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="enquiry-email" className={labelClassName}>
            Email *
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="enquiry-phone" className={labelClassName}>
            Mobile number *
          </label>
          <div className="flex gap-2">
            <div className="w-32 shrink-0">
              <CountrySelect
                value={country.code}
                onChange={selectCountry}
              />
            </div>
            <input type="hidden" name="countryCode" value={country.code} />
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              required
              placeholder={`e.g. ${country.code === "AE" ? "50 123 4567" : "Mobile number"}`}
              className={`${fieldClassName} min-w-0 flex-1`}
            />
          </div>
        </div>
      </div>

      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
      />

      <p className="text-xs leading-relaxed text-steel">
        Your details are used to respond to your enquiry. Read our{" "}
        <Link href="/privacy" className="font-medium text-brand underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>

      {formState.message && (
        <p
          role={formState.status === "error" ? "alert" : "status"}
          className={`text-sm leading-relaxed ${
            formState.status === "success" ? "text-brand" : "text-deep"
          }`}
        >
          {formState.message}
        </p>
      )}

      <div className="sticky bottom-0 z-20 -mx-5 border-t border-light bg-white/95 px-5 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] shadow-[0_-6px_18px_-12px_rgba(13,24,42,0.18)] backdrop-blur-xs sm:-mx-8 sm:px-8 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <button
          type="submit"
          disabled={isPending || formState.status === "success"}
          className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-control bg-brand px-5 py-3 text-sm font-medium uppercase tracking-caps text-white shadow-sm transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Sending..." : formState.status === "success" ? "Enquiry sent" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
