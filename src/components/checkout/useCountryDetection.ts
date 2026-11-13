"use client";

import { useEffect, useRef, useState } from "react";
import { COUNTRIES, type Country } from "@/constants/countries";

/** Coarse IP lookup only; manual selection always wins over a pending response. */
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
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (!data || typeof data !== "object" || !("country" in data)) return;
        const detected = COUNTRIES.find((item) => item.code === data.country);
        if (detected && !controller.signal.aborted && !manuallySelected.current) {
          setCountry(detected);
        }
      } catch {
        // Offline, blocked, or timed-out lookups keep the existing country.
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
