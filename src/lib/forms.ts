/** Shared result shape for server-action forms. */
export type FormState = { status: "idle" | "success" | "error"; message: string };

export const idleForm: FormState = { status: "idle", message: "" };

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
