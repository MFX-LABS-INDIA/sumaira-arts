import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from ".";

const meta = {
  title: "Organisms/Header",
  component: Header,
  args: {  },
} satisfies Meta<typeof Header>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
