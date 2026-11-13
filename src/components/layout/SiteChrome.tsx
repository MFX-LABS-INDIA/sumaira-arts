import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealController } from "./RevealController";
import { SmoothScroll } from "./SmoothScroll";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { LanguageTranslator } from "@/components/providers/LanguageTranslator";
import { ServiceWorkerRegistration } from "@/components/providers/ServiceWorkerRegistration";

/** The frame around every public page: header, footer, and the two small behaviours they share. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ServiceWorkerRegistration />
      <LanguageTranslator />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <RevealController />
      <SmoothScroll />
    </ReduxProvider>
  );
}
