"use client";

import { useState, useMemo, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Sparkles } from "lucide-react";
import { allProducts, formatCategoryLabel } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { CategoryFilter, type CategoryOption } from "@/components/products/CategoryFilter";
import { MobileFilterSortBar } from "@/components/products/MobileFilterSortBar";
import { Container } from "@/components/ui/Container";
import type { ArtVariant } from "@/components/art/variants";
import type { SceneKind } from "@/components/art/scenes";
import type { Product } from "@/types/content";

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "All", label: "All Products" },
  { id: "Mixed_Media_Canvas", label: "Mixed Media Collections" },
  { id: "Mixed_Media_Artworks", label: "Mixed Media Artworks" },
  { id: "Original_Texture", label: "Original Texture Artworks" },
];

const INITIAL_LOAD_COUNT = 9;
const BATCH_LOAD_COUNT = 6;
type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleCount(INITIAL_LOAD_COUNT);
    if (categoryId === "All") {
      router.push("/products", { scroll: false });
    } else {
      router.push(`/products?category=${categoryId}`, { scroll: false });
    }
  };

  // Counts for sidebar badges
  const categoriesWithCounts = useMemo(() => {
    return CATEGORY_OPTIONS.map((opt) => {
      if (opt.id === "All") {
        return { ...opt, count: allProducts.length };
      }
      const count = allProducts.filter((p) => p.category === opt.id).length;
      return { ...opt, count };
    });
  }, []);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        if (selectedCategory !== "All" && product.category !== selectedCategory) {
          return false;
        }

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = product.title.toLowerCase().includes(query);
          const matchesDesc = product.description.toLowerCase().includes(query);
          const matchesCat = product.category.toLowerCase().includes(query);
          if (!matchesTitle && !matchesDesc && !matchesCat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
        if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  const searchSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allProducts
      .filter((product) =>
        [product.title, product.titleAr, product.description, product.medium]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query))
      )
      .slice(0, 6)
      .map((product) => ({
        label: product.title,
        detail: formatCategoryLabel(product.category),
      }));
  }, [searchQuery]);

  // Viewport progressive pagination
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_LOAD_COUNT, filteredProducts.length));
  }, [filteredProducts.length]);

  // Render additional artwork only when the visitor approaches the end of the list.
  // Product data is static and included in the prerendered route; image requests remain lazy
  // and are cached by the browser/Next image optimizer after their first viewport entry.
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className="min-h-screen bg-ice/30 pb-24">
      {/* Mobile Sticky Bar identical to Arabian Sand Dunes */}
      <MobileFilterSortBar
        categories={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setVisibleCount(INITIAL_LOAD_COUNT);
        }}
        searchSuggestions={searchSuggestions}
      />

      <div className="pt-4 sm:pt-10">
        <Container>
          {/* Header Banner */}
          <div className="mb-5 hidden border-b border-light pb-5 lg:mb-10 lg:block sm:pb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
              <div>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-deep leading-tight">
                  Sumaira Arts Gallery Products
                </h1>
                <p className="mt-1 sm:mt-2 text-xs sm:text-base text-steel max-w-xl leading-relaxed">
                  Browse by artwork category, signature collection, or search specific verses and textures.
                </p>
              </div>

            </div>
          </div>

          {/* Main 2-Column Layout */}
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-stretch lg:gap-8">
            {/* Desktop Left Sidebar with Category Radio options */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-2xl border border-light bg-white p-4 shadow-sm">
                  <label htmlFor="catalogue-search" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-deep">
                    Find an artwork
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel" />
                    <input
                      id="catalogue-search"
                      ref={searchInputRef}
                      type="search"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleCount(INITIAL_LOAD_COUNT);
                      }}
                      placeholder="Title, verse, medium..."
                      className="h-11 w-full rounded-lg border border-light bg-ice/30 pl-9 pr-3 text-xs text-deep placeholder:text-steel focus:border-brand focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
                <CategoryFilter
                  categories={categoriesWithCounts}
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleSelectCategory}
                  isMobile={false}
                  isSectionOpen={isSectionOpen}
                  onSectionToggle={setIsSectionOpen}
                  isModalOpen={false}
                  onModalToggle={() => {}}
                />
              </div>
            </aside>

            {/* Right Product Grid Area */}
            <div className="flex-1 min-w-0 w-full">
              {/* Top Controls Bar */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-light/60 pb-3 sm:pb-4">
                <p className="text-xs text-steel">
                  Showing <strong className="text-deep font-semibold">{displayedProducts.length}</strong> of{" "}
                  <strong className="text-deep font-semibold">{filteredProducts.length}</strong> products
                </p>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs text-steel">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="h-9 rounded-lg border border-light bg-white px-3 text-xs font-medium text-deep shadow-xs focus:border-brand focus:outline-none"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {displayedProducts.length === 0 ? (
                <div className="rounded-2xl border border-light bg-white py-16 text-center shadow-xs">
                  <Sparkles className="mx-auto h-12 w-12 text-mist" />
                  <h3 className="mt-4 font-serif text-xl font-normal text-deep">
                    No products found
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-steel">
                    No artworks matched your selected category and search keywords.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-6 rounded-lg bg-brand px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-raised hover:bg-deep transition-colors"
                  >
                    Reset Category
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
                    {displayedProducts.map((p, index) => (
                      <ProductCard
                        key={p.id || p.slug}
                        disableReveal={true}
                        product={{
                          ...p,
                          price: p.priceUSD,
                          category: p.category === "Mixed_Media_Artworks"
                            ? "Mixed Media Artworks"
                            : p.category.includes("Mixed_Media")
                            ? "Mixed Media Collections"
                            : p.category.includes("Original")
                            ? "Original Texture Artworks"
                            : "Collections",
                          reviewCount: p.reviews,
                          soldOut: !p.inStock,
                          art: (p.artVariant || "allah") as ArtVariant,
                          scene: (p.scene || "living") as SceneKind,
                        } as Product}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Viewport-triggered progressive rendering */}
                  {hasMore && (
                    <div ref={loadMoreRef} className="mt-8 flex justify-center py-3" aria-live="polite">
                      <div className="flex items-center gap-2 text-xs text-steel">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                        Loading more artworks…
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ice/30 py-16 flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
