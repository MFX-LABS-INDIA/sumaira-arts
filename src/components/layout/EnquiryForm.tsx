"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { CountrySelect } from "@/components/checkout/CountrySelect";
import type { Country } from "@/constants/countries";
import { idleForm } from "@/lib/forms";
import { submitEnquiry } from "@/lib/actions/enquiry";

const fieldClassName =
  "h-12 w-full rounded-control border border-light bg-white px-3 text-sm text-deep focus:border-brand focus:outline-none";
const labelClassName = "mb-1.5 block text-xs font-medium uppercase tracking-caps text-steel";

export function EnquiryForm() {
  const [formState, formAction, isPending] = useActionState(submitEnquiry, idleForm);
  const [countryCode, setCountryCode] = useState<Country["code"]>("AE");

  return (
    <form action={formAction} className="space-y-4 px-5 pb-6 sm:px-8 sm:pb-8">
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
                value={countryCode}
                onChange={(country) => setCountryCode(country.code)}
              />
            </div>
            <input type="hidden" name="countryCode" value={countryCode} />
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
              required
              placeholder="Mobile number"
              className={`${fieldClassName} min-w-0 flex-1`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="enquiry-address" className={labelClassName}>
            Address <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="enquiry-address"
            name="address"
            autoComplete="street-address"
            maxLength={300}
            rows={2}
            className="w-full resize-y rounded-control border border-light bg-white px-3 py-2.5 text-sm text-deep focus:border-brand focus:outline-none"
          />
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

      <button
        type="submit"
        disabled={isPending || formState.status === "success"}
        className="flex min-h-12 w-full items-center justify-center rounded-control bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : formState.status === "success" ? "Enquiry sent" : "Send enquiry"}
      </button>
    </form>
  );
}
