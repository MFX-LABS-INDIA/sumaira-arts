import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StarRating } from ".";

const meta = {
  title: "Atoms/StarRating",
  component: StarRating,
  args: { rating: 4.5, count: 12 },
} satisfies Meta<typeof StarRating>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
