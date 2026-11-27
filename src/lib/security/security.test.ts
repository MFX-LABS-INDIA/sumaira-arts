import { beforeEach, describe, expect, it } from "vitest";
import { allProducts } from "@/data/products";
import { getOrderFromPayload } from "@/lib/orders";
import {
  consumeGuardNonce,
  issueFormGuardToken,
  resetConsumedNonces,
  verifyFormGuard,
  verifySameOriginBrowserRequest,
} from "./form-guard";
import { checkSubmissionRateLimit, resetRateLimitBuckets } from "./rate-limit";
import { sanitizeEmailHeader, sanitizeSheetText, validateSafeEmail, validateSafeName } from "./sanitize";

describe("Form Security & Anti-Bot Guards", () => {
  beforeEach(() => {
    resetConsumedNonces();
    resetRateLimitBuckets();
  });

  it("silently drops submissions when any honeypot field is filled", () => {
    const issuedAt = 1_000_000;
    const token = issueFormGuardToken("enquiry", issuedAt);
    const result = verifyFormGuard({
      token,
      expectedScope: "enquiry",
      honeypotValues: ["", "https://spam-bot.example", ""],
      now: issuedAt + 5000,
    });

    expect(result).toEqual({ ok: false, silentDrop: true });
  });

  it("silently drops instant bot submissions faster than minimum human fill time", () => {
    const issuedAt = 1_000_000;
    const token = issueFormGuardToken("event", issuedAt);
    const fastResult = verifyFormGuard({
      token,
      expectedScope: "event",
      now: issuedAt + 200,
    });

    expect(fastResult).toEqual({ ok: false, silentDrop: true });
  });

  it("accepts valid human timing, blocks scope mismatch, and blocks nonce replay", () => {
    const issuedAt = 1_000_000;
    const token = issueFormGuardToken("workshop", issuedAt);

    const wrongScope = verifyFormGuard({
      token,
      expectedScope: "enquiry",
      now: issuedAt + 4000,
    });
    expect(wrongScope.ok).toBe(false);

    const firstPass = verifyFormGuard({
      token,
      expectedScope: "workshop",
      consumeNonce: false,
      now: issuedAt + 4000,
    });
    expect(firstPass.ok).toBe(true);

    if (firstPass.ok) {
      expect(consumeGuardNonce(firstPass.nonceKey, issuedAt + 4000)).toBe(true);
      expect(consumeGuardNonce(firstPass.nonceKey, issuedAt + 4500)).toBe(false);
    }

    const replayAttempt = verifyFormGuard({
      token,
      expectedScope: "workshop",
      now: issuedAt + 5000,
    });
    expect(replayAttempt.ok).toBe(false);
  });

  it("blocks cross-site origins, missing origins, and CLI bot User-Agents", () => {
    const legitHeaders = new Headers({
      host: "sumaira-arts.vercel.app",
      origin: "https://sumaira-arts.vercel.app",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    });
    expect(verifySameOriginBrowserRequest(legitHeaders)).toBe(true);

    const curlBotHeaders = new Headers({
      host: "sumaira-arts.vercel.app",
      origin: "https://sumaira-arts.vercel.app",
      "user-agent": "curl/8.7.1",
    });
    expect(verifySameOriginBrowserRequest(curlBotHeaders)).toBe(false);

    const csrfHeaders = new Headers({
      host: "sumaira-arts.vercel.app",
      origin: "https://evil-attacker.example",
      "sec-fetch-site": "cross-site",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    });
    expect(verifySameOriginBrowserRequest(csrfHeaders)).toBe(false);
  });

  it("blocks XSS, URL spam, formula injection, disposable domains, and CRLF header breaks", () => {
    expect(validateSafeName("Sumaira Ashik").ok).toBe(true);
    expect(validateSafeName("<script>alert(1)</script>").ok).toBe(false);
    expect(validateSafeName("=CMD|' /C calc'!A0").ok).toBe(false);
    expect(validateSafeName("Buy cheap watches https://spam.example").ok).toBe(false);

    expect(validateSafeEmail("collector@example.com").ok).toBe(true);
    expect(validateSafeEmail("bot@mailinator.com").ok).toBe(false);
    expect(validateSafeEmail("attacker@example.com\r\nBcc:victim@example.com").ok).toBe(false);

    expect(sanitizeEmailHeader("Order\r\nBcc: test@example.com")).toBe(
      "Order Bcc: test@example.com",
    );
    expect(sanitizeSheetText("=IMPORTXML('https://evil.example')")).toBe(
      "IMPORTXML('https://evil.example')",
    );
    expect(sanitizeSheetText("+971501234567")).toBe("+971501234567");
  });

  it("enforces per-IP and per-email rate limits against distributed email bombing", () => {
    expect(
      checkSubmissionRateLimit({ scope: "enquiry", ip: "198.51.100.1", email: "target@example.com" }),
    ).toBe(false);
    expect(
      checkSubmissionRateLimit({ scope: "enquiry", ip: "198.51.100.2", email: "target@example.com" }),
    ).toBe(false);
    expect(
      checkSubmissionRateLimit({ scope: "enquiry", ip: "198.51.100.3", email: "target@example.com" }),
    ).toBe(false);
    // 4th attempt to the same recipient email from a brand-new IP is blocked:
    expect(
      checkSubmissionRateLimit({ scope: "enquiry", ip: "198.51.100.4", email: "target@example.com" }),
    ).toBe(true);
  });

  it("prevents client-side price tampering by enforcing authoritative catalogue prices", () => {
    const sample = allProducts.find((item) => item.inStock && item.priceUSD > 10);
    expect(sample).toBeDefined();
    if (!sample) return;

    const tamperedPayload = {
      order: {
        id: "SUMA1234-ABCD5678",
        customerName: "Fatima Al Nahyan",
        email: "fatima@example.ae",
        phoneNumber: "+971501234567",
        items: [
          {
            id: sample.slug,
            productId: sample.slug,
            slug: sample.slug,
            title: "Hacked Title",
            category: "Fake",
            image: "/fake.png",
            priceUSD: 0.01,
            quantity: 2,
          },
        ],
        subtotal: 0.02,
        total: 0.02,
        currency: "USD",
        orderDate: new Date().toISOString(),
        status: "pending",
      },
    };

    const verified = getOrderFromPayload(tamperedPayload);
    expect(verified).not.toBeNull();
    expect(verified?.items[0]?.priceUSD).toBe(sample.priceUSD);
    expect(verified?.items[0]?.title).toBe(sample.title);
    expect(verified?.total).toBe(sample.priceUSD * 2);
  });
});
