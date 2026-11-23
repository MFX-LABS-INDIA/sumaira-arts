"use server";

import { headers } from "next/headers";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { COUNTRIES } from "@/constants/countries";
import { EMAIL_PATTERN, type FormState } from "@/lib/forms";
import { emailService } from "@/services/email";
import { sheetsService } from "@/services/sheets";
import {
  BOOKING_DURATIONS,
  getTabConfig,
  type EventBooking,
  type EventBookingTab,
} from "@/types/event-booking";

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

function isValidTab(value: string): value is EventBookingTab {
  return value === "engraving" || value === "products" || value === "sketching";
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

function generateBookingId(prefix: string): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export async function submitEventBooking(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  if (readField(formData, "website")) {
    return { status: "error", message: "We couldn't submit your booking request. Please try again." };
  }

  const tabRaw = readField(formData, "tab");
  if (!isValidTab(tabRaw)) {
    return { status: "error", message: "Please select a valid live event station tab." };
  }
  const tabConfig = getTabConfig(tabRaw);

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

  const eventDate = readField(formData, "eventDate");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(eventDate))) {
    return { status: "error", message: "Please choose a valid event date." };
  }

  const duration = readField(formData, "duration");
  const durationLabels = BOOKING_DURATIONS.map((d) => d.label);
  if (!durationLabels.includes(duration as (typeof durationLabels)[number])) {
    return { status: "error", message: "Please select a valid event duration." };
  }

  const guestCount = readField(formData, "guestCount");
  if (guestCount.length > 80 || /[\u0000-\u001f\u007f]/.test(guestCount)) {
    return { status: "error", message: "Please keep estimated quantity to 80 characters or fewer." };
  }

  const location = readField(formData, "location");
  if (location.length < 2 || location.length > 200 || /[\u0000-\u001f\u007f]/.test(location)) {
    return { status: "error", message: "Please enter your event venue or city (2–200 characters)." };
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
        message: "Please wait a few minutes before submitting another booking request.",
      };
    }

    const booking: EventBooking = {
      bookingId: generateBookingId(tabConfig.idPrefix),
      submittedAt: new Date().toISOString(),
      tab: tabRaw,
      stationTitle: tabConfig.title,
      sheetTabName: tabConfig.sheetTabName,
      hourlyRateAed: tabConfig.hourlyRateAed,
      name,
      email,
      phoneNumber: parsedPhone.number,
      eventDate,
      duration,
      guestCount,
      location,
      notes,
    };

    const [emailSent, savedToSheet] = await Promise.all([
      emailService.sendEventBooking(booking),
      sheetsService.saveEventBooking(booking),
    ]);

    if (!emailSent || !savedToSheet) {
      return { status: "error", message: deliveryErrorMessage };
    }

    return {
      status: "success",
      message: `Thank you! Your ${booking.stationTitle} booking (${booking.bookingId}) has been sent to Sumaira Arts Studio. We will confirm availability for ${booking.eventDate} shortly.`,
    };
  } catch (error) {
    console.error(
      "[EVENT BOOKING ACTION] Delivery failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
