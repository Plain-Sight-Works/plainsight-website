---
title: "Michelle Pauly"
subtitle: "An architecture portfolio rebuilt for the people who actually read it: firms deciding whether to hire her."
order: 1
featured: 4
url: "https://www.michellepauly.com"
tags:
  - Website
  - CMS
tech: "Astro, Sanity, Vercel"
cardDescription: "An architect's portfolio rebuilt around the one thing hiring firms open it to find. We cut the student work, put her actual role on each project up front, and handed her a CMS to run it."
challenge: "Michelle Pauly is an architectural designer in Los Angeles. Her old portfolio was one scrolling page, roughly sixty thousand pixels of it at desktop width, carrying five professional projects, five graduate projects, three undergraduate projects and a side project. A built office and a studio assignment got the same weight on the page, with nothing between them but a small label. And nothing on the page said what she actually did on any of it, which matters most on the professional work, because she was not the author of it: those buildings belong to the firms she worked at. A hiring architect opens a portfolio to find out what someone can do and what they were responsible for. That page answered neither, and asked for a very long scroll first."
beforeAfter:
  before:
    image: "before-home"
    caption: "The old site ran everything down one scroll. A built office and a graduate project, given the same weight, one small label between them."
  after:
    image: "hero"
    caption: "The homepage is the grid, under a category filter. No splash, no hero, no featured project."
approach: |
  We built the site for one audience: architecture firms deciding whether to hire her. Not prospective clients, not the public, not other students. We resolved every structural decision against that reader, and most of them resolved quickly.

  We cut the academic and process work entirely. It is good work and it is the wrong work for this reader, because a firm hiring someone with professional experience is not weighing a studio project against a built one, and putting the two on the same page invites that comparison anyway. The professional work stayed, and we built it out. Where the old site listed five, the site now carries ten across residential and commercial, with the lululemon work separated into the three projects it actually was.

  We made her role a field on every project, next to the firm she did it at, the phases she carried and the scope, instead of something buried in a paragraph. On work she did not author, stating that plainly is more credible than leaving it vague, and it is what makes the part she did own legible.
solution: |
  We made the homepage the work. No splash, no hero image, no featured project, just the grid with a category filter above it: All, Residential, Commercial. Categories are documents in the CMS she can add, rename and reorder, and a category with nothing published in it hides itself rather than opening onto an empty page.

  We kept the grids uniform. Every project sits in the same 4:5 portrait crop at the same size, with its name and a type line underneath, always visible. We held nothing back behind a hover, so the grid reads the same on a laptop and on a phone, and no project is quietly ranked above another by being bigger.

  We led project pages with the image and set the metadata beside it: role, location, size, year, status, scope, phases developed, firm. The description and the rest of the images follow. Someone who only wants to know what she did on Kilkea has it before reading a sentence of prose.

  We set the ground as a warm off-white rather than pure white, which keeps the page from glaring around the images. Info is one page: a short introduction in her own words, a portrait, and a contact block that is a single link to her LinkedIn. We left out a form, because a firm that wants to talk about a role is not going to fill one in.
solutionGallery:
  - image: "category"
    caption: "Commercial, filtered out of the same grid. Uniform 4:5 crops, names always visible, no hover reveal."
  - image: "project"
    caption: "Every project leads with the image and states her role, the firm, and the phases she carried."
results: "The site is live at michellepauly.com with ten projects across two categories, and she adds, edits and reorders all of it in Sanity without a developer. Images are served to the slot the tile occupies rather than to the viewport, which takes 19% off the above-fold homepage payload at 1440, 47% at 1920 and 60% at 2560, all at DPR2, and holds it flat at 897 KiB across every desktop DPR2 viewport. The portfolio now opens on the work a hiring firm came for, and says on every project what she was responsible for."
---
