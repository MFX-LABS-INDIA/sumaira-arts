import type { Preview } from "@storybook/nextjs-vite";
import { createElement } from "react";
import { ReduxProvider } from "../src/components/providers/ReduxProvider";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  decorators: [Story => createElement(ReduxProvider, null, createElement(Story))],
};
export default preview;
