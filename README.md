# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Organized around the doc's three bets. Home (`gt-home`) keeps its dark header (greeting, week chip) with three tabs under it; deeper pages have a back button and no tabs.

- **You** (your side of the witness bet, plus the Acorns pieces): streak hero (opens Streaks, the Streaks team's page), the week's card, Today's question (from the Friday Count: you see the answer by answering), then Your achievements (the milestone card to share, the Year Ring, acorns to plant), Your oak (the nine extras), Skip and Invest, Know yourself, Acorns Year, the timeline.
- **People** (the witness and the family): your grove as the hero (the hillside; shared goals, family and challenges live in its dock), then Witnesses, Family Tree (Seedling, Same Tree, Learn Together, its own three tabs), Grove challenges.
- **Everyone** (the room): the Friday Count as one line, this month's Bloom as the hero (the Bloom page: hero, the room's spread, how we're doing), then The Forest (your anonymous room, share a percent to see the spread, nurse trees on duty, Canopy).
- On a red day a Canopy banner sits above every tab.

Not in the prototype on purpose: dares between witnesses, the Bloom pinned inside Grove challenges, a live ticker, Forest stats and a Q&A board, a Friday Count page. Those were glue, not concepts.

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
