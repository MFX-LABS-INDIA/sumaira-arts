import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EnquiryForm } from ".";

const meta = {
  title: "Organisms/EnquiryForm",
  component: EnquiryForm,
  args: {  },
} satisfies Meta<typeof EnquiryForm>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
