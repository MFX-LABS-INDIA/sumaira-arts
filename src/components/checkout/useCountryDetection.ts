"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/constants/countries";

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

/** Coarse IP lookup with browser-level fallback; default is always UAE (AE). */
export function useCountryDetection() {
  const [country, setCountry] = useState<Country>(
    COUNTRIES.find((item) => item.code === "AE")!,
  );
  const manuallySelected = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);

    async function detect() {
      try {
        const response = await fetch("https://api.country.is/", {
          signal: controller.signal,
          credentials: "omit",
          referrerPolicy: "no-referrer",
          cache: "no-store",
        });
        if (!response.ok) throw new Error("IP lookup response not ok");
        const data: unknown = await response.json();
        if (!data || typeof data !== "object" || !("country" in data)) {
          throw new Error("Invalid country data");
        }
        const detected = COUNTRIES.find((item) => item.code === data.country);
        if (detected && !controller.signal.aborted && !manuallySelected.current) {
          setCountry(detected);
        }
      } catch {
        // Fallback: try detecting via browser locale/timezone
        if (!controller.signal.aborted && !manuallySelected.current) {
          const fallback = detectCountryFromBrowser();
          if (fallback) {
            setCountry(fallback);
          }
          // If no fallback matches, keeps UAE ("AE") default
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void detect();
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  const selectCountry = (next: Country) => {
    manuallySelected.current = true;
    setCountry(next);
  };

  return { country, selectCountry };
}
