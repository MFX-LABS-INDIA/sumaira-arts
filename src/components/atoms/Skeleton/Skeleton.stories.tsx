import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Skeleton } from ".";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  args: { className: "h-12 w-56" },
} satisfies Meta<typeof Skeleton>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
