import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StarIcon } from ".";

const meta = {
  title: "Atoms/Icons",
  component: StarIcon,
  args: {  },
} satisfies Meta<typeof StarIcon>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
