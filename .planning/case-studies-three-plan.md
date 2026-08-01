# Three new case studies — Michelle Pauly, Diana Ojeda, Ray Pauly Photo

Branch: `case-studies-three`, cut from `main` at `94e199b`.
Date: 2026-07-31

## Goal

Add three shipped projects to the work section as full editorial case studies,
matching the Templeton/CRTC tier. Reorder the work listing so the new three lead
it. Keep the homepage at four cards, swapping Demi out for Michelle Pauly.

All three sites are live and verified:

| Project | URL | Stack |
| --- | --- | --- |
| Michelle Pauly | `https://www.michellepauly.com` | Astro, Sanity, Vercel |
| Diana Ojeda | `https://www.dianaojeda.ca` | Astro, Tailwind, Vercel |
| Ray Pauly Photo | `https://raypaulyphoto.com` | Astro, Sanity, PhotoSwipe, Vercel |

## Voice constraint

Michelle's and Ray's sites were unpaid work for family. The copy never says so,
and never invents client language either — no "the client needed", no "they came
to us", no fabricated brief or budget. Write them as "we built" and let the work
carry it. Diana is a real paying client and can be written normally.

This is a rule about honesty, not about hiding anything: the pages make no claim
that isn't true.

## Ordering

`/work` and the work collection, by `order`:

| order | slug | file |
| --- | --- | --- |
| 1 | `michelle-pauly` | `01-michelle-pauly.md` |
| 2 | `diana-ojeda` | `02-diana-ojeda.md` |
| 3 | `ray-pauly` | `03-ray-pauly.md` |
| 4 | `crtc` | `04-crtc.md` |
| 5 | `surfsmash` | `05-surfsmash.md` |
| 6 | `templeton` | `06-templeton.md` |
| 7 | `demi` | `07-demi.md` |

The four existing files are renamed and their `order` values bumped. Slugs are
derived by stripping the numeric prefix, so no URL changes.

## Homepage: an explicit featured set

`index.astro` currently maps over every work entry with no cap. Left alone, the
reorder would put seven cards on the homepage led by the three new ones. It must
stay at four, and it must keep the strongest three where they are.

Add an optional `featured` number to the work schema. Only featured entries
appear on the homepage, sorted by that number — independent of `order`.

| featured | project | change |
| --- | --- | --- |
| 1 | CRTC | unchanged |
| 2 | Surfsmash | unchanged |
| 3 | Templeton | unchanged |
| 4 | Michelle Pauly | replaces Demi |

Demi, Diana and Ray omit `featured` and appear on `/work` only.

Two ordering fields is one more than the site has today, so the rationale
belongs in a comment on the schema: `order` is the full listing, `featured` is
the homepage shortlist, and they are deliberately not the same list. The
alternative — a hardcoded slug array in `index.astro` — was rejected because
this branch is removing hardcoded per-slug maps from that file, not adding one.

## `cardDescription` moves into frontmatter

Today the same card blurbs are hardcoded in `index.astro`, `work.astro` and
`about.astro`. Adding three case studies would mean editing three maps.

Add `cardDescription: z.string()` to the work schema, required, and fill it in
for all seven entries. Delete the `descriptions` maps from `index.astro` and
`work.astro`, along with the `?? project.data.challenge` fallbacks.

`about.astro` does not exist on `main` — it lives only on the `about-page`
branch — so this branch cannot touch it. Recorded as a follow-up below.

The three maps are not identical today: `index.astro` carries longer variants
for CRTC and Templeton. Consolidating means picking one blurb per project.
**Use the `/work` wording**, which is already shared by two of the three
surfaces. The homepage's two longer variants are dropped.

## The three case studies

All three use the full editorial layout already supported by `[slug].astro`:
`challenge` → optional `beforeAfter` → `approach` → `solution` → gallery →
`results` → optional `resultsGallery`. No new components, no new CSS, no schema
fields beyond `cardDescription` and `featured`.

### 1. Michelle Pauly — the audience decides the architecture

Tags: Website, CMS. Tech: Astro, Sanity, Vercel.

**Challenge.** The old site was one long scrolling page that gave equal weight
to five professional projects, five graduate projects, three undergraduate
projects and a side project. Nothing distinguished built work from a school
assignment, and nothing said what she actually did on any of it — on most
professional work she was not the author. A hiring architect could not read the
one thing they open a portfolio to find.

**Approach.** The audience is architecture firms hiring, not clients and not the
public, and every structural decision resolves against that. Academic and
process work was cut entirely. Her role on each project was promoted to a
first-class field rather than buried in prose.

**Solution.** Homepage is category tiles — no splash, no hero, no featured
project. Categories are CMS documents she can add, rename and reorder, and any
category with no published projects hides itself automatically. Category pages
are uniform grids: 4:5 portrait crops, consistent sizing, project names always
visible, no hover-reveal. Project pages lead with the hero, then a metadata
block, then description and gallery. Soft grey ground rather than pure white.
Info carries the CV and a mailto; no contact form.

**Results.** Live at michellepauly.com, 15 pages, content editable in Sanity.
Cite the measured image-delivery numbers — above-fold homepage payload down
19% at 1440, 47% at 1920 and 60% at 2560 (all DPR2), flat at 897 KiB across
every desktop DPR2 viewport because the tile occupies the same slot at all of
them.

Editorial blocks: `beforeAfter` (old flat one-pager vs new category grid),
`solutionGallery` (category grid, project detail).

### 2. Diana Ojeda — the site performs the method

Tags: Website. Tech: Astro, Tailwind, Vercel. No `beforeAfter`.

**Challenge.** Diana's practice was invisible inside a site she shares with a
partner, and she is moving Gestalt coaching to the front of her offering. Three
modalities — Gestalt, Shiatsu, Biodanza — that a conventional site would split
into three service pages. That split fragments one practice into a menu, and a
menu is exactly the low-grade overwhelm her audience arrives carrying. She had
already rejected generic wellness copy as superficial.

**Approach.** Lead with the problem, not the technique name. Keep the three
modalities as one integrated offer rather than three products. And replace the
service-card grid with a single present-tense sentence the visitor completes
themselves.

**Solution.** The homepage opens on *"Right now, I feel ___"* — a small set of
honest states to choose from, and choosing one brings that need to the
foreground and reveals the way in. One felt choice instead of a four-way visual
scan. This is the centre of the case study: the interaction enacts the method
rather than describing it — present-moment awareness, first-person language,
and an awareness the visitor arrives at rather than a label pushed at them. It
holds only while the copy stays first-person and present-tense; the moment it
becomes a dropdown of service names it collapses back into a menu.

Beyond that: a two-line credentials trust strip, hand-drawn stroke markers
rather than numbers on the paths, and a palette warmer and bolder than the muted
wellness default — deliberately unlike the shared site's watercolour.

**Results.** Live at dianaojeda.ca. Four pages: Home, About, Work With Me,
Contact.

Editorial blocks: `featureImage` on the check-in interaction (the centrepiece),
`solutionGallery` (paths grid, Work With Me).

Do not put a dollar figure, the payment split or the portfolio-rate exception on
the page.

### 3. Ray Pauly Photo — get out of the way

Tags: Website, CMS. Tech: Astro, Sanity, PhotoSwipe, Vercel.

**Challenge.** The old raypaulyphoto.com was a hand-built site from the jQuery
era — jcarousel, cycle.lite, and an IE6 PNG-transparency shim still sitting in
the source — serving full-resolution originals straight out of `/images/original/`
as thumbnails. There was no CMS, so every new photograph meant going back to
whoever built it.

**Approach.** Deliberately not a photography business site: no CTAs, no hire-me
energy, nothing competing with the photographs. And publishing had to be
something he does himself in two minutes.

**Solution.** One scrollable homepage — full-bleed hero, then straight into the
album grid with no break. Album pages open a PhotoSwipe lightbox with keyboard
and swipe. About is a modal off the nav, not a page or a route. Warm off-white
ground, near-black text, and no accent colour anywhere — the photographs are the
colour. Images go through Sanity's CDN. The Studio is scoped to two document
types, Site Settings and Albums, so adding an album is create, upload, caption,
publish.

**Results.** Live at raypaulyphoto.com, albums published by the photographer
without a developer.

Editorial blocks: `beforeAfter` (2022 archive vs new homepage),
`solutionGallery` (album grid, lightbox).

## Screenshots

Fifteen PNGs into `src/assets/case-studies/`, captured with Playwright at
1440px viewport width, prefixed by slug. Each is then imported into the manifest
in `work/[slug].astro` and, for the three hero images, the `heroImages` map in
`work.astro` and `caseStudyImages` in `index.astro`.

| Key | Source |
| --- | --- |
| `michelle-home-hero` | live, homepage category tiles — also the card image |
| `michelle-before-home` | archived old site |
| `michelle-category` | live, a category grid |
| `michelle-project` | live, project detail showing the metadata block |
| `diana-home-hero` | live, homepage — also the card image |
| `diana-checkin` | live, the "Right now, I feel" interaction |
| `diana-paths` | live, paths grid |
| `diana-work-with-me` | live, Work With Me |
| `diana-about` | live, About |
| `ray-home-hero` | live, hero into album grid — also the card image |
| `ray-before-home` | Wayback, Feb 2022 |
| `ray-album-grid` | live, album grid |
| `ray-album` | live, inside an album |
| `ray-lightbox` | live, PhotoSwipe open |
| `ray-about-modal` | live, About modal open |

Before-shot sourcing:

- **Michelle** — the old site is archived complete at
  `D:\Work\Plain Sight\Projects\Michelle Pauly\old-site`. Serve it over
  localhost and capture. Its `img/` holds 12 files against roughly 15 listed
  projects, so **check for broken images before accepting the shot**; if it does
  not render faithfully, fall back to a Wayback snapshot of michellepauly.com.
- **Ray** — `http://web.archive.org/web/20220224033215/http://www.raypaulyphoto.com/`,
  confirmed reachable. Crop out the Wayback banner.

Any before shot must be a real capture. If neither source renders honestly, drop
the `beforeAfter` block for that case study rather than approximate it.

## Files touched

- `src/content.config.ts` — add `cardDescription` (required) and `featured`
  (optional number) to the work schema, with the comment explaining the two
  ordering fields.
- `src/content/work/01-michelle-pauly.md`, `02-diana-ojeda.md`,
  `03-ray-pauly.md` — new.
- `src/content/work/04-crtc.md`, `05-surfsmash.md`, `06-templeton.md`,
  `07-demi.md` — renamed from `01`–`04`, `order` bumped, `cardDescription`
  added, `featured` added to CRTC, Surfsmash and Templeton.
- `src/pages/work.astro` — delete the `descriptions` map, read
  `cardDescription`; add the three hero imports.
- `src/pages/index.astro` — delete the `descriptions` map, read
  `cardDescription`, filter and sort by `featured`; swap the Demi hero import
  for Michelle's.
- `src/pages/work/[slug].astro` — add the new imports and three manifest
  entries.
- `src/assets/case-studies/` — the new PNGs.

No styling changes. Every block these pages use is already built and already
Tailwind-only, so the project's utility-class rule is satisfied by not writing
any CSS.

## Verification

- `npm run build` clean, with three more pages than before.
- `/work` lists seven in the order above; `/` lists exactly four, ending on
  Michelle Pauly.
- Every new case study page renders its images — a missing manifest key fails
  silently rather than erroring, so check each page rather than trusting the
  build.
- The three `url` values resolve.

## Follow-up, not in this branch

When `about-page` merges, `about.astro` arrives carrying its own hardcoded
`descriptions` map of the four old slugs and a `.slice(0, 2)` over `order`.
After this reorder that would feature Michelle and Diana rather than CRTC and
Surfsmash, and the two new slugs would fall through to the `challenge`
fallback. It needs the same treatment applied here: read `cardDescription`, and
take the top two by `featured`.

`about-page` also edits `content.config.ts` and `index.astro`, both edited here,
so that merge will carry two small conflicts.
