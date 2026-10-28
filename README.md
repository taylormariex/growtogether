# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Home (`gt-home`) is the Streaks team's page, untouched: hello, streak chip, the grow-your-week block, their bento (Your grove, Grove challenges, Your oak, Oak extras), "Ways to grow", timeline. Our pieces join "Ways to grow" as the first five squares in that row. Each opens one level deeper; deeper pages have a back button and no tabs.

- **Witnesses** (`rt-home` · you): your goal, who sees your Fridays, the Friday Count.
- **Bloom** (`rt-home` · bloom): this month's room, one target, how the community did.
- **Your cards** (`rt-home` · rings): milestone card, Year Ring, acorns to plant.
- **Family** (`ft-home` · seedling): the Seedling, Same Tree, Learn Together.
- **The Forest** (`fo-grove`): everyone with your goal, no names; nurse trees on duty, Canopy open on red days (the square goes red).

Inside their screens we add rather than fork: Oak gets witness and ring rows, the Grove dock gets shared goals and family, the Profile streak card opens Home. Demo moves (It's Friday, red day, finish the season) live only in the yellow prototype pill.

## Links

Witnessed Habit, one link per concept (the three bets group them in the doc, not here): `witness/`, `friday-count/`, `bloom/`, `rings/`, `drop-an-acorn/`, `seedling/`, `same-tree/`, `the-grove/`, `canopy/`. Each opens on its story and lands on the page where it lives; Home is one tap back.

Grow Together, the five pieces the system places: `skip-and-invest/`, `shared-goals/`, `acorns-year/`, `invite/`, `know-yourself/`.

## Files

- `build.py` — concatenation order and the slug → story map.
- `spec-social.js` — shared pieces: people, avatars, polls, chat, boards, inputs.
- `spec-roots.js`, `spec-family.js`, `spec-forest.js` — the three bets' screens and state (`rtSt`, `ftSt`, `foSt`).
- `spec-wh-stories.js` — every story's cards and art, the hub tabs, the prototype clock (demo moves live in the yellow pill, never in product UI).
- `spec-ia.js` — the IA: Oak injections, Grove dock rows, Forest naming, where each story lands, the front guide.
- `spec-polish.js` — the visual system: eight stage illustrations (`art/stage-*.png`), milestone seals (`art/seal-*.png`) plus an SVG seal generator, the dark share card (`dkCard`), one "Share your progress" sheet (`progressShare`), the invite time-lapse and the jar opener.
- `focus.js` — standalone guard rails; does nothing in the full build.

## Rules of the forest

Never show anyone else's balance. Never rank people against each other. Never pay anyone to recruit. Never punish a missed week. No feed.
