# Grow Together

Clickable prototype for Share the wealth. Everything is plain HTML/CSS/JS; `build.py` inlines the source files into one page.

```
python3 build.py
```

Builds `docs/index.html` (every experience, served by GitHub Pages at the site root) plus four standalone builds that open on one story lander and stay inside that experience:

- `docs/skip-and-stash/` — Skip and Stash
- `docs/shared-goals/` — Shared goals
- `docs/acorns-year/` — Acorns Year and share cards
- `docs/invite/` — Invite to your grove
- `docs/know-yourself/` — Know yourself (Money Type and three more quizzes)

`focus.js` adds the standalone guard rails; it does nothing in the full build. `dist/` mirrors `docs/` for the zip upload.


## Visual system (polish pass)

`spec-polish.js` loads last and applies the Acorns Streaks system everywhere: eight stage illustrations (`art/stage-*.png`) for every tree, eight milestone seals (`art/seal-*.png`) plus an SVG seal generator for non-streak milestones, the dark share card (`dkCard`), one “Share your progress” sheet (`progressShare`), real photographs in the Skip & Stash polaroids (`art/pol-*.jpg`, Unsplash license) and the time-lapse that opens the invite story. `build.py` copies `art/` into `docs/art/`.
