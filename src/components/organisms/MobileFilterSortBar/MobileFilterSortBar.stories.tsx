import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { MobileFilterSortBar } from ".";

const meta = {
  title: "Organisms/MobileFilterSortBar",
  component: MobileFilterSortBar,
  args: { categories: [], selectedCategory: "all", onSelectCategory: fn(), sortBy: "featured", onSortChange: fn(), searchQuery: "", onSearchChange: fn(), searchSuggestions: [] },
} satisfies Meta<typeof MobileFilterSortBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const WithSearchResults: StoryObj<typeof meta> = {
  args: { searchQuery: "Depths", searchSuggestions: [{ label: "Depths of Tawbah", detail: "Original artwork" }] },
};
