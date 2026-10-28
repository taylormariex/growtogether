# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Sorted by what the customer is doing, not by who wrote the concept. Home (`gt-home`) keeps its dark header (greeting, week chip) with three tabs; every deeper page has a back button and no tabs.

- **You** (my habit): streak hero → Streaks (the Streaks team's page) · the week's card · Your goal (what you're investing toward; adding a witness is part of it) · Your achievements (your milestone card to share, the Year Ring, the Acorns Year film, monthly recaps) · Your oak (the nine extras) · Skip and Invest · Know yourself · the timeline.
- **People** (people who know me): Your grove (the hillside, with its challenges inside) · Shared goals (the Grow Together list; Same Tree's Wedding is one of the goals in it, and "Someone new" or + starts another) · Family (Seedling: the kid's account and the relatives who watch) · Challenges (Learn together is one of them). When you've earned an acorn, a card above the list offers it to plant.
- **Everyone** (the crowd): the Friday Count with Today's question (you see the answer by answering) · this month's Bloom as the hero · The Forest (find your room: goal and life stage, an untraceable handle, what the room sees, how it reaches you, the three rules, then you're in) · Canopy (the nurse trees; ask, don't sell).
- Bloom's Skip and Invest runs the real Quick Invest flow and comes back with the skip counted.
- On a red day a Canopy banner sits above every tab.
- Everything below Home is light (`spec-day.js` flips the dark system to day; the Grove gets a daytime sky). Home and Streaks stay dark; the Acorns Year film and the Year Ring card stay dark because they are a film and a card.

Family Tree no longer has inner tabs; its three parts are three rows under People. The Grove dock holds challenges only.

## Links

The front guide (`index.html`) has three entries, You / People / Everyone, each opening Home on that tab, then the Grow Together five.

Witnessed Habit, one link per place it lives: `witness/` (Witness and the Friday Count), `bloom/`, `rings/` (Rings and Drop an Acorn), `seedling/` (lands on Family), `same-tree/` (lands on Shared goals), `the-grove/` (the Grove, with Canopy inside). `friday-count/`, `drop-an-acorn/` and `canopy/` still build for the doc and land on their parent page. Each opens on its story; Home is one tap back.

Grow Together, the five pieces the system places: `skip-and-invest/`, `shared-goals/`, `acorns-year/`, `invite/`, `know-yourself/`.

`home/` opens the Acorns app Home with no story in front of it; the green streak chip there opens Streaks, the oak opens the Grow Together layer.

Streaks (`streaks`) is the Streaks team's page as they designed it, reached from the Home tile. Nothing of ours is injected there; our layer sits in front of it.

## Files

- `build.py` — concatenation order and the slug → story map.
- `spec-social.js` — shared pieces: people, avatars, polls, chat, boards, inputs.
- `spec-roots.js`, `spec-family.js`, `spec-forest.js` — the three bets' screens and state (`rtSt`, `ftSt`, `foSt`).
- `spec-wh-stories.js` — every story's cards and art, the hub tabs, the prototype clock (demo moves live in the yellow pill, never in product UI).
- `spec-ia.js` — the IA: Oak injections, Grove dock rows, Forest naming, where each story lands, the front guide.
- `spec-day.js` — the light treatment for every layer below Home.
- `spec-streaks.js` — the Streaks team's page, untouched by our injections.
- `spec-polish.js` — the visual system: eight stage illustrations (`art/stage-*.png`), milestone seals (`art/seal-*.png`) plus an SVG seal generator, the dark share card (`dkCard`), one "Share your progress" sheet (`progressShare`), the invite time-lapse and the jar opener.
- `focus.js` — standalone guard rails; does nothing in the full build.

## Rules of the forest

Never show anyone else's balance. Never rank people against each other. Never pay anyone to recruit. Never punish a missed week. No feed.
