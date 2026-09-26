// Keeps the docs honest. A dead pointer is worse than none: an agent follows it and finds nothing.
// Checks: relative links resolve, ADR frontmatter is valid and its `affects:` paths exist,
// and every doc and ADR is listed in its index. See docs/CONTEXT_ARCHITECTURE.md.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

// Git on Windows checks files out with CRLF line endings; normalise so the patterns below match either way.
const read = (path) => readFileSync(path, "utf8").replace(/\r\n/g, "\n");

const errors = [];
const fail = (message) => errors.push(message);

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name.startsWith(".git")) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
};

const docs = [
  ...["CLAUDE.md", "README.md"].filter(existsSync),
  ...walk("docs").filter((p) => p.endsWith(".md")),
  ...walk("src").filter((p) => p.endsWith("CLAUDE.md")),
];

// 1. Relative links resolve.
for (const file of docs) {
  const text = read(file).replace(/```[\s\S]*?```/g, "");
  for (const [, target] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const path = resolve(dirname(file), target.split("#")[0]);
    if (!existsSync(path)) fail(`${file}: dead link -> ${target}`);
  }
}

// 2. ADR frontmatter.
const STATUSES = ["proposed", "accepted", "superseded", "rejected"];
const adrFiles = readdirSync("docs/adr").filter((f) => /^\d{4}-.+\.md$/.test(f) && !f.startsWith("0000-"));
for (const name of adrFiles) {
  const file = join("docs/adr", name);
  const source = read(file);
  const front = source.match(/^---\n([\s\S]*?)\n---/);
  if (!front) {
    fail(`${file}: missing frontmatter`);
    continue;
  }
  const id = front[1].match(/^id:\s*ADR-(\d{4})/m)?.[1];
  if (id !== name.slice(0, 4)) fail(`${file}: frontmatter id does not match the filename number`);
  const status = front[1].match(/^status:\s*(\w+)/m)?.[1];
  if (!STATUSES.includes(status ?? "")) fail(`${file}: status must be one of ${STATUSES.join(", ")}`);
  const affects = [...(front[1].match(/^affects:\n((?:\s+-\s+.+\n?)+)/m)?.[1] ?? "").matchAll(/^\s+-\s+(.+)$/gm)].map((m) => m[1].trim());
  if (!affects.length) fail(`${file}: no affects: a decision that reaches no code is a diary entry`);
  // A superseded or rejected decision describes code that may since have moved or been removed.
  const live = status === "accepted" || status === "proposed";
  for (const path of affects) if (live && !existsSync(path)) fail(`${file}: affects a path that does not exist -> ${path}`);
}

// 3. Everything is indexed.
const docIndex = read("docs/00-INDEX.md");
for (const name of readdirSync("docs").filter((f) => f.endsWith(".md") && f !== "00-INDEX.md")) {
  if (!docIndex.includes(name)) fail(`docs/${name}: not listed in docs/00-INDEX.md`);
}
const adrIndex = read("docs/adr/index.md");
for (const name of adrFiles) if (!adrIndex.includes(name)) fail(`docs/adr/${name}: not listed in docs/adr/index.md`);

if (errors.length) {
  console.error(`Docs check failed (${errors.length}):\n` + errors.map((e) => `  - ${relative(".", e.split(":")[0])}${e.slice(e.indexOf(":"))}`).join("\n"));
  process.exit(1);
}
console.log(`Docs check ok: ${docs.length} files, ${adrFiles.length} ADRs.`);
