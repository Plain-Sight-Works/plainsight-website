# Status — plainsight-website · 2026-08-06

## Now

Rewriting the `cardDescription` teaser on each case study, one project at a
time, with Adrian reviewing each before moving on. Michelle Pauly is done
(he wrote the final copy himself). **Next up is AGA Beauty**
(`src/content/work/02-aga-beauty.md`).

This pass only touches `cardDescription` in frontmatter. That one field feeds
both the homepage shortlist and `/work`, via `CaseStudyCard.astro`.

## Branch & worktree

- Branch `case-studies-four`, main checkout (no worktree). 19 commits ahead of
  `main`, 0 behind. No open PR.
- **Uncommitted, and some of it predates this session:**
  - `src/content.config.ts` — `results` made optional (see Decisions)
  - `src/content/homepage/07-work.md` — added "See all of our work" CTA
  - `src/pages/index.astro`, `src/components/CaseStudyCard.astro`,
    `src/pages/work/[slug].astro` — homepage shortlist + Michelle case study
  - `michelle-before-home.png` deleted, `.jpg` added (Adrian re-shot it)
  - `src/content/work/01-michelle-pauly.md` — the new teaser
  - `.planning/forms-service-plan.md` — untracked, unrelated to this pass

## Decisions

- **Case study teasers get a rewrite pass, project by project.** Adrian
  reviews each one before the next starts. Do not batch them.
- **`results` is optional in the work schema.** A case study only carries a
  Results block when there is a real outcome to report; without one the
  section is padding. Michelle ships with no results block. Already
  implemented, just uncommitted.
- **Michelle's card copy is Adrian's own wording** and is the register
  reference for the remaining seven. It stays at intent level ("designed to
  showcase her work while making it easy for hiring architects to quickly read
  the most important info"), not at layout-mechanics level.

## Landmines

Four rejected drafts produced these. All four are now written into
`~/.claude/skills/plain-sight-writing-guides/guides/marketing-copy.md` under
**Case study cards**, with a calibration-log entry. Read that section before
writing any teaser.

- **No before/after the reader can't decode.** "The site is her professional
  work *now*" implies a comparison to a site nobody has seen. Naming the prior
  state is fine when it stands alone as a fact ("still running on jQuery-era
  plugins"). Six of eight cards do this and read fine.
- **No inventory counts.** "Ten projects in one grid" describes her career,
  not the work. Adrian: *"If you build a blog, would you lead with how many
  blog posts there are on it?"*
- **No definitional properties as achievements.** A portfolio holds
  professional work. That is what a portfolio is.
- **No stacked layout mechanics.** One distinguishing design decision maximum;
  three in a colon-list turns the teaser into a spec sheet.
- Card clamps at **4 lines** (`line-clamp-4`, `CaseStudyCard.astro:33`).
  Siblings run ~205–235 characters. Adrian's Michelle copy is ~300 and may
  clip — unverified in a browser.

## Next

1. Rewrite the AGA Beauty `cardDescription` (`02-aga-beauty.md`) against the
   Case study cards rules. Present the copy, don't ship it silently.
2. Then, in order and one at a time with review between each: `03-diana-ojeda`,
   `04-ray-pauly`, `05-crtc`, `06-surfsmash`, `07-templeton-lakewood`,
   `08-demi`.
3. Verify the Michelle card doesn't clip at 4 lines on `/work` and the
   homepage, and decide whether to trim it or raise the clamp.
4. Commit the branch. It has been carrying uncommitted work across sessions.

## Verified state

- `npm run build` passes (13 pages, 2026-08-06).
- Michelle's `michelle-before-home.jpg` import is corrected in
  `[slug].astro:35` and the image processes in the build.
- `results` is optional in the schema and guarded in the template
  (`[slug].astro:418`); Michelle renders without it.
- The four teaser rules are written into `marketing-copy.md`.
- **Not verified:** whether any card copy clips at the 4-line clamp. Never
  opened in a browser this session.
