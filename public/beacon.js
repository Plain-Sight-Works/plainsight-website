// The teaser beacon. Loaded by one line in every teaser's layout:
//   <script src="https://plainsight.works/beacon.js" type="module"></script>
//
// It reads its own slug from location.hostname, which is safe because a
// teaser's slug IS its subdomain (PLS-143). There is no per-teaser config.
// The tag must stay a module script: this file uses ESM `export` statements,
// and a classic script throws a SyntaxError on the first `export` in every
// browser. A module script is deferred by default, which is what keeps it
// off the critical path and out of the Lighthouse mobile score.
//
// Three rules, in order of how much damage breaking them does:
//   1. Never throw into the page. A teaser is a sales artifact; a console
//      error on it costs more than every number this file produces.
//   2. Never block. Teasers hold 1.00 on mobile performance.
//   3. Never count us. See shouldSkip.
export const ENDPOINT = 'https://dashboard.plainsight.works/api/beacon';

export function slugFromHostname(hostname) {
  const labels = String(hostname || '').split('.');
  if (labels.length < 3) return null;
  // Exact match on the apex, not a suffix check: a suffix check would also
  // match a lookalike registered domain such as evilplainsight.works.
  if (labels.slice(1).join('.') !== 'plainsight.works') return null;
  return labels[0] || null;
}

// Anchored on a cookie boundary so `not_ps_internal=1` cannot match.
const INTERNAL_COOKIE = /(?:^|;\s*)ps_internal=1(?:;|$)/;

export function shouldSkip(nav, cookie) {
  if (nav && nav.webdriver) return { skip: true, reason: 'automation' };
  if (INTERNAL_COOKIE.test(String(cookie || ''))) return { skip: true, reason: 'internal' };
  return { skip: false };
}

export function buildPayload(slug, type, referrer, label) {
  const payload = { slug, type, referrer };
  if (type === 'teaser_cta_clicked' && label) payload.label = String(label).slice(0, 100);
  return payload;
}

function showChip(doc) {
  const chip = doc.createElement('div');
  chip.textContent = "Plain Sight admin · this visit isn't counted";
  chip.setAttribute('role', 'status');
  chip.style.cssText =
    'position:fixed;left:12px;bottom:12px;z-index:2147483647;padding:6px 10px;' +
    'font:500 12px/1.4 system-ui,sans-serif;color:#fff;background:#102A4A;' +
    'border-radius:999px;opacity:.9;pointer-events:none';
  doc.body.appendChild(chip);
}

function start(win) {
  const slug = slugFromHostname(win.location.hostname);
  if (!slug) return;

  const verdict = shouldSkip(win.navigator, win.document.cookie);
  if (verdict.skip) {
    // The chip and the skip are one branch on purpose: seeing the chip is
    // proof the beacon did not fire, and not seeing it is proof it did. A
    // suppression you cannot see is one you stop being able to trust.
    if (verdict.reason === 'internal') showChip(win.document);
    return;
  }

  const sent = {};
  const send = (type, label) => {
    if (sent[type]) return;          // once per page load, every type
    sent[type] = true;
    try {
      win.fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildPayload(slug, type, win.document.referrer, label)),
        keepalive: true,
        mode: 'cors',
      }).catch(() => {});
    } catch (_) {
      /* never throws into the page */
    }
  };

  send('teaser_visited');

  const overlay = win.document.querySelector('.preview-overlay');
  if (overlay && win.IntersectionObserver) {
    const observer = new win.IntersectionObserver((entries) => {
      // This callback runs on a later turn of the event loop, so the
      // top-level try/catch around start() cannot catch a throw here.
      try {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            send('teaser_preview_reached');
            observer.disconnect();
          }
        }
      } catch (_) {
        /* never throws into the page */
      }
    });
    observer.observe(overlay);
  }

  win.document.addEventListener('click', (event) => handleClick(event, send), {
    passive: true,
    capture: true,
  });
}

// Every real call to action in a teaser carries `data-ps-cta`. The selector
// stays that explicit marker, never `a,button`: a teaser's mobile menu
// button and its booking-form disclosure are buttons too, and guessing
// which button counts as a call to action is the mistake that made this
// column meaningless in the first place. See the teaser skill's build
// conventions for which elements get the attribute.
export function handleClick(event, send) {
  // Same reasoning as the IntersectionObserver callback above: a click
  // handler runs on its own turn of the event loop, outside start()'s try.
  try {
    const el = event.target && event.target.closest && event.target.closest('[data-ps-cta]');
    if (!el) return;
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    if (text) send('teaser_cta_clicked', text);
  } catch (_) {
    /* never throws into the page */
  }
}

try {
  if (typeof window !== 'undefined' && window.location) start(window);
} catch (_) {
  /* never throws into the page */
}
