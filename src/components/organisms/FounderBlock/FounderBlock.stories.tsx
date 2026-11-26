import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FounderBlock } from ".";

const meta = {
  title: "Organisms/FounderBlock",
  component: FounderBlock,
  args: {  },
} satisfies Meta<typeof FounderBlock>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
