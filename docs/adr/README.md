# Architecture Decision Records

One file per decision that is expensive to reverse. Numbered, immutable once accepted —
superseded by a new ADR rather than edited, so the reasoning history stays readable.

Write one when: a boundary changes, a dependency, font, script or tracker is added that would be
painful to remove, a rule in `PERFORMANCE.md` or `ERROR_HANDLING.md` is amended, or someone asks
"why is it like this?" for the second time.

**Write a _rejected_ one too.** An experiment that failed and left no record gets re-run by the
next person. [ADR-0008](./0008-content-visibility-auto-rejected.md) is the example: it holds the
measurements that stop anyone repeating it.

Copy `0000-template.md`. Fill in the frontmatter — `affects:` is what ties a decision to the code
it constrains (and `npm run docs:check` verifies those paths still exist), so a decision with no
`affects` reaches nobody. Then add it to [index.md](./index.md) and link it from the `CLAUDE.md` of
each folder it affects.
