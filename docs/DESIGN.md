---
name: Jason Chimdinma Jason — Portfolio
description: A career read as an annotated chess game, set as a chess-book analysis board on ink.
colors:
  ink: "#141414"
  ink-raised: "#1d1d1b"
  paper: "#f6f6f3"
  fg-muted: "#a3a39c"
  fg-dim: "#8c8c85"
  ink-muted: "#55554f"
  rule: "rgba(246, 246, 243, 0.16)"
  rule-strong: "rgba(246, 246, 243, 0.55)"
  hatch-line: "rgba(246, 246, 243, 0.34)"
  teal: "#1baca6"
  wash: "rgba(27, 172, 166, 0.28)"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 11vw, 9rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 112"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)"
    fontWeight: 850
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 112"
  player:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4.1vw, 4.4rem)"
    fontWeight: 850
    lineHeight: 0.96
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.3rem, 2vw, 1.65rem)"
    fontWeight: 800
    lineHeight: 1.15
    fontVariation: "\"wdth\" 108"
  title-sm:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)"
    fontWeight: 800
    lineHeight: 1.2
    fontVariation: "\"wdth\" 108"
  move:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 750
    lineHeight: 1.3
    fontVariation: "\"wdth\" 108"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "\"wdth\" 100"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "\"wdth\" 100"
  button:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 650
    letterSpacing: "0.02em"
    fontVariation: "\"wdth\" 100"
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 650
    letterSpacing: "0.04em"
    fontVariation: "\"wdth\" 100"
  notation:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "1.05rem"
    fontWeight: 600
  data:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8rem"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 9vw, 128px)"
  section-head: "clamp(40px, 5vw, 64px)"
  subsection: "clamp(64px, 8vw, 96px)"
  row: "28px"
  row-compact: "22px"
components:
  button-move:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-move-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-quiet:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-quiet-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "40px"
  button-line-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  masthead-resume:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 10px"
  masthead-resume-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-link:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.fg-muted}"
    typography: "{typography.label}"
    padding: "8px 10px"
  nav-link-hover:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
  move-row:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.move}"
    padding: "11px 10px"
  move-row-current:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
  reel-card:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  modal:
    backgroundColor: "{colors.ink-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  icon-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    size: "44px"
  logo-tile:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "10px"
    size: "84px"
  play-badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "56px"
  intent-chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "48px"
  intent-chip-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  field-input:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "48px"
  draft-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "22px 24px"
---

# Design System: Jason Chimdinma Jason — Portfolio

## Overview

**Creative North Star: "The Analysis Board"**

The site is a post-game analysis, set on ink: a chess-book diagram and its annotations read off one dark ground, the way an engine analysis screen shows a printed game. Ink carries every surface, paper carries the type, and a single brilliant-move teal appears only where a move is struck forward. Every visual device is borrowed from how chess is printed and analysed (figurine notation, `!`/`!!` glyphs, a–h/1–8 coordinates, an eval bar, PGN tag pairs, a duration bar measured in months), so the chess theme is structural rather than decorative.

Density is that of a well-set analysis page: generous section padding, hairline paper rules between rows, and a clear left-to-right reading order of dates, then substance, then the move. Surfaces are flat. Depth is one tonal step, never light: raised ink for cards, the modal and the board's squares, and a double-rule frame around a diagram or photo. Corners are square everywhere, like notation boxes. The one deliberate paper surface on the page is the email drafter's scoresheet, which reads as a printed sheet laid on the board.

The world refuses the category default of an avatar, a greeting, pill buttons and a stock illustration. Experience and Projects are browsed like a streaming catalogue, one carousel and rows of 16:9 cards, with the detail in a modal, drawn in the board's own flat, square, hatched language. The chess-knight cursor and the knight figurine in the wordmark are durable brand commitments.

**Key Characteristics:**
- One dark ground (ink) throughout, with paper for type; `color-scheme: dark`.
- Dark squares, duration bars and empty thumbnails are light hatching on ink, never a flat grey fill.
- Archivo variable width for words; Geist Mono only for notation and measurement.
- Raised ink and double-rule frames in place of shadows.
- Square corners on every control, frame and image.
- Three motion moments: the board plays, the experience carousel drifts, and the modal fades in.

## Colors

A dark two-tone print palette (ink ground, paper type) with one raised step of ink and a single brilliant-move accent.

### Primary
- **Brilliant-Move Teal** (teal): the `!!` glyph, the brilliant move's proof metric, the board's arrow when the brilliant move is struck, focus rings, and the focused field's underline and caret (6.6:1 on ink). Nowhere else.
- **Analysis Wash** (wash): the translucent teal laid over the from and to squares of the current move, and the text selection highlight.

### Neutral
- **Diagram Ink** (ink): the page ground everywhere, including the masthead, the hero, every section and the eval bar's empty track.
- **Raised Ink** (ink-raised): the board's squares, a hovered or current move row, experience and project cards, and the modal (and so the ground line buttons sit on). The only tonal step above the ground.
- **Chess-Book Paper** (paper): all primary type, the eval bar fill, and every inverted mark: the primary button, the Resume tab, logo tiles, the brilliant move's solid duration bar, the demo play square, the open project toggle, the selected intent chip, and the drafter's scoresheet.
- **Panel Grey** (fg-muted): secondary text on ink: roles, section notes, metric labels, PGN tag values, toggles at rest, stacks, form labels, masthead links at rest, the board arrow for ordinary moves, and the black pieces' keyline (7.3:1 on ink).
- **Reply Grey** (fg-dim): the quietest text on ink: move and project numbers, coordinates, PGN tag names and brackets, duration and place lines, placeholders, the footer (5.4:1 on ink).
- **Margin Grey** (ink-muted): secondary text on the paper scoresheet only (the To and Subject labels, 6.9:1 on paper).
- **Hairline Rule** (rule): the divider between rows, the masthead's closing rule, section ends, the board's outer outline and a frame's outer line.
- **Strong Rule** (rule-strong): the rule that opens a list, the border of line buttons, project toggles, duration bars, demo thumbnails, evidence images, the eval bar, and a frame's inner line.
- **Hatch Line** (hatch-line): the stroke of the 135° hatch.

### Named Rules
**The Teal Reserve Rule.** Teal marks the brilliant move and keyboard focus, nothing else. The ordinary board arrow is panel grey; it turns teal only for the brilliant move. No teal links, headings, backgrounds or decoration.

**The Raised Ink Rule.** Ink has exactly one step up. Raised ink marks the board, cards and the modal. There are no other grey fills and no second step.

**The Paper Mark Rule.** Paper appears as type and as small inverted marks (a button, a tab, a tile, a toggle, a play square, a solid bar). The drafter's scoresheet is the one paper surface; no other region or section is set on paper.

**The Hatch Rule.** A dark square is paper hatching on ink (`repeating-linear-gradient(135deg, hatch-line 0 1.2px, transparent 1.2px 5px)`), never a grey fill. The same hatch fills duration bars and any card or modal frame that has no picture.

## Typography

**Display Font:** Archivo, variable width 62–125 and weight 300–900 (with Helvetica Neue, Arial)
**Body Font:** Archivo at width 100
**Label/Mono Font:** Geist Mono 400–600 (with ui-monospace, SF Mono, Menlo)

**Character:** A wide, heavy grotesque for names and headlines, set tight like a chess-book chapter head, against a precise mono that reads as printed notation. Width is an axis of hierarchy: headlines at 112, titles at 108, body and UI at 100.

### Hierarchy
- **Display** (850, clamp(3.5rem, 11vw, 9rem), 0.95): "Your move." only, the closing call.
- **Headline** (850, clamp(2.4rem, 5.2vw, 4.5rem), 0.95, -0.03em): section heads (Experience, Projects, About, Skills).
- **Player** (850, clamp(2.5rem, 4.1vw, 4.4rem), 0.96, -0.025em): the player's name, leading the first viewport.
- **Title** (750, 1.12rem, 1.2): organisation and project names on cards. Row titles run 750 at 1.35rem, carousel group links 700 at 1.1rem.
- **Detail Title** (850, clamp(1.7rem, 3.6vw, 2.5rem), 1): the heading of the modal. Repertoire group titles run 800 at 1.15rem.
- **Move** (750, 1.15rem, 1.3, width 108): the organisation in a hero move row, over its role at 0.92rem in panel grey.
- **Lede** (400, 1.2rem, 1.5): the hero tagline (48ch) and the "Your move." lede.
- **Body** (400, 1rem, 1.55): summaries and prose, capped at 62–72ch; project summaries 1.05rem.
- **Button** (650, 0.85rem, 0.02em): buttons, intent chips, the player line (1.05rem), field labels, project context lines, demo labels. Sentence case.
- **Label** (650, 0.75–0.8rem, 0.04–0.06em, uppercase): masthead nav, the Resume tab, carousel group markers, card media labels, modal labels, fact-list terms, form legends, the draft label. Always a control or a label for data, never a line above a heading.
- **Notation** (Geist Mono 600, 1.05rem in hero rows; 0.9rem in the experience tag): move numbers, figurine SAN and `!`/`!!` glyphs; metric values run 600 at 1.1rem and proof metrics 400 at 0.9rem.
- **Data** (Geist Mono 400, 0.68–0.9rem): board coordinates, PGN tags, dates, durations and places, tags, stack lines, the skills list at line-height 2, the GPA line.

### Named Rules
**The Notation Rule.** Mono is for notation and measurement only: moves, coordinates, dates, durations, numbers, tags, stacks. Never use it as costume for headings, buttons or prose.

**The No-Eyebrow Rule.** Headings stand alone. No small uppercase kicker or label sits above a heading; context goes in the section note beside it.

## Layout

A single long page on ink under a sticky 56px ink masthead closed by a hairline rule. The first viewport fills `100svh` minus the masthead with two columns at 0.72fr | 1.28fr: the board recedes on the left (the diagram and eval bar at min(58vh, 30vw)); the words lead on the right with no separate fill, divided from the board by a hairline, holding the name, player line, PGN tags, tagline, the move list and the resume and email actions at its foot.

Sections pad by the `section` step vertically and the `gutter` step horizontally, cap content at 1280px, and end in a hairline rule. Each section head is a two-column grid (heading | note, 1fr | 1.1fr, aligned to the baseline end). Every list of rows opens with a strong rule and divides rows with hairlines.

Experience and Projects break out of the 1280px cap and run the full width between gutters. Experience is one carousel of clamp(260px, 24vw, 360px) cards that bleeds off both edges. Projects are a row per category, three cards across, scrolling when there are more. About is a 0.8fr | 1.2fr player card; Skills sit in four ruled repertoire columns; "Your move." pairs the form (0.9fr) with the scoresheet (1.1fr).

At 960px everything collapses to one column and the hero panel comes first (the name and moves lead, the board follows at min(76vw, 420px)). The masthead wraps so the nav becomes a second, horizontally scrollable row under its own hairline (about 100px tall in total), with 44px touch targets. Projects go two across; the modal body stacks; the repertoire becomes two columns. At 520px projects go to one card with the next peeking, the modal fills the screen, carousel and row arrows hide (swipe instead, the pause button stays), and the move list drops its proof metric under the organisation and the player facts go single-column.

## Elevation & Depth

The system is flat: there are no drop shadows, glows, blurs or gradients for depth. Depth is one tonal step and a printed frame. Raised ink lifts the board, the cards and the modal. A framed object (the board, the player photo, the modal) carries the chess-book double rule on ink: a 1.5px strong-rule border plus a 1px hairline outline offset 3px. The paper scoresheet carries the same double rule in paper at 2.5px.

Two 1px outlines exist to separate a mark from its ground, and neither is depth: black pieces are keylined in panel grey (a four-way 0.6px `drop-shadow` outline) so they read on the dark board, and the inverted Resume tab takes a 1px inset paper keyline on hover.

### Named Rules
**The Double-Rule Rule.** A frame is a border plus a 1px outline at 3px offset: 1.5px strong rule and hairline on ink, 2.5px paper on the scoresheet. Nothing is lifted with a shadow, blur or glow.

**The Keyline Rule.** A 1px, unblurred, un-offset outline that keeps a mark legible against its ground is a keyline, not a shadow. It never grows, softens or shifts to suggest height.

## Shapes

Square corners throughout (radius 0): buttons, chips, inputs, frames, logo tiles, the eval bar, toggles, demo thumbnails and the play square. Lines carry the form language: hairline paper rules divide rows, strong rules open lists, and 1px strong-rule strokes outline small marks (duration bars, project toggles, thumbnails, evidence images). Icons are inline 16px SVG strokes at 1.6 with square caps: a plus that becomes a minus, an external arrow, a filled play triangle. Pieces are the cburnett SVG figurine set, used on the board, inline in SAN, and in the wordmark.

## Components

### Buttons
Flat notation boxes that invert on hover.
- **Shape:** square (0), 1px border, 44px tall.
- **Primary ("Download resume", "Open in email app"):** paper fill with ink text, padding 0 20px; hover inverts to ink with paper text and border.
- **Quiet ("Draft an email", the drafter's send and copy actions):** transparent on ink, paper text and a paper border; hover fills paper with ink text. Contact links use the same treatment at 0.9rem, padding 0 18px.
- **Line (links inside the modal):** paper text, a strong-rule border, 40px tall, padding 0 14px, a trailing external-arrow icon; hover fills paper with ink text.
- **Hover / Focus:** background and colour swap over 0.2s on the ease-out curve. Focus is a 2px teal outline at 3px offset everywhere.

### Chips
- **Style:** the email drafter's intent choices, a two-column grid of 48px square boxes on ink with a half-strength paper border and 650-weight labels.
- **State:** hover strengthens the border to full paper; selected inverts to a paper fill with ink text; keyboard focus adds the teal outline.

### Cards / Containers
One card, shared by Experience and Projects.
- **Corner Style:** square (0).
- **Background:** raised ink, with a 16:9 media frame on top closed by a hairline.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** hairline at rest, strong rule on hover. No lift and no zoom.
- **Media, in order:** the demo thumbnail with a paper play square; a picture; paper logo tiles on hatch; a dashed inset on hatch for "nothing yet".
- **Internal Padding:** 14px 16px 18px.

### Inputs / Fields
- **Style:** underline fields on ink: transparent fill, a 1.5px paper bottom rule, no other border, 48px tall, 1.05rem text, reply-grey placeholder, teal caret.
- **Focus:** the bottom rule turns teal and the field takes a faint paper tint; no outline box.
- **Error / Disabled:** unavailable draft actions drop to 55% opacity until the draft is ready.

### Navigation
The masthead: knight figurine plus the short name in Archivo 800 at width 112 on the left; uppercase label links in panel grey on the right, which turn paper on raised ink under the pointer; a paper "Resume" tab that inverts to ink with a 1px paper keyline on hover. Below 960px the links move to a second row, spread edge to edge and scroll horizontally.

### The Analysis Board (signature)
A quiet dark 8×8 diagram: raised-ink squares, the dark squares hatched in paper lines, framed with the double rule, with mono a–h and 1–8 coordinates in reply grey. A 10px eval bar sits on its left edge: an ink track with a strong-rule border and a paper fill that scales vertically from the bottom (0.6s). The current move's from and to squares take the analysis wash; a round-capped panel-grey arrow draws the move and turns teal for the brilliant move. White pieces sit as drawn; black pieces carry the panel-grey keyline. Pieces glide with a 0.42s transform on the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)), and the game plays through once to the brilliant move on load.

### The Move List (signature)
Beside the board with no separate fill: the PGN header (mono `[Tag value]` pairs, brackets and names in reply grey), then a numbered list opened by a strong rule: mono move number, figurine SAN with its glyph, organisation (Move type) over role, and a right-aligned mono proof metric. Rows divide on hairlines and take raised ink on hover, focus or current, which replays that move on the board. The brilliant move's `!!` and proof metric turn teal.

### Experience Carousel (signature)
Work, Programs & fellowships and Hackathons run in one line and loop. A hairline runs above the cards with a paper square and an uppercase marker where each group starts; the group links above it underline in paper for the group in view. It drifts at 40px a second and stops for hover, keyboard focus, touch, an open modal, the pause button and while off screen. Each card carries mono dates and a hatched duration bar (6% of the card per month).

### Project Rows (signature)
A titled row for each category that has projects, three cards across. Arrows appear only when a row overflows.

### Details Modal
A native dialog on raised ink in the double rule, over 86% ink with no blur. The 16:9 media leads (the player, picture, logos or placeholder), then the title with its context line under it, then a text column beside a facts column. A 44px square close button stays put while the content scrolls. Esc, the backdrop and Back all close it.

### Player Card and Repertoire
The About section is a two-column player card: a double-rule photo frame and a two-column fact list under a paper rule, its terms in uppercase label type. Skills are four columns divided by hairlines, each with an 800-weight group title over a mono list at line-height 2.

### "Your move." Drafter (signature)
Led by the display headline and a lede. Intent chips and underline fields sit on the left; on the right the paper scoresheet preview, framed in the paper double rule, shows To and Subject rows (margin-grey labels) over ink rules and the drafted body, with a primary "Open in email app" button and quiet send and copy buttons beneath it on ink.

### Motion
The carousel drifts (40px/s) and glides to a group or card in 0.65s. The modal fades in over 0.2s. Under `prefers-reduced-motion` the carousel starts paused and jumps instead of gliding, the modal appears without a fade, and videos don't autoplay.

## Do's and Don'ts

### Do:
- **Do** set every surface on ink (#141414) with paper (#f6f6f3) type; bring something forward with raised ink (#1d1d1b) or by inverting a small mark to paper.
- **Do** hatch every dark square, duration bar and empty thumbnail with the 135° paper hatch.
- **Do** frame the board and photos with the double rule: 1.5px strong-rule border plus 1px hairline outline at 3px offset.
- **Do** set notation, coordinates, dates, durations, metrics, tags and stacks in Geist Mono, and everything else in Archivo.
- **Do** make a duration bar's length proportional to the real duration.
- **Do** put secondary material in the shared modal, opened from a card and linkable by its hash.
- **Do** give anything that moves by itself a visible pause.
- **Do** keep the chess-knight cursor and the knight figurine in the wordmark.
- **Do** honour `prefers-reduced-motion`: the board and carousel hold still and transitions switch off.

### Don't:
- **Don't** use teal anywhere except the brilliant move, the brilliant board arrow and focus.
- **Don't** add a light or paper section; the scoresheet is the only paper surface.
- **Don't** add a second tone of raised ink or any other grey fill.
- **Don't** add drop shadows, glows, blurs or gradients for depth; the only outlines are frames and keylines.
- **Don't** round any corner.
- **Don't** put an eyebrow or kicker above a heading.
- **Don't** use mono for headings, buttons or prose.
- **Don't** lift, zoom or round a card.
- **Don't** add a second modal or card style; reuse the shared ones.
- **Don't** add authored motion beyond the board, the carousel and the modal fade.
