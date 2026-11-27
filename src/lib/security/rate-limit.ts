/**
 * Multi-dimensional rate limiter protecting forms and API routes:
 * 1. Per-IP per-scope window (e.g. max 4 submissions / 15 min on a form)
 * 2. Per-IP global cross-form burst cap (max 8 total submissions / 15 min across the whole site)
 * 3. Per-recipient email cooldown (max 3 submissions / 30 min to prevent distributed email bombing)
 */

interface BucketEntry {
  count: number;
  resetAt: number;
}

const MAX_TRACKED_KEYS = 8000;
const buckets = new Map<string, BucketEntry>();

const DEFAULT_SCOPE_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_SCOPE_MAX = 4;

const GLOBAL_WINDOW_MS = 15 * 60 * 1000;
const GLOBAL_MAX = 8;

const EMAIL_WINDOW_MS = 30 * 60 * 1000;
const EMAIL_MAX = 3;

function consumeBucket(key: string, max: number, windowMs: number, now: number): boolean {
  if (buckets.size >= MAX_TRACKED_KEYS) {
    for (const [k, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(k);
    }
    if (buckets.size >= MAX_TRACKED_KEYS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
  }

  const existing = buckets.get(key);
  if (existing && existing.resetAt > now) {
    if (existing.count >= max) return true;
    existing.count += 1;
    return false;
  }

  buckets.set(key, { count: 1, resetAt: now + windowMs });
  return false;
}

/**
 * Extracts client IP prioritizing trusted edge proxy headers (Vercel / Cloudflare)
 * so attackers cannot bypass limits by spoofing trailing X-Forwarded-For values.
 */
export function getTrustedClientIp(requestHeaders: Headers): string {
  const vercelIp = requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercelIp) return vercelIp;

  const cfIp = requestHeaders.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = requestHeaders.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  return "unknown";
}

export interface RateLimitCheckOptions {
  scope: string;
  ip: string;
  email?: string;
  maxPerScope?: number;
  windowMs?: number;
}

/**
 * Returns `true` if the submission should be blocked due to rate limiting.
 */
export function checkSubmissionRateLimit({
  scope,
  ip,
  email,
  maxPerScope = DEFAULT_SCOPE_MAX,
  windowMs = DEFAULT_SCOPE_WINDOW_MS,
}: RateLimitCheckOptions): boolean {
  const now = Date.now();
  const normalizedIp = ip || "unknown";

  if (consumeBucket(`scope:${scope}:${normalizedIp}`, maxPerScope, windowMs, now)) {
    return true;
  }

  if (consumeBucket(`global:${normalizedIp}`, GLOBAL_MAX, GLOBAL_WINDOW_MS, now)) {
    return true;
  }

  if (email) {
    const normalizedEmail = email.trim().toLowerCase();
    if (consumeBucket(`email:${normalizedEmail}`, EMAIL_MAX, EMAIL_WINDOW_MS, now)) {
      return true;
    }
  }

  return false;
}

/** Resets all rate-limit buckets (used in automated unit tests). */
export function resetRateLimitBuckets(): void {
  buckets.clear();
}
