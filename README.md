# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Home (`gt-home`) keeps its dark header (avatar, the greeting with the streak, the week chip) with three tabs under it, the same pattern as the app Home's You | Kids. Each pivot is one hero and a few rows; deeper pages have a back button and no tabs.

- **You**: streak hero (opens Streaks), the week's card, Today's question (the one daily question in the system; you see the answer by answering), then Your achievements (the card to share, the Year Ring, acorns), Your oak (extras only; the streak itself is Streaks'), Skip and Invest, Journal, the timeline.
- **People**: your grove as the hero (opens the Grove), then Witnesses, Family (the whole Family Tree: Seedling, Same Tree, Learn), Grove challenges.
- **Everyone**: this month's Bloom as the hero, then The Forest and the Friday Count (its own page).
- **Learn**: Learn Together as the hero, then Know yourself and Future Club.
- On a red day a Canopy banner sits above every tab.

Inside their screens we add rather than fork: the Grove dock gets shared goals and family, the Profile streak card opens Home. Demo moves (It's Friday, red day, finish the season) live only in the yellow prototype pill.

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
