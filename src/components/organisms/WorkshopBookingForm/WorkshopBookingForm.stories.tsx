import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkshopBookingForm } from ".";

const meta = {
  title: "Organisms/WorkshopBookingForm",
  component: WorkshopBookingForm,
  args: {  },
} satisfies Meta<typeof WorkshopBookingForm>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
