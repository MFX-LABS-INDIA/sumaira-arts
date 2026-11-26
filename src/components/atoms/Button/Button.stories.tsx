import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from ".";

const meta = { title: "Atoms/Button", component: Button, args: { children: "Try again" } } satisfies Meta<typeof Button>;
export default meta;
export const Default: StoryObj<typeof meta> = {};
export const Disabled: StoryObj<typeof meta> = { args: { disabled: true } };
