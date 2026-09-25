# Status — plainsight-website · 2026-09-24

## Now

Second pass of `/dashboard` is pushed (commit 22e03c6) and the Vercel preview
has rebuilt. Adrian approved the new "The idea" copy and the live-then-coming
structure; waiting on his next review.

- "The idea" is four blocks (keeps your site current / answers your
  customers / helps new customers find you / gets better over time). No
  diagram.
- "What's live": Change requests, Traffic, Inbox, then Paying for your site,
  each with its mock. "What's coming": the same four themes; "Get better over
  time" is the dark section with the Suggested improvements loop panel.
- The product is "Plain Sight Dashboard", never "The Plain Sight Dashboard"
  (Adrian, 2026-09-24). Applied across the page.
- "Why it matters" is removed (Adrian, 2026-09-24): it repeated the idea
  blocks, and the one-sign-in point is irrelevant. Don't bring it back.
- Per-module badges are gone; a single Live / Coming pill sits next to each
  section heading.
- **Not done:** `psd-explainer.md` in the dashboard repo still has the old
  "The idea", the old grouping and "The Plain Sight Dashboard". The edit was blocked by the permission classifier
  (it's a different repo, and the file is untracked there). The page comment
  in `dashboard.astro` says the page copy is newer than that doc.

## Branch

- `dashboard-explainer`, pushed to origin, not merged. Do not merge to main.
- Vercel preview (production project `plain-sight-website-astro`):
  https://plain-sight-website-astro-git-dashboar-6ce9ab-plain-sight-works.vercel.app/dashboard
  Behind Vercel Deployment Protection (SSO), so outsiders need a share link
  or protection turned off. Not changed.

## What the page is

- Copy source: `plain-sight-dashboard/docs/psd-explainer.md` (sibling repo
  under `D:/Work/Plain Sight/repos/`), except "The idea" and the live/coming
  grouping, which are newer on the page. Don't add copy beyond short labels.
- Context only: `psd-canonical.md` §1 and §8. Never sell on CRO, GDD, AEO or AI.
- Files: `src/pages/dashboard.astro`, `src/components/dashboard/*`
  (StatusBadge, MockWindow and five HTML/Tailwind UI mocks with placeholder
  data), `src/components/HeroAurora.astro`.
- Section order: hero · problem · the idea · what's live · what's coming (three light groups, then the dark "Get better over
  time") · FAQ · CTA (reuses the homepage CTA entry).

## Decisions

- The hero aurora markup and its FPS probe moved from `index.astro` into
  `HeroAurora.astro`; the homepage uses the component. Behaviour unchanged.
- The shared process panel in `tailwind.css` now supports a fifth step
  (`data-active="4"`). The mobile last-item borders use `:last-child`, so
  panels of any length work; the homepage's 4-step panel was re-checked.
- `Nav.astro` left alone, as asked.

## Landmines

- The mobile menu panel in `Nav.astro` is fixed-position 250px off-screen to
  the right, so `documentElement.scrollWidth` is 625 at 390px on every page.
  User scrolling is blocked only by `body { overflow-x: hidden }`. Pre-existing.
- Playwright MCP can only write inside the repo: save screenshots to
  `.playwright-mcp/` (gitignored), then move them to the scratchpad.
- Full-page screenshots of the loop panel can catch detail panes mid-fade if
  the pointer passes over the nav; screenshot the element with the mouse parked.
- Case study card rules (no inventory counts, no undecodable before/after,
  etc.) live in `plain-sight-writing-guides/guides/marketing-copy.md`.

## Next

1. Adrian's review of the second pass.
2. Sync `psd-explainer.md` in the dashboard repo with the page once Adrian
   OKs editing that repo.
3. Not run from the page-build skill: `/impeccable` ×2 and Lighthouse.

## Verified state

- `npm run build` passes (9 pages, 2026-09-24, second pass).
- Checked in Playwright at 390 and 1440; a sideways wheel scroll doesn't
  move the page. Screenshots are in the session scratchpad under `shots/`.
