import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CategoryFilter } from ".";

const meta = {
  title: "Organisms/CategoryFilter",
  component: CategoryFilter,
  args: { categories: [{ id: "all", label: "All artworks" }], selectedCategory: "all", onSelectCategory: fn(), isSectionOpen: true, onSectionToggle: fn(), isModalOpen: false, onModalToggle: fn() },
} satisfies Meta<typeof CategoryFilter>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Collapsed: StoryObj<typeof meta> = { args: { isSectionOpen: false } };
export const MobileDialog: StoryObj<typeof meta> = { args: { isMobile: true, isModalOpen: true } };
