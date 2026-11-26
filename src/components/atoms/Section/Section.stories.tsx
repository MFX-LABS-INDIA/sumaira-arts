import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from ".";

const meta = {
  title: "Atoms/Section",
  component: Section,
  args: { children: "Studio collection" },
} satisfies Meta<typeof Section>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
