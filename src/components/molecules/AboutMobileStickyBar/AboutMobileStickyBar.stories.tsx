import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AboutMobileStickyBar } from ".";

const meta = {
  title: "Molecules/AboutMobileStickyBar",
  component: AboutMobileStickyBar,
  args: {  },
} satisfies Meta<typeof AboutMobileStickyBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
