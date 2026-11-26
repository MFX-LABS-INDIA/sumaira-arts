import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from ".";

const meta = {
  title: "Molecules/SectionHeading",
  component: SectionHeading,
  args: { title: "The collections", description: "Explore original artworks." },
} satisfies Meta<typeof SectionHeading>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
