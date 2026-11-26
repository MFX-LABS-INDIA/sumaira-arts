import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InteriorShowcase } from ".";

const meta = {
  title: "Organisms/InteriorShowcase",
  component: InteriorShowcase,
  args: {  },
} satisfies Meta<typeof InteriorShowcase>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
