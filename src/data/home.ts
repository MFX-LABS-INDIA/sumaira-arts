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
    eyebrow: "Hand-Embellished Canvas",
    title: "Mixed Media Artworks",
    description:
      "Hand-embellished printed canvas artworks combining texture, detail, and Qur’anic calligraphy in a contemporary mixed media expression.",
    cta: { label: "Explore Mixed Media", href: "#artwork" },
    art: "allah",
    scene: "living",
    image: "/assets/images/prototype/room-living-ayatul-kursi.webp",
  },
  {
    number: "02",
    eyebrow: "Hand-Textured Originals",
    title: "Original Texture Artworks",
    description:
      "One-of-a-kind textured artworks created by hand on raw canvas, incorporating Qur’anic verses, surahs, and Arabic letters through layers of sculptural texture.",
    cta: { label: "Explore Originals", href: "#collections" },
    art: "ink",
    scene: "hall",
    image: "/assets/images/prototype/crops/artwork-dhikr-canvases.webp",
  },
];
