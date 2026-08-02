# About Page — Plan

**Date**: 2026-07-31
**Goal**: Ship `/about` as the trust closer. Someone who has read the homepage and skimmed the work lands here asking "can I trust these two?" and leaves for `/contact`.
**Status**: Planned, not started. Copy drafted below and ready to lift. Blocked only on portraits and testimonials, both of which have shipping placeholders.

---

## Why this page, and why this shape

Five studio About pages were reviewed (Basic/DEPT, Viget, Barrel, Humaan, Sanctuary Computer) plus the data-backed best-practice literature. The transferable finding is that **About-page format tracks company scale, and borrowing the wrong scale backfires.**

- Basic/DEPT opens on a six-metric snapshot: 120+ people, 28 offices, 145 Webbys.
- Viget runs six named values plus a filterable staff roster.
- Barrel runs a 2010–2025 timeline and a 26-question FAQ.
- Humaan opens on a 20-logo client wall.

Every one of those devices is load-bearing because the studio is big or old. Run them at two people and four case studies and they read as padding. A stats bar whose headline number is "2" invites the question we do not want asked.

The one finding worth taking literally comes from Orbit Media's analysis across 500+ analytics accounts: About pages sit in the **top 5–10 most-visited pages** on a typical site, convert at roughly **11% visitor-to-contact** when the closing CTA is lead-gen rather than a newsletter, and **58% of buyers decide on beliefs and values** (Edelman). Their story framework (who is behind this, why did they start it, what do they believe, what problem do they solve, where are they) maps almost exactly onto what the canonical strategy doc already says. One more useful note: About is the single page where heavy "we / our / us" is correct, so the brand voice can run at full warmth here.

**So the page's spine is the two of us.** "Senior people do the work, no account-manager telephone game" is the claim in the canonical doc. Two named faces with fifteen years of receipts each is the proof. Everything else hangs off that.

---

## Deliberately not included

| Device | Why not |
| --- | --- |
| Named values list (Viget, Barrel) | Abstract virtues from a two-person studio read as filler. The bios do this job with evidence instead. |
| Metrics snapshot bar (Basic/DEPT) | Our numbers are personal career history, not agency scale. Floating them as agency stats invites the wrong read. |
| History timeline (Barrel) | Founded 2026. Nothing to plot. |
| The four pillars | Already on the homepage. Repeating them here is thin duplicate content and dilutes both pages. |
| The four process steps | Already on the homepage and `/services`. |
| Client logo wall (Humaan) | Four clients. Two case study cards do more work. |

---

## Voice constraints applied

Written against `plain-sight-writing-guides`: universal-rules → brand-foundation → marketing-copy.

- Zero em dashes in any rendered string, including alt text. Check the entity forms too (`&mdash;`, `&#8212;`, `&#x2014;`) before sign-off.
- No "actually" as an intensifier, no "honestly" as faux-candor.
- No staccato. Sentence lengths vary inside every paragraph.
- **No negative framing.** This is why the post-launch section is titled "The site gets better after launch" rather than the earlier draft's "We don't disappear after launch," which the marketing guide bans by name.
- No unfounded claims about the competition. The post-launch section states what we do and lets the contrast land on its own, with no "most agencies" foil.
- No leading with negation. "You explain your business once" replaces "nothing gets handed to a junior."

---

## Page structure

Route `/about`. Nav becomes **Services · Work · About · Contact**, with About immediately before the conversion step.

Content lives in a new `about` content collection (`src/content/about/`), one markdown file per section with `section` + `order` frontmatter, matching the existing `homepage` and `services` collections exactly. Copy edits never touch the template.

### 1. Hero

Reuses the `/work` page-hero pattern: `text-page-hero`, `font-black`, `tracking-tighter`, light nav.

> # The same two people since 2005
>
> Plain Sight is Adrian and Ricardo. We met studying computer animation in Costa Rica and have been building things together since. One designs, one builds, and the person you talk to is the person doing the work.

The partnership is the more distinctive claim and no competitor can copy it. Twenty-one years together is what makes "senior people do the work" credible, because it says these two are a unit rather than a convenient pairing. The combined-experience number moves down into the bios where it belongs.

*Alternate if this one does not land: "Thirty years of this, between the two of us." Same trick, leading on experience instead of partnership.*

### 2. Twenty years, give or take

Editorial prose block, max-width ~900px, echoing the homepage "problem" section rhythm. Closes on a teal kicker at `text-problem-kicker`.

> ## Twenty years, give or take
>
> We met in 2005, studying computer animation in Costa Rica. Neither of us does much animating now. What we did back then was spend four months backpacking through South America, come home broke, and start building websites for whoever would pay us.
>
> Separate jobs pulled us apart for a while. Adrian spent six years at a digital agency and brought Ricardo in partway through, and a few years after that we both moved to Vancouver to join the same startup, where we spent five years building a software platform from scratch. By the time we left, starting a studio was the only idea either of us had. It had been sitting there the whole time, hiding in plain sight.
>
> The name stuck because it describes the work too. Most businesses we meet already know what makes them worth choosing. It shows up in how they talk about their work, in what customers keep saying back to them, in the details they think are too ordinary to mention. We find that and put it where people can see it.
>
> **The answer is usually already there. Someone just has to point at it.**

The story does the trust work that a values list cannot. The backpacking detail earns its place because nobody invents it, and it is the line that turns two names into two people. The name's double meaning then lands on a real event rather than as wordplay.

### 3. Who you're working with

The centrepiece. Two portraits at 4:5, side by side on desktop, stacked on mobile. Name in Darker Grotesque black, role in the mono uppercase treatment the homepage already uses for `01 STRATEGY`. Facts render as an inline row under each bio, not as a stats bar.

> ## Who you're working with
>
> Between us we have shipped websites, mobile apps, and software platforms for the better part of two decades. Here is who does what.

**Adrian Pauly · Design and strategy**

> Fifteen years of designing and building for the web, first in Costa Rica and now in Vancouver. He spent the last five at a startup, leading design and front-end development on a SaaS platform built from scratch, running discovery with the people who used the software every day, designing it in Figma, then building the interface himself. Before that came seventy-odd freelance projects and twelve years running Costa Rica's largest independent music platform, which grew to forty thousand members. He handles strategy, design, and being the person you talk to.

Facts row: `15+ years` · `Figma to front end` · `Product discovery` · `Costa Rica to Vancouver`

**Ricardo Tovar · Development and architecture**

> Fifteen years of full-stack engineering. He spent the last five as the senior developer on a startup's SaaS platform, built from the ground up: the Angular front end, the Node back end, the AWS infrastructure underneath it, and the payment and accounting integrations that move the money. He has shipped an iOS app used by thousands of students, mentored a long line of developers, and writes the kind of automated test coverage that makes a deploy boring. He handles the build, the infrastructure, and everything under the hood.

Facts row: `15+ years` · `Front end to infrastructure` · `AWS and Terraform` · `Swift and iOS`

**Employer names stay out of both bios.** The work is described, the company is not. This is a standing constraint on this page, not a placeholder awaiting a name.

### 4. How we work

Three statements as prose, not cards. The homepage owns the card grid; this section answers what the homepage does not, which is what working with us is like.

> **Strategy before pixels.** Every project starts with what the site has to accomplish. More calls, more bookings, better leads. Once that is settled, the design and the code are the straightforward part.
>
> **Senior people, start to finish.** The two of us do the work, from the first call to the last deploy. You explain your business once, to the people who are going to build the thing.
>
> **You always know where things stand.** You will know what is happening, why it is happening, and what comes next. Most of the stress in a website project comes from wondering where it stands, so we take care of that from day one.

### 5. The site gets better after launch

`.dark-section`, full bleed, breaking the page rhythm the way the homepage dark hero and process sections do. This is the differentiator the canonical doc calls strongest and currently understated everywhere.

> ## The site gets better after launch
>
> Launch day is where the useful part starts. Once real people are using the site we can watch what they do: where they land, what they read, where they hesitate, what they click. We take that, improve the thing they hesitated on, confirm the change with real numbers, and go again.
>
> Small improvements made steadily add up quickly. Give a site that kind of attention and it keeps earning its keep for years.

Named positively per the marketing guide. The Dashboard stays unnamed until there is something to show.

### 6. Proof

Two `CaseStudyCard` components plus a link through to `/work`. Below them, a testimonial slot that renders **only when the collection has entries**, so nothing placeholder-shaped ever reaches production.

### 7. The facts

Small typographic strip, `text-15`, muted:

`Vancouver, BC` · `Two people` · `BC General Partnership` · `West Coast hours, clients across North America`

Unglamorous, and it does more trust work for a studio this size than any values list.

### 8. CTA

Existing `<CTA>` component, canonical closing copy.

> ## Let's talk about your site
>
> Come with a full wishlist or come with questions. We're good either way.

CTA: **Get in touch** → `/contact`

Total body copy lands around 700 words, which is where the research puts a tight About page.

---

## Build tasks

1. `src/content.config.ts` — add an `about` collection. Schema: `section`, `order`, `heading?`, `subheading?`, `kicker?`, `items?` (title + description). Mirror the `homepage` collection.
2. `src/content/about/` — eight markdown files, `01-hero.md` through `08-cta.md`, carrying the copy above.
3. `src/components/Portrait.astro` — renders an `<Image>` when a photo is supplied, and the placeholder block when it is not. Props: `src?`, `name`, `initials`. Placeholder is a `bg-surface-alt` block at `aspect-[4/5]` with the initials in `font-heading` at low opacity. Layout is therefore final before the photos exist, and swapping them in is a one-line frontmatter change per person.
4. `src/pages/about.astro` — the template. Tailwind utilities only, existing tokens only, no new CSS.
5. `src/components/Nav.astro` — add the About link in both the desktop row and the mobile drawer, light and dark variants.
6. `src/pages/index.astro` — delete the commented-out UpMeals testimonial block. They are no longer a client and it should not sit in the source.
7. Voice pass before commit: grep all four em-dash entity forms, plus `actually`, `honestly`, across the new content files.

No new dependencies, no new CSS files, no changes to `tailwind.css` or `custom.css`.

---

## Open items

| Item | Blocking? | Note |
| --- | --- | --- |
| Two portraits, 4:5, consistent treatment | No | Placeholder component ships; drop in `src/assets/team/` and set frontmatter when ready. |
| Testimonials from current clients | No | Section renders nothing until entries exist. |
| Ricardo to approve his bio | Yes, before launch | Drafted from his 2026-01-15 resume. Facts are his to confirm. |
| Ricardo's tenure at the agency | No | Adrian recalls four years, the resume says 2017–2020. Section 2 says "partway through" and avoids the number, so this only matters if we ever state it. |
| Freelance years | No | Adrian recalls roughly 2009–2013. Section 2 does not date that stretch, so no number is exposed. |

### Timeline of record

Used to keep every draft consistent. Not all of it reaches the page.

| When | What |
| --- | --- |
| 2005 | Met studying computer animation, Universidad Veritas, Costa Rica |
| ~2005–2006 | Four months backpacking South America |
| ~2009–2013 | Freelancing together in Costa Rica, building websites |
| 2014 | Adrian joins a digital agency, six years |
| ~2017 | Adrian brings Ricardo in |
| 2020 | Both move to Vancouver to join the same startup, five years building a SaaS platform from scratch |
| 2026 | Plain Sight |
