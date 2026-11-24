"use client";

import { useEffect } from "react";

/** Registers the runtime asset/page cache in production builds without blocking rendering. */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        void registration.update().catch(() => undefined);
      })
      .catch(() => {
        // Caching is a progressive enhancement; failures never impact browsing.
      });
  }, []);

  return null;
}
