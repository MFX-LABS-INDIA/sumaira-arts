import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome";

/** Public marketing pages. A page that needs different chrome (e.g. a bare landing page) gets its own route group. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
