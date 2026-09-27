import type { Collection, Feature } from "@/types/content";

export const collectionsIntro = {
  eyebrow: "Explore",
  title: "The Collections",
  description: "Fifteen collections, each with its own atmosphere.",
  viewAll: "View all collections",
};

/** The 99 Names collection, with four of its artworks (slugs from data/products.ts). */
export const featuredCollection: Feature & { productSlugs: string[] } = {
  eyebrow: "Featured Collection",
  title: "The 99 Names Collection",
  description:
    "A timeless expression of faith and contemporary artistry. Discover artwork inspired by the beautiful names of Allah, interpreted through refined calligraphic compositions and modern artistic forms.",
  cta: { label: "Explore Collection", href: "#collections" },
  art: "names",
  scene: "hall",
  alt: "The 99 Names Collection hung above a hallway console",
  productSlugs: ["99-names-golden-edition", "ayatul-kursi", "al-fatiha", "dua-collection"],
};

/** A single collection given its own spotlight. Words are that collection's own description. */
export const mirage: Feature = {
  title: "Mirage",
  description: "Soft horizons and shimmering distance, in tones of haze and sky.",
  cta: { label: "Explore Collection", href: "#collections" },
  art: "horizon",
  scene: "living",
  alt: "A Mirage artwork above a sofa",
};

/** The first six are shown; the rest open under "View all collections". */
export const collections: Collection[] = [
  { name: "99 Names of Allah", description: "Calligraphic compositions inspired by the beautiful names, interpreted with modern restraint.", art: "names", href: "#" },
  { name: "Artisan Contemporary Art", description: "Hand-finished works where texture and detail carry the story.", art: "enso", href: "#" },
  { name: "Shadows", description: "Light and shade, layered into quiet abstract compositions.", art: "shadow", href: "#" },
  { name: "Mirage", description: "Soft horizons and shimmering distance, in tones of haze and sky.", art: "horizon", href: "#" },
  { name: "Florals", description: "Abstract blooms drawn from memory, gesture and colour.", art: "bloom", href: "#" },
  { name: "Inkography", description: "Ink in motion: flowing, layered and never quite repeated.", art: "ink", href: "#" },
  { name: "Letters of Light", description: "Calligraphic forms glowing against deep, midnight grounds.", art: "letters", href: "#" },
  { name: "Salaam", description: "Arches and thresholds inspired by peace and stillness.", art: "arches", href: "#" },
  { name: "Seasons", description: "Colour and light through the turning of the year.", art: "seasons", href: "#" },
  { name: "Sahara", description: "Dunes, warmth and open space, distilled into layered form.", art: "dunes", href: "#" },
  { name: "Ramad", description: "Ash-toned works of depth, texture and quiet drama.", art: "ash", href: "#" },
  { name: "Dreams", description: "Soft, luminous forms that drift between waking and imagination.", art: "orbs", href: "#" },
  { name: "Mosaic", description: "Geometry and pattern, built piece by piece.", art: "mosaic", href: "#" },
  { name: "Worlds", description: "Rings, orbits and imagined places, made to order.", art: "rings", href: "#" },
  { name: "Classics", description: "Timeless geometry and enduring motifs for every interior.", art: "star", href: "#" },
];
