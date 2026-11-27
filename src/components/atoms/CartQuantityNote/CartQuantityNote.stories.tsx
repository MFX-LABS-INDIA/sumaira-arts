import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartQuantityNote } from ".";

const meta = {
  title: "Atoms/CartQuantityNote",
  component: CartQuantityNote,
  args: { quantity: 1 },
} satisfies Meta<typeof CartQuantityNote>;

export default meta;
export const Single: StoryObj<typeof meta> = {};
export const Multiple: StoryObj<typeof meta> = { args: { quantity: 12 } };
