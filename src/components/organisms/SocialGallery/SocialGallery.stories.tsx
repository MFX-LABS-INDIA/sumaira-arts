import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialGallery } from ".";

const meta = {
  title: "Organisms/SocialGallery",
  component: SocialGallery,
  args: {  },
} satisfies Meta<typeof SocialGallery>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
