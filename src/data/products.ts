import type { Cta } from "@/types/content";
import productsData from "./products.json";
import type { Product as StoreProduct } from "@/types/store";

export const featured = {
  eyebrow: "Curated For You",
  title: "Most Loved Artworks",
  description:
    "Explore a selection of distinctive artworks chosen for their beauty, craftsmanship and ability to transform a space.",
  cta: { label: "View All Artwork", href: "/products" } satisfies Cta,
};

// Strongly typed products exported from products.json
export const allProducts: StoreProduct[] = productsData as unknown as StoreProduct[];

// Helper to format category for UI display
export const formatCategoryLabel = (category: string) => {
  switch (category) {
    case "Mixed_Media_Canvas":
      return "Mixed Media Canvas";
    case "Original_Texture":
      return "Original Texture";
    case "Collections":
      return "Collections";
    default:
      return category.replace(/_/g, " ");
  }
};

// Subsets
export const mostLovedProducts: StoreProduct[] = allProducts.filter((p) => p.isMostLoved);
export const featuredProducts: StoreProduct[] = allProducts.filter((p) => p.isFeatured);
export const mixedMediaProducts: StoreProduct[] = allProducts.filter((p) => p.category === "Mixed_Media_Canvas");
export const originalTextureProducts: StoreProduct[] = allProducts.filter((p) => p.category === "Original_Texture");
export const collectionsProducts: StoreProduct[] = allProducts.filter((p) => p.category === "Collections");

// Backward-compatible products list
export const products = allProducts.map((p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  titleAr: p.titleAr,
  category: p.category.includes("Mixed_Media")
    ? ("Mixed Media" as const)
    : ("Original Texture" as const),
  categoryRaw: p.category,
  price: p.priceUSD,
  art: (p.artVariant || "allah") as any,
  scene: (p.scene || "living") as any,
  image: p.image,
  sceneImage: p.sceneImage,
  gallery: p.gallery,
  rating: p.rating,
  reviewCount: p.reviews,
  soldOut: !p.inStock,
  description: p.description,
  booked: p.booked,
  features: p.features,
  dimensions: p.dimensions,
  medium: p.medium,
  frame: p.frame,
}));
