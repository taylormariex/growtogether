#!/usr/bin/env python3
"""Build the Grow Together prototype.

  python3 build.py            → docs/index.html (every experience) + four standalone
                                 builds in docs/<slug>/index.html, mirrored into dist/

Each standalone build opens on one story lander and stays inside that experience,
so a reviewer can look at it on its own. The source files are the same; focus.js
adds the guard rails and each page sets window.FOCUS before the app boots.
"""
import os, re, shutil, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
CSS = ['styles.css', 'theme.css', 'spec.css']
JS = ['art.js', 'assets1.js', 'assets2.js', 'assets3.js', 'assets4.js', 'theme-art.js',
      'core.js', 'flows.js', 'gt.js', 'ideas.js', 'theme.js',
      'spec-core.js', 'spec-flows1.js', 'spec-flows2.js', 'spec-grove.js', 'spec-year.js',
      'spec-app.js', 'spec-lander.js', 'spec-rules.js', 'spec-nav.js', 'spec-clock.js', 'spec-quiz.js', 'spec-polish.js', 'spec-streaks.js', 'spec-social.js', 'spec-roots.js', 'spec-family.js', 'spec-forest.js', 'spec-wh-stories.js', 'spec-ia.js', 'focus.js']

# slug → (lander key, page title)
FOCUS = {
    'skip-and-invest': ('skip-and-stash', 'Skip and Invest'),
    'shared-goals':   ('split',          'Shared goals'),
    'acorns-year':    ('year',           'Acorns Year'),
    'invite':         ('invite',         'Invite to your grove'),
    'know-yourself':  ('money-type',     'Know yourself'),
    'witness':        ('witness',        'Witness'),
    'friday-count':   ('fridaycount',    'The Friday Count'),
    'drop-an-acorn':  ('acorn',          'Drop an Acorn'),
    'seedling':       ('seedling',       'Seedling'),
    'same-tree':      ('sametree',       'Same Tree'),
    'the-grove':      ('grove',          'The Grove'),
    'canopy':         ('canopy',         'Canopy'),
    'bloom':          ('bloom',          'Bloom'),
    'rings':          ('rings',          'Rings'),
}

def read(name):
    return (ROOT / name).read_text()

def assemble(focus_key=None, slug=None, stamp=''):
    src = read('index.src.html')
    css = '<style>\n' + '\n\n'.join(read(f) for f in CSS) + '\n</style>'
    js = '<script>\n' + '\n\n'.join(read(f) for f in JS) + '\n</script>'
    head = ''
    if focus_key:
        head = (f'<script>window.FOCUS={focus_key!r};window.STATE_KEY={"gt-"+slug!r};</script>\n')
    out = src.replace('<!--CSS-->', head + css).replace('<!--JS-->', js)
    out = out.replace('BUILDSTAMP', stamp)
    if focus_key:
        # standalone pages live one folder down: point art, icons and manifest at the parent
        out = re.sub(r'(?<=[("\'=])art/', '../art/', out)
        out = out.replace('href="manifest.json"', 'href="../manifest.json"')
        out = out.replace('href="icon-180.png"', 'href="../icon-180.png"')
        out = out.replace('<title>Grow Together</title>', f'<title>{FOCUS[slug][1]} · Grow Together</title>')
        # the boot script: start on this experience's story instead of the menu
        out = re.sub(r'<script>\n\(function boot\(\)\{.*?\}\)\(\);\n</script>',
                     '<script>focusBoot()</script>', out, flags=re.S)
    return out

def main():
    stamp = datetime.datetime.now().strftime('%b %-d, %-I:%M %p')
    docs = ROOT / 'docs'
    (docs / 'index.html').write_text(assemble(stamp=stamp))
    for slug, (key, _) in FOCUS.items():
        d = docs / slug; d.mkdir(exist_ok=True)
        (d / 'index.html').write_text(assemble(key, slug, stamp))
    # the old Skip and Stash link forwards to the renamed experience
    (docs / 'skip-and-stash').mkdir(exist_ok=True)
    (docs / 'skip-and-stash' / 'index.html').write_text('<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../skip-and-invest/"><title>Skip and Invest</title><a href="../skip-and-invest/">Skip and Invest</a>')
    # art ships with the page
    for f in (ROOT / 'art').iterdir():
        shutil.copy(f, docs / 'art' / f.name)
    # dist mirrors docs (used for the zip upload)
    dist = ROOT / 'dist'
    shutil.copy(docs / 'index.html', dist / 'index.html')
    for slug in FOCUS:
        (dist / slug).mkdir(exist_ok=True)
        shutil.copy(docs / slug / 'index.html', dist / slug / 'index.html')
    print('built', stamp)

if __name__ == '__main__':
    main()
