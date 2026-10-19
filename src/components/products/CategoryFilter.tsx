"use client";

import { memo, useCallback, Fragment } from "react";
import { ChevronUp, X } from "lucide-react";

export interface CategoryOption {
  id: string;
  label: string;
  count?: number;
}

interface CategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  isMobile?: boolean;
  isSectionOpen: boolean;
  onSectionToggle: (isOpen: boolean) => void;
  isModalOpen: boolean;
  onModalToggle: (isOpen: boolean) => void;
}

const CategoryListItem = memo<{
  category: CategoryOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}>(({ category, isSelected, onSelect }) => {
  return (
    <label
      onClick={() => onSelect(category.id)}
      className={`flex items-center text-sm cursor-pointer rounded-lg px-3.5 py-3 transition-all duration-200 ${
        isSelected
          ? "bg-brand/10 border border-brand/30 shadow-xs"
          : "hover:bg-ice/60 border border-transparent hover:border-light"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          name="artwork-category"
          checked={isSelected}
          onChange={() => onSelect(category.id)}
          className="sr-only"
          aria-label={`Select ${category.label}`}
        />
        {/* Radio Circle */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isSelected
              ? "bg-brand border-brand shadow-xs"
              : "bg-white border-steel/40 hover:border-brand hover:bg-brand/5"
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      <span
        className={`ml-3.5 flex-1 text-sm font-medium transition-colors ${
          isSelected ? "text-brand font-semibold" : "text-deep"
        }`}
      >
        {category.label}
      </span>

      {category.count !== undefined && (
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded-full ${
            isSelected ? "bg-brand text-white" : "bg-ice text-steel"
          }`}
        >
          {category.count}
        </span>
      )}
    </label>
  );
});

CategoryListItem.displayName = "CategoryListItem";

export const CategoryFilter = memo<CategoryFilterProps>(
  ({
    categories,
    selectedCategory,
    onSelectCategory,
    isMobile,
    isSectionOpen,
    onSectionToggle,
    isModalOpen,
    onModalToggle,
  }) => {
    const handleModalOpen = useCallback(() => onModalToggle(true), [onModalToggle]);
    const handleModalClose = useCallback(() => onModalToggle(false), [onModalToggle]);
    const handleSectionToggle = useCallback(
      () => onSectionToggle(!isSectionOpen),
      [isSectionOpen, onSectionToggle]
    );

    if (isMobile) {
      return (
        <Fragment>
          <div>
            <button
              type="button"
              onClick={handleModalOpen}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-light shadow-xs"
              aria-expanded={isModalOpen}
              aria-label="Open category filter"
            >
              <div className="text-sm font-semibold uppercase tracking-wider text-deep">
                Category Filter
              </div>
              <ChevronUp className="w-4 h-4 rotate-180 text-steel" aria-hidden="true" />
            </button>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
              aria-modal="true"
              role="dialog"
            >
              <div
                className="fixed inset-0 bg-deep/50 backdrop-blur-xs transition-opacity"
                onClick={handleModalClose}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-raised overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-light">
                  <h3 className="font-serif text-lg font-light text-deep">Filter by Category</h3>
                  <button
                    onClick={handleModalClose}
                    aria-label="Close category filter"
                    className="text-steel hover:text-deep transition-colors p-1"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-5 space-y-2">
                  {categories.map((cat) => (
                    <CategoryListItem
                      key={cat.id}
                      category={cat}
                      isSelected={selectedCategory === cat.id}
                      onSelect={(id) => {
                        onSelectCategory(id);
                        handleModalClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Fragment>
      );
    }

    return (
      <fieldset
        aria-label="Artwork categories"
        className="bg-white rounded-2xl border border-light shadow-sm overflow-hidden"
      >
        <button
          type="button"
          onClick={handleSectionToggle}
          className="w-full flex items-center justify-between px-5 py-4.5 bg-white hover:bg-ice/30 transition-colors group"
          aria-expanded={isSectionOpen}
          aria-label={`${isSectionOpen ? "Close" : "Open"} category filter`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-deep">
              Categories
            </span>
          </div>
          <ChevronUp
            className={`w-4 h-4 text-steel transition-transform duration-300 ${
              isSectionOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {isSectionOpen && (
          <div className="border-t border-light px-4 py-4 space-y-1.5">
            {categories.map((cat) => (
              <CategoryListItem
                key={cat.id}
                category={cat}
                isSelected={selectedCategory === cat.id}
                onSelect={onSelectCategory}
              />
            ))}
          </div>
        )}
      </fieldset>
    );
  }
);

CategoryFilter.displayName = "CategoryFilter";
