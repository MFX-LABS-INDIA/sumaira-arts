import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { artist } from "@/data/artist";
import { StudioTechnique } from ".";

const meta = {
  title: "Organisms/StudioTechnique",
  component: StudioTechnique,
  args: { steps: artist.craftSteps },
} satisfies Meta<typeof StudioTechnique>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
