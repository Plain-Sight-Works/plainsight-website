import { defineCollection, z } from 'astro:content';

const homepage = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    order: z.number(),
    heading: z.string(),
    subheading: z.string().optional(),
    intro: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    order: z.number(),
    heading: z.string().optional(),
    subheading: z.string().optional(),
    kicker: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    // The two partner bios. `photo` is a manifest key resolved in about.astro;
    // omit it and Portrait.astro renders the initials placeholder instead.
    people: z.array(z.object({
      name: z.string(),
      role: z.string(),
      initials: z.string(),
      bio: z.string(),
      photo: z.string().optional(),
      facts: z.array(z.string()),
    })).optional(),
    // Plain typographic strip (location, size, entity type, hours).
    facts: z.array(z.string()).optional(),
  }),
});

// Site-wide client testimonials. Intentionally empty until real quotes exist —
// every consumer checks for entries first, so nothing placeholder-shaped ships.
const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    quote: z.string(),
    name: z.string(),
    title: z.string(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    section: z.string(),
    order: z.number(),
    title: z.string().optional(),
    heading: z.string(),
    subheading: z.string().optional(),
    intro: z.string().optional(),
    cta_text: z.string().optional(),
    cta_link: z.string().optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    order: z.number(),
    url: z.string(),
    challenge: z.string(),
    approach: z.string().optional(),
    solution: z.string().optional(),
    results: z.string(),
    tech: z.string(),
    // Optional fields for richer case studies (e.g. Surfsmash).
    // When `build` is present the template renders the expanded layout;
    // otherwise it falls back to the challenge/approach/solution/results layout.
    icon: z.string().optional(),                 // manifest key for an app icon shown in the hero
    tags: z.array(z.string()).optional(),        // e.g. ["App", "Website"]
    links: z.array(z.object({                    // secondary hero links (App Store, etc.)
      label: z.string(),
      url: z.string(),
    })).optional(),
    overview: z.string().optional(),             // "The game" — what the product is
    build: z.array(z.object({                    // "What we built" sub-sections
      heading: z.string(),
      body: z.string(),
      gallery: z.array(z.object({                // portrait shots rendered as a grid
        image: z.string(),                       // manifest key
        caption: z.string(),
      })).optional(),
      image: z.string().optional(),             // single full-width image (manifest key)
      imageCaption: z.string().optional(),
    })).optional(),
    techNarrative: z.string().optional(),        // "Under the hood"
    facts: z.array(z.object({                    // "At a glance" (rich) / sidebar extras (simple)
      label: z.string(),
      value: z.string(),
    })).optional(),
    outcome: z.string().optional(),              // "Where it landed"
    // Optional editorial blocks for the simple (challenge/approach/solution/
    // results) layout. Image values are manifest keys resolved in [slug].astro.
    beforeAfter: z.object({                      // labeled Before/After pair in the Challenge section
      before: z.object({ image: z.string(), caption: z.string() }),
      after: z.object({ image: z.string(), caption: z.string() }),
    }).optional(),
    solutionGallery: z.array(z.object({          // 2-up image grid in the Solution section
      image: z.string(),
      caption: z.string(),
    })).optional(),
    parity: z.object({                           // labeled side-by-side pair (e.g. EN / ES)
      left: z.object({ label: z.string(), image: z.string(), caption: z.string() }),
      right: z.object({ label: z.string(), image: z.string(), caption: z.string() }),
    }).optional(),
    featureImage: z.object({                     // single full-width image in the Solution section
      image: z.string(),
      caption: z.string(),
    }).optional(),
    resultsGallery: z.array(z.object({           // 2-up montage in the Results section
      image: z.string(),
      caption: z.string(),
    })).optional(),
  }),
});

export const collections = { homepage, about, testimonials, services, work };
