import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkshopBookingSection } from ".";

const meta = {
  title: "Organisms/WorkshopBookingSection",
  component: WorkshopBookingSection,
  args: {  },
} satisfies Meta<typeof WorkshopBookingSection>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
