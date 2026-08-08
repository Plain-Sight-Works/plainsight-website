# Case study guide — plainsight.works

The house format for everything in `src/content/work/`. Covers the card and
the body: what each field is for, how long it runs, and what does not belong
in any of them.

**Read first:** `plain-sight-writing-guides/guides/universal-rules.md` (the
mechanical floor for every surface: no em dashes in prose, no market-y
"actually", no abstractions doing work, no talking around the thing) and
`guides/brand-foundation.md` (Plain Sight's voice). This guide is the
site-specific layer on top of those, not a replacement for them.

**Per-project facts live elsewhere.** What a given case study should feature,
and what it must avoid, goes in a focus brief under `.planning/focus/`, named
to match the content file. See `.planning/focus/02-aga-beauty.md`. Those
briefs cover *what to say*; this guide covers *what shape it takes*.

`src/content/work/01-michelle-pauly.md` is the register reference. It is the
one body that has been through review and approval, and the rules below are
derived from it.

---

## The card (`cardDescription`)

The `cardDescription` in a case study's frontmatter is a teaser, not a
summary. It sits under the project title on the homepage and on `/work`,
clamps at four lines (`CaseStudyCard.astro`), and its only job is to get the
case study opened.

**Default shape: the client's situation, then our move.** Six of the eight
cards on the site are built this way, and it works.

- ✓ "A certified esthetician with a private studio in Burnaby and a solid five-star Google rating. We designed a premium site that presents her, her services and her studio as a personal choice, backed by the trust she has earned."
- ✓ "An international addiction treatment center whose site had grown hard for families to navigate. We rebuilt it around the questions families ask, with a design as warm as the care it describes."

The situation is usually the old site. That's fine, subject to the next rule.

### A before/after has to be legible without the before

The reader has never seen the old site and never will. State the prior
condition as a self-contained observable fact so the sentence carries on its
own. A delta that only decodes if you already know what changed leaves the
reader holding a comparison they can't make.

- ✗ "The site is her professional work now." (Now, as opposed to what?)
- ✓ "still running on jQuery-era plugins, down to an IE6 transparency shim in its source"
- ✓ "whose websites undersold them: dense, crowded, and clumsy on a phone"

When the prior state can't be made legible inside a clause, drop it and open
on what the site does instead.

### Inventory is not an achievement

How much content the client has is a fact about their career, not about the
work. If you built a blog, you would not lead with how many posts are on it.

- ✗ "ten projects in one grid"
- ✗ "forty recipes, organised by season"
- ✓ "a grid of every project under a category filter"

A number earns the card when the number is the news: "Live now on the App
Store and Google Play" carries, because shipping is the achievement.

### Definitional properties are not selling points

A portfolio holds professional work. A restaurant site has a menu. Naming the
baseline as though it were a result reads as having nothing to say. This is
*don't state the obvious* sharpened: the failure isn't blandness, it's
presenting a definition as an outcome.

- ✗ "The site is her professional work."
- ✗ "A website that shows what the business offers."

### One mechanic, not a spec list

The card gets at most one concrete design decision, and only if it's the
distinguishing idea. Stack three and the teaser becomes a spec sheet,
spending the reveal the case study is there to deliver. The mechanics belong
in `solution`.

- ✗ "one grid, filtered by type, every project the same size"
- ✓ "put a sentence the visitor finishes where a grid of service cards would sit"

---

## The body

The card gets the case study opened. The body has to be worth opening.

A reader should come away with a quick sense of what was achieved, what the
site does for the business, and what it looks and feels like. Not a record of
how we reached our decisions.

### Length

The whole body runs roughly 400 to 500 words across the four fields. It is a
case study, not a build log.

| Field | Shape |
|---|---|
| `challenge` | 2 paragraphs, 80–120 words |
| `approach` | 3 short paragraphs, 100–130 words |
| `solution` | 4 paragraphs, 200–240 words |
| `results` | optional, 1 paragraph, under 90 words |

A field that runs long is almost always carrying mechanics that belong
nowhere.

### Field by field

**`challenge`** — who the client is, then the specific problem. State the
prior condition as an observable fact and move on. Do not dramatise what they
lacked, and do not raise the quality of their work as a question in order to
dismiss it: "the work was already premium" implies it was once in doubt, or
ours to affect. Neither is true and both read badly.

**`approach`** — the strategy and the reasoning behind it, at intent level.
What had to be true of the site, and why. Never where anything sits on the
page.

**`solution`** — opens with the result and why it works, *then* the details of
how. The first sentence answers the challenge; it is never a design detail,
because a palette is not a solution to anything. One paragraph should describe
the look and the feeling of the site. That paragraph is the one readers
respond to and the easiest to leave out.

Every paragraph in this field has to name its own subject in its first clause.
A reader lands mid-page and skims, so "That page draws it as a lotus" and
"Deep teal and sage sit on a cream background" both leave them reaching
backwards for a referent. Name the page, the palette, the class. Full rule in
`universal-rules.md`.

### `approach` states the intent, `solution` states the result

The two fields are a pair, and they are supposed to close. If `approach` says
Diana wanted the site to feel warm and alive rather than clinical, `solution`
has to say whether it does. Cutting that payoff to avoid repetition leaves the
intent hanging, which is worse than the repetition it avoids.

What must not repeat is the **phrasing**. "Warm and alive, rather than
clinical" in `approach` and "feels warm rather than clinical" in `solution` is
the same sentence twice. "A design that feels warm and personal but also
vibrant and alive" closes the loop without echoing it.

**`results`** — optional, and earns its place one sentence at a time. A
sentence that closes the loop the `challenge` opened belongs. A sentence that
recaps the `solution` does not. If nothing survives that filter, omit the
field; the section is padding without it.

### What does not belong in any of them

- **Placement mechanics.** "Directly under Book Now and linked down to the
  quotes it summarises." Putting a rating high on a page is not a feat, and
  narrating where things sit reads as filler.
- **Implementation detail.** Build-time fetching, UTM parameters, which
  third-party widget refused to embed. If it matters to the business, one
  plain sentence about the outcome; otherwise nothing.
- **The claims we declined to make.** Listing what we did not invent is not an
  achievement, and it plants the idea that the client might have wanted us to.
- **Our own reasoning process.** The reader wants what is on the page, not the
  internal argument that produced it.

---

## Calibration log

- **2026-08-07.** Two changes, measured off Adrian's hand-rewrite of the Diana
  Ojeda `solution`. The voice-neutral rules from the same pass went to
  `plain-sight-writing-guides/guides/universal-rules.md` (compression in place
  of explanation, paragraphs opening without a subject, the contrast tail);
  what stayed here is bound to this schema. (1) **`approach` states the intent,
  `solution` states the result.** This corrects a call made earlier the same
  day: a draft was cut for repeating "warm rather than clinical" from
  `approach`, and Adrian restored the idea in different words. The ban is on
  the phrasing, not on the loop, and cutting the loop leaves the intent
  unresolved. (2) **`solution` length raised from 130–180 to 200–240 words.**
  Explaining an interaction in sequence, with a subject in every sentence,
  costs roughly fifty words more than the compressed version the old band was
  measured against; his rewrite runs about 230 and is not padded. The other
  three bands still hold — his `challenge` and `approach` land inside them
  unchanged. **Not adopted:** a rule that the look-and-feel paragraph goes
  last. He moved it from third to fourth, but that is one sample and the
  existing instruction (one paragraph must describe look and feeling) already
  covers what matters.
- **2026-08-06 (second pass).** Added *The body*, from the AGA Beauty rewrite,
  and moved this whole guide out of
  `plain-sight-writing-guides/guides/marketing-copy.md` into the repo. The
  move was Adrian's call: these rules are bound to this site's content schema
  and its eight case studies, so they belong next to the content, while the
  skill keeps the rules that hold across every Plain Sight surface. Origin of
  the body rules: a per-project focus brief
  (`.planning/focus/02-aga-beauty.md`) was written to capture what a given
  case study should feature, and it worked for content while the draft still
  came back wrong on shape — too long, too much implementation detail, and
  `solution` opening on the palette instead of the result. That split is why
  focus briefs stay about facts and angle and shape lives here. The length
  table is measured off Michelle Pauly, the only body that has been through
  review and approval. Two rules came from specific rejections and are worth
  their own note: **`solution` opens with the result, not a detail** ("the
  solution to the challenge is not a warm palette"), and **`results` earns its
  place one sentence at a time** — a sentence closing the `challenge` loop
  belongs, a sentence recapping `solution` does not, which is a sharper filter
  than the earlier project-level "does this project have results worth
  reporting." **Deliberately included:** the instruction that one paragraph
  must describe the look and feeling of the site. Adrian raised it unprompted
  as something that is always good to have, and it is the first thing that
  gets cut when a draft is trimmed for length. **Also changed:** the first ✓
  card example was the old AGA card, which was rejected in this same pass, so
  it is replaced with the approved version.
- **2026-08-06.** Added the *Case study cards* rules, from Adrian rewriting the
  Michelle Pauly card by hand after three rejected drafts. Four rules, three
  of them from his stated objections and one from the delta between his
  version and the last draft. (1) *A before/after has to be legible without
  the before.* The first instinct after his "don't lead with the site that
  doesn't exist anymore" was to ban prior-state references outright, which the
  other cards immediately falsify: six of eight open on the old site and read
  fine. The real failure was "the site is her professional work **now**" — an
  implied comparison to something the reader has never seen. Ray's "IE6
  transparency shim" works because it is a self-contained fact. Filed this way
  so the rule doesn't overcorrect into banning the house formula.
  (2) *Inventory is not an achievement*, from his blog analogy: "if you build a
  blog, would you lead with how many posts are on it?" The count of the
  client's content describes their career, not the work. Deliberately separate
  from *no counted headings* in `universal-rules.md`, which is about a heading
  tallying the sections beneath it. (3) *Definitional properties are not
  selling points* — his "her site being professional work is just a definition
  of what it is." This is the existing *don't state the obvious* rule with a
  much sharper example than "reflects your business," so it's filed as its own
  sub-rule rather than a bullet edit. (4) *One mechanic, not a spec list*,
  which he didn't state but which is the clearest difference between the
  drafts: his version stayed at intent level, the rejected draft opened "one
  grid, filtered by type, every project the same size" — three layout facts in
  a colon-list, which is also the rule-of-three tell from *no rhythm before
  content*. The sibling cards each carry exactly one mechanic. **Not adopted:**
  a rule that the card should extend the subtitle. The hypothesis was that
  Michelle's subtitle ("rebuilt for a new stage in her career") governed the
  card, since his rewrite echoes it, but checking all eight showed cards and
  subtitles are independent, so the echo was coincidence rather than a pattern
  to codify.
