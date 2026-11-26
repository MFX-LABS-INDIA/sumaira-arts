import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExperiencesBanner } from ".";

const meta = {
  title: "Organisms/ExperiencesBanner",
  component: ExperiencesBanner,
  args: {  },
} satisfies Meta<typeof ExperiencesBanner>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
