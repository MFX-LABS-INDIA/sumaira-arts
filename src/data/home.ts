import type { Cta } from "@/types/content";

export const homeHero = {
  eyebrow: "Contemporary Arabic calligraphy",
  title: "Rooted in Heritage. Written in Beauty.",
  accent: "A space that feels like you.",
  description:
    "Discover the timeless charm of Arabic calligraphy, artistic textures and contemporary masterpieces inspired by a rich legacy of expression.",
  primary: { label: "Find your artwork", href: "#offerings" },
  secondary: { label: "Meet the artist", href: "#artist" },
  featuredSlug: "promise-after-hardship",
  featuredLabel: "In the spotlight",
  image: "/assets/images/hero/gallery-collage.webp",
  imageAlt: "Curated gallery collage of Sumaira Arts Arabic calligraphy and textured canvas artworks",
  quickCategories: [
    { id: "originals", label: "Originals", href: "/products?category=Original_Texture", icon: "sparkles" },
    { id: "mixed-media", label: "Mixed Media", href: "/products?category=Mixed_Media_Artworks", icon: "layers" },
    { id: "collections", label: "Collections", href: "/products?category=Mixed_Media_Canvas", icon: "frame" },
    { id: "all-artworks", label: "All Artworks", href: "/products", icon: "grid" },
  ] as const,
};

export const categoryIntro = {
  eyebrow: "Three ways to find your piece",
  title: "Discover the Art of Many Expressions.",
  description:
    "Explore thoughtfully curated collections, original artworks and expressive mixed media creations. From intricate calligraphy to captivating textures, find the artistic expression that speaks to you.",
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
