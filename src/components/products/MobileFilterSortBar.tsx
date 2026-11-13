"use client";

import { memo, useCallback, useState, useEffect, useRef } from "react";
import { ArrowUpDown, Filter, X, Check, Search } from "lucide-react";
import type { CategoryOption } from "./CategoryFilter";

interface MobileFilterSortBarProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: "featured" | "price-asc" | "price-desc" | "rating") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: { label: string; detail: string }[];
}

const POPULAR_CATEGORIES = [
  { label: "Mixed Media Collections", id: "Mixed_Media_Canvas" },
  { label: "Mixed Media Artworks", id: "Mixed_Media_Artworks" },
  { label: "Original Texture Artworks", id: "Original_Texture" },
];

const SORT_OPTIONS: { value: "featured" | "price-asc" | "price-desc" | "rating"; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export const MobileFilterSortBar = memo<MobileFilterSortBarProps>(
  ({
    categories,
    selectedCategory,
    onSelectCategory,
    sortBy,
    onSortChange,
    searchQuery,
    onSearchChange,
    searchSuggestions,
  }) => {
    const [activeSheet, setActiveSheet] = useState<"sort" | "filter" | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const closeSheet = useCallback(() => setActiveSheet(null), []);

    useEffect(() => {
      if (activeSheet || isSearchOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [activeSheet, isSearchOpen]);

    useEffect(() => {
      if (isSearchOpen) searchRef.current?.focus();
    }, [isSearchOpen]);

    return (
      <>
        {/* Sticky Mobile Filter Bar */}
        <div className="sticky top-19 z-40 lg:hidden border-b border-light bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {/* Sort Trigger */}
              <button
                type="button"
                onClick={() => setActiveSheet("sort")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  sortBy !== "featured"
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "bg-white text-steel border-light hover:border-steel"
                }`}
              >
                <span>Sort</span>
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>

              {/* Filter Trigger */}
              <button
                type="button"
                onClick={() => setActiveSheet("filter")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                  selectedCategory !== "All"
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "bg-white text-steel border-light hover:border-steel"
                }`}
              >
                <span>Filter</span>
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-steel hover:text-deep transition-colors"
              aria-label="Search artworks"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Sheet Modal */}
        {activeSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            <div
              className="fixed inset-0 bg-deep/50 backdrop-blur-xs transition-opacity"
              onClick={closeSheet}
            />

            <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-raised max-h-[85vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-300">
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-light">
                <h3 className="font-serif text-lg font-light text-deep">
                  {activeSheet === "sort" ? "Sort Artworks" : "Filter by Category"}
                </h3>
                <button
                  type="button"
                  onClick={closeSheet}
                  className="p-1.5 text-steel hover:text-deep bg-ice rounded-full"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sheet Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {activeSheet === "sort" ? (
                  SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onSortChange(opt.value);
                        closeSheet();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-sm transition-all ${
                        sortBy === opt.value
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-steel hover:bg-ice/50 hover:text-deep"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.value && <Check className="w-4 h-4 text-brand" />}
                    </button>
                  ))
                ) : (
                  categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <label
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          closeSheet();
                        }}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer text-sm transition-all ${
                          isSelected
                            ? "bg-brand/10 text-brand font-semibold border border-brand/30"
                            : "hover:bg-ice/60 border border-transparent text-deep"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? "bg-brand border-brand"
                              : "border-steel/40 bg-white"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {isSearchOpen && (
          <div className="fixed inset-0 z-[60] bg-white lg:hidden">
            <div className="flex items-center gap-3 border-b border-light px-3 py-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-steel" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder="Search artworks..."
                  className="h-12 w-full rounded-xl border-2 border-deep bg-ice/30 pl-11 pr-4 text-base text-deep placeholder:text-steel focus:border-brand focus:bg-white focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="shrink-0 px-1 text-sm font-medium text-deep"
              >
                Cancel
              </button>
            </div>

            <div className="p-4">
              {searchQuery.trim() ? (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-steel">
                    Matching artworks
                  </p>
                  {searchSuggestions.length ? (
                    <ul className="overflow-hidden rounded-xl border border-light divide-y divide-light">
                      {searchSuggestions.map((suggestion) => (
                        <li key={suggestion.label}>
                          <button
                            type="button"
                            onClick={() => {
                              onSearchChange(suggestion.label);
                              setIsSearchOpen(false);
                            }}
                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-ice/60"
                          >
                            <span className="text-sm font-medium text-deep">{suggestion.label}</span>
                            <span className="text-xs text-steel">{suggestion.detail}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-xl bg-ice/60 p-4 text-sm text-steel">No artwork matches that search yet.</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-steel">
                    Popular categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          onSelectCategory(category.id);
                          setIsSearchOpen(false);
                        }}
                        className="rounded-full bg-ice px-4 py-2 text-sm text-steel transition-colors hover:bg-brand hover:text-white"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
);

MobileFilterSortBar.displayName = "MobileFilterSortBar";
