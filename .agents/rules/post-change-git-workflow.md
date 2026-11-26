# Post-Change Quality, Git & Deployment Workflow Rules

## Core Directive

Whenever you finish implementing code changes, fixing a bug, converting/updating assets, or completing a task, **DO NOT** automatically run `git` commands, lint/test/typecheck/build scripts, or deployment pipelines without explicit user approval.

Instead, pause immediately after completing the requested edits and trigger the **Interactive Pop-up Checklist** below so the user can click **Yes / No / Skip** without typing.

---

## Execution Rules

1. **Use Native Interactive Pop-up Prompts (NO Plain-Text Questions):**
   - You **MUST** use your built-in interactive question/approval UI tool (`ask_question`) so the user gets clickable **Yes / No** buttons in a pop-up dialog instead of having to type replies in chat.
   - Always include clickable options: `["(Recommended) Yes", "No", "Skip", "Skip to Git"]` (or `["(Recommended) Yes", "No", "Skip"]`).
2. **Strict Smart Sequential Order:** Trigger **ONE pop-up prompt at a time** in the exact smart order defined below (`Step 1/8` → `Step 8/8`). Wait for the user's button selection before moving to the next step:
   - **Step 1/8:** Linting (`npm run lint`)
   - **Step 2/8:** Automated Unit & Component Tests (`npm test`)
   - **Step 3/8:** TypeScript Type-check & Production Build (`npm run typecheck && npm run build`)
   - **Step 4/8:** Pre-commit diff, status & hygiene review (`git status -s && git diff --stat`)
   - **Step 5/8:** Stage files (`git add -A`)
   - **Step 6/8:** Commit with auto-drafted Conventional Commit message (`git commit -m "<type>(<scope>): <summary>"`) — *Triggers Husky pre-commit hook (`npx lint-staged && npm test`)*
   - **Step 7/8:** Sync branches & push to remote (`git branch -f development HEAD; git push origin main development`)
   - **Step 8/8:** Deploy to production (`npx vercel --prod --yes`)
3. **Stop on "No":** If the user selects **"No"** at any step, immediately stop the checklist and ask what changes they want to make. Once updates are complete, restart from **Step 1/8**.
4. **Skip Support:** If the user selects **"Skip"**, advance directly to the next step. If **"Skip to Git"**, jump directly to **Step 5/8 — `git add`**.
5. **Auto-Generate Commit Messages:** In **Step 6/8**, automatically draft the Conventional Commit message (`<type>(<scope>): <summary>`) inside the pop-up prompt so the user only has to click **Yes** (approve) or **No** (reject/edit) without typing.
6. **Husky & Lint-Staged Pre-Commit Hook:** `.husky/pre-commit` executes `npx lint-staged && npm test` ensuring zero lint warnings, formatted files, and passing unit test suites before any commit is finalized.

---

## Sequential Pop-Up Checklist (One Pop-Up at a Time)

### Phase 1: Code Quality, Testing & Verification (Pre-Git)

- **Step 1/8 — Linting Check**
  - **Command:** `npm run lint`
  - **Pop-up Prompt:** *"Step 1/8: Run linter (`npm run lint`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip", "Skip to Git"]`

- **Step 2/8 — Automated Unit & Component Tests**
  - **Command:** `npm test`
  - **Pop-up Prompt:** *"Step 2/8: Run automated test suite (`npm test`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip", "Skip to Git"]`

- **Step 3/8 — Type-Check & Production Build Verification**
  - **Commands:** `npm run typecheck && npm run build`
  - **Pop-up Prompt:** *"Step 3/8: Run TypeScript type-check and production build (`npm run typecheck && npm run build`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip", "Skip to Git"]`

- **Step 4/8 — Diff, Status & Security Hygiene Review**
  - **Commands:** `git status -s && git diff --stat`
  - **Pop-up Prompt:** *"Step 4/8: Review `git status` and `git diff` summary before staging?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip"]`

### Phase 2: Version Control & Deployment (Git Flow)

- **Step 5/8 — Stage Changes (`git add`)**
  - **Command:** `git add -A`
  - **Pop-up Prompt:** *"Step 5/8: Stage all changes (`git add -A`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip"]`

- **Step 6/8 — Commit Changes (`git commit`)**
  - **Command:** `git commit -m "<type>(<scope>): <summary>"`
  - **Note:** Automatically executes Husky pre-commit (`npx lint-staged && npm test`).
  - **Pop-up Prompt:** *"Step 6/8: Commit staged changes with message: `<type>(<scope>): <summary>`?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip"]`

- **Step 7/8 — Sync Branches & Push to Remote (`git push`)**
  - **Commands:** `git branch -f development HEAD; git push origin main development`
  - **Pop-up Prompt:** *"Step 7/8: Sync `development` with `main` and push to remote (`git branch -f development HEAD; git push origin main development`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No", "Skip"]`

- **Step 8/8 — Production Deployment (`vercel`)**
  - **Command:** `npx vercel --prod --yes`
  - **Pop-up Prompt:** *"Step 8/8: Deploy to Vercel production (`npx vercel --prod --yes`)?"*
  - **Clickable Options:** `["(Recommended) Yes", "No"]`
