import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReviewsWall } from ".";

const meta = {
  title: "Organisms/ReviewsWall",
  component: ReviewsWall,
  args: {  },
} satisfies Meta<typeof ReviewsWall>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
