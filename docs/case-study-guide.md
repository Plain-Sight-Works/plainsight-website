# Case study guide — plainsight.works

The house format for `src/content/work/`. Shape only: how long each field runs
and what belongs in it.

**Read first:** `plain-sight-writing-guides/guides/universal-rules.md` and
`guides/brand-foundation.md`. Those hold the craft rules for every Plain Sight
surface and this guide does not repeat them. It only says what shape a case
study takes.

**Per-project facts live elsewhere.** What a given case study should feature,
and what it must avoid, goes in a focus brief under `.planning/focus/`, named
to match the content file. Briefs cover *what to say*; this covers *what shape
it takes*.

`src/content/work/01-michelle-pauly.md` is the register reference: the one body
that has been through review and approval.

---

## Nothing invented

Every claim about the client, the old site or the new one comes from the focus
brief, the client's own words, or the site itself. Nothing is inferred,
assumed, or added because a sentence needed a clause.

**Invented problems are the main failure.** A symptom nobody ever complained
about, written up as though it were a reason for the project. A draft of Ray
Pauly said the old homepage ran a slideshow "the visitor could not stop or
steer" — true of every slideshow, raised by nobody, and reasoned backwards from
the grid we had already built to a problem that would justify it.

**Inflating a fact into a complaint.** A timer is an observable fact. A visitor
frustrated by it is a claim about a person, and nobody made it.

**A flagged fact gets deleted, not compressed.** When a detail comes back as
wrong, unnecessary or unclear, cut it. Rewriting it shorter keeps the claim and
hides it, and it comes back a second time. Ray Pauly's gallery list was flagged
as unnecessary detail, returned as "the galleries had dropped out of the site's
navigation", and was flagged again as a problem that never existed. Two review
passes to delete one clause.

If a fact would make the sentence better and you do not have it, ask for it.
Do not write the sentence.

---

## The card (`cardDescription`)

A teaser, not a summary. It sits under the project title on the homepage and on
`/work`, clamps at four lines (`CaseStudyCard.astro`), and its only job is to
get the case study opened.

**Default shape: the client's situation, then our move.** Six of the eight cards
on the site are built this way, and it works.

> A certified esthetician with a private studio in Burnaby and a solid
> five-star Google rating. We designed a premium site that presents her, her
> services and her studio as a personal choice, backed by the trust she has
> earned.

The situation is usually the old site. Four constraints on it:

**A before/after has to be legible without the before.** The reader has never
seen the old site and never will. State the prior condition as a self-contained
observable fact. When it can't be made legible inside a clause, drop it and open
on what the new site does instead.

- ✗ "The site is her professional work now." (Now, as opposed to what?)
- ✓ "still running on jQuery-era plugins, down to an IE6 transparency shim in its source"

**Inventory is not an achievement.** How much content the client has is a fact
about their career, not about the work. If you built a blog, you would not lead
with how many posts are on it.

- ✗ "ten projects in one grid"
- ✓ "a grid of every project under a category filter"

A number earns the card when the number is the news: "Live now on the App Store
and Google Play" works, because shipping is the achievement.

**Definitional properties are not selling points.** A portfolio holds
professional work. A restaurant site has a menu. Naming the baseline as though
it were a result reads as having nothing to say.

- ✗ "The site is her professional work."
- ✗ "A website that shows what the business offers."

**One mechanic, not a spec list.** The card gets at most one concrete design
decision, and only if it's the distinguishing idea. Stack three and the teaser
becomes a spec sheet, spending the reveal the case study is there to deliver.
The mechanics belong in `solution`.

- ✗ "one grid, filtered by type, every project the same size"
- ✓ "put a sentence the visitor finishes where a grid of service cards would sit"

---

## The body

The card gets the case study opened. The body has to be worth opening.

A reader should come away with a quick sense of what was achieved, what the site
does for the business, what it looks and feels like, and that the people who
built it knew what they were doing.

That last one is why the case study exists at all, and the only thing that
produces it is naming our decisions and what each one was for. **Explaining our
reasoning is the job of this document, not a digression from it.** A case study
with the reasoning stripped out is a feature list, and a feature list proves
nothing about whether we can think.

### Length

**The whole body runs 350 to 450 words. 450 is a hard ceiling.**

| Field | Shape | Ceiling |
|---|---|---|
| `challenge` | 2 paragraphs | 120 |
| `approach` | 3 short paragraphs | 130 |
| `solution` | 4 paragraphs | 230 |
| `results` | optional, 1 paragraph | 80 |

**The total binds. The per-field ceilings do not.** They add to 560, so they
cannot all be spent at once. A field near its ceiling means another is well
under it.

For scale: Michelle runs 363 words and Diana 441. Both are finished, neither is
thin, and a case study that says everything in 350 is done rather than short.

When a draft is over, cut it. Do not move words from one field into another;
that is the same draft with the overflow hidden. A field that runs long is
almost always holding mechanics that belong nowhere.

### Field by field

**`challenge`** — who the client is, then the specific problem. State the prior
condition as an observable fact and move on. Do not dramatise what they lacked,
and do not raise the quality of their work as a question in order to dismiss it:
"the work was already premium" implies it was once in doubt, or ours to affect.
Neither is true and both read badly.

**`approach`** — the strategy and the reasoning behind it, at intent level. What
had to be true of the site, and why. Never where anything sits on the page.

**`solution`** — a quick walk through the design, strategy and technical
decisions that were made, and what each one is for. Not a tour of what the page
looks like. The first sentence answers the challenge; it is never a design
detail, because a palette is not a solution to anything. One paragraph describes
the look and the feeling of the site. That paragraph is the one readers respond
to and the first thing cut when a draft is trimmed for length. Keep it.

See *Decisions, not furniture* below. It is the rule this field fails most.

**`results`** — optional. It states what is true of the live site now, and
nothing else.

Three things it is not. **Not the old site:** a sentence about what the previous
site failed to do is the `challenge` again in different clothes. **Not what the
new site can do:** that is the `solution`. **Not a trajectory:** "the site has
been growing since it launched" is a claim about months of activity nobody
tracked. This is the field where invented claims are most tempting, because a
results section wants an arc and most projects do not have one. If a number, a
trend or an outcome is not something we can point at today, it does not go in.

What is left is the narrow set of facts that only became true at launch. The
field earns its place one sentence at a time, and **if what survives is not
distinct from the `solution`, cut the field.** Restating what the previous
section already said is padding.

### Decisions, not furniture

Every sentence in `solution` has to name something we decided. If the same
sentence would be true of any competently built website, it is describing a
website rather than this one, and it goes.

- ✗ "his name, one line under it, and then the photographs, running as wide as
  the screen allows"
- ✓ "The homepage opens with a masonry grid of featured photographs, so a
  visitor sees Ray's best work immediately."

Every site has a name at the top and images that fit the screen. Neither is a
decision anyone made. The masonry grid is.

**A decision gets its purpose attached, and a purpose gets its decision.** Each
half fails on its own, in opposite directions. The mechanic alone reads as a
spec sheet: "a masonry grid, two to five columns." The purpose alone reads as
agency-speak and names nothing we built: "credibility had to be doing something
from the first screen." Written together they are the sentence that shows we
knew what we were doing — masonry grid *so the layout is varied and interesting
to scroll*, Ray flags his own featured photographs *so he controls what leads
the homepage*.

**Whether an element belongs depends on what you say about it, not on the
element.** "His name at the top" is furniture. "The one line under his name is
the only thing on the site that says what he shoots" is a decision. The same
pixel is in and out depending on whether a decision is attached to it.

**Technical decisions count, and are usually the most interesting thing in the
field.** That Ray flags his own featured photos, that the camera and its
settings are read out of the file rather than typed. These are what we built.
They are not the *implementation detail* banned below, which is plumbing with no
consequence for the client.

**A real decision can still be too small.** Everything above says a sentence has
to name a decision. It does not follow that every decision earns a sentence.
Four cuts from one review of Ray Pauly: no rounded corners and no drop shadow so
nothing frames them; the panel arranging itself differently for a vertical photo
than a horizontal one; aperture, shutter speed and ISO; no enquiry form and no
pricing. All four are real calls with real purposes. All four passed every rule
above. Listing every choice we made is a spec sheet even when every item on it
is true.

The test: **does cutting the sentence change what the reader understands about
the site?** If not, it was inventory. This holds in `challenge` too — the old
homepage cycling on a timer, and the years Ray published through the original
system, went for the same reason.

### `approach` states the intent, `solution` has to close it

The two fields are a pair, and they are supposed to close. If `approach` says
Diana wanted the site to feel warm and alive rather than clinical, `solution`
has to say whether it does. Cutting that payoff to avoid repetition leaves the
intent hanging, which is worse than the repetition it avoids.

What must not repeat is the **phrasing**. "Warm and alive, rather than clinical"
in `approach` and "feels warm rather than clinical" in `solution` is the same
sentence twice. "A design that feels warm and personal but also vibrant and
alive" closes the loop without echoing it.

### What does not belong in any field

- **Placement mechanics.** "Directly under Book Now and linked down to the
  quotes it summarises." Putting a rating high on a page is not a feat, and
  narrating where things sit reads as filler.
- **Implementation detail.** Build-time fetching, UTM parameters, which
  third-party widget refused to embed. If it matters to the business, one plain
  sentence about the outcome; otherwise nothing.
- **A spec where an observation would do.** A measurement is not automatically
  a fact worth printing. The reader has no idea whether 800 pixels is a lot.
  - ✗ "photographs at 800 pixels on the long edge, the largest any image on that site ever got"
  - ✓ "small images that did not scale up on larger displays"
- **The claims we declined to make.** Listing what we did not invent is not an
  achievement, and it plants the idea that the client might have wanted us to.
- **Reasoning that never lands on a decision.** "Credibility had to be doing
  something from the first screen." "The copy has to earn its keep above the
  fold." These sound like expertise and name nothing we did. The fix is never to
  cut the reasoning; it is to attach it to the decision it produced.
- **The route we took, as opposed to where we arrived.** What we considered and
  rejected earns its place like anything else, and at 350 to 450 words it
  usually doesn't. Keep it only when the rejected option genuinely explains the
  one we shipped, and only when it actually happened.
