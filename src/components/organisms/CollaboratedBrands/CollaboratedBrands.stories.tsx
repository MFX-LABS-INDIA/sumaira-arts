import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CollaboratedBrands } from ".";

const meta = {
  title: "Organisms/CollaboratedBrands",
  component: CollaboratedBrands,
  args: {  },
} satisfies Meta<typeof CollaboratedBrands>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
