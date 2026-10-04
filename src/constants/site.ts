import type { ImageRef } from "@/types/content";

export const site = {
  name: "Sumaira Arts",
  /** Canonical origin, used for metadata, the sitemap and robots. Set NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  /** ISO 4217 code used to format every product price. */
  currency: "USD",
  /**
   * Landing photograph. While this is null the hero shows the drawn gallery interior.
   * Add a photo to /public/assets/images/hero and set e.g. { src: "/assets/images/hero/home.webp", alt: "..." }.
   * PROTOTYPE photo for now; replace it with the final hero.
   */
  heroImage: {
    src: "/assets/images/prototype/room-lounge-navy-gold.webp",
    alt: "A large calligraphy artwork in navy and gold between two armchairs",
  } as ImageRef | null,
  statement:
    "A contemporary art destination bringing together refined artwork, cultural influence and modern design to create pieces that belong beautifully in the spaces we live and work in.",
};
