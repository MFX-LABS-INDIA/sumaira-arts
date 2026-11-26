import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { liveEventsData } from "@/data/live-events";
import { LiveEventsGallery } from ".";

const meta = {
  title: "Organisms/LiveEventsGallery",
  component: LiveEventsGallery,
  args: { items: liveEventsData.gallery },
} satisfies Meta<typeof LiveEventsGallery>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
