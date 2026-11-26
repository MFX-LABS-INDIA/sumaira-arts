import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { allProducts } from "@/data/products";
import { ProductImageCarousel } from ".";

const meta = {
  title: "Organisms/ProductImageCarousel",
  component: ProductImageCarousel,
  args: { images: [allProducts[0].image], productName: allProducts[0].title },
} satisfies Meta<typeof ProductImageCarousel>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
