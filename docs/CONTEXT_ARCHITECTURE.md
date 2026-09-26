# Context Architecture

**The problem this solves:** an AI-assisted codebase fails at scale not because the model writes bad
code, but because it writes _plausible_ code without knowing what already exists, what constraints
apply, or what was decided last month. It then duplicates a component, inlines an artwork, adds a
font, or reports a form submission as sent when it was not — all of it fluent, reviewable-looking,
and wrong.

Discipline does not fix this. "Remember to attach the docs" fails on the day someone is in a hurry,
which is every day. The fix is architectural: make context **hard to miss**.

This is Jethur's context architecture at the size this site needs. It keeps the first property
(colocated) and the third (checked), and drops the second (generated) — with the reasoning below.

---

## The properties

### 1. Colocated

Context lives **next to the code it describes**, not in one central document.

```
src/app/CLAUDE.md          routes: thin pages, groups, boundaries
src/components/sections/CLAUDE.md   sections: read data, no section imports another
src/data/CLAUDE.md         data only: typed, one topic per file, labelled placeholders
src/components/CLAUDE.md   primitives: tokens, contract, direction, client rules
src/components/art/CLAUDE.md   the sprite: how artwork and rooms work, and what breaks them
```

Claude Code loads the `CLAUDE.md` of the directory being worked in, so editing
`src/components/art/` loads the sprite rules automatically — nobody attaches them, nobody has to
remember. **Context delivery is a property of the file system.** This is also why there is no big
central index that every session pays for in tokens.

### 2. Hand-maintained (where Jethur generates)

Jethur generates the factual half of each context file from the code (component manifest, module
APIs, system map), because at its size a hand-maintained registry rots. Here each folder has one short
file that says only what code cannot say:

- **the WHY** — what this folder is for and the constraint it lives under
- **what people get wrong** — the trap, worth more than any API table
- **the decisions that constrain it** — links to ADRs

They deliberately do **not** list components or props (the code and its types are the source of truth;
a list would go stale). If a fact can be read from the code in ten seconds, it does not belong here.

The price of hand-maintenance is drift, so the third property is not optional.

### 3. Checked

`npm run docs:check` (part of `verify`) fails on:

| Rule                                              | Why it blocks                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| A dead relative link                              | A dead pointer is worse than none: an agent follows it and finds nothing        |
| An ADR with no `affects:`, or one pointing at a path that no longer exists | A decision that reaches no code is a diary entry |
| A bad ADR `status`, or an `id` that does not match the filename | The history has to be trustworthy                                  |
| A doc or ADR not listed in its index              | An unlisted doc is an undiscoverable one                                        |

It cannot judge whether the words are _true_. That is the human's job, done in the same PR as the
change: **if you change what a folder promises, change its `CLAUDE.md` in the same commit.**

If drift becomes a real problem — a `CLAUDE.md` that describes code that has moved — that is the
signal to adopt Jethur's generator. Write an ADR for it.

---

## What goes where

| You want to say…                                          | It goes in…                                  |
| --------------------------------------------------------- | -------------------------------------------- |
| A rule that applies to the whole repo                     | root `CLAUDE.md`, linking to the doc         |
| A rule for one folder, or a trap in it                    | that folder's `CLAUDE.md`                    |
| A long-form explanation with examples                     | a doc in `docs/`                             |
| A decision that would be expensive to reverse             | an ADR                                       |
| An experiment that failed, so nobody re-runs it           | an ADR with `status: rejected`               |
| A measurement                                             | `docs/PERFORMANCE.md` (with the date's method) |

## When to add a folder `CLAUDE.md`

Add one when a folder has a constraint that is **not obvious from reading its code** and that a
newcomer — or a model — would plausibly violate. `components/art/` qualifies: the sprite has rules
(ids, off-screen not `display:none`, never inline) that break the page silently. A folder of plain
components does not need more than `src/components/CLAUDE.md`.

Keep each under about 80 lines. Long context is skimmed; short context is read.

## Decisions reach the code they constrain

Each ADR carries frontmatter:

```yaml
affects:
  - src/components/art
```

and the matching folder's `CLAUDE.md` links back to it under "Decisions that constrain this code".
Editing `components/art/` surfaces ADR-0002 without anyone remembering it exists. `docs/adr/index.md`
gives the reverse view. (Jethur projects these links automatically; here they are written by hand and
`docs:check` verifies that every `affects:` path still exists.)

## What a human owns

Generation cannot produce these, and they are the highest-value words in the repo:

1. **The WHY** of each folder — the constraint and what a newcomer gets wrong.
2. **ADRs**, including rejected ones.
3. **The vocabulary** (`CLAUDE.md`, `COMPONENT_CONTRACT.md`) — it is policy, not code.
4. **The performance log** — the record of what was measured and what it showed.
