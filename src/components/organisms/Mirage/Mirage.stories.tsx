import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mirage } from ".";

const meta = {
  title: "Organisms/Mirage",
  component: Mirage,
  args: {  },
} satisfies Meta<typeof Mirage>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
