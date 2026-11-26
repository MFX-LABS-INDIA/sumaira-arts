import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from ".";

const meta = {
  title: "Organisms/Hero",
  component: Hero,
  args: {  },
} satisfies Meta<typeof Hero>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
