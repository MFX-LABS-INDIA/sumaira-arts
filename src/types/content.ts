import type { SceneKind } from "@/components/art/scenes";
import type { ArtVariant } from "@/components/art/variants";

export type Cta = { label: string; href: string };

export type NavLink = { label: string; href: string };

export type ImageRef = { src: string; alt: string };

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

/** One of the three ways to buy, on the home page. */
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
  category: "Limited Edition" | "Original" | "Fine Art Print" | "Artisan";
  /** PLACEHOLDER prices. Replace with real ones (currency is set in constants/site.ts). */
  price: number;
  art: ArtVariant;
  /** Room shown when the card is hovered. */
  scene: SceneKind;
  /** Optional photograph of the artwork, e.g. "/images/products/ayatul-kursi.jpg". */
  image?: string;
  /** Optional photograph of the artwork in a room (hover view). */
  sceneImage?: string;
};

/** What a collection can be filtered by. Must match `collectionFilters` in data/collections.ts. */
export type CollectionTag = "abstract" | "contemporary" | "classic" | "limited-editions" | "custom";

export type Collection = {
  name: string;
  description: string;
  art: ArtVariant;
  /** Filters this collection appears under (besides "All"). */
  tags: CollectionTag[];
  /** Image shape, varied on purpose so the grid reads like an exhibition. */
  ratio: "4/5" | "3/4" | "1/1" | "4/3" | "2/3";
  href: string;
  /** Optional photograph, e.g. "/images/collections/shadows.jpg". */
  image?: string;
};

export type JournalPost = Visual & {
  category: "Art & Design" | "Interiors" | "Inspiration";
  title: string;
  excerpt: string;
  href: string;
};
