# Plain Sight Forms Service — Plan

**Date**: 2026-07-29
**Goal**: Replace per-client third-party form services (Formspree) with a single Plain Sight-owned form endpoint that emails clients now, and can grow into dashboard submission tracking and autoresponders without ever touching a client site again.
**Status**: Planned, not started. Awaiting credentials + open decisions below.

---

## Why

Formspree's free tier sends a non-configurable, Formspree-branded notification email. The notification email is a client-facing deliverable, so vendor branding in it is a Plain Sight brand problem, not an aesthetic annoyance. Paying it away is ~$10/mo *per client, recurring*; the build is one-time and amortizes across every site we ship.

The agency context is what flips the calculus:

- Cost replaced is per-client-per-month and recurring; cost incurred is one afternoon.
- Every client site is ours, on the same stack — one component + one endpoint covers all of them with no per-client customization tax.
- There is a plausible roadmap (dashboard) that requires owning the submission data.

For a single site with no dashboard ambitions the correct answer would be to pay the $10 and never think about it. That is not our situation.

### What we are and aren't building

Not from scratch. We write ~150 lines of glue, once. We rent everything hard:

| Concern | Provider |
| --- | --- |
| Email delivery, DKIM/SPF/DMARC, bounces, reputation | Resend |
| Bot detection | Cloudflare Turnstile |
| Database + auth (for the eventual dashboard) | Supabase |
| Hosting, TLS, scaling | Vercel |
| Form validation, a11y, no-JS fallback | Native HTML |

Formspree sells glue plus opinions about the email template. We are replacing the glue and keeping our own opinions. The rented stack underneath is identical either way.

### Downsides accepted

- **Spam becomes ours.** Turnstile + honeypot + origin check handles essentially all of it, but anything that leaks through lands in a *client's* inbox and becomes a support conversation. Formspree absorbed this silently.
- **Failed sends become ours.** Eventually Resend or the function has a bad ten minutes. Mitigated by store-before-send (below) plus a failure alert, which turns a lost lead into a late lead.
- **We store third-party PII.** Client leads in our database. Worth a line in client agreements.

---

## The one architectural decision

**Own the URL the form posts to.** Client sites post to `https://forms.plainsight.works/api/s/<site-id>`, never to a vendor. Everything behind that URL — provider swaps, adding persistence, adding autoresponders, building the dashboard — becomes an additive change with zero client-site redeploys and zero cutover coordination.

This is why phases 2 and 3 are cheap, and it costs one Vercel function to secure.

---

## Prior art — we already built most of this

`D:\Work\Plain Sight\Projects\Costa Rica Treatment Center\crtc\src\pages\api\contact.ts` is a hardened, production contact endpoint already sending via Resend. **This is the reference implementation for Phase 1**, not a greenfield build.

Already there and worth lifting:

- IP rate limiting with stale-entry pruning (`:5-23`)
- Email regex (`:25`) and per-field length caps (`:27`)
- HTML escaping (`:143`)
- 10-second `AbortController` timeout on the Resend call (`:99-100`)
- Meaningful status codes — 429 / 400 / 422 / 503 / 502
- Resend via raw `fetch` to `api.resend.com/emails`, no SDK (`:104`)
- `from` on the client's own verified domain, `reply_to` set to the submitter (`:111-113`)

Missing vs. what we need: multi-tenancy (site IDs, config map), honeypot, Turnstile, origin check, persistence.

### Known defects — do not carry these over

1. **The rate limiter is an in-process `Map`.** On Vercel serverless it is per-instance and resets on cold start, so it is close to decorative. Acceptable for one low-traffic site; not acceptable for the shared front door to every client. Replace with a count query against `submissions` by `ip_hash` over the last minute — we are already writing that table, so this needs no new dependency (no Upstash).
2. **`escape()` is applied to `source` before it enters the subject line (`:114`).** Subjects are not HTML, so an ampersand renders as a literal `&amp;`. Escape for HTML bodies only.

### Relevant history

The CRTC audit (`crtc\site-audit-2026-06-09.md`, finding `BLD-002`) caught that endpoint returning `{ok:true}` with `RESEND_API_KEY` unset — silently dropping leads. Since fixed to 503. This is precisely the failure class the store-before-send ordering exists to prevent.

---

## Why a separate repo

`astro.config.mjs` in this repo has no adapter, so plainsight-website is pure static output. Adding an API route here would require the Vercel adapter and a switch to server/hybrid output, changing how the whole marketing site builds and deploys. A separate Vercel project keeps this site fully static. This is a constraint, not a preference.

(CRTC can host its own route in-repo because it is SSR — `export const prerender = false`.)

---

## Phase 1 — email only

New repo `plainsight-forms`. Plain Vercel functions in `api/`, TypeScript, no framework — one endpoint does not justify Hono or Astro.

### 1. Endpoint — `POST /api/s/[siteId]`

Order matters. Store before send, so a mail failure never loses a lead.

1. Reject non-POST.
2. Look up `siteId` in config → 404 if unknown.
3. Check `Origin` against the site's allowed origin → 403.
4. Check honeypot field → silent 200 (don't tell bots).
5. Verify Turnstile token → 403.
6. Rate-limit by `ip_hash` via `submissions` count → 429 + `Retry-After`.
7. Validate: required fields, email regex, per-field length caps → 422.
8. **Insert into Supabase.**
9. Send via Resend, 10s abort timeout.
10. On send failure: alert Plain Sight, return 502 — the row is already safe.
11. Return `{ ok: true }`.

### 2. Config — `sites.ts`

```
<opaque-random-id> → {
  client: string,
  toEmail: string,
  allowedOrigin: string,
  fromDomain: string,
  autoresponder?: false,
}
```

Opaque random IDs, not client names — the endpoint is public, don't make it enumerable. Adding a client is a commit + deploy, which is correct at agency scale and gives version history free. Move to the database only when clients need to edit their own notification address.

### 3. Supabase — `submissions`

`id`, `site_id`, `payload jsonb`, `submitter_email`, `ip_hash`, `created_at`

Service-role key server-side only. RLS on, no public policies until the dashboard exists.

**Store from day one even though nothing reads it yet.** This is the only part of the system that cannot be done retroactively — if the dashboard ships in a year it either launches with a year of history or it launches empty. It is also the durability layer.

### 4. Email — Resend

Already the house provider (CRTC is live on it). One provider, one bill, one set of DNS records.

- `From: forms@plainsight.works` initially; `Reply-To:` the submitter so the client just hits reply and is talking to the lead.
- Never put the submitter's address in `From` — SPF/DKIM will fail and it lands in junk.
- Subject carries the client's business name.
- Template is plain HTML in the repo. This is the entire point of the exercise.
- Send-failure alert to Plain Sight.

Escalation path if a client ever reports notifications landing in spam: **Postmark**, which keeps transactional and bulk streams separate and is the deliverability gold standard. Costs more, no real free tier, so not the starting point. Rejected: SendGrid (shared-IP reputation), SES (hand-rolled bounce/complaint handling).

### 5. `ContactForm.astro`

Extract from `src/pages/contact.astro:14-48` (markup) and `:169-205` (JS). Parameterize by `siteId` / `endpoint`. Add honeypot field + Turnstile widget.

Keep the existing progressive-enhancement pattern exactly as-is — real `action` so it works without JS, `fetch` upgrade, native `<dialog>` on success. That pattern is already correct and accessible; do not rebuild it.

### 6. Cut over plainsight-website as client zero

Replace the Formspree action (`contact.astro:14`, currently `https://formspree.io/f/xvzbokbq`) with the new endpoint. Prove it on our own traffic before any client sees it.

---

## Phase 2 — dashboard (deferred, optional)

Separate app reading `submissions`, RLS-scoped per client. Submission counts, history, reply. **Nothing on any client site changes.**

This is the only part that is a real build — an actual app with auth and views. Phase 1 does not commit us to it, and Phase 1 does not get harder if it never happens.

## Phase 3 — autoresponder (deferred)

The endpoint already holds the submitter's address and the client config. A second `send()` gated by the `autoresponder` config flag, with a per-client template. **Nothing on any client site changes.**

At this point each client should have their own verified sending subdomain in Resend (`mail.<clientdomain>`), so mail to a lead comes from the client's domain rather than ours — matters much more for the autoresponder than for the internal notification.

---

## Prerequisites — need Adrian

1. **Supabase** — new project for this, or an existing one to use? Need project URL + service-role key in Vercel env.
2. **Resend** — account exists (CRTC uses it). Need an API key, plus `plainsight.works` verified as a sending domain (CRTC's own domain is verified; this one may not be).
3. **Cloudflare** — free account if not already, then Turnstile site key + secret. If we'd rather not add Cloudflare, Phase 1 ships with honeypot + origin check only and Turnstile drops in later without touching client sites.
4. **DNS** — CNAME for the chosen subdomain once the Vercel project exists.

## Open decisions

1. **Subdomain** — `forms.plainsight.works`, or something else?
2. **Turnstile in Phase 1, or defer?** (see prerequisite 3)
3. **CRTC migration** — leave it on its own in-repo SSR route (it works, it's shipped), or migrate to the shared endpoint? It is the only site with real form traffic, so it is the honest proof case, but migrating a live lead pipeline is a different risk profile than starting with our own site.
4. **Plain Sight Dashboard's transactional email provider — unknown.** Its code is not anywhere under `D:\Work`; `D:\Work\Plain Sight\PSD` holds only `ui-ux-audit-2026-07-21`, and the other `dashboard` directories on the drive belong to career-ops and open-brain. If the dashboard already sends transactional mail through a different provider, we should consolidate rather than run two. Non-blocking for Phase 1 (client lead notifications send from client domains, which is a separate sending concern from dashboard mail on `plainsight.works`), but worth confirming.

## Non-goals

- Not building our own MTA, bot detection, or form-state library.
- Not building the dashboard in Phase 1.
- Not migrating existing client sites beyond plainsight-website until the endpoint is proven.
