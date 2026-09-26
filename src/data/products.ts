import type { Cta, Product } from "@/types/content";

export const featured = {
  eyebrow: "Curated For You",
  title: "Most Loved Artworks",
  description:
    "Explore a selection of distinctive artworks chosen for their beauty, craftsmanship and ability to transform a space.",
  cta: { label: "View All Artwork", href: "#collections" } satisfies Cta,
};

export const products: Product[] = [
  { slug: "99-names-golden-edition", title: "99 Names of Allah — Golden Edition", category: "Limited Edition", price: 640, art: "names", scene: "hall" },
  { slug: "spiritual-reflections", title: "Spiritual Reflections", category: "Original", price: 980, art: "orbs", scene: "living" },
  { slug: "ayatul-kursi", title: "Ayatul Kursi", category: "Fine Art Print", price: 220, art: "arches", scene: "bedroom" },
  { slug: "dua-collection", title: "Dua Collection", category: "Artisan", price: 420, art: "letters", scene: "office" },
  { slug: "al-fatiha", title: "Al Fatiha", category: "Fine Art Print", price: 240, art: "star", scene: "living" },
  { slug: "love-and-devotion", title: "Love & Devotion", category: "Original", price: 760, art: "bloom", scene: "bedroom" },
  { slug: "dhikr", title: "Dhikr", category: "Limited Edition", price: 380, art: "rings", scene: "office" },
  { slug: "inkography", title: "Inkography", category: "Artisan", price: 540, art: "ink", scene: "hall" },
];
