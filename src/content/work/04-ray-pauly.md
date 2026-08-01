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
challenge: "Raymond Pauly is a photographer in Costa Rica. The site carrying his work ran on a vendor platform, themed once and then left alone. Every page came off one index.php with a view parameter on the end of it, the stylesheets sat under themes/raypaulyphoto/ next to an admin sheet, the markup still carried a shopping cart form, and the head loaded jquery.js, jcarousel and cycle.lite alongside a conditional comment that still handed Internet Explorer 6 a PNG transparency shim. It was also emptying out. The sidebar had once listed ten galleries, from Birds and Scenic to Concerts and Churches of Costa Rica; by 2022 that list rendered as a heading with nothing under it, and Birds was the only gallery still reachable. The homepage cycled through featured photographs on a timer, with no way to stop on one or pick another, at 800 pixels on the long edge, which was as large as any image on that site ever got. Someone opens a photographer's site to look at photographs, at a size worth looking at, and to choose which ones. That site moved them along on a timer, showed them narrower than a laptop window, and had one gallery left to show."
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
  We made the homepage his name, one line under it, and then the photographs. No splash, no banner, no introduction. Scrolling folds the name down into a sticky bar at the top and takes the line with it, so one flick of a trackpad later the only things sharing the screen with the photographs are his name at nav size and four words of navigation. We made the grid dense rather than uniform: two columns on a phone up to five on a very wide screen, a photograph he has marked takes a two by two block, and a tall portrait takes two rows, so the page finds a rhythm without anyone laying it out by hand.

  We made the albums the navigation. Birds, Wildlife and Landscape sit in the top right as words, so every album is one click from every page with no index in between, and on anything wider than a phone, no menu to open first either. Each one opens onto a title and the same grid. The header counts the albums at build time and lays itself out accordingly, so adding one does not break it.

  We open photographs in a PhotoSwipe lightbox that fills the window, on a deep grey rather than pure black. It runs from the keyboard with the arrow keys and Escape, and from a swipe on a phone. The rail beside the image carries the title he gave the photograph, his own description of it, the album it belongs to and where it was taken, all four typed into the same panel he uploaded the file from.

  We made About a modal rather than a page or a route. It opens over the grid from the nav, on the browser's own dialog element, so it closes on Escape or on a click outside it and holds the keyboard inside itself while it is open. Nobody leaves the photographs to read two paragraphs about the photographer.

  We kept the Studio to three things. Site Settings, which is his name, the line under it, the About heading and text, his portrait, his email, his Instagram handle and the image that shows when someone shares a link to the site. Homepage Gallery, which is the grid, in the order he drags it into. And Albums, each one a title, its address, a cover, a description, the photographs, and where it sits in the running order. The two settings documents can be edited but not created or deleted, so there is nothing there to remove by accident. He uploads a file and Sanity's CDN sizes and reformats it for the slot it lands in. A deploy button sits inside the Studio next to the content, so the publishing is his to press.
solutionGallery:
  - image: "home-scrolled"
    caption: "One scroll in, the name has folded into the bar at the top and the grid has the screen to itself."
  - image: "album"
    caption: "Inside an album, a title and then the same grid. The albums are the navigation, so each one is one click from every page."
results: "The site is live at raypaulyphoto.com carrying three albums, and he publishes to it himself: make the album, drag the photographs in, publish, then press deploy in the Studio he was already working in. Nothing on any page asks the visitor to do anything, and no accent colour appears anywhere on the site. Opening it puts the work on screen straight away, and one scroll leaves the photographs sharing the window with nothing but his name and four links."
resultsGallery:
  - image: "lightbox"
    caption: "The lightbox fills the window on a deep grey, with the title, the album and the location he typed in the Studio set alongside."
  - image: "about-modal"
    caption: "About opens over the gallery on the browser's own dialog element, rather than sending anyone to a page of its own."
---
