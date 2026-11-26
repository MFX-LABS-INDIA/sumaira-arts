import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CollectionGrid } from ".";

const meta = {
  title: "Organisms/CollectionGrid",
  component: CollectionGrid,
  args: {  },
} satisfies Meta<typeof CollectionGrid>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
