import type { Cta, Product } from "@/types/content";

export const featured = {
  eyebrow: "Curated For You",
  title: "Most Loved Artworks",
  description:
    "Explore a selection of distinctive artworks chosen for their beauty, craftsmanship and ability to transform a space.",
  cta: { label: "View All Artwork", href: "#collections" } satisfies Cta,
};

export const products: Product[] = [
  { slug: "99-names-golden-edition", title: "99 Names of Allah — Golden Edition", category: "Mixed Media", price: 640, art: "allah", scene: "hall", image: "/assets/images/prototype/crops/artwork-surah-ikhlas.webp", sceneImage: "/assets/images/prototype/crops/scene-surah-triptych.webp" },
  { slug: "spiritual-reflections", title: "Spiritual Reflections", category: "Original Texture", price: 980, art: "orbs", scene: "living", image: "/assets/images/prototype/crops/artwork-reception-beige.webp", sceneImage: "/assets/images/prototype/crops/scene-reception-beige.webp" },
  { slug: "ayatul-kursi", title: "Ayatul Kursi", category: "Mixed Media", price: 220, art: "salaam", scene: "bedroom", image: "/assets/images/prototype/crops/artwork-ayatul-kursi.webp", sceneImage: "/assets/images/prototype/crops/scene-ayatul-kursi.webp" },
  { slug: "dua-collection", title: "Dua Collection", category: "Mixed Media", price: 420, art: "noor", scene: "office", image: "/assets/images/prototype/crops/artwork-navy-gold.webp", sceneImage: "/assets/images/prototype/crops/scene-navy-gold.webp" },
  { slug: "al-fatiha", title: "Al Fatiha", category: "Mixed Media", price: 240, art: "star", scene: "living", image: "/assets/images/prototype/crops/artwork-grey-abstract.webp", sceneImage: "/assets/images/prototype/crops/scene-grey-abstract.webp" },
  { slug: "love-and-devotion", title: "Love & Devotion", category: "Original Texture", price: 760, art: "bloom", scene: "bedroom", image: "/assets/images/prototype/crops/artwork-blue-wave.webp", sceneImage: "/assets/images/prototype/crops/scene-blue-wave.webp" },
  { slug: "dhikr", title: "Dhikr", category: "Original Texture", price: 380, art: "rings", scene: "office", image: "/assets/images/prototype/crops/artwork-dhikr-canvases.webp", sceneImage: "/assets/images/prototype/studio-dhikr-canvases.webp" },
  { slug: "inkography", title: "Inkography", category: "Mixed Media", price: 540, art: "ink", scene: "hall", image: "/assets/images/prototype/ink-angled-wall.webp", sceneImage: "/assets/images/prototype/ink-angled-wall.webp" },
];
