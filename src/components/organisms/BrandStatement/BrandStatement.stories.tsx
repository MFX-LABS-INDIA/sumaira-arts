import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BrandStatement } from ".";

const meta = {
  title: "Organisms/BrandStatement",
  component: BrandStatement,
  args: {  },
} satisfies Meta<typeof BrandStatement>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
