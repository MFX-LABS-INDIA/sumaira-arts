import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrivacyPolicy } from ".";

const meta = {
  title: "Organisms/PrivacyPolicy",
  component: PrivacyPolicy,
  args: { contactEmail: "studio@example.com" },
} satisfies Meta<typeof PrivacyPolicy>;

export default meta;
export const Default: StoryObj<typeof meta> = {};
