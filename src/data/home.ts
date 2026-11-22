import type { Cta } from "@/types/content";

export const homeHero = {
  eyebrow: "Contemporary Arabic calligraphy",
  title: "Art with meaning.",
  accent: "A space that feels like you.",
  description:
    "Discover original textured canvases, expressive mixed media artworks and curated collections by Sumaira. Find the piece that speaks to you and belongs in your space.",
  primary: { label: "Find your artwork", href: "#offerings" },
  secondary: { label: "Meet the artist", href: "#artist" },
  featuredSlug: "promise-after-hardship",
  featuredLabel: "In the spotlight",
  imageAlt: "Promise After Hardship, a textured Arabic calligraphy artwork featuring Fa Inna Ma'al Usri Yusra",
};

export const categoryIntro = {
  eyebrow: "Three ways to find your piece",
  title: "Start with what speaks to you.",
  description: "A colour, a composition, a texture. Discover the different expressions of Sumaira’s work and choose your own starting point.",
  browse: "Explore category",
};

export const homeArtist = {
  title: "Meet the artist behind the artwork.",
  description:
    "From her Dubai studio, Sumaira brings contemporary Arabic calligraphy together with expressive colour and sculptural texture. Explore the ideas, materials and stories behind her work.",
  cta: { label: "Discover Sumaira’s story", href: "/about" },
};

/** Retained for the reusable brand statement section. */
export const intro = {
  eyebrow: "The Art of Living",
  title: "Where Art, Heritage & Modern Design Meet",
  description:
    "Explore a curated world of contemporary artwork and beautifully crafted pieces inspired by culture, creativity and modern living. Each collection is designed to bring a distinctive sense of character and expression to your space.",
  cta: { label: "Our Story", href: "#artist" } satisfies Cta,
};
