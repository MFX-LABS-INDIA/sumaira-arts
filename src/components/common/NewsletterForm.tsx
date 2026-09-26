"use client";

import { useActionState } from "react";
import { buttonClass } from "@/components/ui/Link";
import { idleForm } from "@/lib/forms";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";

export function NewsletterForm({ id, stacked = false }: { id: string; stacked?: boolean }) {
  const [state, action, pending] = useActionState(subscribeToNewsletter, idleForm);

  return (
    <form action={action}>
      <div className={`flex gap-3 ${stacked ? "flex-col" : "flex-col sm:flex-row"}`}>
        <label htmlFor={id} className="sr-only">
          Your email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-control border border-transparent bg-ice px-5 py-4 text-sm text-deep outline-none transition-colors placeholder:text-steel/70 focus:border-soft"
        />
        <button type="submit" disabled={pending} className={buttonClass({ tone: "dark", className: "disabled:opacity-60" })}>
          {pending ? "Sending" : "Subscribe"}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-5 text-sm ${state.status === "error" ? "text-soft" : "text-light"}`}>
        {state.message}
      </p>
    </form>
  );
}
