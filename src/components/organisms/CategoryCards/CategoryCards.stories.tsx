import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryCards } from ".";

const meta = {
  title: "Organisms/CategoryCards",
  component: CategoryCards,
  args: {  },
} satisfies Meta<typeof CategoryCards>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
