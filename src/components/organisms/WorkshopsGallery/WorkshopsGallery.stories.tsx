import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { workshopsData } from "@/data/workshops";
import { WorkshopsGallery } from ".";

const meta = {
  title: "Organisms/WorkshopsGallery",
  component: WorkshopsGallery,
  args: { items: workshopsData.gallery },
} satisfies Meta<typeof WorkshopsGallery>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
