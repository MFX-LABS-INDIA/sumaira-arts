import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WorkshopsView } from ".";

const meta = { title: "Templates/WorkshopsView", component: WorkshopsView } satisfies Meta<typeof WorkshopsView>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
