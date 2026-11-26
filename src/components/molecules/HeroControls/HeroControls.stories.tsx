import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeroControls } from ".";

const meta = {
  title: "Molecules/HeroControls",
  component: HeroControls,
  args: { count: 3, labels: { slide: "Slide", of: "of", previous: "Previous", next: "Next", goTo: "Go to", pause: "Pause", play: "Play" } },
} satisfies Meta<typeof HeroControls>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
