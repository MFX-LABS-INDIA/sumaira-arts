"use server";

import { headers } from "next/headers";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { COUNTRIES } from "@/constants/countries";
import { EMAIL_PATTERN, type FormState } from "@/lib/forms";
import { emailService } from "@/services/email";
import { sheetsService } from "@/services/sheets";
import type { Enquiry } from "@/types/enquiry";

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxSubmissions = 5;
const maxTrackedAddresses = 5000;
const submissionsByAddress = new Map<string, { count: number; resetAt: number }>();
const deliveryErrorMessage =
  "We couldn't confirm delivery to the studio. Your enquiry may have been received; please email the studio before trying again.";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isRateLimited(address: string): boolean {
  const now = Date.now();

  for (const [key, entry] of submissionsByAddress) {
    if (entry.resetAt <= now) submissionsByAddress.delete(key);
  }

  const current = submissionsByAddress.get(address);
  if (current && current.resetAt > now) {
    if (current.count >= rateLimitMaxSubmissions) return true;
    current.count += 1;
    return false;
  }

  if (submissionsByAddress.size >= maxTrackedAddresses) {
    const oldestAddress = submissionsByAddress.keys().next().value;
    if (oldestAddress !== undefined) submissionsByAddress.delete(oldestAddress);
  }

  submissionsByAddress.set(address, {
    count: 1,
    resetAt: now + rateLimitWindowMs,
  });
  return false;
}

export async function submitEnquiry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (readField(formData, "website")) {
    return { status: "error", message: "We couldn't submit your enquiry. Please try again." };
  }

  const name = readField(formData, "name");
  if (!name || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name)) {
    return { status: "error", message: "Please enter a valid name of 120 characters or fewer." };
  }

  const email = readField(formData, "email");
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const country = COUNTRIES.find(({ code }) => code === readField(formData, "countryCode"));
  const phone = readField(formData, "phone");
  const parsedPhone = country ? parsePhoneNumberFromString(phone, country.code) : undefined;
  if (
    phone.length > 30 ||
    !parsedPhone?.isValid() ||
    parsedPhone.country !== country?.code
  ) {
    return {
      status: "error",
      message: "Please enter a valid mobile number for the selected country.",
    };
  }

  try {
    const requestHeaders = await headers();
    const clientAddress =
      requestHeaders.get("x-real-ip")?.trim() ||
      requestHeaders.get("x-forwarded-for")?.split(",").pop()?.trim() ||
      "unknown";
    if (isRateLimited(clientAddress)) {
      return {
        status: "error",
        message: "Please wait a few minutes before submitting another enquiry.",
      };
    }

    const enquiry: Enquiry = {
      name,
      email,
      phoneNumber: parsedPhone.number,
    };
    const [emailSent, savedToSheet] = await Promise.all([
      emailService.sendEnquiry(enquiry),
      sheetsService.saveEnquiry(enquiry),
    ]);

    if (!emailSent || !savedToSheet) {
      return { status: "error", message: deliveryErrorMessage };
    }

    return {
      status: "success",
      message: "Thank you. Your enquiry has been sent to the studio.",
    };
  } catch (error) {
    console.error(
      "[ENQUIRY ACTION] Delivery failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
