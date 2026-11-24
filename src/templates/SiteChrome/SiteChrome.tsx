import type { ReactNode } from "react";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { RevealController } from "@/components/providers/RevealController";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { LanguageTranslator } from "@/components/providers/LanguageTranslator";
import { ServiceWorkerRegistration } from "@/components/providers/ServiceWorkerRegistration";
import { ContactDialog } from "@/components/organisms/ContactDialog";

/** The frame around every public page: header, footer, and the two small behaviours they share. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ServiceWorkerRegistration />
      <LanguageTranslator />
      <Header />
      <ContactDialog />
      <main className="flex-1">{children}</main>
      <Footer />
      <RevealController />
      <SmoothScroll />
    </ReduxProvider>
  );
}
