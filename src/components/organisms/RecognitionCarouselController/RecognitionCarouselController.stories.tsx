import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RecognitionCarouselController } from ".";

const meta = {
  title: "Organisms/RecognitionCarouselController",
  component: RecognitionCarouselController,
  args: { milestoneCount: 1, children: "Studio exhibition" },
} satisfies Meta<typeof RecognitionCarouselController>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
