import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from ".";

const meta = {
  title: "Organisms/Footer",
  component: Footer,
  args: {  },
} satisfies Meta<typeof Footer>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
