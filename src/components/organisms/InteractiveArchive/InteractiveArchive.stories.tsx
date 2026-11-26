import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InteractiveArchive } from ".";

const meta = {
  title: "Organisms/InteractiveArchive",
  component: InteractiveArchive,
  args: {  },
} satisfies Meta<typeof InteractiveArchive>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
