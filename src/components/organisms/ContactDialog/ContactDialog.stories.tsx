import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactDialog } from ".";

const meta = {
  title: "Organisms/ContactDialog",
  component: ContactDialog,
  args: {  },
} satisfies Meta<typeof ContactDialog>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
