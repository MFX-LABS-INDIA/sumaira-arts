import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartDrawer } from ".";

const meta = {
  title: "Organisms/CartDrawer",
  component: CartDrawer,
  args: {  },
} satisfies Meta<typeof CartDrawer>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
