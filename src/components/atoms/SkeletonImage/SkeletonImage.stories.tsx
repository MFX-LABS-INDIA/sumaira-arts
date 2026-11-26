import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SkeletonImage } from ".";

const meta = {
  title: "Atoms/SkeletonImage",
  component: SkeletonImage,
  args: { src: "/assets/brand/logo.png", width: 160, height: 100, alt: "Sumaira Arts" },
} satisfies Meta<typeof SkeletonImage>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
