"use client";

import { useEffect } from "react";

/** Registers the local runtime cache only in deployed builds, never during development. */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    void navigator.serviceWorker.register("/sw.js").catch(() => {
      // Caching is an enhancement; a registration failure must not affect browsing.
    });
  }, []);

  return null;
}
