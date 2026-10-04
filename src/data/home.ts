import type { Cta, Offering } from "@/types/content";

export const hero = {
  eyebrow: "Contemporary Art • Curated With Purpose",
  lead: "Art That Gives Your Space",
  accent: "Meaning.",
  description:
    "Discover refined contemporary artwork created to bring character, depth and timeless beauty into the spaces you live and work in.",
  primary: { label: "Explore Artwork", href: "#artwork" } satisfies Cta,
  secondary: { label: "Discover Our Story", href: "#artist" } satisfies Cta,
  /** Wall label shown bottom-right on desktop. */
  caption: { kicker: "Featured work", title: "Letters of Light" },
};

export const intro = {
  eyebrow: "The Art of Living",
  title: "Where Art, Heritage & Modern Design Meet",
  description:
    "Explore a curated world of contemporary artwork and beautifully crafted pieces inspired by culture, creativity and modern living. Each collection is designed to bring a distinctive sense of character and expression to your space.",
  cta: { label: "Our Story", href: "#artist" } satisfies Cta,
};

export const offerings: Offering[] = [
  {
    number: "01",
    eyebrow: "Printed Editions",
    title: "Fine Art, Made Accessible",
    description:
      "Discover beautifully crafted fine art prints inspired by contemporary design, created to bring sophistication and personality to your space.",
    cta: { label: "Explore Prints", href: "#artwork" },
    art: "allah",
    scene: "living",
    image: "/assets/images/prototype/room-living-ayatul-kursi.webp",
  },
  {
    number: "02",
    eyebrow: "Artisan Art",
    title: "Crafted With an Artist's Touch",
    description:
      "Explore hand-finished artworks where texture, detail and artistic craftsmanship transform every piece into something truly distinctive.",
    cta: { label: "Explore Artisan Art", href: "#collections" },
    art: "ink",
    scene: "hall",
    image: "/assets/images/prototype/crops/artwork-dhikr-canvases.webp",
  },
  {
    number: "03",
    eyebrow: "Custom Art",
    title: "Created For Your Space",
    description:
      "Commission artwork designed around your vision, preferred dimensions and interior, created specifically for your home or workspace.",
    cta: { label: "Create Your Artwork", href: "#commission" },
    art: "rings",
    scene: "office",
    image: "/assets/images/prototype/studio-ipad-bismillah.webp",
  },
];
