import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mirage } from "@/data/collections";
import { ImageWithText } from ".";

const meta = {
  title: "Molecules/ImageWithText",
  component: ImageWithText,
  args: { feature: mirage },
} satisfies Meta<typeof ImageWithText>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
