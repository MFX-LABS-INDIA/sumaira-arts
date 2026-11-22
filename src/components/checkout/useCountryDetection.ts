"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/constants/countries";

const STORAGE_KEY = "sumaira-arts-country";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const DEFAULT_COUNTRY = COUNTRIES.find((item) => item.code === "AE")!;

let memoryCachedCountry: Country | null = null;
let inflightDetection: Promise<Country> | null = null;

function readStoredCountry(): Country | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: string; ts?: number };
    if (!parsed?.code || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return COUNTRIES.find((item) => item.code === parsed.code) ?? null;
  } catch {
    return null;
  }
}

function saveCountry(country: Country) {
  memoryCachedCountry = country;
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ code: country.code, ts: Date.now() }),
      );
    }
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}

function detectCountryFromBrowser(): Country | undefined {
  try {
    // 1. Check navigator language region (e.g., "en-AE" -> "AE", "ar-SA" -> "SA")
    const navLang = typeof navigator !== "undefined" ? navigator.language : "";
    if (navLang && navLang.includes("-")) {
      const region = navLang.split("-")[1].toUpperCase();
      const match = COUNTRIES.find((item) => item.code === region);
      if (match) return match;
    }

    // 2. Check timezone region mapping
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      if (timeZone.includes("Dubai") || timeZone.includes("Muscat")) {
        return COUNTRIES.find((item) => item.code === "AE");
      }
      if (timeZone.includes("Riyadh")) {
        return COUNTRIES.find((item) => item.code === "SA");
      }
      if (timeZone.includes("Qatar")) {
        return COUNTRIES.find((item) => item.code === "QA");
      }
      if (timeZone.includes("Kuwait")) {
        return COUNTRIES.find((item) => item.code === "KW");
      }
      if (timeZone.includes("Bahrain")) {
        return COUNTRIES.find((item) => item.code === "BH");
      }
      if (timeZone.includes("Kolkata") || timeZone.includes("Calcutta")) {
        return COUNTRIES.find((item) => item.code === "IN");
      }
      if (timeZone.includes("London")) {
        return COUNTRIES.find((item) => item.code === "GB");
      }
      if (
        timeZone.includes("New_York") ||
        timeZone.includes("Los_Angeles") ||
        timeZone.includes("Chicago")
      ) {
        return COUNTRIES.find((item) => item.code === "US");
      }
    }
  } catch {
    // Fall back to UAE default
  }
  return undefined;
}

async function detectCountryOnce(): Promise<Country> {
  if (memoryCachedCountry) return memoryCachedCountry;

  const stored = readStoredCountry();
  if (stored) {
    memoryCachedCountry = stored;
    return stored;
  }

  if (inflightDetection) return inflightDetection;

  inflightDetection = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch("https://api.country.is/", {
        signal: controller.signal,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) throw new Error("IP lookup response not ok");
      const data: unknown = await response.json();
      if (!data || typeof data !== "object" || !("country" in data)) {
        throw new Error("Invalid country data");
      }
      const detected =
        COUNTRIES.find((item) => item.code === data.country) ??
        detectCountryFromBrowser() ??
        DEFAULT_COUNTRY;
      saveCountry(detected);
      return detected;
    } catch {
      const fallback = detectCountryFromBrowser() ?? DEFAULT_COUNTRY;
      saveCountry(fallback);
      return fallback;
    } finally {
      window.clearTimeout(timeout);
      inflightDetection = null;
    }
  })();

  return inflightDetection;
}

/** Coarse IP lookup with persistent cache and browser fallback; default is UAE (AE). */
export function useCountryDetection() {
  const [country, setCountry] = useState<Country>(() => memoryCachedCountry ?? DEFAULT_COUNTRY);
  const manuallySelected = useRef(false);

  useEffect(() => {
    let active = true;

    if (memoryCachedCountry) {
      setCountry((prev) => (prev.code === memoryCachedCountry!.code ? prev : memoryCachedCountry!));
      return;
    }

    const stored = readStoredCountry();
    if (stored) {
      memoryCachedCountry = stored;
      setCountry(stored);
      return;
    }

    void detectCountryOnce().then((detected) => {
      if (active && !manuallySelected.current) {
        setCountry(detected);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const selectCountry = (next: Country) => {
    manuallySelected.current = true;
    saveCountry(next);
    setCountry(next);
  };

  return { country, selectCountry };
}
