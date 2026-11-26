import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { SelectField } from "./SelectField";
const meta = {
  title: "Molecules/SelectField",
  component: SelectField,
  args: { id: "category", name: "category", ariaLabel: "Category", options: ["Originals", "Mixed Media", "Collections"], value: "", onChange: () => {} },
  render: function Example(args) {
    const [value, setValue] = useState(args.value);
    return <div style={{ maxWidth: 320 }}><SelectField {...args} value={value} onChange={setValue} /></div>;
  },
} satisfies Meta<typeof SelectField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Selected: Story = { args: { value: "Originals" } };
export const Required: Story = { args: { required: true } };
export const Empty: Story = { args: { options: [] } };
