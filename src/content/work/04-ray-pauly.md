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
challenge: "Raymond Pauly is a photographer in Costa Rica. The site carrying his work was hand-built in the jQuery era and had not moved since. Every page came off one index.php with a view parameter on the end of it, and the head loaded jquery.js, jcarousel and cycle.lite next to a conditional comment that still handed Internet Explorer 6 a PNG transparency shim. The homepage showed one photograph at a time, cycling inside a bordered frame on a dark grey gradient, at 800 pixels on the long edge, which was as large as any image on that site ever got. Behind it sat a single gallery. Everything on the page was doing something except the photographs, which were waiting their turn inside a frame."
beforeAfter:
  before:
    image: "before-home"
    caption: "The old homepage: one photograph at a time inside a frame, on a page that still shipped an IE6 transparency shim."
  after:
    image: "hero"
    caption: "His name, one line under it, and then the photographs. Nothing between the top of the page and the work."
approach: |
  We built a portfolio and not a photography business. There is no call to action anywhere on the site, no enquiry form, no pricing, no line asking to be hired. The footer is an email address and a link to his Instagram, and that is the whole of the ask. Everything else on a page is either a photograph or the smallest amount of type needed to find one.

  That settled the art direction by subtraction. The ground is a warm off-white, the text is near black, and there is no accent colour anywhere on the site, because a brand colour sitting next to a photograph is one more thing competing with it. Nothing carries a rounded corner or a drop shadow. The photographs are the only colour on the page, and they are the only thing on it with an edge.

  The second requirement was that publishing is something he does himself. A photographer who has to hand a file to someone else and wait for it stops adding work, and the site stops growing. So the editing side had to be short enough to hold in your head: open it, make an album, drag the photographs in, publish.
solution: |
  The homepage is his name, one line under it, and then the photographs. No splash, no banner, no introduction. Scrolling folds the name down into a sticky bar at the top and takes the line with it, so one flick of a trackpad later the whole screen is photographs and nothing else. The grid is dense rather than uniform: two columns on a phone up to five on a very wide screen, a photograph he has marked takes a two by two block, and a tall portrait takes two rows, so the page finds a rhythm without anyone laying it out by hand.

  Albums are the navigation. Birds, Wildlife and Landscape sit in the top right as words, so every album is one click from every page, with no menu to open first and no index in between. Each one opens onto a title and the same grid. The header counts the albums at build time and lays itself out accordingly, so adding one does not break it.

  Clicking a photograph opens it in a PhotoSwipe lightbox that fills the window, on a deep grey rather than pure black. It runs from the keyboard with the arrow keys and Escape, and from a swipe on a phone. The rail beside the image carries the title he gave the photograph, his own description of it, the album it belongs to and where it was taken, all four typed into the same panel he uploaded the file from.

  About is a modal rather than a page or a route. It opens over the grid from the nav, on the browser's own dialog element, so it closes on Escape or on a click outside it and holds the keyboard inside itself while it is open. Nobody has to leave the photographs to read two paragraphs about the photographer.

  The Studio has three things in it. Site Settings, which is his name, the line under it, the About text and portrait, his email and his Instagram handle. Homepage Gallery, which is the grid, in the order he drags it into. And Albums, which is a title, a cover and a box he drops photographs into, as many at once as he likes. The two settings documents can be edited but not created or deleted, so there is nothing there to remove by accident. He uploads a file and Sanity's CDN sizes and reformats it for the slot it lands in. A deploy button sits inside the Studio next to the content, so the publishing is his to press.
solutionGallery:
  - image: "album-grid"
    caption: "One scroll in, the name has folded into the bar at the top and the grid has the screen to itself."
  - image: "album"
    caption: "Inside an album, a title and then the same grid. The albums are the navigation, so each one is one click from every page."
results: "The site is live at raypaulyphoto.com carrying three albums, and he publishes to it himself: make the album, drag the photographs in, publish, deploy, without leaving the screen he started on. Nothing on any page asks the visitor to do anything, and no colour anywhere on the site came from outside a photograph. Opening it puts the work on screen straight away, and one scroll clears off the only two things that were sharing it."
resultsGallery:
  - image: "lightbox"
    caption: "The lightbox fills the window on a deep grey, with the title, the album and the location he typed in the Studio set alongside."
  - image: "about-modal"
    caption: "About opens over the gallery on the browser's own dialog element, rather than sending anyone to a page of its own."
---
