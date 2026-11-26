import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LiveEventsView } from ".";

const meta = { title: "Templates/LiveEventsView", component: LiveEventsView } satisfies Meta<typeof LiveEventsView>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
