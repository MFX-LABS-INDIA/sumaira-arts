import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { StickyBookingBar } from ".";

const meta = {
  title: "Molecules/StickyBookingBar",
  component: StickyBookingBar,
  args: { buttonLabel: "Book workshop", icon: null, hidden: false, onAction: fn() },
} satisfies Meta<typeof StickyBookingBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
