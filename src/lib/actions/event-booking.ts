"use server";

import { randomInt } from "node:crypto";
import { headers } from "next/headers";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { COUNTRIES } from "@/constants/countries";
import type { FormState } from "@/lib/forms";
import {
  consumeGuardNonce,
  isHoneypotTriggered,
  readFormDataHoneypots,
  verifyFormGuard,
  verifySameOriginBrowserRequest,
} from "@/lib/security/form-guard";
import { checkSubmissionRateLimit, getTrustedClientIp } from "@/lib/security/rate-limit";
import { validateSafeEmail, validateSafeName } from "@/lib/security/sanitize";
import { emailService } from "@/services/email";
import { sheetsService } from "@/services/sheets";
import {
  EVENT_CATEGORY_OPTIONS,
  getEventCategoryOption,
  LIVE_EVENTS_SHEET_TAB,
  type EventBooking,
  type EventCategoryId,
} from "@/types/event-booking";

const deliveryErrorMessage =
  "We couldn't confirm delivery to the studio. Please try again or reach us via the Contact Us dialog.";
const decoySuccessMessage =
  "Thank you. Your live event request has been received. Our team will reach out shortly.";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isValidCategory(value: string): value is EventCategoryId {
  return EVENT_CATEGORY_OPTIONS.some((opt) => opt.id === value);
}

function generateBookingId(prefix: string): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = String(randomInt(1000, 10000));
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export async function submitEventBooking(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const honeypots = readFormDataHoneypots(formData);
  if (isHoneypotTriggered(honeypots)) {
    return { status: "success", message: decoySuccessMessage };
  }

  try {
    const requestHeaders = await headers();
    if (!verifySameOriginBrowserRequest(requestHeaders)) {
      return {
        status: "error",
        message: "We couldn't verify your browser session. Please refresh and try again.",
      };
    }

    const guardCheck = verifyFormGuard({
      token: readField(formData, "_guardToken"),
      expectedScope: "event",
      honeypotValues: honeypots,
      consumeNonce: false,
    });

    if (!guardCheck.ok) {
      if (guardCheck.silentDrop) {
        return { status: "success", message: decoySuccessMessage };
      }
      return { status: "error", message: guardCheck.message };
    }

    const nameCheck = validateSafeName(readField(formData, "name"));
    if (!nameCheck.ok) {
      return { status: "error", message: nameCheck.error };
    }

    const emailCheck = validateSafeEmail(readField(formData, "email"));
    if (!emailCheck.ok) {
      return { status: "error", message: emailCheck.error };
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

    const categoryRaw = readField(formData, "eventCategory");
    if (!isValidCategory(categoryRaw)) {
      return { status: "error", message: "Please select an event category." };
    }
    const categoryOption = getEventCategoryOption(categoryRaw);

    const clientIp = getTrustedClientIp(requestHeaders);
    if (
      checkSubmissionRateLimit({
        scope: "event-booking",
        ip: clientIp,
        email: emailCheck.value,
      })
    ) {
      return {
        status: "error",
        message: "Please wait a few minutes before submitting another booking request.",
      };
    }

    if (!consumeGuardNonce(guardCheck.nonceKey)) {
      return {
        status: "error",
        message: "This booking request has already been submitted.",
      };
    }

    const booking: EventBooking = {
      bookingId: generateBookingId(categoryOption.idPrefix),
      submittedAt: new Date().toISOString(),
      categoryId: categoryRaw,
      categoryTitle: categoryOption.title,
      sheetTabName: LIVE_EVENTS_SHEET_TAB,
      name: nameCheck.value,
      email: emailCheck.value,
      phoneNumber: parsedPhone.number,
    };

    const [sheetSaved, emailSent] = await Promise.all([
      sheetsService.saveEventBooking(booking),
      emailService.sendEventBooking(booking),
    ]);

    if (!sheetSaved && !emailSent) {
      return { status: "error", message: deliveryErrorMessage };
    }

    return {
      status: "success",
      message: `Thank you, ${nameCheck.value}. Your ${categoryOption.title} request (${booking.bookingId}) has been received. Our team will reach out shortly.`,
    };
  } catch (error) {
    console.error(
      "[EVENT BOOKING ACTION] Error:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
