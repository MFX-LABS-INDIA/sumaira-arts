import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { artist } from "@/data/artist";
import { RecognitionTimeline } from ".";

const meta = {
  title: "Organisms/RecognitionTimeline",
  component: RecognitionTimeline,
  args: { milestones: artist.milestones },
} satisfies Meta<typeof RecognitionTimeline>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
