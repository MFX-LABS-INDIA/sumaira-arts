import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Reveal } from ".";

const meta = {
  title: "Atoms/Reveal",
  component: Reveal,
  args: { children: "Studio collection" },
} satisfies Meta<typeof Reveal>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
