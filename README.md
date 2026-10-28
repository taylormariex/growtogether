# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Sorted by what the customer is doing, not by who wrote the concept. Home (`gt-home`) keeps its dark header (greeting, week chip) with three tabs; every deeper page has a back button and no tabs.

- **You** (my habit): streak hero → Streaks (the Streaks team's page) · the week's card · Your achievements (the milestone cards to share) · Your oak (the nine extras) · Your year (monthly recaps, the Acorns Year film in December, the Year Ring in January) · Skip and Invest · Know yourself · the timeline.
- **People** (people who know me): grove hero → the hillside, with its challenges inside · Witnesses · Shared goals (Same Tree is shared goals: one goal, separate accounts, up to five) · Family (Seedling: the kid's account and the relatives who watch) · Learn together (one lesson, read with someone who has your goal) · Drop an acorn, when you have one to give.
- **Everyone** (the crowd): the Friday Count with Today's question (you see the answer by answering) · this month's Bloom as the hero · The Forest (your anonymous room, share a percent to see the spread, nurse trees on duty → Canopy).
- On a red day a Canopy banner sits above every tab.

Family Tree no longer has inner tabs; its three parts are three rows under People. The Grove dock holds challenges only.

## Links

Witnessed Habit, one link per place it lives: `witness/` (Witness and the Friday Count), `bloom/`, `rings/` (Rings and Drop an Acorn), `seedling/` and `same-tree/` (both land on Family), `the-grove/` (the Grove, with Canopy inside). `friday-count/`, `drop-an-acorn/` and `canopy/` still build for the doc and land on their parent page. Each opens on its story; Home is one tap back.

Grow Together, the five pieces the system places: `skip-and-invest/`, `shared-goals/`, `acorns-year/`, `invite/`, `know-yourself/`.

`home/` opens the Acorns app Home with no story in front of it; the green streak chip there opens Streaks, the oak opens the Grow Together layer.

Streaks (`streaks`) is the Streaks team's page as they designed it, reached from the Home tile. Nothing of ours is injected there; our layer sits in front of it.

## Files

- `build.py` — concatenation order and the slug → story map.
- `spec-social.js` — shared pieces: people, avatars, polls, chat, boards, inputs.
- `spec-roots.js`, `spec-family.js`, `spec-forest.js` — the three bets' screens and state (`rtSt`, `ftSt`, `foSt`).
- `spec-wh-stories.js` — every story's cards and art, the hub tabs, the prototype clock (demo moves live in the yellow pill, never in product UI).
- `spec-ia.js` — the IA: Oak injections, Grove dock rows, Forest naming, where each story lands, the front guide.
- `spec-streaks.js` — the Streaks team's page, untouched by our injections.
- `spec-polish.js` — the visual system: eight stage illustrations (`art/stage-*.png`), milestone seals (`art/seal-*.png`) plus an SVG seal generator, the dark share card (`dkCard`), one "Share your progress" sheet (`progressShare`), the invite time-lapse and the jar opener.
- `focus.js` — standalone guard rails; does nothing in the full build.

## Rules of the forest

Never show anyone else's balance. Never rank people against each other. Never pay anyone to recruit. Never punish a missed week. No feed.
