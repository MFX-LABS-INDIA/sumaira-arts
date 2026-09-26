// WCAG contrast for the token pairs the design actually uses. Fails below AA.
// Colours are read from src/app/globals.css, so a rebrand is checked without touching this file.
// Add a pair here when you start using a new foreground/background combination. See docs/DESIGN_SYSTEM.md.
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");
const colour = Object.fromEntries([...css.matchAll(/--color-([a-z]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));

const luminance = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(colour[a]), luminance(colour[b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, kind]: "text" needs 4.5:1, "ui" (icons, borders, focus rings) needs 3:1.
// `mist` on white is 3.5:1, so it is a "ui" colour only. Never use it for body text on light surfaces.
const PAIRS = [
  ["deep", "white", "text"],
  ["deep", "ice", "text"],
  ["steel", "white", "text"],
  ["steel", "ice", "text"],
  ["steel", "light", "text"],
  ["brand", "white", "text"],
  ["white", "brand", "text"],
  ["white", "deep", "text"],
  ["light", "deep", "text"],
  ["soft", "deep", "text"],
  ["ice", "deep", "text"],
  ["mist", "deep", "text"],
  ["mist", "white", "ui"],
];

let failed = false;
console.log("Contrast (WCAG AA)");
for (const [fg, bg, kind] of PAIRS) {
  if (!colour[fg] || !colour[bg]) {
    console.error(`  FAIL  ${fg} on ${bg}: token not found in globals.css`);
    failed = true;
    continue;
  }
  const need = kind === "text" ? 4.5 : 3;
  const got = ratio(fg, bg);
  const bad = got < need;
  failed ||= bad;
  console.log(`  ${bad ? "FAIL" : "ok  "}  ${`${fg} on ${bg}`.padEnd(16)} ${got.toFixed(2).padStart(6)}:1  (${kind} needs ${need}:1)`);
}
if (failed) process.exit(1);
