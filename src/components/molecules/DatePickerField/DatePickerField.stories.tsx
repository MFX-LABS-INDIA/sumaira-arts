import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DatePickerField } from ".";

const meta = {
  title: "Molecules/DatePickerField",
  component: DatePickerField,
  args: { id: "date", name: "date", value: "", onChange: fn() },
} satisfies Meta<typeof DatePickerField>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
