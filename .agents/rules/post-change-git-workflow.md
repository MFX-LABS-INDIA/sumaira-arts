# Post-Change Quality, Git & Deployment Workflow Rules

## Core Directive

Whenever you finish implementing code changes, fixing a bug, converting/updating assets, or completing a task, **DO NOT** automatically run `git` commands, lint/typecheck/build scripts, or deployment pipelines without explicit user approval.

Instead, pause immediately after completing the requested edits and trigger the **Interactive Pop-up Checklist** below so the user can click **Yes / No / Skip** without typing.

---

## Execution Rules

1. **Use Native Interactive Pop-up Prompts (NO Plain-Text Questions):**
   - You **MUST** use your built-in interactive question/approval UI tool (e.g., `ask_followup_question`, `ask_user`, `request_user_input`, or terminal command approval modal) so the user gets clickable **Yes / No** buttons in a pop-up dialog instead of having to type replies in chat.
   - Always include clickable options such as: `["Yes", "No", "Skip to Git"]` (or `["Yes", "No", "Skip"]`).
2. **Strict Sequential Order:** Trigger **ONE pop-up prompt at a time** in the exact order defined below (`Step 1` → `Step 7`). Wait for the user's button selection before moving to the next step.
3. **Stop on "No":** If the user selects **"No"** at any step, immediately stop the checklist and ask what changes they want to make. Once updates are complete, restart from **Step 1**.
4. **Skip Support:** If the user selects **"Skip"** (or **"Skip to Git"**), advance directly to the next step (or jump straight to **Step 4 — `git add`**).
5. **Auto-Generate Commit Messages:** In **Step 5**, automatically draft the Conventional Commit message (`<type>(<scope>): <summary>`) inside the pop-up prompt so the user only has to click **Yes** (approve) or **No** (reject/edit) without typing.

---

## Sequential Pop-Up Checklist (One Pop-Up at a Time)

### Phase 1: Code Quality & Verification (Pre-Git)

- **Step 1 — Linting Check**
  - **Command:** `npm run lint`
  - **Pop-up Prompt:** *"Changes are complete. Step 1/7: Run linter (`npm run lint`)?"*
  - **Clickable Options:** `["Yes", "No", "Skip", "Skip to Git"]`

- **Step 2 — Type-Check & Build Verification**
  - **Commands:** `npm run typecheck && npm run build`
  - **Pop-up Prompt:** *"Step 2/7: Run TypeScript type-check and production build (`npm run typecheck && npm run build`)?"*
  - **Clickable Options:** `["Yes", "No", "Skip", "Skip to Git"]`

- **Step 3 — Diff, Status & Security Hygiene Review**
  - **Commands:** `git status -s && git diff --stat`
  - **Pop-up Prompt:** *"Step 3/7: Review `git status` and `git diff` summary before staging?"*
  - **Clickable Options:** `["Yes", "No", "Skip"]`

### Phase 2: Version Control & Deployment (Git Flow)

- **Step 4 — Stage Changes (`git add`)**
  - **Command:** `git add -A`
  - **Pop-up Prompt:** *"Step 4/7: Stage all changes (`git add -A`)?"*
  - **Clickable Options:** `["Yes", "No", "Skip"]`

- **Step 5 — Commit Changes (`git commit`)**
  - **Command:** `git commit -m "<type>(<scope>): <summary>"`
  - **Pop-up Prompt:** *"Step 5/7: Commit staged changes with message: `<type>(<scope>): <summary>`?"*
  - **Clickable Options:** `["Yes", "No", "Skip"]`

- **Step 6 — Sync Branches & Push to Remote (`git push`)**
  - **Commands:** `git branch -f development HEAD && git push origin main development`
  - **Pop-up Prompt:** *"Step 6/7: Sync `development` with `main` and push to remote (`git branch -f development HEAD && git push origin main development`)?"*
  - **Clickable Options:** `["Yes", "No", "Skip"]`

- **Step 7 — Production Deployment (`vercel`)**
  - **Command:** `npx vercel --prod --yes`
  - **Pop-up Prompt:** *"Step 7/7: Deploy to Vercel production (`npx vercel --prod --yes`)?"*
  - **Clickable Options:** `["Yes", "No"]`