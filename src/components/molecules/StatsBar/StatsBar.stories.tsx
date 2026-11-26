import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatsBar } from ".";

const meta = {
  title: "Molecules/StatsBar",
  component: StatsBar,
  args: { items: [{ label: "Artists", value: "12", icon: null }] },
} satisfies Meta<typeof StatsBar>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
