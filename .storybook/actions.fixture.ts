import type { FormState } from "@/lib/forms";

async function submitPreview(): Promise<FormState> {
  return { status: "success", message: "Your preview request was received." };
}

export { submitPreview as submitEnquiry, submitPreview as submitEventBooking, submitPreview as submitWorkshopBooking };
