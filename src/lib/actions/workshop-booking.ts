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
  WORKSHOP_SESSION_MODES,
  type WorkshopBooking,
} from "@/types/workshop-booking";

const deliveryErrorMessage =
  "We couldn't confirm delivery to the studio. Please try again or reach us via the Contact Us dialog.";
const decoySuccessMessage =
  "Thank you. Your workshop request has been received. Our studio will reach out shortly.";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return (options as readonly string[]).includes(value);
}

function generateBookingId(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = String(randomInt(1000, 10000));
  return `WS-${y}${m}${d}-${rand}`;
}

export async function submitWorkshopBooking(
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
      expectedScope: "workshop",
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

    const workshopFormat = readField(formData, "workshopFormat");
    if (!isOneOf(workshopFormat, WORKSHOP_SESSION_MODES)) {
      return { status: "error", message: "Please select a workshop session mode." };
    }

    const clientIp = getTrustedClientIp(requestHeaders);
    if (
      checkSubmissionRateLimit({
        scope: "workshop-booking",
        ip: clientIp,
        email: emailCheck.value,
      })
    ) {
      return {
        status: "error",
        message: "Please wait a few minutes before submitting another workshop request.",
      };
    }

    if (!consumeGuardNonce(guardCheck.nonceKey)) {
      return {
        status: "error",
        message: "This workshop request has already been submitted.",
      };
    }

    const booking: WorkshopBooking = {
      bookingId: generateBookingId(),
      submittedAt: new Date().toISOString(),
      name: nameCheck.value,
      email: emailCheck.value,
      phoneNumber: parsedPhone.number,
      workshopFormat,
    };

    const [sheetSaved, emailSent] = await Promise.all([
      sheetsService.saveWorkshopBooking(booking),
      emailService.sendWorkshopBooking(booking),
    ]);

    if (!sheetSaved && !emailSent) {
      return { status: "error", message: deliveryErrorMessage };
    }

    return {
      status: "success",
      message: `Thank you, ${nameCheck.value}. Your workshop request (${booking.bookingId}) has been received. Our studio will reach out shortly.`,
    };
  } catch (error) {
    console.error(
      "[WORKSHOP BOOKING ACTION] Error:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
