import { describe, it, expect, beforeEach, vi } from 'vitest';
import { shouldSkip, slugFromHostname, buildPayload } from '../../public/beacon.js';

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
