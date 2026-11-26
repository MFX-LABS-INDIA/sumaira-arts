import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Container } from ".";

const meta = {
  title: "Atoms/Container",
  component: Container,
  args: { children: "Studio collection" },
} satisfies Meta<typeof Container>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
