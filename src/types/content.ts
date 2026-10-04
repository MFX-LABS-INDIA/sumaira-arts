import type { SceneKind } from "@/components/art/scenes";
import type { ArtVariant } from "@/components/art/variants";

export type Cta = { label: string; href: string };

export type NavLink = { label: string; href: string };

export type ImageRef = { src: string; alt: string };

/** One slide of the home hero carousel: a photograph, its words and two links. */
export type HeroSlide = {
  eyebrow: string;
  lead: string;
  /** The italic, accent-coloured tail of the title. */
  accent: string;
  description: string;
  primary: Cta;
  secondary: Cta;
  image: ImageRef;
  /** CSS object-position for the photo, so the artwork stays in view when a phone crops it. */
  focus?: string;
  /** Wall label shown at the end edge on large screens. */
  caption: { kicker: string; title: string };
};

/**
 * How any card, banner or tile gets its picture. `image` is a real photograph
 * (a path under /public); without it the drawn placeholder `art` is shown,
 * optionally hung in a room (`scene`).
 */
export type Visual = {
  art: ArtVariant;
  scene?: SceneKind;
  image?: string;
};

/** One of the two kinds of artwork, on the home page. */
export type Offering = Visual & {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: Cta;
};

/** A sellable artwork. Called `Product` in code, "artwork" in copy. */
export type Product = {
  slug: string;
  title: string;
  category: "Mixed Media" | "Original Texture";
  /** PLACEHOLDER prices. Replace with real ones (currency is set in constants/site.ts). */
  price: number;
  art: ArtVariant;
  /** Room shown when the card is hovered. */
  scene: SceneKind;
  /** Optional photograph of the artwork, e.g. "/images/products/ayatul-kursi.jpg". */
  image?: string;
  /** Optional photograph of the artwork in a room (hover view). */
  sceneImage?: string;
  /** Optional Arabic title, shown under the English one. Rendered only when present. */
  titleAr?: string;
  /** Optional rating (0 to 5) and review count. Stars render only when present. */
  rating?: number;
  reviewCount?: number;
  /** Shows a "Sold out" badge. */
  soldOut?: boolean;
};

export type Collection = {
  name: string;
  description: string;
  art: ArtVariant;
  href: string;
  /** Optional photograph, e.g. "/images/collections/shadows.jpg". */
  image?: string;
};

/** A picture-and-words block: the featured collection, a commission, a single collection spotlight. */
export type Feature = Visual & {
  eyebrow?: string;
  title: string;
  description: string;
  cta: Cta;
  /** Text alternative for the picture. */
  alt: string;
};

/** A customer review. Everything except the words and the author is optional and renders only when present. */
export type Review = {
  quote: string;
  author: string;
  rating?: number;
  verified?: boolean;
  date?: string;
  product?: { label: string; href: string };
  /** The studio's reply. */
  reply?: string;
  photo?: Visual & { alt: string };
};

export type JournalPost = Visual & {
  category: "Art & Design" | "Interiors" | "Inspiration";
  title: string;
  excerpt: string;
  href: string;
};
