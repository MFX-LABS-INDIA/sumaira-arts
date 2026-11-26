import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArtistFounderHero } from ".";

const meta = {
  title: "Organisms/ArtistFounderHero",
  component: ArtistFounderHero,
  args: {  },
} satisfies Meta<typeof ArtistFounderHero>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
