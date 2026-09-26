---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: index.html (portfolio home)

**Scope:** the single-page portfolio at jasynj.github.io. **Mode:** Persuade. A recruiter decides within seconds whether to move Jason forward. The primary action is downloading the resume; the secondary action is drafting an email.

**Audience and job:** a recruiter first, skimming for proof; an engineer second, digging into projects and code; a client third. **Proof on hand:** everything in `data/content.json` (sourced from the current resume). **Constraints:** a static site on GitHub Pages; all content is rendered from data blocks; no testimonials; no invented claims; the knight cursor stays.

**Memorable moment:** Jason's career replays as an annotated chess game. The latest move lands as a brilliant knight sacrifice, `!!`.

## Direction contract

THESIS: The portfolio is a post-game analysis of Jason's career. Each experience is a move in an annotated game, and the board replays it. It refuses the category default: an avatar, "Hello, I'm", two pill buttons, a stock illustration, then a card grid.

OWN-WORLD: The chess-book world set on ink. The whole site sits on one dark ground (#141414), with paper (#f6f6f3) for type. The board is a quiet dark diagram with light hatching on the dark squares, and black pieces are keylined. Brilliant-move teal (#1baca6) is reserved for `!!`, the struck-move arrow, and focus. Archivo (variable width) carries names, headlines, body and UI labels. Geist Mono carries notation, coordinates, dates, metrics and stack only. Cburnett SVG figurines. Surfaces are flat and corners are square. Lists are ruled rows, with raised ink (#1d1d1b) for hover and open states.

STORY: The recruiter sees the whole game in one glance (Phillips → Meta University! → GSU Portal! → Meta Messenger!!) with numbers beside each move. They understand he ships real products that selective teams vetted, and they download the resume or draft an email.

FIRST VIEWPORT: The board is quiet and the words lead, at a ratio of about 36/64. On the left is a dark hatched 8×8 diagram at min(58vh, 30vw) with a–h and 1–8 coordinates and a thin eval bar. On the right, with no separate fill, are the name at up to 4.4rem, the title line, the PGN tags, a 1.2rem tagline, and the numbered move list: year, org, role and one proof metric per move, with glyphs. At the foot are "Download resume" (paper on ink, primary) and "Draft an email". Hovering or focusing a move replays it on the board, and on load the game plays through once to 6.Nxf7!!. On mobile the name and moves come first, then the board.

FORM: The Analysis Board, my own top-ranked grounded candidate (#1 on my ordered list: an engine analysis screen), taken as IMPECCABLE'S PICK over the assigned tournament clock (#7). Seed key: b7bfcaa1. Raises kept: nothing hides behind tabs (programs render as side-variations in parentheses); a bar's length equals the real duration; depth only by overlap; the email drafter previews before sending.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- The content is partly stale per the user; the user will supply updates to `data/content.json`.
- The About photo and headshot are the existing files until the user provides new ones.

## Revision 2026-09-26 (user feedback after first ship)

- Constant dark theme across the whole site, including the board.
- Hero rebalanced so the move list and name lead and the board recedes.
- Experience: the parenthesized "side variations" are removed. They were grouped by date, which read as programs branching from a job. Now Work is a timeline of expandable rows, and Programs & hackathons is a separate two-column list of expandable rows.
- Projects: equal expandable rows (one open at a time), no screenshots, and demos as a small thumbnail card inside the expanded row, opening in a new tab.
- Content contract: data/schema.json plus js/content.js normalization, for a future backend.
