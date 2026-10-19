"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for every [data-reveal] element on the page (see Reveal.tsx).
 * Re-scans on route change, since the layout persists while page content is swapped.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const scan = () => {
      const pending = document.querySelectorAll<HTMLElement>('[data-reveal=""]');
      if (!pending.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            (entry.target as HTMLElement).dataset.reveal = "in";
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
      );
      pending.forEach((element) => observer.observe(element));
    };

    scan();

    // Listen for custom trigger or DOM mutations when switching tabs/radios
    const mutationObserver = new MutationObserver(() => scan());
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("reveal-refresh", scan);

    return () => {
      mutationObserver.disconnect();
      window.removeEventListener("reveal-refresh", scan);
    };
  }, [pathname]);

  return null;
}
