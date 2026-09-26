/** Shared shape for every server-action form (the enquiry form, when it exists). */
export type FormState = { status: "idle" | "success" | "error"; message: string };

export const idleForm: FormState = { status: "idle", message: "" };

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
