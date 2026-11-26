import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { allProducts } from "@/data/products";
import { ProductDetailsClient } from ".";

const meta = {
  title: "Organisms/ProductDetailsClient",
  component: ProductDetailsClient,
  args: { product: allProducts[0] },
} satisfies Meta<typeof ProductDetailsClient>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
