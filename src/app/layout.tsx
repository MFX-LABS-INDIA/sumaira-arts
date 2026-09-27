import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ArtSprite } from "@/components/art/Sprite";
import { site } from "@/constants/site";
import "./globals.css";

// One family everywhere: Manrope is a variable font, so headings and body text are both
// this face, told apart by weight (font-light/normal/medium) rather than a second family.
// It has no italic face; `italic`/`<em>` render as the browser's synthesised oblique.
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
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-steel">
        <ArtSprite />
        {children}
      </body>
    </html>
  );
}
