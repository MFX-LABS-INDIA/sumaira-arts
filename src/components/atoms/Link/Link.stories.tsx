import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonLink } from ".";

const meta = {
  title: "Atoms/Link",
  component: ButtonLink,
  args: { href: "/products", children: "Explore artworks" },
} satisfies Meta<typeof ButtonLink>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
