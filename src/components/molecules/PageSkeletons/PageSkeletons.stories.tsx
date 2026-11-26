import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CatalogPageSkeleton } from ".";

const meta = {
  title: "Molecules/PageSkeletons",
  component: CatalogPageSkeleton,
  args: {  },
} satisfies Meta<typeof CatalogPageSkeleton>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
