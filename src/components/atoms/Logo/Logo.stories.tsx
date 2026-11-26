import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from ".";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  args: {  },
} satisfies Meta<typeof Logo>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
