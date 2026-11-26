import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { products } from "@/data/products";
import { ProductCard } from ".";

const meta = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  args: { product: products[0], index: 0 },
} satisfies Meta<typeof ProductCard>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
