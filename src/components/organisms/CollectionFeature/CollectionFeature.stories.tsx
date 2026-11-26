import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CollectionFeature } from ".";

const meta = {
  title: "Organisms/CollectionFeature",
  component: CollectionFeature,
  args: {  },
} satisfies Meta<typeof CollectionFeature>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
