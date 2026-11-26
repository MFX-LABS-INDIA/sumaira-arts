import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LiveEventBookingSection } from ".";

const meta = {
  title: "Organisms/LiveEventBookingSection",
  component: LiveEventBookingSection,
  args: {  },
} satisfies Meta<typeof LiveEventBookingSection>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
