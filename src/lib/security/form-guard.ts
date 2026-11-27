import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type FormGuardScope = "enquiry" | "event" | "workshop" | "checkout";

export const VALID_FORM_SCOPES: readonly FormGuardScope[] = [
  "enquiry",
  "event",
  "workshop",
  "checkout",
] as const;

export const HONEYPOT_FIELD_NAMES = ["website", "company_url", "fax_number"] as const;

/** Minimum realistic human fill duration before submit (1.2s allows browser autofill while blocking instant bots). */
const MIN_HUMAN_FILL_MS = 1200;
/** Maximum token lifetime (2 hours). */
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;
/** Maximum consumed nonces stored in memory for anti-replay protection. */
const MAX_CONSUMED_NONCES = 10000;

const consumedNonces = new Map<string, number>();

/** Known CLI HTTP libraries, vulnerability scanners, and automated scraping bots. */
const AUTOMATED_BOT_UA =
  /\b(?:curl|wget|python-requests|python-httpx|aiohttp|go-http-client|sqlmap|nikto|nmap|masscan|zgrab|nuclei|scrapy|postmanruntime|insomnia|libwww-perl|java\/|apache-httpclient|okhttp)\b/i;

interface TokenPayload {
  s: FormGuardScope;
  t: number;
  n: string;
}

/**
 * Derives a deterministic server-only HMAC secret across serverless instances
 * without requiring manual config if SMTP or Google Sheets secrets already exist.
 */
function getHmacSecret(): string {
  const explicit =
    process.env.FORM_SECURITY_SECRET || process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY;
  if (explicit && explicit.length >= 16) {
    return explicit;
  }

  const material = [
    process.env.SMTP_PASS,
    process.env.SMTP_USER,
    process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    process.env.GOOGLE_SHEETS_CREDENTIALS,
    process.env.GOOGLE_SHEETS_ID,
    "sumaira-arts-hmac-guard-v1",
  ]
    .filter(Boolean)
    .join("|");

  return createHash("sha256").update(material).digest("hex");
}

function signData(encodedPayload: string): string {
  return createHmac("sha256", getHmacSecret()).update(encodedPayload).digest("base64url");
}

/** Issues a stateless HMAC-SHA256 signed token bound to `scope` and current timestamp. */
export function issueFormGuardToken(scope: FormGuardScope, issuedAt = Date.now()): string {
  const payload: TokenPayload = {
    s: scope,
    t: issuedAt,
    n: randomBytes(12).toString("base64url"),
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = signData(encoded);
  return `v1.${encoded}.${signature}`;
}

/** Reads all decoy honeypot fields from a FormData payload. */
export function readFormDataHoneypots(formData: FormData): string[] {
  return HONEYPOT_FIELD_NAMES.map((field) => {
    const val = formData.get(field);
    return typeof val === "string" ? val.trim() : "";
  });
}

/** Returns true if any honeypot trap field was filled by a bot. */
export function isHoneypotTriggered(values: readonly unknown[]): boolean {
  return values.some((val) => typeof val === "string" && val.trim().length > 0);
}

function recordConsumedNonce(nonceKey: string, now: number): boolean {
  if (consumedNonces.size >= MAX_CONSUMED_NONCES) {
    for (const [key, expiresAt] of consumedNonces) {
      if (expiresAt <= now) consumedNonces.delete(key);
    }
    if (consumedNonces.size >= MAX_CONSUMED_NONCES) {
      const oldest = consumedNonces.keys().next().value;
      if (oldest !== undefined) consumedNonces.delete(oldest);
    }
  }

  const existingExpiry = consumedNonces.get(nonceKey);
  if (existingExpiry && existingExpiry > now) {
    return true;
  }

  consumedNonces.set(nonceKey, now + MAX_TOKEN_AGE_MS);
  return false;
}

export type GuardVerificationResult =
  | { ok: true; nonceKey: string }
  | { ok: false; silentDrop: true }
  | { ok: false; silentDrop: false; message: string };

export interface VerifyFormGuardOptions {
  token: string;
  expectedScope: FormGuardScope;
  honeypotValues?: readonly unknown[];
  /** Optional sub-channel (e.g. "emails" | "sheets") when one checkout submission hits two paired endpoints once each. */
  subChannel?: string;
  /** Set false during pre-validation so user input typos don't burn their one-time nonce; call `consumeGuardNonce` once valid. */
  consumeNonce?: boolean;
  now?: number;
}

/**
 * Verifies honeypot traps, HMAC token authenticity, scope binding,
 * minimum human interaction time, token expiry, and optional one-time nonce anti-replay.
 */
export function verifyFormGuard({
  token,
  expectedScope,
  honeypotValues = [],
  subChannel = "default",
  consumeNonce = true,
  now = Date.now(),
}: VerifyFormGuardOptions): GuardVerificationResult {
  // 1. Stealth honeypot check: silently fake success so bots never adapt.
  if (isHoneypotTriggered(honeypotValues)) {
    return { ok: false, silentDrop: true };
  }

  // 2. Require signed guard token.
  if (!token || typeof token !== "string") {
    return {
      ok: false,
      silentDrop: false,
      message: "Security verification is still loading. Please try submitting again.",
    };
  }

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    return {
      ok: false,
      silentDrop: false,
      message: "Security verification failed. Please refresh the page and try again.",
    };
  }

  const [, encodedPayload, providedSig] = parts;
  const expectedSig = signData(encodedPayload);

  const providedBuf = Buffer.from(providedSig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");
  if (
    providedBuf.length !== expectedBuf.length ||
    !timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return {
      ok: false,
      silentDrop: false,
      message: "Security verification failed. Please refresh the page and try again.",
    };
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as TokenPayload;
  } catch {
    return {
      ok: false,
      silentDrop: false,
      message: "Security verification failed. Please refresh the page and try again.",
    };
  }

  if (
    !payload ||
    payload.s !== expectedScope ||
    typeof payload.t !== "number" ||
    !Number.isFinite(payload.t) ||
    typeof payload.n !== "string" ||
    payload.n.length < 8
  ) {
    return {
      ok: false,
      silentDrop: false,
      message: "Security verification failed. Please refresh the page and try again.",
    };
  }

  const elapsed = now - payload.t;

  // 3. Time-trap honeypot: reject superhuman / scripted instant submissions (< 1.2s) silently.
  if (elapsed < MIN_HUMAN_FILL_MS) {
    return { ok: false, silentDrop: true };
  }

  // 4. Reject expired tokens (> 2 hours).
  if (elapsed > MAX_TOKEN_AGE_MS) {
    return {
      ok: false,
      silentDrop: false,
      message: "Your form session expired. Please refresh and submit your request again.",
    };
  }

  const nonceKey = `${payload.s}:${subChannel}:${payload.n}`;

  // 5. Check replay cache (and consume immediately if requested).
  const existingExpiry = consumedNonces.get(nonceKey);
  if (existingExpiry && existingExpiry > now) {
    return {
      ok: false,
      silentDrop: false,
      message: "This submission has already been processed. Please wait before sending another.",
    };
  }

  if (consumeNonce && recordConsumedNonce(nonceKey, now)) {
    return {
      ok: false,
      silentDrop: false,
      message: "This submission has already been processed. Please wait before sending another.",
    };
  }

  return { ok: true, nonceKey };
}

/** Marks a verified `nonceKey` as consumed so replayed requests are blocked. */
export function consumeGuardNonce(nonceKey: string, now = Date.now()): boolean {
  return !recordConsumedNonce(nonceKey, now);
}

/**
 * Verifies same-origin browser headers (Origin, Host, Sec-Fetch-Site) and blocks
 * headless CLI/scanner User-Agents on POST mutations.
 */
export function verifySameOriginBrowserRequest(requestHeaders: Headers): boolean {
  const secFetchSite = requestHeaders.get("sec-fetch-site")?.trim().toLowerCase();
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") {
    return false;
  }

  const userAgent = requestHeaders.get("user-agent")?.trim() ?? "";
  if (!userAgent || userAgent.length < 8 || AUTOMATED_BOT_UA.test(userAgent)) {
    return false;
  }

  const origin = requestHeaders.get("origin")?.trim();
  const expectedHost =
    requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    requestHeaders.get("host")?.trim();

  if (!origin || !expectedHost) {
    return false;
  }

  try {
    const originHost = new URL(origin).host.toLowerCase();
    return originHost === expectedHost.toLowerCase();
  } catch {
    return false;
  }
}

/** Clears replay cache (for unit tests). */
export function resetConsumedNonces(): void {
  consumedNonces.clear();
}
