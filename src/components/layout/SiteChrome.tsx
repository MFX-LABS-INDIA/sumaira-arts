import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealController } from "./RevealController";
import { SmoothScroll } from "./SmoothScroll";

/** The frame around every public page: header, footer, and the two small behaviours they share. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <RevealController />
      <SmoothScroll />
    </>
  );
}
