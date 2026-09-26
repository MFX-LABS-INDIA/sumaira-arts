# Documentation Index

These are rules, not suggestions. Where a rule can be checked by a machine it is (see the
"Enforced by" column); the rest is enforced in review. Read the ones your task routes to
before writing code.

## Non-negotiable

| Doc                                                    | Covers                                                                           | Enforced by                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| [ARCHITECTURE.md](./ARCHITECTURE.md)                   | Routes compose sections, sections read data; where a new page, section or form goes. | review, `npm run docs:check` (links, ADR paths) |
| [ERROR_HANDLING.md](./ERROR_HANDLING.md)               | Forms and server actions: `FormState`, three kinds of failure, never fake success. | review                                        |
| [ERROR_FIXING_PROTOCOL.md](./ERROR_FIXING_PROTOCOL.md) | How to fix an error without hiding it. Read before editing failing code.         | PR template, review                             |
| [SECURITY_HYGIENE.md](./SECURITY_HYGIENE.md)           | Checklist run at **every** work completion.                                      | PR template, `npm audit`                        |
| [PERFORMANCE.md](./PERFORMANCE.md)                     | Budgets, the rules that keep them, and the experiments already run.              | `npm run size`, `npm run perf`                  |

## Consistency

| Doc                                                      | Covers                                            | Enforced by                          |
| -------------------------------------------------------- | ------------------------------------------------- | ------------------------------------ |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)                   | Layers, tokens, composition, contrast.            | `npm run contrast`, review           |
| [COMPONENT_CONTRACT.md](./COMPONENT_CONTRACT.md)         | Closed prop vocabulary.                           | review                               |
| [AI_GENERATION_PROTOCOL.md](./AI_GENERATION_PROTOCOL.md) | Grounding, drift gates, regeneration loop.        | `npm run verify`                     |
| [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)     | Logical properties, copy, and the path to Arabic. | review                               |
| [CONVENTIONS.md](./CONVENTIONS.md)                       | Naming, TypeScript, imports, git, vocabulary.     | ESLint (`max-lines`, `any`), review  |

## Process

| Doc                                                    | Covers                                                 |
| ------------------------------------------------------ | ------------------------------------------------------ |
| [CODE_REVIEW.md](./CODE_REVIEW.md)                     | Review levels, reusability bar, reviewer conduct       |
| [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md)       | When a task is actually finished                       |
| [TESTING.md](./TESTING.md)                             | What is checked today, what is planned, in what order  |
| [CONTEXT_ARCHITECTURE.md](./CONTEXT_ARCHITECTURE.md)   | Why `CLAUDE.md` files sit inside `src/`, and how they stay honest |
| [adr/](./adr/)                                         | Decisions that are expensive to reverse                |

## What is generated and what is not

Nothing here is generated. Jethur generates its component manifest, per-folder indexes and
system map; this site is small enough that hand-maintained context stays honest, _provided
the mechanical checks below keep it honest_:

| Check                  | Fails when                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `npm run docs:check`   | a relative link is dead, an ADR's `affects:` path no longer exists, a doc or ADR is unindexed |
| `npm run size`         | initial JS, HTML or DOM size passes its budget                                               |
| `npm run contrast`     | a token pair used for text drops below WCAG AA                                               |

If the site grows to the point where hand-maintained context drifts, that is the signal to
adopt Jethur's generator — write an ADR for it.

## Not carried over from Jethur

Deliberately absent, because there is nothing here for them to govern. Reintroduce each the
day its subject appears (an account area, a database, a client-rendered app):

| Jethur doc                | Why it does not apply here                                               | Bring it back when                       |
| ------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| `WORKSPACE_ISOLATION.md`  | No tenants, no database.                                                 | any per-customer data is stored          |
| `DATABASE_DESIGN.md`      | No database.                                                             | a database is added                      |
| `TANSTACK_QUERY.md`       | No client-side data fetching; pages are static and forms use server actions. | a client-rendered, authenticated area |
| `THEMING.md` (generated)  | One theme, hand-written tokens in `globals.css`. Covered by DESIGN_SYSTEM. | a second theme (e.g. dark) is required |
| `system/MAP.md`           | Generated map of domains/routes/env; the site has one route.             | routes and env vars outgrow one screen   |
| ADRs 0001, 0005, 0006, 0007, 0008, 0009 | Schema-per-workspace, dynamic fields, SPA, module layout, auth, RLS. | the matching subject appears        |

## Reading order for a new contributor

1. `CLAUDE.md` (root) — 5 minutes, routes everything
2. ARCHITECTURE → CONVENTIONS
3. PERFORMANCE — the constraint this site lives under
4. DESIGN_SYSTEM → COMPONENT_CONTRACT — before touching UI
5. ERROR_HANDLING → SECURITY_HYGIENE — before touching a form
6. ERROR_FIXING_PROTOCOL — bookmark it; you will use it the first time something goes red
