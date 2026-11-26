import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteChrome } from ".";

const meta = { title: "Templates/SiteChrome", component: SiteChrome, args: { children: "Artwork collection" } } satisfies Meta<typeof SiteChrome>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
