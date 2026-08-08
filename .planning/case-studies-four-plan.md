# Four new case studies — Michelle Pauly, AGA Beauty, Diana Ojeda, Ray Pauly Photo

Branch: `case-studies-three`, cut from `main` at `94e199b`.
Date: 2026-07-31

> **Superseded for AGA Beauty (2026-08-06).** The AGA angle in this document
> ("one client at a time", "no storefront / no website at all", smallness as
> the premium thing) was rejected. Do not write copy from it.
> `.planning/focus/02-aga-beauty.md` governs.

## Goal

Add four shipped projects to the work section as full editorial case studies,
matching the Templeton/CRTC tier. Reorder the work listing so the new four lead
it. Keep the homepage at four cards.

All four sites are live and verified:

| Project | URL | Stack |
| --- | --- | --- |
| Michelle Pauly | `https://www.michellepauly.com` | Astro, Sanity, Vercel |
| AGA Beauty | `https://agabeauty.ca` | Astro, Tailwind, Vercel |
| Diana Ojeda | `https://www.dianaojeda.ca` | Astro, Tailwind, Vercel |
| Ray Pauly Photo | `https://raypaulyphoto.com` | Astro, Sanity, PhotoSwipe, Vercel |

## Voice constraint

Michelle's and Ray's sites were unpaid work for family. The copy never says so,
and never invents client language either — no "the client needed", no "they came
to us", no fabricated brief or budget. Write them as "we built" and let the work
carry it. Diana and AGA Beauty are paying clients and can be written normally.

No case study carries a dollar figure, a payment split, a rate exception or an
engagement type. That is deal history, not portfolio.

This is a rule about honesty, not about hiding anything: the pages make no claim
that isn't true.

## Ordering

`/work` and the work collection, by `order`:

| order | slug | file |
| --- | --- | --- |
| 1 | `michelle-pauly` | `01-michelle-pauly.md` |
| 2 | `aga-beauty` | `02-aga-beauty.md` |
| 3 | `diana-ojeda` | `03-diana-ojeda.md` |
| 4 | `ray-pauly` | `04-ray-pauly.md` |
| 5 | `crtc` | `05-crtc.md` |
| 6 | `surfsmash` | `06-surfsmash.md` |
| 7 | `templeton-lakewood` | `07-templeton-lakewood.md` |
| 8 | `demi` | `08-demi.md` |

The Templeton entry was merged with Lakewood on `main` at `94e199b`; its slug
is `templeton-lakewood` and its title covers both developments.

The four existing files are renamed and their `order` values bumped. Slugs are
derived by stripping the numeric prefix, so no URL changes.

## Homepage: an explicit featured set

`index.astro` currently maps over every work entry with no cap. Left alone, the
reorder would put eight cards on the homepage led by the four new ones. It must
stay at four.

Add an optional `featured` number to the work schema. Only featured entries
appear on the homepage, sorted by that number — independent of `order`.

| featured | project | change |
| --- | --- | --- |
| 1 | CRTC | unchanged |
| 2 | Surfsmash | unchanged |
| 3 | AGA Beauty | replaces Templeton |
| 4 | Michelle Pauly | replaces Demi |

Templeton, Demi, Diana and Ray omit `featured` and appear on `/work` only.

Two ordering fields is one more than the site has today, so the rationale
belongs in a comment on the schema: `order` is the full listing, `featured` is
the homepage shortlist, and they are deliberately not the same list. The
alternative — a hardcoded slug array in `index.astro` — was rejected because
this branch is removing hardcoded per-slug maps from that file, not adding one.

## `cardDescription` moves into frontmatter

Today the same card blurbs are hardcoded in `index.astro`, `work.astro` and
`about.astro`. Adding four case studies would mean editing three maps.

Add `cardDescription: z.string()` to the work schema, required, and fill it in
for all eight entries. Delete the `descriptions` maps from `index.astro` and
`work.astro`, along with the `?? project.data.challenge` fallbacks.

`about.astro` does not exist on `main` — it lives only on the `about-page`
branch — so this branch cannot touch it. Recorded as a follow-up below.

The three maps are not identical today: `index.astro` carries longer variants
for CRTC and Templeton. Consolidating means picking one blurb per project.
**Use the `/work` wording**, which is already shared by two of the three
surfaces. The homepage's two longer variants are dropped.

## The four case studies

All four use the full editorial layout already supported by `[slug].astro`:
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

### 2. AGA Beauty — premium at the scale of one

Tags: Website. Tech: Astro, Tailwind, Vercel. No `beforeAfter` — she had no
website at all, only Instagram.

**Challenge.** Malu Alburqueque runs her business out of a room in her home in
Burnaby. Nails, skin and body, one esthetician, one client at a time. No
storefront, no team, no website — Instagram and word of mouth, and a Google
rating where every single review is five stars.

In beauty, premium is normally signalled by scale: a storefront on a good
street, a team, a retail floor, a budget. She has none of it, and the default
small-business web presence — a template, stock photography, prices on request,
an enquiry form — would have read as exactly the opposite of what she is. The
gap was never the quality of the work. It was that nothing online showed it.

**Approach.** Don't dress the studio up as something bigger. Make the smallness
the premium thing, because one client at a time is precisely what a busy salon
cannot sell. The site says plainly what she is — a quiet room, one client at a
time, the same person every visit — and treats that as the advantage.

That forces credibility to come from somewhere other than scale, and she already
had it. The Google score is not parked in a testimonials section near the
footer; it sits in the hero and again beside the booking CTA. It is fetched live
from Google at build time rather than typed in, so it cannot drift, go stale or
be quietly inflated — which matters more, not less, when the whole case rests
on it.

It also means every claim has to be real, because there is no scale to hide
behind. Nothing on the site says the room smells nice or sounds nice, because
none of that had been confirmed. No team, no second location, no press, no
credentials she doesn't hold, no invented reviews. Her experience is 1.5 years,
in her own written words rather than the rounder number from the discovery
call, and her introduction runs close to verbatim.

**Solution.** Quiet editorial art direction — soft diffuse light, warm
neutrals, a lot of space — carried on real photographs of her actual room
rather than stock. Four pages: Home, About, Services, Contact.

Booking is the spine. Fresha cannot be embedded, so every Book Now opens her
booking page in a new tab, generated so the new-client fee is waived and the
tracking params stripped, or every website booking gets credited to Instagram
instead. Book Now sits in the header on every page and a sticky bar carries
WhatsApp and phone alongside it. Real prices sit next to every service rather
than behind an enquiry — hiding prices reads as something to negotiate, and
showing them reads as confidence, which is the cheaper way to look expensive.
Social proof sits beside the booking CTA rather than isolated. Her Instagram
feed runs live on the page. Built mobile-first, because bookings in this
category happen after hours from a phone.

**Results.** First draft sent Jul 28 and approved with no notes beyond a few
service price changes. Live Jul 29 at agabeauty.ca. Her Google listing and
Instagram now point somewhere that matches the reviews, and the client dashboard
lets her see her traffic and request content changes without emailing anyone.

Editorial blocks: `featureImage` on the booking surface, `solutionGallery`
(services with prices, the studio). No portrait of Malu: the layout has no slot
left for it once those are placed, and the case study's point is the shape of
her business rather than her face.

**Do not hardcode the review numbers into the case study.** The live figure at
time of writing is 5.0 from 8 Google reviews; both move, and the count is small
enough that printing it works against the point. Write the record — every
review five stars — not the arithmetic.

**Spelling and naming, both easy to get wrong:** the surname is **Alburqueque**,
not Albuquerque. The business is **AGA Beauty**, descriptor "Spa & Boutique".
"Nails" is a service, never the business name — the Google listing and her own
Instagram menu still carry older variants, and the case study must not copy
them. Do not put the subscription rate or contract value on the page.

The mid-build rebrand is **not** part of this story. Most of the site was
already built when it landed, and it changed tokens and a logo, not the
direction. It does not appear on the page.

### 3. Diana Ojeda — the site performs the method

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

### 4. Ray Pauly Photo — get out of the way

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
`solutionGallery` (album grid, inside an album), `resultsGallery` (the
PhotoSwipe lightbox, the About modal open over the gallery).

## Screenshots

Eighteen PNGs into `src/assets/case-studies/`, captured with Playwright at
1440px viewport width unless noted, prefixed by slug. Each is then imported into
the manifest in `work/[slug].astro` and, for the four hero images, the
`heroImages` map in `work.astro` and `caseStudyImages` in `index.astro`.

Every key below is placed in a `beforeAfter`, `featureImage` or gallery block by
the entry that owns it. A key that is imported but never referenced renders
nothing and fails nothing, so the set is deliberately kept to what the layout
actually has slots for.

| Key | Source |
| --- | --- |
| `michelle-home-hero` | live, homepage category tiles — also the card image |
| `michelle-before-home` | archived old site |
| `michelle-category` | live, a category grid |
| `michelle-project` | live, project detail showing the metadata block |
| `aga-home-hero` | live, homepage hero carrying the Google score — also the card image |
| `aga-services` | live, services with real prices beside each |
| `aga-studio` | live, the real room, her own photographs |
| `aga-booking-bar` | live, **390px**, sticky WhatsApp / phone / Book Now bar |
| `diana-home-hero` | live, homepage — also the card image |
| `diana-checkin` | live, the "Right now, I feel" interaction |
| `diana-paths` | live, paths grid |
| `diana-work-with-me` | live, Work With Me |
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
- `src/content/work/01-michelle-pauly.md`, `02-aga-beauty.md`,
  `03-diana-ojeda.md`, `04-ray-pauly.md` — new.
- `src/content/work/05-crtc.md`, `06-surfsmash.md`,
  `07-templeton-lakewood.md`, `08-demi.md` — renamed from `01`–`04`, `order`
  bumped, `cardDescription`
  added. CRTC and Surfsmash keep a `featured` value; Templeton and Demi get
  none, which is what drops them off the homepage.
- `src/pages/work.astro` — delete the `descriptions` map, read
  `cardDescription`; add the four hero imports.
- `src/pages/index.astro` — delete the `descriptions` map, read
  `cardDescription`, filter and sort by `featured`; swap the Templeton and Demi
  hero imports for AGA's and Michelle's.
- `src/pages/work/[slug].astro` — add the new imports and four manifest
  entries.
- `src/assets/case-studies/` — the new PNGs.

No styling changes. Every block these pages use is already built and already
Tailwind-only, so the project's utility-class rule is satisfied by not writing
any CSS.

## Verification

- `npm run build` clean, with four more pages than before.
- `/work` lists eight in the order above; `/` lists exactly four — CRTC,
  Surfsmash, AGA Beauty, Michelle Pauly.
- Every new case study page renders its images — a missing manifest key fails
  silently rather than erroring, so check each page rather than trusting the
  build.
- The four `url` values resolve.

## Follow-up, not in this branch

When `about-page` merges, `about.astro` arrives carrying its own hardcoded
`descriptions` map of the four old slugs and a `.slice(0, 2)` over `order`.
After this reorder that would feature Michelle and AGA Beauty rather than CRTC
and Surfsmash, and the new slugs would fall through to the `challenge`
fallback. It needs the same treatment applied here: read `cardDescription`, and
take the top two by `featured`.

`about-page` also edits `content.config.ts` and `index.astro`, both edited here,
so that merge will carry two small conflicts.
