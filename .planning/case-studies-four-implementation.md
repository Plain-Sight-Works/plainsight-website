# Four Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Superseded for AGA Beauty (2026-08-06).** The AGA angle in this document
> ("one client at a time", "no storefront / no website at all", smallness as
> the premium thing) was rejected. Do not write copy from it.
> `.planning/focus/02-aga-beauty.md` governs.

**Goal:** Add Michelle Pauly, AGA Beauty, Diana Ojeda and Ray Pauly Photo to the
Plain Sight work section as full editorial case studies, leading the `/work`
listing, while the homepage stays at exactly four cards.

**Architecture:** Each case study is one Markdown file in the `work` content
collection plus a set of PNGs wired through the slug-keyed image manifest in
`src/pages/work/[slug].astro`. Two schema fields are added: `cardDescription`
(kills the blurb duplication across page files) and `featured` (an opt-in
homepage shortlist ordered independently of `order`). No new components, no new
CSS.

**Tech Stack:** Astro 5 content collections, Tailwind v4 utilities, Playwright
1.62 for screenshot capture.

**Spec:** `.planning/case-studies-four-plan.md`. Read it before starting — it
carries the narrative angle and the per-project facts each case study is
written from.

## Global Constraints

- **Branch is `case-studies-four`**, already cut from `main` at `94e199b`. Do not
  branch again, do not touch `main`.
- **No em dashes or en dashes anywhere in site copy.** All four existing case
  studies contain zero. Check the entities `&mdash;`, `&#8212;`, `&#x2014;` and
  `&ndash;` as well as the literal characters. Use commas, colons or a full
  stop.
- **Tailwind utility classes only.** No `<style>` blocks, no `style=""`, no hex
  codes. This plan requires no styling changes at all, so any CSS is a signal
  you have gone off-plan.
- **No dollar figures, payment splits, rates or engagement types** on any case
  study page. That is deal history, not portfolio.
- **Michelle's and Ray's copy never invents client language** — no "the client
  needed", no "they came to us", no fabricated brief. Write "we built". Never
  mention that they were unpaid or family.
- **The AGA Beauty rebrand is not part of that story** and must not appear.
- **Never print AGA's review count or rating numerals.** Write the record
  ("every review five stars"), not the arithmetic.
- **`Alburqueque`**, not Albuquerque. The business is **AGA Beauty**, descriptor
  "Spa & Boutique"; "Nails" is a service, never the business name.
- **The Templeton entry is `templeton-lakewood`**, covering two developments.
  Do not rename it back.
- **Verification is `npm run build` plus reading `dist/`.** This repo has no
  test framework and no lint script; do not add either.
- **Screenshots are 1440px viewport** unless a step says otherwise, saved as PNG
  into `src/assets/case-studies/`.
- **A missing manifest key fails silently**, rendering no image rather than
  erroring. A clean build does not prove the images are wired.

---

### Task 1: Schema fields and the reorder, with zero visual change

Adds `cardDescription` and `featured`, renumbers the existing four, and removes
the duplicated blurb maps. When this task is done the site looks **exactly** as
it does now: same four homepage cards in the same order, same four `/work`
cards. That is the point — it makes the refactor reviewable on its own.

**Files:**
- Modify: `src/content.config.ts` (the `work` collection schema)
- Rename + modify: `src/content/work/01-crtc.md` → `05-crtc.md`
- Rename + modify: `src/content/work/02-surfsmash.md` → `06-surfsmash.md`
- Rename + modify: `src/content/work/03-templeton-lakewood.md` → `07-templeton-lakewood.md`
- Rename + modify: `src/content/work/04-demi.md` → `08-demi.md`
- Modify: `src/pages/work.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `cardDescription: string` (required) and `featured?: number` on every
  work entry. Tasks 2 to 5 set both on the entries they create.
- Produces: the homepage reads `featured`, ascending, and renders only entries
  that have it. `/work` continues to read `order`, ascending, and renders all.

- [ ] **Step 1: Add the two schema fields**

In `src/content.config.ts`, inside the `work` collection's `z.object({...})`,
directly after the `order: z.number(),` line:

```ts
    order: z.number(),
    // `order` drives the full /work listing. `featured` is the homepage
    // shortlist and is deliberately a different, shorter list: entries
    // without it never reach the homepage. Keep the homepage at four.
    featured: z.number().optional(),
    // Card blurb for /work and the homepage. It lives here so the same copy
    // stops being pasted into every page that renders a CaseStudyCard.
    cardDescription: z.string(),
```

- [ ] **Step 2: Rename the four existing entries**

```bash
cd "D:/Work/Plain Sight/plainsight-website"
git mv src/content/work/01-crtc.md src/content/work/05-crtc.md
git mv src/content/work/02-surfsmash.md src/content/work/06-surfsmash.md
git mv src/content/work/03-templeton-lakewood.md src/content/work/07-templeton-lakewood.md
git mv src/content/work/04-demi.md src/content/work/08-demi.md
```

The slug strips the numeric prefix, so no URL changes.

- [ ] **Step 3: Set `order`, `featured` and `cardDescription` on all four**

Edit each file's frontmatter. `featured` here **preserves today's homepage
exactly**; Tasks 2 and 3 take slots 4 and 3 back.

`05-crtc.md` — set `order: 5`, and add:

```yaml
featured: 1
cardDescription: "An international addiction treatment center whose site had grown hard for families to navigate. We rebuilt it around the questions families ask, with a design as warm as the care it describes."
```

`06-surfsmash.md` — set `order: 6`, and add:

```yaml
featured: 2
cardDescription: "A card-based fantasy game for the World Surf League season. We built the platform: the iOS and Android app, the live-scoring admin tool, and the launch site. Live now on the App Store and Google Play."
```

`07-templeton-lakewood.md` — set `order: 7`, and add:

```yaml
featured: 3
cardDescription: "Two sibling Passive House developments whose websites undersold them: dense, crowded, and clumsy on a phone. We built one design system in print first, then carried it onto both sites, clean and modern on every screen."
```

`08-demi.md` — set `order: 8`, and add:

```yaml
featured: 4
cardDescription: "Complex AI kitchen software that needed to feel simple. We led with operator pain points, not tech jargon, and built a marketing site that makes Demi feel like relief, not another learning curve."
```

These four strings are lifted verbatim from the current `work.astro` map. The
homepage's two longer variants for CRTC and Templeton are deliberately dropped.

- [ ] **Step 4: Make `work.astro` read the frontmatter**

In `src/pages/work.astro`, delete the whole `const descriptions: Record<string,
string> = { ... };` block, then change the mapping to read the new field:

```ts
const caseStudies = projects.map((project) => {
  const slug = project.id.replace(/^\d+-/, '').replace(/\.md$/, '');
  return {
    title: project.data.title,
    description: project.data.cardDescription,
    slug,
    image: heroImages[slug],
    tags: project.data.tags,
  };
});
```

The `?? project.data.challenge` fallback goes with it. `cardDescription` is
required, so a missing one is a build error rather than a silent fallback.

- [ ] **Step 5: Make `index.astro` read the frontmatter and honour `featured`**

In `src/pages/index.astro`, delete the whole `const descriptions: Record<string,
string> = { ... };` block. Then replace the `workEntries` query:

```ts
// The homepage carries a shortlist, not the whole collection. Entries opt in
// by setting `featured`, which orders them independently of /work's `order`.
// Four cards is the layout; adding a fifth is a design decision, not a
// content one.
const workEntries = (await getCollection("work"))
  .filter((entry) => entry.data.featured !== undefined)
  .sort((a, b) => a.data.featured! - b.data.featured!);
```

and the mapping below it:

```ts
const caseStudies = workEntries.map((entry) => {
  const slug = entry.id.replace(/^\d+-/, '').replace(/\.md$/, '');
  return {
    title: entry.data.title,
    description: entry.data.cardDescription,
    link: `/work/${slug}`,
    image: caseStudyImages[slug],
    tags: entry.data.tags,
  };
});
```

- [ ] **Step 6: Build and confirm nothing moved**

```bash
npm run build
```

Expected: clean build, same page count as before this task.

```bash
grep -c "CaseStudyCard\|View case study" dist/index.html
```

Expected: 4 cards on the homepage, in the order Costa Rica Treatment Center,
Surfsmash, Templeton Living & Lakewood Living, Demi. Confirm by reading the card
titles in order:

```bash
grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -8
grep -oE '<h3[^>]*>.*?</h3>' dist/work/index.html | head -8
```

Expected: identical set and order to `git stash`-ing this task away. `/work`
lists the same four.

- [ ] **Step 7: Commit**

```bash
git add src/content.config.ts src/content/work/ src/pages/work.astro src/pages/index.astro
git commit -F- <<'EOF'
Move card blurbs into frontmatter and add a homepage shortlist

The same four blurbs were pasted into index.astro and work.astro, so
adding a case study meant editing both. They now live on the entry.

`featured` is a second, shorter ordering: the homepage renders only
entries that opt in, so growing /work no longer grows the homepage. This
commit changes no rendered output.
EOF
```

---

### Task 2: Michelle Pauly case study

**Files:**
- Create: `src/content/work/01-michelle-pauly.md`
- Create: `src/assets/case-studies/michelle-home-hero.png`, `michelle-before-home.png`, `michelle-category.png`, `michelle-project.png`
- Modify: `src/content/work/08-demi.md` (drop `featured`)
- Modify: `src/pages/work/[slug].astro`, `src/pages/work.astro`, `src/pages/index.astro`

**Interfaces:**
- Consumes: `cardDescription` and `featured` from Task 1.
- Produces: manifest key `michelle-pauly` with image keys `hero`,
  `before-home`, `category`, `project`. Slug `michelle-pauly`, `order: 1`,
  `featured: 4`.

- [ ] **Step 1: Capture the three live shots**

Write a throwaway capture script to the scratchpad. It does not belong in the
repo.

```js
// C:/Users/adria/AppData/Local/Temp/claude/D--Work-Plain-Sight-plainsight-website/38c69b41-9a89-4a34-a01c-7ea2e5dfe3c2/scratchpad/shoot.mjs
import { chromium } from 'playwright';
const OUT = 'D:/Work/Plain Sight/plainsight-website/src/assets/case-studies/';
const shots = [
  ['https://www.michellepauly.com/', 'michelle-home-hero', 1440],
  ['https://www.michellepauly.com/residential', 'michelle-category', 1440],
  ['https://www.michellepauly.com/kilkea', 'michelle-project', 1440],
];
const b = await chromium.launch();
for (const [url, name, width] of shots) {
  const p = await b.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: OUT + name + '.png' });
  await p.close();
}
await b.close();
```

```bash
node "C:/Users/adria/AppData/Local/Temp/claude/D--Work-Plain-Sight-plainsight-website/38c69b41-9a89-4a34-a01c-7ea2e5dfe3c2/scratchpad/shoot.mjs"
```

If `/residential` or `/kilkea` 404s, list the real routes first with
`curl -s https://www.michellepauly.com/sitemap-0.xml | grep -oE '<loc>[^<]+'`
and pick one category page and one project page from it.

- [ ] **Step 2: Capture the "before" shot, and gate on whether it is honest**

The old site is archived at `D:\Work\Plain Sight\Projects\Michelle Pauly\old-site`.
Serve it and shoot it:

```bash
npx --yes http-server "D:/Work/Plain Sight/Projects/Michelle Pauly/old-site" -p 8899 --silent
```

Point the script at `http://127.0.0.1:8899/index.html`, name it
`michelle-before-home`, and use `fullPage: false` at 1440x900.

**Then open the PNG and look at it.** Its `img/` folder holds 12 files against
roughly 15 listed projects, so broken-image icons are a real possibility.

- If it renders faithfully, keep it and continue.
- If images are broken, try
  `http://web.archive.org/web/2023/http://www.michellepauly.com/` instead and
  crop the Wayback banner.
- **If neither renders honestly, delete the file, omit the `beforeAfter` block
  from the frontmatter in Step 4, and say so in the commit message.** Do not
  ship an approximation of a before state.

- [ ] **Step 3: Wire the four images into the manifest**

In `src/pages/work/[slug].astro`, add to the import block:

```ts
import michelleHero from "../../assets/case-studies/michelle-home-hero.png";
import michelleBeforeHome from "../../assets/case-studies/michelle-before-home.png";
import michelleCategory from "../../assets/case-studies/michelle-category.png";
import michelleProject from "../../assets/case-studies/michelle-project.png";
```

and to the `images` manifest object:

```ts
  "michelle-pauly": {
    hero: michelleHero,
    "before-home": michelleBeforeHome,
    category: michelleCategory,
    project: michelleProject,
  },
```

In `src/pages/work.astro` add `import michelleHero from "../assets/case-studies/michelle-home-hero.png";`
and `"michelle-pauly": michelleHero,` to `heroImages`.

In `src/pages/index.astro` add the same import (path `../assets/...`) and
`"michelle-pauly": michelleHero,` to `caseStudyImages`.

If Step 2 dropped the before shot, omit the `michelleBeforeHome` import and its
manifest key.

- [ ] **Step 4: Write the case study**

Create `src/content/work/01-michelle-pauly.md`. Write the prose from the spec's
"Michelle Pauly" section; the frontmatter shape is:

```yaml
---
title: "Michelle Pauly"
subtitle: "An architecture portfolio rebuilt for the people who actually read it: firms deciding whether to hire her."
order: 1
featured: 4
url: "https://www.michellepauly.com"
tags:
  - Website
  - CMS
tech: "Astro, Sanity, Vercel"
cardDescription: "An architect's portfolio rebuilt around the one thing hiring firms open it to find. We cut the student work, put her actual role on each project up front, and handed her a CMS to run it."
challenge: "..."
beforeAfter:
  before:
    image: "before-home"
    caption: "One long scroll gave built work and student projects the same weight."
  after:
    image: "hero"
    caption: "Category tiles, and nothing competing with the work."
approach: |
  ...
solution: |
  ...
solutionGallery:
  - image: "category"
    caption: "Uniform 4:5 crops, names always visible, no hover-reveal."
  - image: "project"
    caption: "Every project leads with what she did on it."
results: "..."
---
```

Fill `challenge`, `approach`, `solution` and `results` from the spec. Match the
register of `07-templeton-lakewood.md`: plain, specific, no marketing adjectives.
**No em dashes.** Do not say the project was unpaid or for family, and do not
write "the client".

The `results` string should carry the measured image-delivery numbers from the
spec (19% at 1440, 47% at 1920, 60% at 2560, all DPR2; flat 897 KiB across
desktop DPR2 viewports).

- [ ] **Step 5: Take Demi off the homepage**

In `src/content/work/08-demi.md`, delete its `featured: 4` line. Michelle now
holds slot 4.

- [ ] **Step 6: Build and verify the page renders its images**

```bash
npm run build
grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -8
```

Expected homepage order: Costa Rica Treatment Center, Surfsmash, Templeton
Living & Lakewood Living, Michelle Pauly. Demi gone. Still exactly four.

```bash
grep -c "<img" dist/work/michelle-pauly/index.html
```

Expected: 4 if the before shot survived, 3 if it did not. A missing manifest key
renders nothing and does **not** fail the build, so this count is the only
check that catches it.

```bash
grep -oiE "&mdash;|&#8212;|&#x2014;|&ndash;" dist/work/michelle-pauly/index.html | head
```

Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/content/work/01-michelle-pauly.md src/content/work/08-demi.md src/assets/case-studies/michelle-*.png src/pages/
git commit -F- <<'EOF'
Add the Michelle Pauly case study

An architecture portfolio rebuilt around its real audience: firms
deciding whether to hire her. The old site gave built work and student
projects equal weight and never said what she did on either.

Takes Demi's homepage slot.
EOF
```

---

### Task 3: AGA Beauty case study

**Files:**
- Create: `src/content/work/02-aga-beauty.md`
- Create: `src/assets/case-studies/aga-home-hero.png`, `aga-services.png`, `aga-studio.png`, `aga-booking-bar.png`
- Modify: `src/content/work/07-templeton-lakewood.md` (drop `featured`)
- Modify: `src/pages/work/[slug].astro`, `src/pages/work.astro`, `src/pages/index.astro`

**Interfaces:**
- Consumes: `cardDescription` and `featured` from Task 1.
- Produces: manifest key `aga-beauty` with image keys `hero`, `services`,
  `studio`, `booking-bar`. Slug `aga-beauty`, `order: 2`, `featured: 3`.

- [ ] **Step 1: Capture four shots, one of them mobile**

Reuse the scratchpad script with this shot list. `aga-booking-bar` is **390px**,
because the argument is that these bookings happen after hours from a phone, so
a desktop capture would prove the wrong thing.

```js
const shots = [
  ['https://agabeauty.ca/', 'aga-home-hero', 1440],
  ['https://agabeauty.ca/services', 'aga-services', 1440],
  ['https://agabeauty.ca/', 'aga-studio', 1440],
  ['https://agabeauty.ca/', 'aga-booking-bar', 390],
];
```

For `aga-studio`, scroll to the studio photo grid before shooting
(`await p.locator('img').nth(3).scrollIntoViewIfNeeded()` then screenshot the
viewport). For `aga-booking-bar`, scroll down far enough that the sticky bar is
showing. There is no `beforeAfter` for this case study; she had no website.

- [ ] **Step 2: Wire the images into the manifest**

In `src/pages/work/[slug].astro`:

```ts
import agaHero from "../../assets/case-studies/aga-home-hero.png";
import agaServices from "../../assets/case-studies/aga-services.png";
import agaStudio from "../../assets/case-studies/aga-studio.png";
import agaBookingBar from "../../assets/case-studies/aga-booking-bar.png";
```

```ts
  "aga-beauty": {
    hero: agaHero,
    services: agaServices,
    studio: agaStudio,
    "booking-bar": agaBookingBar,
  },
```

Add `agaHero` to `heroImages` in `work.astro` and `caseStudyImages` in
`index.astro`, keyed `"aga-beauty"`.

- [ ] **Step 3: Write the case study**

Create `src/content/work/02-aga-beauty.md`:

```yaml
---
title: "AGA Beauty"
subtitle: "A one-woman home studio in Burnaby, presented as the premium service it already was."
order: 2
featured: 3
url: "https://agabeauty.ca"
tags:
  - Website
tech: "Astro, Tailwind CSS, Vercel"
cardDescription: "A one-woman home studio with a spotless five-star record and no website at all. We built one that reads as premium without pretending she is bigger than she is."
challenge: "..."
approach: |
  ...
solution: |
  ...
featureImage:
  image: "booking-bar"
  caption: "Book Now, WhatsApp and her phone number stay in reach the whole way down the page."
solutionGallery:
  - image: "services"
    caption: "Real prices next to every service, rather than an enquiry form."
  - image: "studio"
    caption: "Her actual room, photographed, instead of stock."
results: "..."
---
```

Write the prose from the spec's "AGA Beauty — premium at the scale of one"
section. The load-bearing points, in order: premium is normally signalled by
scale and she has none of it; the answer is to make the smallness the premium
thing, because one client at a time is what a busy salon cannot sell;
credibility therefore rests on the five-star record, which is why the Google
score sits in the hero and beside the booking CTA and is fetched live rather
than typed; and with no scale to hide behind every claim has to be real.

**Do not** print the rating or review count. **Do not** mention the rebrand.
**Do not** write "Nails" as part of the business name. No em dashes.

- [ ] **Step 4: Take Templeton off the homepage**

In `src/content/work/07-templeton-lakewood.md`, delete its `featured: 3` line.
AGA now holds slot 3.

- [ ] **Step 5: Build and verify**

```bash
npm run build
grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -8
```

Expected: Costa Rica Treatment Center, Surfsmash, AGA Beauty, Michelle Pauly.
Exactly four.

```bash
grep -c "<img" dist/work/aga-beauty/index.html
grep -oiE "&mdash;|&#8212;|&#x2014;|&ndash;|Albuquerque|AGA Nails" dist/work/aga-beauty/index.html | head
```

Expected: 4 images. Second command: no output. That grep is the guard on the
two spelling traps and the wrong business name.

- [ ] **Step 6: Commit**

```bash
git add src/content/work/02-aga-beauty.md src/content/work/07-templeton-lakewood.md src/assets/case-studies/aga-*.png src/pages/
git commit -F- <<'EOF'
Add the AGA Beauty case study

One esthetician working out of a room in her home, with an unbroken
five-star record and no website. Premium is normally signalled by scale
she does not have, so the site makes the smallness the premium thing and
lets the review record carry the credibility.

Takes Templeton's homepage slot.
EOF
```

---

### Task 4: Diana Ojeda case study

**Files:**
- Create: `src/content/work/03-diana-ojeda.md`
- Create: `src/assets/case-studies/diana-home-hero.png`, `diana-checkin.png`, `diana-paths.png`, `diana-work-with-me.png`
- Modify: `src/pages/work/[slug].astro`, `src/pages/work.astro`

**Interfaces:**
- Consumes: `cardDescription` from Task 1.
- Produces: manifest key `diana-ojeda` with image keys `hero`, `checkin`,
  `paths`, `work-with-me`. Slug `diana-ojeda`, `order: 3`, **no `featured`** —
  she does not go on the homepage.

- [ ] **Step 1: Capture four shots**

```js
const shots = [
  ['https://www.dianaojeda.ca/', 'diana-home-hero', 1440],
  ['https://www.dianaojeda.ca/', 'diana-checkin', 1440],
  ['https://www.dianaojeda.ca/', 'diana-paths', 1440],
  ['https://www.dianaojeda.ca/work-with-me', 'diana-work-with-me', 1440],
];
```

`diana-checkin` is the centrepiece and has to show the "Right now, I feel"
interaction. Scroll it into view and, if the states are selectable, **click one
before shooting** so the shot shows the interaction doing its job rather than
sitting idle. No `beforeAfter` for this case study.

- [ ] **Step 2: Wire the images into the manifest**

In `src/pages/work/[slug].astro`:

```ts
import dianaHero from "../../assets/case-studies/diana-home-hero.png";
import dianaCheckin from "../../assets/case-studies/diana-checkin.png";
import dianaPaths from "../../assets/case-studies/diana-paths.png";
import dianaWorkWithMe from "../../assets/case-studies/diana-work-with-me.png";
```

```ts
  "diana-ojeda": {
    hero: dianaHero,
    checkin: dianaCheckin,
    paths: dianaPaths,
    "work-with-me": dianaWorkWithMe,
  },
```

Add `dianaHero` to `heroImages` in `work.astro`, keyed `"diana-ojeda"`. **Do
not** add it to `index.astro` — Diana has no `featured` value and never renders
on the homepage.

- [ ] **Step 3: Write the case study**

Create `src/content/work/03-diana-ojeda.md`:

```yaml
---
title: "Diana Ojeda"
subtitle: "A Gestalt coaching site whose homepage opens with a check-in instead of a service menu."
order: 3
url: "https://www.dianaojeda.ca"
tags:
  - Website
tech: "Astro, Tailwind CSS, Vercel"
cardDescription: "A Gestalt coach whose practice was buried inside a site she shares with a partner. Her homepage now opens with a check-in rather than a service menu, so visitors feel the method before they book."
challenge: "..."
approach: |
  ...
solution: |
  ...
featureImage:
  image: "checkin"
  caption: "One sentence the visitor finishes, instead of four cards asking four decisions at once."
solutionGallery:
  - image: "paths"
    caption: "Four ways in, marked by hand-drawn strokes rather than numbers."
  - image: "work-with-me"
    caption: "Gestalt, Shiatsu and Biodanza held as one practice, not three products."
results: "..."
---
```

Write the prose from the spec's "Diana Ojeda" section. The centre of it is that
the check-in enacts the method rather than describing it: present-moment
awareness, first-person language, an awareness the visitor arrives at instead of
a label pushed at them. Note the constraint that keeps it working, which is that
the copy stays first-person and present-tense; a dropdown of service names
collapses it back into a menu.

No em dashes.

- [ ] **Step 4: Build and verify**

```bash
npm run build
grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -8
```

Expected: **unchanged** from Task 3. Costa Rica Treatment Center, Surfsmash,
AGA Beauty, Michelle Pauly. Diana must not appear.

```bash
grep -oE '<h3[^>]*>.*?</h3>' dist/work/index.html | head -8
grep -c "<img" dist/work/diana-ojeda/index.html
grep -oiE "&mdash;|&#8212;|&#x2014;|&ndash;" dist/work/diana-ojeda/index.html | head
```

Expected: `/work` now lists seven, led by Michelle Pauly, AGA Beauty, Diana
Ojeda. 4 images. No dash entities.

- [ ] **Step 5: Commit**

```bash
git add src/content/work/03-diana-ojeda.md src/assets/case-studies/diana-*.png src/pages/
git commit -F- <<'EOF'
Add the Diana Ojeda case study

Three modalities that a conventional site would split into three service
pages, which fragments one practice into a menu. The homepage opens on a
sentence the visitor finishes instead, so the interaction performs the
method rather than describing it.
EOF
```

---

### Task 5: Ray Pauly Photo case study

**Files:**
- Create: `src/content/work/04-ray-pauly.md`
- Create: `src/assets/case-studies/ray-home-hero.png`, `ray-before-home.png`, `ray-album-grid.png`, `ray-album.png`, `ray-lightbox.png`, `ray-about-modal.png`
- Modify: `src/pages/work/[slug].astro`, `src/pages/work.astro`

**Interfaces:**
- Consumes: `cardDescription` from Task 1.
- Produces: manifest key `ray-pauly` with image keys `hero`, `before-home`,
  `album-grid`, `album`, `lightbox`, `about-modal`. Slug `ray-pauly`,
  `order: 4`, **no `featured`**.

- [ ] **Step 1: Capture the live shots, including two interaction states**

```js
const shots = [
  ['https://raypaulyphoto.com/', 'ray-home-hero', 1440],
  ['https://raypaulyphoto.com/', 'ray-album-grid', 1440],
];
```

`ray-album` needs a real album URL. Find one from the homepage grid:

```bash
curl -s https://raypaulyphoto.com/ | grep -oE '/albums/[a-z0-9-]+' | sort -u | head
```

`ray-lightbox` requires clicking a photo inside an album and waiting for
PhotoSwipe to open before shooting. `ray-about-modal` requires clicking the
About link in the nav and waiting for the modal. Both are the point of the case
study, so an idle shot of the page underneath is not a substitute.

- [ ] **Step 2: Capture the archived before shot**

```
http://web.archive.org/web/20220224033215/http://www.raypaulyphoto.com/
```

Confirmed reachable. Shoot at 1440x900 and **crop out the Wayback banner** at
the top, or hide it before shooting:

```js
await p.addStyleTag({ content: '#wm-ipp-base, #wm-ipp-print { display: none !important; }' });
```

Open the result and confirm it renders as a real page. If it does not, drop the
`beforeAfter` block rather than approximate it, and say so in the commit.

- [ ] **Step 3: Wire the images into the manifest**

In `src/pages/work/[slug].astro`:

```ts
import rayHero from "../../assets/case-studies/ray-home-hero.png";
import rayBeforeHome from "../../assets/case-studies/ray-before-home.png";
import rayAlbumGrid from "../../assets/case-studies/ray-album-grid.png";
import rayAlbum from "../../assets/case-studies/ray-album.png";
import rayLightbox from "../../assets/case-studies/ray-lightbox.png";
import rayAboutModal from "../../assets/case-studies/ray-about-modal.png";
```

```ts
  "ray-pauly": {
    hero: rayHero,
    "before-home": rayBeforeHome,
    "album-grid": rayAlbumGrid,
    album: rayAlbum,
    lightbox: rayLightbox,
    "about-modal": rayAboutModal,
  },
```

Add `rayHero` to `heroImages` in `work.astro`, keyed `"ray-pauly"`. Not to
`index.astro`.

- [ ] **Step 4: Write the case study**

Create `src/content/work/04-ray-pauly.md`:

```yaml
---
title: "Ray Pauly Photo"
subtitle: "A photography portfolio where nothing on the page competes with the photographs."
order: 4
url: "https://raypaulyphoto.com"
tags:
  - Website
  - CMS
tech: "Astro, Sanity, PhotoSwipe, Vercel"
cardDescription: "A photographer stuck on a hand-built site from the jQuery era, serving full-resolution originals as thumbnails. We replaced it with a quiet, image-first gallery he publishes to himself."
challenge: "..."
beforeAfter:
  before:
    image: "before-home"
    caption: "The old site, still carrying an IE6 transparency shim in its source."
  after:
    image: "hero"
    caption: "One image, his name, and the grid immediately below it."
approach: |
  ...
solution: |
  ...
solutionGallery:
  - image: "album-grid"
    caption: "Albums in a plain grid, no borders and no rounded corners."
  - image: "album"
    caption: "Inside an album, the photographs set the rhythm of the page."
results: "..."
resultsGallery:
  - image: "lightbox"
    caption: "Full-bleed on black, with keyboard and swipe."
  - image: "about-modal"
    caption: "About opens over the gallery instead of navigating away from it."
---
```

All six images are referenced above. `album` and `about-modal` are easy to
capture and then forget to place, which wires them into the manifest where they
render nowhere.

Write the prose from the spec's "Ray Pauly Photo" section. Do not say the
project was unpaid or for family, and do not write "the client". The specifics
that carry the challenge are jcarousel, cycle.lite, the IE6 PNG shim, and
originals served straight out of `/images/original/` as thumbnails.

No em dashes.

- [ ] **Step 5: Build and verify**

```bash
npm run build
grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -8
grep -oE '<h3[^>]*>.*?</h3>' dist/work/index.html | head -10
grep -c "<img" dist/work/ray-pauly/index.html
```

Expected: homepage still the same four. `/work` lists eight, led by Michelle
Pauly, AGA Beauty, Diana Ojeda, Ray Pauly Photo. 6 images on Ray's page, or 5 if
the before shot was dropped.

- [ ] **Step 6: Commit**

```bash
git add src/content/work/04-ray-pauly.md src/assets/case-studies/ray-*.png src/pages/
git commit -F- <<'EOF'
Add the Ray Pauly Photo case study

The old site was hand-built in the jQuery era and served full-resolution
originals as thumbnails, with no way to add a photo without a developer.
The replacement puts nothing on the page that competes with the work.
EOF
```

---

### Task 6: Whole-section verification

Everything is in. This task only checks it, and fixes what it finds.

**Files:** none created. Fixes land in whichever file is wrong.

- [ ] **Step 1: Confirm the two orderings**

```bash
npm run build
echo "--- homepage ---"; grep -oE '<h3[^>]*>.*?</h3>' dist/index.html | head -6
echo "--- work ---";     grep -oE '<h3[^>]*>.*?</h3>' dist/work/index.html | head -10
```

Homepage, exactly four: Costa Rica Treatment Center, Surfsmash, AGA Beauty,
Michelle Pauly.

`/work`, exactly eight in this order: Michelle Pauly, AGA Beauty, Diana Ojeda,
Ray Pauly Photo, Costa Rica Treatment Center, Surfsmash, Templeton Living &
Lakewood Living, Demi.

- [ ] **Step 2: Confirm every case study page renders every image it declares**

```bash
for s in michelle-pauly aga-beauty diana-ojeda ray-pauly crtc surfsmash templeton-lakewood demi; do
  printf "%-20s %s\n" "$s" "$(grep -c '<img' dist/work/$s/index.html)"
done
```

Expected: michelle-pauly 4, aga-beauty 4, diana-ojeda 4, ray-pauly 6, and the
existing four unchanged from before this branch. Any zero or any number lower
than the manifest declares is a missing key, which the build will not report.

These counts are the manifest and the frontmatter agreeing. A key that is
imported but never referenced by a `beforeAfter`, gallery or `featureImage`
block renders nothing and fails nothing, so the count is what catches it.

- [ ] **Step 3: Sweep the whole build for dash violations**

```bash
grep -rloiE "&mdash;|&#8212;|&#x2014;|&ndash;" dist/work/ dist/index.html
grep -rlP "[\x{2014}\x{2013}]" dist/work/ dist/index.html
```

Expected: no output from either.

- [ ] **Step 4: Confirm the four new URLs resolve**

```bash
for u in https://www.michellepauly.com https://agabeauty.ca https://www.dianaojeda.ca https://raypaulyphoto.com; do
  curl -s -o /dev/null -w "%{http_code} $u\n" -L --max-time 20 "$u"
done
```

Expected: 200 on all four.

- [ ] **Step 5: Look at the four new pages in a browser**

Run `npm run dev` and open `/work`, then each of `/work/michelle-pauly`,
`/work/aga-beauty`, `/work/diana-ojeda`, `/work/ray-pauly` at 1440px and 390px.

Screenshots are the one thing no grep can check: a shot can be present, correctly
wired, and still be a bad crop, a cookie banner, a half-loaded image or a page
scrolled to the wrong place. Check each one is actually showing what its caption
claims.

- [ ] **Step 6: Commit any fixes and push**

```bash
git add -A
git commit -F- <<'EOF'
Fix what the verification pass found
EOF
git push -u origin case-studies-four
```

If the pass found nothing, skip the commit and just push.

---

## Notes for whoever merges `about-page`

Not part of this branch. `about.astro` exists only on `about-page` and still
carries its own hardcoded `descriptions` map of the four old slugs plus a
`.slice(0, 2)` over `order`. After this reorder that slice would feature
Michelle Pauly and AGA Beauty rather than CRTC and Surfsmash, and the four new
slugs would fall through to the `?? challenge` fallback.

It needs the same treatment applied here: read `cardDescription`, and take the
top two by `featured`. `about-page` also edits `content.config.ts` and
`index.astro`, both edited on this branch, so expect two small conflicts.
