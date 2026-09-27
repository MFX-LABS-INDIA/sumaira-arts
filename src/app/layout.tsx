import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ArtSprite } from "@/components/art/Sprite";
import { site } from "@/constants/site";
import "./globals.css";

// Only the weights the design uses: 300 (hero), 400 (headings) and 400 italic (accents).
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Contemporary Art, Curated With Purpose`, template: `%s | ${site.name}` },
  description:
    "Refined contemporary and calligraphic artwork, fine art prints, artisan pieces and bespoke commissions for homes and workspaces.",
};

/** Root layout: document, fonts, metadata and the shared artwork sprite. Page chrome lives in the route-group layouts. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-steel">
        <ArtSprite />
        {children}
      </body>
    </html>
  );
}
