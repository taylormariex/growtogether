# Grow Together

Clickable prototype for community at Acorns. Plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus a standalone build per story. Each opens on its story cards and goes straight into the working experience. `docs/skip-and-stash/` forwards to `docs/skip-and-invest/`. `dist/` mirrors `docs/`.

## The IA

Home (`gt-home`) is a light dashboard of six squares, in the Acorns app style. Each square is a summary; tapping it goes one level deeper, and deeper pages have a back button and no tabs.

- **Your oak** (`gt-oak`): streak, stage, achievements. Dark scene screen.
- **Your grove** (`gt-grove`): people you know on the hillside; rain, cheers, challenges with this month's Bloom pinned, shared goals and family watching in the dock. Dark scene screen.
- **Witnesses** (`rt-home` · your goal): the Friday Count, your goal, who sees you show up.
- **This month's Bloom** (`rt-home` · bloom): the whole room, one target.
- **Your cards** (`rt-home` · rings): milestone card, Year Ring, acorns to plant.
- **The Forest** (`fo-grove`): everyone with your goal, no names; nurse trees on duty, Canopy on red days.

## Links

Witnessed Habit, each concept on its own: `witness/`, `bloom/`, `rings/`, `drop-an-acorn/`, `friday-count/`, `seedling/`, `same-tree/`, `the-grove/`, `canopy/`.

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
