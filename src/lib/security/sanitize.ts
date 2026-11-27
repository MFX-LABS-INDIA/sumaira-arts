/**
 * Input validation & sanitization guards against XSS, spam bots,
 * SMTP header injection (CRLF), and Spreadsheet/CSV formula injection.
 */

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
const HEADER_BREAK_CHARS = /[\r\n\u0000-\u001f\u007f]+/g;
const FORMULA_PREFIX = /^[=+\-@]/;
const HTML_TAG_OR_BRACKET = /[<>]/;
const URL_OR_SPAM_PATTERN =
  /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:ru|cn|xyz|top|click|loan|work|gq|tk|ml|cf)\b|\[url=|<a\s+href)/i;
const TWO_UNICODE_LETTERS = /\p{L}.*\p{L}/u;

/** Strict RFC-safe email check without quotes, angle brackets, whitespace, or control chars. */
const STRICT_EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Common disposable / throwaway email domains abused by spam bots. */
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "guerrillamailblock.com",
  "maildrop.cc",
  "mailinator.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempmail.com",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
]);

/** Collapse internal whitespace and trim edges. */
export function normalizeSingleLine(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

/**
 * Validates and normalizes a person's name.
 * Blocks control bytes, HTML brackets, URLs, spreadsheet formula prefixes (=, +, -, @),
 * and non-alphabetic gibberish.
 */
export function validateSafeName(raw: string): { ok: true; value: string } | { ok: false; error: string } {
  const cleaned = normalizeSingleLine(raw);

  if (cleaned.length < 2 || cleaned.length > 120) {
    return { ok: false, error: "Please enter your full name (2 to 120 characters)." };
  }

  if (
    CONTROL_CHARS.test(cleaned) ||
    FORMULA_PREFIX.test(cleaned) ||
    HTML_TAG_OR_BRACKET.test(cleaned) ||
    URL_OR_SPAM_PATTERN.test(cleaned) ||
    !TWO_UNICODE_LETTERS.test(cleaned)
  ) {
    return { ok: false, error: "Please enter a valid name without links or special symbols." };
  }

  return { ok: true, value: cleaned };
}

/**
 * Validates and normalizes an email address.
 * Blocks SMTP header injection characters, formula prefixes, malformed local/domain parts,
 * and throwaway bot domains.
 */
export function validateSafeEmail(raw: string): { ok: true; value: string } | { ok: false; error: string } {
  const cleaned = raw.trim().toLowerCase();

  if (cleaned.length < 5 || cleaned.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (
    CONTROL_CHARS.test(cleaned) ||
    FORMULA_PREFIX.test(cleaned) ||
    cleaned.includes("..") ||
    !STRICT_EMAIL_REGEX.test(cleaned)
  ) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const [localPart, domain] = cleaned.split("@");
  if (!localPart || !domain || localPart.length > 64 || localPart.startsWith(".") || localPart.endsWith(".")) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const tld = domain.split(".").pop() ?? "";
  if (tld.length < 2 || !/^[a-z]{2,24}$/.test(tld)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { ok: false, error: "Please provide a permanent personal or business email address." };
  }

  return { ok: true, value: cleaned };
}

/** Strips CR/LF and control characters from any string placed into an email header or subject. */
export function sanitizeEmailHeader(value: string, maxLength = 180): string {
  return value.replace(HEADER_BREAK_CHARS, " ").trim().slice(0, maxLength);
}

/**
 * Ensures text written to Google Sheets cannot act as a spreadsheet/CSV formula
 * (=, +, -, @, Tab, CR) if the sheet is later exported to CSV or Excel.
 * Preserves valid international E.164 phone numbers (+971501234567).
 */
export function sanitizeSheetText(value: string): string {
  const withoutControls = value.replace(CONTROL_CHARS, " ").trim();
  if (/^\+\d{7,15}$/.test(withoutControls)) {
    return withoutControls;
  }
  return withoutControls.replace(/^[=+\-@]+/, "").trim();
}
