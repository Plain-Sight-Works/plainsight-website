import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  shouldSkip,
  slugFromHostname,
  buildPayload,
  handleClick,
  observePreview,
  PREVIEW_OBSERVER_OPTIONS,
} from '../../public/beacon.js';

describe('slugFromHostname', () => {
  it('takes the first label', () => {
    expect(slugFromHostname('malibu-collision.plainsight.works')).toBe('malibu-collision');
  });

  it('returns null for the apex', () => {
    expect(slugFromHostname('plainsight.works')).toBe(null);
  });

  it('returns null for a host that is not a teaser', () => {
    expect(slugFromHostname('localhost')).toBe(null);
  });

  it('returns null for a lookalike apex', () => {
    expect(slugFromHostname('foo.evilplainsight.works')).toBe(null);
  });

  it('returns null for a host that merely starts with the apex', () => {
    expect(slugFromHostname('plainsight.works.attacker.com')).toBe(null);
  });

  it('returns null for a deeper subdomain of the apex', () => {
    expect(slugFromHostname('a.b.plainsight.works')).toBe(null);
  });
});

describe('shouldSkip', () => {
  it('skips automation', () => {
    expect(shouldSkip({ webdriver: true }, '')).toEqual({ skip: true, reason: 'automation' });
  });

  it('skips an internal browser', () => {
    expect(shouldSkip({ webdriver: false }, 'a=1; ps_internal=1; b=2')).toEqual({
      skip: true,
      reason: 'internal',
    });
  });

  it('does not skip a prospect', () => {
    expect(shouldSkip({ webdriver: false }, 'other=1')).toEqual({ skip: false });
  });

  it('does not match a cookie whose name merely ends in ps_internal', () => {
    expect(shouldSkip({ webdriver: false }, 'not_ps_internal=1')).toEqual({ skip: false });
  });

  it('skips when the marker is the only cookie', () => {
    expect(shouldSkip({ webdriver: false }, 'ps_internal=1')).toEqual({ skip: true, reason: 'internal' });
  });

  it('skips when the marker is the last cookie', () => {
    expect(shouldSkip({ webdriver: false }, 'a=1; ps_internal=1')).toEqual({ skip: true, reason: 'internal' });
  });
});

describe('buildPayload', () => {
  it('carries the slug, type and referrer', () => {
    expect(buildPayload('malibu-collision', 'teaser_visited', 'https://mail.google.com/', null)).toEqual({
      slug: 'malibu-collision',
      type: 'teaser_visited',
      referrer: 'https://mail.google.com/',
    });
  });

  it('includes a label only for a cta click', () => {
    expect(buildPayload('x', 'teaser_cta_clicked', '', "Let's talk")).toEqual({
      slug: 'x',
      type: 'teaser_cta_clicked',
      referrer: '',
      label: "Let's talk",
    });
  });
});

describe('handleClick', () => {
  function clickEventOn(target) {
    return { target };
  }

  it('sends teaser_cta_clicked with the marked element text', () => {
    const button = document.createElement('button');
    button.setAttribute('data-ps-cta', '');
    button.textContent = "  Book now  ";
    document.body.appendChild(button);

    const send = vi.fn();
    handleClick(clickEventOn(button), send);

    expect(send).toHaveBeenCalledWith('teaser_cta_clicked', 'Book now');
  });

  it('sends nothing for a plain button with no data-ps-cta', () => {
    const button = document.createElement('button');
    button.textContent = 'Menu';
    document.body.appendChild(button);

    const send = vi.fn();
    handleClick(clickEventOn(button), send);

    expect(send).not.toHaveBeenCalled();
  });

  it('resolves a click inside a marked element to the marked ancestor', () => {
    const cta = document.createElement('a');
    cta.setAttribute('data-ps-cta', '');
    const span = document.createElement('span');
    span.textContent = 'Call us today';
    cta.appendChild(span);
    document.body.appendChild(cta);

    const send = vi.fn();
    handleClick(clickEventOn(span), send);

    expect(send).toHaveBeenCalledWith('teaser_cta_clicked', 'Call us today');
  });
});

describe('observePreview', () => {
  // A stand-in IntersectionObserver that records how it was built and lets a
  // test deliver entries by hand.
  function fakeWindow(hasOverlay = true) {
    const observers = [];
    class FakeObserver {
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.observed = [];
        this.disconnected = false;
        observers.push(this);
      }
      observe(el) {
        this.observed.push(el);
      }
      disconnect() {
        this.disconnected = true;
      }
    }
    const overlay = { className: 'preview-overlay' };
    const win = {
      document: { querySelector: (sel) => (hasOverlay && sel === '.preview-overlay' ? overlay : null) },
      IntersectionObserver: FakeObserver,
    };
    return { win, observers, overlay };
  }

  it('observes the gated section with the root pulled up by 30% of the viewport (PLS-209)', () => {
    const { win, observers, overlay } = fakeWindow();
    observePreview(win, vi.fn());
    expect(observers).toHaveLength(1);
    expect(observers[0].options).toEqual({ rootMargin: '0px 0px -30% 0px', threshold: 0 });
    expect(observers[0].options).toBe(PREVIEW_OBSERVER_OPTIONS);
    expect(observers[0].observed).toEqual([overlay]);
  });

  it('sends teaser_preview_reached once the section intersects the shrunken root, then stops observing', () => {
    const { win, observers } = fakeWindow();
    const send = vi.fn();
    observePreview(win, send);
    observers[0].callback([{ isIntersecting: false }]);
    expect(send).not.toHaveBeenCalled();
    observers[0].callback([{ isIntersecting: true }]);
    expect(send).toHaveBeenCalledWith('teaser_preview_reached');
    expect(observers[0].disconnected).toBe(true);
  });

  it('does nothing on a page with no gated section', () => {
    const { win, observers } = fakeWindow(false);
    observePreview(win, vi.fn());
    expect(observers).toHaveLength(0);
  });

  it('does nothing in a browser without IntersectionObserver', () => {
    const { win } = fakeWindow();
    delete win.IntersectionObserver;
    expect(() => observePreview(win, vi.fn())).not.toThrow();
  });
});
