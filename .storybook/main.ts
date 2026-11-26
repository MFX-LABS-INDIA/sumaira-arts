import type { StorybookConfig } from "@storybook/nextjs-vite";
import { resolve } from "node:path";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  viteFinal(config) {
    config.plugins ??= [];
    config.plugins.unshift({
      name: "studio-preview-fixtures",
      enforce: "pre",
      resolveId(id) {
        if (/^@\/lib\/actions\/(enquiry|event-booking|workshop-booking)$/.test(id)) return resolve(".storybook/actions.fixture.ts");
        if (id.endsWith("/CountrySelect/useCountryDetection")) return resolve(".storybook/country.fixture.ts");
      },
    });
    return config;
  },
};
export default config;
