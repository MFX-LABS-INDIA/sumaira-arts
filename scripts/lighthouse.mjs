// Measures the production build the way docs/PERFORMANCE.md describes: Lighthouse, mobile profile
// (slow 4G, 4x CPU slowdown), against `next start`. Run `npm run build` first.
//
//   npm run perf              # 3 runs, prints the median and the spread
//   npm run perf -- --runs 5
//
// Needs Chrome (set CHROME_PATH if it is not found). Do not run other heavy work while it measures:
// CPU contention inflates the trace and the score with it.
import { execSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = 3199;
const runs = Number(process.argv[process.argv.indexOf("--runs") + 1]) || 3;
const dir = mkdtempSync(join(tmpdir(), "sumaira-perf-"));

// Start Next directly through node (no shell), so the process we kill is the server itself.
const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], { stdio: "ignore" });
const cleanup = () => {
  server.kill();
  rmSync(dir, { recursive: true, force: true });
};
process.on("exit", cleanup);

async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}`)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  console.error("Server did not start. Did you run `npm run build`?");
  process.exit(1);
}

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const metrics = {
  score: (r) => Math.round(r.categories.performance.score * 100),
  "LCP (s)": (r) => r.audits["largest-contentful-paint"].numericValue / 1000,
  "FCP (s)": (r) => r.audits["first-contentful-paint"].numericValue / 1000,
  "TBT (ms)": (r) => r.audits["total-blocking-time"].numericValue,
  CLS: (r) => r.audits["cumulative-layout-shift"].numericValue,
  "Speed Index (s)": (r) => r.audits["speed-index"].numericValue / 1000,
  "Transferred (KiB)": (r) => r.audits["total-byte-weight"].numericValue / 1024,
};

await waitForServer();
const reports = [];
for (let i = 1; i <= runs; i++) {
  const out = join(dir, `run${i}.json`);
  console.log(`Lighthouse run ${i}/${runs}...`);
  // One quoted command string, so the Chrome flags reach Chrome intact on every OS.
  const command = `npx --yes lighthouse http://localhost:${PORT} --only-categories=performance --output=json --output-path="${out}" --quiet --chrome-flags="--headless=new --no-sandbox --disable-gpu"`;
  try {
    execSync(command, { stdio: "inherit" });
  } catch {
    console.error("Lighthouse failed. Is Chrome installed? Set CHROME_PATH if it is not found.");
    process.exit(1);
  }
  reports.push(JSON.parse(readFileSync(out, "utf8")));
}

console.log(`\nMedian of ${runs} run(s) (min - max):`);
for (const [name, read] of Object.entries(metrics)) {
  const values = reports.map(read);
  const fmt = (v) => (Number.isInteger(v) ? String(v) : v.toFixed(name === "CLS" ? 3 : 1));
  console.log(`  ${name.padEnd(18)} ${fmt(median(values)).padStart(7)}   (${fmt(Math.min(...values))} - ${fmt(Math.max(...values))})`);
}
process.exit(0);
