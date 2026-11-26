import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArchiveCarouselController } from ".";

const meta = {
  title: "Organisms/ArchiveCarouselController",
  component: ArchiveCarouselController,
  args: { categories: [{ name: "All", count: 1 }], children: "Artwork" },
} satisfies Meta<typeof ArchiveCarouselController>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
