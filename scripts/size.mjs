// Size budgets for the home page, read straight from the production build (no server needed).
// Run `npm run build` first. Fails when a budget is exceeded. See docs/PERFORMANCE.md.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

// Each is roughly current size plus ~10% headroom. Raising one needs a reason in the PR.
const BUDGETS = {
  "Initial JS (gzip KB)": 160,
  "HTML (gzip KB)": 60,
  "CSS (gzip KB)": 15,
  "DOM elements": 2300,
};

const build = ".next";
const pagePath = join(build, "server", "app", "index.html");
if (!existsSync(pagePath)) {
  console.error(`No ${pagePath}. Run \`npm run build\` first.`);
  process.exit(1);
}

const html = readFileSync(pagePath, "utf8");
const gzipKB = (input) => gzipSync(input).length / 1024;
const fromBuild = (url) => readFileSync(join(build, url.split("?")[0].replace(/^\/_next\//, "")));

// Browsers that support modules never download `noModule` scripts (legacy polyfills), so they
// do not count towards the initial JavaScript a visitor pays for.
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].filter((m) => !/\bnoModule\b/i.test(m[0])).map((m) => m[1]);
const styles = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map((m) => m[1]);

const measured = {
  "Initial JS (gzip KB)": scripts.reduce((sum, url) => sum + gzipKB(fromBuild(url)), 0),
  "HTML (gzip KB)": gzipKB(html),
  "CSS (gzip KB)": styles.reduce((sum, url) => sum + gzipKB(fromBuild(url)), 0),
  "DOM elements": (html.match(/<[a-zA-Z][^\s/>]*/g) ?? []).length,
};

let failed = false;
console.log("Home page budgets");
for (const [name, budget] of Object.entries(BUDGETS)) {
  const value = measured[name];
  const over = value > budget;
  failed ||= over;
  const shown = name === "DOM elements" ? String(value) : value.toFixed(1);
  console.log(`  ${over ? "FAIL" : "ok  "}  ${name.padEnd(22)} ${shown.padStart(7)}  / ${budget}`);
}
if (failed) {
  console.error("\nOver budget. Find what grew (docs/PERFORMANCE.md), or justify raising the budget in the PR.");
  process.exit(1);
}
