---
title: "Ray Pauly Photo"
subtitle: "A photography portfolio where nothing on the page competes with the photographs."
order: 4
url: "https://raypaulyphoto.com"
tags:
  - Website
  - CMS
tech: "Astro, Sanity, PhotoSwipe, Vercel"
cardDescription: "A photography portfolio still running on jQuery-era plugins, down to an IE6 transparency shim in its source. We replaced it with a quiet, image-first gallery he publishes to himself."
challenge: "Raymond Pauly is a photographer in Costa Rica. The site carrying his work ran on a vendor platform, themed once and then left alone. The pages behind the homepage came off one index.php with a view parameter on the end of it, the stylesheets sat under themes/raypaulyphoto/ next to an admin sheet, the head still ran validation wired to a shopping cart the theme no longer rendered, and it loaded jquery.js, jcarousel and cycle.lite alongside a conditional comment that still handed Internet Explorer 6 a PNG transparency shim. It was also emptying out. The sidebar had once listed ten galleries, from Birds and Scenic to Concerts and Churches of Costa Rica; by 2022 that list rendered as a heading with nothing under it, and Birds was the only gallery still reachable. The homepage cycled through featured photographs on a timer, with no way to stop on one or pick another, at 800 pixels on the long edge, which was as large as any image on that site ever got. Someone opens a photographer's site to look at photographs, at a size worth looking at, and to choose which ones. That site moved them along on a timer, showed them narrower than a laptop window, and had one gallery left to show."
beforeAfter:
  before:
    image: "before-home"
    caption: "The old homepage: one photograph at a time, 800 pixels wide inside a frame, cycling on a timer on a page that still shipped an IE6 transparency shim."
  after:
    image: "hero"
    caption: "His name, one line under it, and then the photographs. Nothing between the top of the page and the work."
approach: |
  We built a portfolio and not a photography business. There is no call to action anywhere on the site, no enquiry form, no pricing, no line asking to be hired. The footer is an email address and a link to his Instagram, and that is the whole of the ask. Everything else on a page is either a photograph or the smallest amount of type needed to find one.

  That settled the art direction by subtraction. The ground is a warm off-white, the text is near black, and there is no accent colour anywhere on the site, because a brand colour sitting next to a photograph is one more thing competing with it. We gave the photographs themselves no rounded corners and no drop shadow, so nothing frames them and nothing sits between them and the page.

  We also built it so that publishing is something he does himself. A photographer who hands a file to someone else and waits for it stops adding work, and the site stops growing with him. So we kept the editing side short enough to hold in your head: open it, make an album, drag the photographs in, publish.
solution: |
  We made the homepage his name, one line under it, and then the photographs. Scrolling folds the name into a sticky bar and fades the line out where it sits, leaving the photographs sharing the screen with his name at nav size and the album names. The grid is dense rather than uniform: two columns on a phone up to five on a very wide screen, with marked photographs taking a two by two block and tall ones two rows, so the page finds a rhythm without anyone laying it out by hand.

  We made the albums the navigation. They sit in the top right as words, so every album is one click from every page, with no index in between and no menu to open first above phone width. The header counts them at build time, so adding one does not break it. About sits beside them as a modal rather than a page, so nobody leaves the photographs for it.

  Photographs open in a PhotoSwipe lightbox that fills the window, on a deep grey rather than pure black, driven by the arrow keys and Escape or by a swipe. The panel beside the image on a desktop window carries the album alongside the title, description and location he typed where he uploaded the file, and the date, camera and exposure read out of the file.

  We kept the Studio to three things: Site Settings, the Homepage Gallery that holds the grid in the order he drags it into, and the albums. Site Settings and the Homepage Gallery can be edited but not created or deleted, so there is nothing to remove by accident. Sanity's CDN sizes each upload for the slot it lands in, and a deploy button beside the content makes the publishing his to press.
solutionGallery:
  - image: "home-scrolled"
    caption: "One scroll in, the name has folded into the bar at the top and the grid has the screen to itself."
  - image: "album"
    caption: "Inside an album, a title and then the same grid. The albums are the navigation, so each one is one click from every page."
results: "The site is live at raypaulyphoto.com. Where the old gallery list had emptied to a heading with nothing under it, the albums are now the navigation, every one a click from any page. Nothing advances on a timer, and nothing decides for a visitor which photograph they are looking at. The question the old site could not answer, which photographs are there and which one do I want to see, is answered on the first screen."
resultsGallery:
  - image: "lightbox"
    caption: "The lightbox fills the window on a deep grey, with the title, description and location he typed in the Studio set alongside the album it belongs to."
  - image: "about-modal"
    caption: "About opens over the gallery on the browser's own dialog element, rather than sending anyone to a page of its own."
---
