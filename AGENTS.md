<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Mandatory Post-Change & Git Deployment Workflow

Always follow [.agents/rules/post-change-git-workflow.md](.agents/rules/post-change-git-workflow.md) after completing any code, content, or asset change:

1. **Never auto-run** `npm run lint`, `npm test`, `npm run typecheck`, `npm run build`, `git` commands, or `vercel` deployments without explicit user approval.
2. **Always use the interactive `ask_question` pop-up tool (never plain-text questions)** to ask **ONE step at a time** (`Step 1/8` → `Step 8/8`) with clickable options (`(Recommended) Yes`, `No`, `Skip`, `Skip to Git`):
   - **Step 1/8:** Linting (`npm run lint`)
   - **Step 2/8:** Automated Unit & Component Tests (`npm test`)
   - **Step 3/8:** Type-check & build (`npm run typecheck && npm run build`)
   - **Step 4/8:** Pre-commit diff & status review (`git status -s && git diff --stat`)
   - **Step 5/8:** Stage files (`git add -A`)
   - **Step 6/8:** Commit with auto-drafted Conventional Commit message (`git commit -m "<type>(<scope>): <summary>"`)
   - **Step 7/8:** Sync & push branches (`git branch -f development HEAD; git push origin main development`)
   - **Step 8/8:** Deploy to production (`npx vercel --prod --yes`)
3. If the user clicks **No**, stop and ask what changes they want; once updated, restart from **Step 1/8**. If **Skip to Git**, jump directly to **Step 5/8**.
