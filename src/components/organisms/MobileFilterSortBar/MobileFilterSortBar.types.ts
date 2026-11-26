import type { CategoryOption } from "@/components/organisms/CategoryFilter";

export type ArtworkSort = "featured" | "price-asc" | "price-desc" | "rating";

export interface MobileFilterSortBarProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: ArtworkSort) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: { label: string; detail: string }[];
}
