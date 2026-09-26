import type { Collection, CollectionTag, Cta, Visual } from "@/types/content";

export const collectionsIntro = {
  eyebrow: "Explore",
  title: "The Collections",
  description: "Fifteen collections, each with its own atmosphere. Filter by mood, or simply wander.",
};

export const featuredCollection: Visual & {
  eyebrow: string;
  title: string;
  description: string;
  cta: Cta;
} = {
  eyebrow: "Featured Collection",
  title: "The 99 Names Collection",
  description:
    "A timeless expression of faith and contemporary artistry. Discover artwork inspired by the beautiful names of Allah, interpreted through refined calligraphic compositions and modern artistic forms.",
  cta: { label: "Explore Collection", href: "#collections" },
  art: "names",
  scene: "hall",
};

/** `value` is what a collection lists in its `tags` (and what the CSS filter matches). */
export const collectionFilters: { value: "all" | CollectionTag; label: string }[] = [
  { value: "all", label: "All" },
  { value: "abstract", label: "Abstract" },
  { value: "contemporary", label: "Contemporary" },
  { value: "classic", label: "Classic" },
  { value: "limited-editions", label: "Limited Editions" },
  { value: "custom", label: "Custom" },
];
export const collections: Collection[] = [
  { name: "99 Names of Allah", description: "Calligraphic compositions inspired by the beautiful names, interpreted with modern restraint.", art: "names", tags: ["classic", "limited-editions"], ratio: "4/5", href: "#" },
  { name: "Artisan Contemporary Art", description: "Hand-finished works where texture and detail carry the story.", art: "enso", tags: ["contemporary", "custom"], ratio: "1/1", href: "#" },
  { name: "Shadows", description: "Light and shade, layered into quiet abstract compositions.", art: "shadow", tags: ["abstract"], ratio: "3/4", href: "#" },
  { name: "Mirage", description: "Soft horizons and shimmering distance, in tones of haze and sky.", art: "horizon", tags: ["abstract"], ratio: "4/3", href: "#" },
  { name: "Florals", description: "Abstract blooms drawn from memory, gesture and colour.", art: "bloom", tags: ["contemporary"], ratio: "2/3", href: "#" },
  { name: "Inkography", description: "Ink in motion: flowing, layered and never quite repeated.", art: "ink", tags: ["abstract", "limited-editions"], ratio: "1/1", href: "#" },
  { name: "Letters of Light", description: "Calligraphic forms glowing against deep, midnight grounds.", art: "letters", tags: ["classic"], ratio: "4/5", href: "#" },
  { name: "Salaam", description: "Arches and thresholds inspired by peace and stillness.", art: "arches", tags: ["classic"], ratio: "3/4", href: "#" },
  { name: "Seasons", description: "Colour and light through the turning of the year.", art: "seasons", tags: ["contemporary"], ratio: "4/3", href: "#" },
  { name: "Sahara", description: "Dunes, warmth and open space, distilled into layered form.", art: "dunes", tags: ["abstract"], ratio: "2/3", href: "#" },
  { name: "Ramad", description: "Ash-toned works of depth, texture and quiet drama.", art: "ash", tags: ["abstract"], ratio: "1/1", href: "#" },
  { name: "Dreams", description: "Soft, luminous forms that drift between waking and imagination.", art: "orbs", tags: ["contemporary"], ratio: "4/5", href: "#" },
  { name: "Mosaic", description: "Geometry and pattern, built piece by piece.", art: "mosaic", tags: ["contemporary", "limited-editions"], ratio: "3/4", href: "#" },
  { name: "Worlds", description: "Rings, orbits and imagined places, made to order.", art: "rings", tags: ["custom"], ratio: "4/3", href: "#" },
  { name: "Classics", description: "Timeless geometry and enduring motifs for every interior.", art: "star", tags: ["classic"], ratio: "4/5", href: "#" },
];
