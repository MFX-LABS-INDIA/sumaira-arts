"use client";

import { useEffect, useRef, useState } from "react";
import type { FormGuardScope } from "@/lib/security/form-guard";

const REFRESH_INTERVAL_MS = 90 * 60 * 1000;

export interface HoneypotState {
  website: string;
  company_url: string;
  fax_number: string;
}

interface FormSecurityFieldsProps {
  scope: FormGuardScope;
  /** Optional callback for controlled client forms (e.g. Checkout) to read the active token. */
  onTokenChange?: (token: string) => void;
  /** Optional callback for controlled client forms (e.g. Checkout) to track honeypot mutations. */
  onHoneypotChange?: (honeypots: HoneypotState) => void;
}

async function requestGuardToken(
  scope: FormGuardScope,
  signal: AbortSignal,
): Promise<string | null> {
  if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
    return null;
  }

  try {
    const url = new URL("/api/security/form-token", window.location.origin);
    url.searchParams.set("scope", scope);
    const response = await fetch(url.toString(), {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
      signal,
    });
    if (!response.ok) return null;
    const data = (await response.json()) as { token?: string };
    return typeof data.token === "string" && data.token.length > 0 ? data.token : null;
  } catch {
    return null;
  }
}

/**
 * Multi-trap stealth honeypot + signed HMAC form guard fields:
 * - Off-screen positioned decoy inputs (`website`, `company_url`, `fax_number`) hidden from
 *   sighted users (`-left-[9999px] opacity-0 pointer-events-none`), keyboard Tab (`tabIndex={-1}`),
 *   screen readers (`aria-hidden="true"`), and browser autofill (`autoComplete="new-password"`),
 *   while avoiding `display: none` so DOM-scraping and headless bots still fill them.
 * - Asynchronous `_guardToken` signed on the server to enforce minimum fill time & anti-replay.
 */
export function FormSecurityFields({
  scope,
  onTokenChange,
  onHoneypotChange,
}: FormSecurityFieldsProps) {
  const [token, setToken] = useState("");
  const [honeypots, setHoneypots] = useState<HoneypotState>({
    website: "",
    company_url: "",
    fax_number: "",
  });
  const onTokenChangeRef = useRef(onTokenChange);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  const updateHoneypot = (field: keyof HoneypotState, value: string) => {
    const next = { ...honeypots, [field]: value };
    setHoneypots(next);
    onHoneypotChange?.(next);
  };

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const syncToken = () => {
      void requestGuardToken(scope, controller.signal).then((nextToken) => {
        if (active && nextToken) {
          setToken(nextToken);
          onTokenChangeRef.current?.(nextToken);
        }
      });
    };

    syncToken();
    const timer = window.setInterval(syncToken, REFRESH_INTERVAL_MS);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, [scope]);

  return (
    <>
      <input type="hidden" name="_guardToken" value={token} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
      >
        <label htmlFor={`hp-web-${scope}`}>Website</label>
        <input
          id={`hp-web-${scope}`}
          type="text"
          name="website"
          value={honeypots.website}
          onChange={(e) => updateHoneypot("website", e.target.value)}
          tabIndex={-1}
          autoComplete="new-password"
        />
        <label htmlFor={`hp-url-${scope}`}>Company URL</label>
        <input
          id={`hp-url-${scope}`}
          type="url"
          name="company_url"
          value={honeypots.company_url}
          onChange={(e) => updateHoneypot("company_url", e.target.value)}
          tabIndex={-1}
          autoComplete="new-password"
        />
        <label htmlFor={`hp-fax-${scope}`}>Fax Number</label>
        <input
          id={`hp-fax-${scope}`}
          type="tel"
          name="fax_number"
          value={honeypots.fax_number}
          onChange={(e) => updateHoneypot("fax_number", e.target.value)}
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>
    </>
  );
}
