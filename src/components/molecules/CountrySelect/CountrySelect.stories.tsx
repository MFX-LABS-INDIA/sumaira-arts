import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CountrySelect } from ".";

const meta = {
  title: "Molecules/CountrySelect",
  component: CountrySelect,
  args: { value: "AE", onChange: fn() },
} satisfies Meta<typeof CountrySelect>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
