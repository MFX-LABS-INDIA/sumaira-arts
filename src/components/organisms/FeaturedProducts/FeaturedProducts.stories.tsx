import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturedProducts } from ".";

const meta = {
  title: "Organisms/FeaturedProducts",
  component: FeaturedProducts,
  args: {  },
} satisfies Meta<typeof FeaturedProducts>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
