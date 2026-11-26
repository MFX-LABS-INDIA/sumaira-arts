import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LiveEventBookingForm } from ".";

const meta = {
  title: "Organisms/LiveEventBookingForm",
  component: LiveEventBookingForm,
  args: {  },
} satisfies Meta<typeof LiveEventBookingForm>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
