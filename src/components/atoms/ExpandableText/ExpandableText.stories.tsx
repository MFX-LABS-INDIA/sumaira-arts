import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExpandableText } from ".";

const meta = {
  title: "Atoms/ExpandableText",
  component: ExpandableText,
  args: { text: "Handwritten Arabic calligraphy on textured canvas. ".repeat(12) },
} satisfies Meta<typeof ExpandableText>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
