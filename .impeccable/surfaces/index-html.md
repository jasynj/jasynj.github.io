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

OWN-WORLD: A chess-book print diagram on white paper (#f6f6f3). Dark squares are ink hatching, not a fill. The move list is a solid ink panel (#141414) with white type. Brilliant-move teal (#1baca6) is reserved for `!!` and the struck-forward move, and appears only on ink. Archivo (variable width) carries names and headlines; Geist Mono carries notation, coordinates, dates and metrics; SVG figurine pieces are used throughout. Surfaces are flat, with depth only from overlapping layers. Controls are square-cornered like notation boxes.

STORY: The recruiter sees the whole game in one glance (Phillips → Meta University! → GSU Portal! → Meta Messenger!!) with numbers beside each move. They understand he ships real products that selective teams vetted, and they download the resume or draft an email.

FIRST VIEWPORT: On the left, a large hatched 8×8 diagram with a–h and 1–8 coordinates. An eval bar hugs its left edge. On the right, an ink panel holds a PGN-style header (name, title, school) and a numbered move list: every work move with its year, org, one metric and a glyph. At the panel's foot: "Download resume" (ink on white, primary) and "Draft an email". Hovering or focusing a move replays it on the board, which draws an arrow and slides the piece. On load, the game plays through once to 6.Nxf7!!.

FORM: The Analysis Board, my own top-ranked grounded candidate (#1 on my ordered list: an engine analysis screen), taken as IMPECCABLE'S PICK over the assigned tournament clock (#7). Seed key: b7bfcaa1. Raises kept: nothing hides behind tabs (programs render as side-variations in parentheses); a bar's length equals the real duration; depth only by overlap; the email drafter previews before sending.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- The content is partly stale per the user; the user will supply updates to `data/content.json`.
- The About photo and headshot are the existing files until the user provides new ones.
