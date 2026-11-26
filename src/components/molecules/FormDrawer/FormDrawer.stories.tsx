import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { FormDrawer } from ".";

const meta = {
  title: "Molecules/FormDrawer",
  component: FormDrawer,
  args: { isOpen: true, onClose: fn(), title: "Book a workshop", children: "Choose your preferred session." },
} satisfies Meta<typeof FormDrawer>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
export const WithSubtitle: StoryObj<typeof meta> = {
  args: { subtitle: "We will reply with available dates and details." },
};
