"use server";

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
import type { Enquiry } from "@/types/enquiry";

const deliveryErrorMessage =
  "We couldn't confirm delivery to the studio. Your enquiry may have been received; please email the studio before trying again.";
const successMessage = "Thank you. Your enquiry has been sent to the studio.";

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitEnquiry(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const honeypots = readFormDataHoneypots(formData);
  if (isHoneypotTriggered(honeypots)) {
    // Silent fake success so automated bots do not detect the honeypot trap.
    return { status: "success", message: successMessage };
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
      expectedScope: "enquiry",
      honeypotValues: honeypots,
      consumeNonce: false,
    });

    if (!guardCheck.ok) {
      if (guardCheck.silentDrop) {
        return { status: "success", message: successMessage };
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

    const clientIp = getTrustedClientIp(requestHeaders);
    if (
      checkSubmissionRateLimit({
        scope: "enquiry",
        ip: clientIp,
        email: emailCheck.value,
      })
    ) {
      return {
        status: "error",
        message: "Please wait a few minutes before submitting another enquiry.",
      };
    }

    if (!consumeGuardNonce(guardCheck.nonceKey)) {
      return {
        status: "error",
        message: "This enquiry has already been submitted.",
      };
    }

    const enquiry: Enquiry = {
      name: nameCheck.value,
      email: emailCheck.value,
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
      message: successMessage,
    };
  } catch (error) {
    console.error(
      "[ENQUIRY ACTION] Delivery failed:",
      error instanceof Error ? error.name : "Unknown error",
    );
    return { status: "error", message: deliveryErrorMessage };
  }
}
