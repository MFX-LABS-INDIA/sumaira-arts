import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Commission } from ".";

const meta = {
  title: "Organisms/Commission",
  component: Commission,
  args: {  },
} satisfies Meta<typeof Commission>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
