"use server";

import { EMAIL_PATTERN, type FormState } from "@/lib/forms";
import { postToWebhook } from "@/lib/webhook";

/** Newsletter signup. Set NEWSLETTER_ENDPOINT (see .env.example) to receive { email }. */
export async function subscribeToNewsletter(_previous: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  switch (await postToWebhook(process.env.NEWSLETTER_ENDPOINT, { email })) {
    case "sent":
      return { status: "success", message: "Thank you. You're on the list." };
    case "not-configured":
      return { status: "error", message: "Newsletter signup isn't connected yet." };
    default:
      return { status: "error", message: "Something went wrong. Please try again in a moment." };
  }
}
