"use server";

import { headers } from "next/headers";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { COUNTRIES } from "@/constants/countries";
import { EMAIL_PATTERN, type FormState } from "@/lib/forms";
import { emailService } from "@/services/email";
import { sheetsService } from "@/services/sheets";
import {
  WORKSHOP_FORMATS,
  WORKSHOP_GROUP_SIZES,
  WORKSHOP_SESSION_MODES,
  WORKSHOP_SKILL_LEVELS,
  type WorkshopBooking,
} from "@/types/workshop-booking";

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMaxSubmissions = 5;
const maxTrackedAddresses = 5000;
const submissionsByAddress = new Map<string, { count: number; resetAt: number }>();
const deliveryErrorMessage =
  "We couldn't confirm delivery to the studio. Please try again or reach us via the Contact Us dialog.";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return (options as readonly string[]).includes(value);
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

function generateBookingId(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `WS-${y}${m}${d}-${rand}`;
}

export async function submitWorkshopBooking(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (readField(formData, "website")) {
    return { status: "error", message: "We couldn't submit your workshop request. Please try again." };
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

  const workshopFormat = readField(formData, "workshopFormat");
  if (!isOneOf(workshopFormat, WORKSHOP_FORMATS)) {
    return { status: "error", message: "Please choose a valid workshop format." };
  }

  const sessionMode = readField(formData, "sessionMode");
  if (!isOneOf(sessionMode, WORKSHOP_SESSION_MODES)) {
    return { status: "error", message: "Please choose a valid session mode." };
  }

  const groupSize = readField(formData, "groupSize");
  if (!isOneOf(groupSize, WORKSHOP_GROUP_SIZES)) {
    return { status: "error", message: "Please select a valid group size." };
  }

  const skillLevel = readField(formData, "skillLevel");
  if (!isOneOf(skillLevel, WORKSHOP_SKILL_LEVELS)) {
    return { status: "error", message: "Please select your skill level." };
  }

  const preferredDate = readField(formData, "preferredDate");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(Date.parse(preferredDate))) {
    return { status: "error", message: "Please select a valid preferred date." };
  }

  const location = readField(formData, "location");
  if (location.length > 200 || /[\u0000-\u001f\u007f]/.test(location)) {
    return { status: "error", message: "Please keep venue / city to 200 characters or fewer." };
  }

  const notes = readField(formData, "notes");
  if (notes.length > 1000) {
    return { status: "error", message: "Please keep additional notes to 1000 characters or fewer." };
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
        message: "Please wait a few minutes before submitting another workshop request.",
      };
    }

    const booking: WorkshopBooking = {
      bookingId: generateBookingId(),
      submittedAt: new Date().toISOString(),
      name,
      email,
      phoneNumber: parsedPhone.number,
      workshopFormat,
      sessionMode,
      groupSize,
      skillLevel,
      preferredDate,
      location,
      notes,
    };

    const [emailSent, savedToSheet] = await Promise.all([
      emailService.sendWorkshopBooking(booking),
      sheetsService.saveWorkshopBooking(booking),
    ]);

    if (!emailSent || !savedToSheet) {
      return { status: "error", message: deliveryErrorMessage };
    }

    return {
      status: "success",
      message: `Thank you! Your workshop booking request (${booking.bookingId}) for ${booking.workshopFormat} on ${booking.preferredDate} has been sent to Sumaira Arts Studio.`,
    };
  } catch (error) {
    console.error(
      "[WORKSHOP BOOKING ACTION] Delivery failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
