---
title: "Surfsmash"
subtitle: "A card-based fantasy game for the 2026 World Surf League season, built top to bottom and shipped to the App Store."
order: 2
url: "https://smash.surf"
icon: "icon"
tags:
  - Mobile App
  - Website
links:
  - label: "Download on the App Store"
    url: "https://apps.apple.com/us/app/surfsmash/id6760140234"
  - label: "Get it on Google Play"
    url: "https://play.google.com/store/apps/details?id=com.plainsight.sportsmash"
tech: "React Native, Expo, Next.js, Supabase, TypeScript"
challenge: "Most fantasy sports run on tidy stat feeds and a fixed calendar. Surfing has neither. Heats run on weather windows, scores land one judge at a time, and a single perfect ten can flip a leaderboard while the surfer is still paddling back out. The job was to take that energy and turn it into a game that feels alive the moment an event goes on, across a phone, a back office, and the open web."
overview: "Surfsmash turns the World Surf League season into a card game you play with your friends. You draft surfers, spend a limited hand of cards across all 12 events, and watch your fantasy points climb wave by wave as each contest runs live. Think fantasy football, but with barrels. Plain Sight built the whole thing: the mobile app, the admin tool that runs the scoreboard behind it, and the launch site that sends people to the stores."
build:
  - heading: "The mobile app"
    body: "This is the heart of Surfsmash. Every surfer is a collectible card, and you only get two of each for the entire season, so every pick actually costs you something. Before each event you lock in three men and three women, then follow them through a live event screen that moves in real time. Wave scores, bonus points, placements, and league standings all update while the heat is still in the water. One React Native and Expo codebase ships to both the App Store and Google Play."
    gallery:
      - image: "app-home"
        caption: "Locked picks and a live event in progress on the home screen."
      - image: "app-live-event"
        caption: "The live event view, with each surfer's wave scores breaking down in real time."
      - image: "app-athlete-card"
        caption: "Custom card art for every surfer on tour."
  - heading: "The admin control room"
    body: "Surfing has no clean data feed, so someone has to run the scoreboard. We built a web app where the Surfsmash team enters heat results wave by wave, flags injuries and wildcards, manages every league and player, and rolls the season forward one event at a time. The instant a score is saved here, it pushes straight to every player's phone. Built in Next.js."
  - heading: "The launch site"
    body: "smash.surf is the front door, and it has to do a lot of work in a few seconds. It is a bold, beach-themed landing page that pitches the game to someone who has never heard of it, walks new players through how a season actually works, and lays out all twelve stops on the 2026 Championship Tour. The schedule highlights whichever event is currently live and counts down to the next one, so the page feels current every single time someone lands on it. Underneath the art direction it is built to load fast, read cleanly on a phone, and send the right people straight to the App Store and Google Play."
    image: "schedule"
    imageCaption: "The 2026 Championship Tour on smash.surf, counting down to the next event with the live stop highlighted."
techNarrative: "The whole platform runs on Supabase. Postgres holds the relationships between surfers, events, picks, and leagues. Row-level security keeps every private league genuinely private, so you only ever see your own crew. Realtime is what makes live events feel live, streaming each new wave score to every connected phone the moment it is entered. Edge functions run the scoring engine, recalculating fantasy points the instant a result changes. It is TypeScript from end to end, in a single monorepo that covers the app, the admin tool, and the shared logic between them."
facts:
  - label: "Platforms"
    value: "iOS, Android, Web"
  - label: "Timeline"
    value: "~3 months, kickoff to App Store"
  - label: "App"
    value: "React Native + Expo"
  - label: "Admin & backend"
    value: "Next.js, Supabase, TypeScript"
  - label: "Scope"
    value: "Mobile app, admin tool, marketing site"
outcome: "Surfsmash went from kickoff to the App Store in about three months, tested on real devices before it shipped. It is live on the App Store and Google Play, and the season site is up and counting down to the next event. A limited hand of cards, a leaderboard that moves with the swell, and a full fantasy platform that shipped on time."
results: "Surfsmash shipped on time: live on iOS and Android, with the season site up and counting down to the next event. A full fantasy platform, kickoff to App Store in about three months."
---
