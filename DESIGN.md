---
name: Jason Chimdinma Jason — Portfolio
description: A career read as an annotated chess game, printed as a chess-book diagram in paper and ink.
colors:
  paper: "#f6f6f3"
  ink: "#141414"
  ink-muted: "#55554f"
  panel-muted: "#a3a39c"
  panel-dim: "#8c8c85"
  teal: "#1baca6"
  teal-deep: "#0b716d"
  wash: "rgba(27, 172, 166, 0.3)"
  ink-hairline: "rgba(246, 246, 243, 0.22)"
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
    fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)"
    fontWeight: 850
    lineHeight: 0.96
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.35rem, 2.2vw, 1.8rem)"
    fontWeight: 800
    lineHeight: 1.1
    fontVariation: "\"wdth\" 108"
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
    fontSize: "0.95rem"
    fontWeight: 600
  data:
    fontFamily: "Geist Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(64px, 9vw, 128px)"
  section-head: "clamp(40px, 5vw, 64px)"
  row: "32px"
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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "40px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  masthead-resume:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 10px"
  nav-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "8px 10px"
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
  move-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "clamp(24px, 3vw, 40px) clamp(24px, 4vw, 64px)"
  draft-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "22px 24px"
---

# Design System: Jason Chimdinma Jason — Portfolio

## Overview

**Creative North Star: "The Analysis Board"**

The site is a post-game analysis printed in a chess book. Paper and ink do nearly all the work: a hatched diagram, a solid ink move list, numbered annotations in a column of notation, and one brilliant-move teal that appears only where a move is struck forward. Every visual device is borrowed from how chess is printed and analysed (figurine notation, `!`/`!!` glyphs, a–h/1–8 coordinates, an eval bar, variations in parentheses, PGN tag pairs), so the chess theme is structural rather than decorative.

Density is that of a well-set book page: generous section padding, hard ink rules between entries, and a clear left-to-right reading order of move number, dates, then substance. Surfaces are flat. Depth comes from two things only: the double-rule frame of a printed diagram and whole regions of ink laid against paper. Corners are square everywhere, like notation boxes.

The world refuses the category default of an avatar, a greeting, pill buttons, a stock illustration and a card grid. Nothing is hidden behind tabs or modals; secondary material sits in parentheses or an inline "Full notes" disclosure. The chess-knight cursor and the knight figurine in the wordmark are durable brand commitments.

**Key Characteristics:**
- Paper (#f6f6f3) and ink (#141414) as the whole palette; teal is a rare, earned mark.
- Dark squares and duration bars are ink hatching, never a flat grey fill.
- Archivo variable width for words; Geist Mono only for notation and measurement.
- Double-rule frames and ink/paper overlap in place of shadows.
- Square corners on every control, frame and image.
- One authored motion moment: the game replays to the brilliant move.

## Colors

A two-ink print palette with a single brilliant-move accent.

### Primary
- **Brilliant-Move Teal** (teal): the `!!` glyph, the brilliant move's proof metric, focus rings, input focus rules and caret. Appears on ink only; on paper it fails contrast and loses its print feel.
- **Deep Analysis Teal** (teal-deep): the paper-side form of the accent. Used only for the board's struck-move arrow and for focus outlines on paper (5.4:1).
- **Analysis Wash** (wash): the translucent teal laid over the from/to squares of the current move, and the text selection highlight.

### Neutral
- **Chess-Book Paper** (paper): the page ground, light diagram squares, text on ink, and the fill of the eval bar.
- **Diagram Ink** (ink): all type on paper, every rule and frame, the move panel, the player card, the "Your move." section, and the hatch strokes.
- **Margin Grey** (ink-muted): secondary text on paper: coordinates, roles, durations, section notes, metric labels (6.9:1).
- **Panel Grey** (panel-muted): secondary text on ink: PGN tag values, roles, form labels (7.3:1).
- **Reply Grey** (panel-dim): the quietest tone on ink: move numbers, PGN tag names and brackets, placeholders, opponent replies.
- **Ink Hairline** (ink-hairline): the row dividers of the ink move list. Section-level dividers on ink use the same paper tint at 30%.

### Named Rules
**The Teal Reserve Rule.** Teal marks the brilliant move and keyboard focus, nothing else. Bright teal lives on ink; on paper only the board arrow and focus outlines take the deep teal. No teal links, headings, backgrounds or decoration.

**The Hatch Rule.** A dark square is ink hatching (`repeating-linear-gradient(135deg, ink 0 1.2px, transparent 1.2px 5px)`), never a grey fill. The same hatch fills duration bars and the empty diagram behind project images.

## Typography

**Display Font:** Archivo, variable width 62–125 and weight 300–900 (with Helvetica Neue, Arial)
**Body Font:** Archivo at width 100
**Label/Mono Font:** Geist Mono 400–600 (with ui-monospace, SF Mono, Menlo)

**Character:** A wide, heavy grotesque for names and headlines, set tight like a chess-book chapter head, against a precise mono that reads as printed notation. Width is an axis of hierarchy: headlines at 112, titles at 108–110, body and UI at 100.

### Hierarchy
- **Display** (850, clamp(3.5rem, 11vw, 9rem), 0.95): "Your move." only, the closing call.
- **Headline** (850, clamp(2.4rem, 5.2vw, 4.5rem), 0.95, -0.03em): section heads (Experience, Projects, About, Skills).
- **Player** (850, clamp(2.2rem, 3.5vw, 3.5rem), 0.96, -0.025em): the player's name at the top of the ink panel.
- **Title** (800, clamp(1.35rem, 2.2vw, 1.8rem), 1.1): organisation names in annotations; project names run 850 at width 110, the lead project larger (clamp(2rem, 3.4vw, 3rem)).
- **Body** (400, 1rem, 1.55): summaries and prose, capped at 52–72ch.
- **Button** (650, 0.85rem, 0.02em): buttons, intent chips, player line, field labels. Sentence case.
- **Label** (650, 0.78rem, 0.04–0.06em, uppercase): masthead nav, the resume tab, "Full notes", fact-list terms, form legends. Always a control or a label for data, never a line above a heading.
- **Notation** (Geist Mono 600, 0.95rem; 1.35rem in annotations): move numbers, figurine SAN and `!`/`!!` glyphs.
- **Data** (Geist Mono 400, 0.72–0.9rem): board coordinates, PGN tags, dates and durations, metric values, stack lines, the skills list, the GPA line.

### Named Rules
**The Notation Rule.** Mono is for notation and measurement only: moves, coordinates, dates, durations, numbers, stacks. Never use it as costume for headings, buttons or prose.

**The No-Eyebrow Rule.** Headings stand alone. No small uppercase kicker or label sits above a heading; context goes in the section note beside it.

## Layout

A single long page under a sticky 56px paper masthead closed by a 1px ink rule. The first viewport fills `100svh` minus the masthead with two columns: the analysis board (1.05fr) on paper and the ink move panel (1fr), with the resume and email actions pinned to the panel's foot.

Sections pad by the `section` step vertically and the `gutter` step horizontally, cap content at 1280px, and end in a 1px ink rule. Each section head is a two-column grid (heading | note, 1fr | 1.1fr, aligned to the baseline end). Lists of entries (annotations, positions, lines, repertoire) open with a 2px ink rule and separate rows with 1px ink rules at a 32px row rhythm.

Experience is a three-column annotation grid (move 9.5rem | clock 13rem | body). Side variations indent under the body columns. Projects give one lead position at diagram scale (1.35fr image | 1fr text), then 18rem-diagram positions, then a three-column "More lines" list. Skills sit in four ruled repertoire columns.

At 960px everything collapses to one column; the board and eval bar size to min(78vw, 520px); the masthead wraps so the nav becomes a second, horizontally scrollable row under its own ink rule (about 100px tall in total), with 44px touch targets. The repertoire becomes two columns. At 520px the move list drops its proof column under the organisation, and the player facts go single-column.

## Elevation & Depth

The system is flat: there are no drop shadows. Depth is printed, not lit. A framed object (the board, a project diagram, the player photo, the draft sheet) carries the chess-book double rule: a 2.5px border plus a 1px outline offset 3px, in ink on paper or in paper on ink. Larger depth comes from whole regions of ink laid against paper: the move panel beside the board, the player card, and the "Your move." section.

### Named Rules
**The Double-Rule Rule.** A frame is 2.5px border plus a 1px outline at 3px offset, in the colour opposite its ground. Nothing is lifted with a shadow, blur or glow.

**The Overlap Rule.** To bring something forward, invert it: ink region on paper, paper sheet on ink. Tone never steps in greys between.

## Shapes

Square corners throughout (radius 0): buttons, chips, inputs, frames, logo tiles, the eval bar, disclosure toggles. Lines carry the form language: 1px ink rules divide rows, 2px rules open lists, dashed 1px rules and mono parentheses mark side variations, and 1.5px strokes outline small marks (duration bars, the "+" disclosure box, logo tiles). Pieces are the cburnett SVG figurine set, used on the board, inline in SAN, and in the wordmark.

## Components

### Buttons
Flat notation boxes that invert on hover.
- **Shape:** square (0), 1px border in the current colour, 44px tall.
- **Primary ("Download resume", "Open in email app"):** paper fill with ink text on ink, padding 0 20px; hover inverts to ink.
- **Quiet ("Draft an email", the drafter's send and copy actions, contact links):** transparent on ink, paper text and paper border; hover fills paper with ink text.
- **Line (project links on paper):** ink text and ink border, 40px tall, padding 0 14px; hover fills ink.
- **Hover / Focus:** background and colour swap over 0.2s on the ease-out curve. Focus is a 2px outline at 3px offset: bright teal on ink, deep teal on paper.

### Chips
- **Style:** the email drafter's intent choices, a two-column grid of 48px square boxes on ink with a 50% paper border and 650-weight labels.
- **State:** hover strengthens the border to full paper; selected inverts to a paper fill with ink text; keyboard focus adds the teal outline.

### Cards / Containers
There are no cards. Containers are regions and framed objects.
- **Corner Style:** square (0).
- **Background:** paper page; ink for the move panel, player card and "Your move."; paper for the draft sheet on ink.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** the double rule for framed objects; 1px ink rules between rows.
- **Internal Padding:** move panel clamp(24px, 3vw, 40px) by clamp(24px, 4vw, 64px); draft sheet 22px 24px.

### Inputs / Fields
- **Style:** underline fields on ink: transparent fill, a 1.5px paper bottom rule, no other border, 48px tall, 1.05rem text, reply-grey placeholder, teal caret.
- **Focus:** the bottom rule turns teal and the field takes a faint paper tint (6%); no outline box.
- **Error / Disabled:** unavailable draft actions drop to 55% opacity until the draft is ready.

### Navigation
The masthead: knight figurine plus the short name in Archivo 800 at width 112 on the left; uppercase 650 label links on the right, which invert to ink on hover; a solid ink "Resume" tab that inverts to paper with a 1px inset keyline on hover. Below 960px the links move to a second row, spread edge to edge and scroll horizontally.

### The Analysis Board (signature)
An 8×8 diagram whose dark squares are hatched and light squares are paper, framed with the double rule, with mono a–h and 1–8 coordinates in margin grey. A 14px eval bar sits on its left edge: ink with a paper fill that scales vertically from the bottom (0.6s). The current move's from and to squares take the analysis wash; a round-capped ink arrow at 70% draws the move and turns deep teal for the brilliant move. Pieces glide with a 0.42s transform on the ease-out curve (cubic-bezier(0.16, 1, 0.3, 1)).

### The Move List (signature)
The ink panel's PGN header (mono `[Tag value]` pairs in panel and reply grey), the player name, then a numbered list of rows: mono move number, figurine SAN with its glyph, organisation (700, width 108) over role, and a right-aligned mono proof metric. Rows divide on the ink hairline and tint 8% paper on hover, focus or current. The brilliant move's `!!` and proof metric turn teal.

### Annotations (signature)
Each experience is a ruled row: mono move number and SAN at 1.35rem; a clock column with dates, a duration bar whose length is proportional to months (11px per month, hatch fill, 1.5px ink stroke, 8px tall), and duration and place; then logos in 32px square ink-bordered tiles, the organisation title, a summary, mono metric values and a "Full notes" disclosure with a square "+"/"−" toggle. The brilliant move inverts its SAN into an ink box with paper text and fills its bar solid ink.

### Side Variations (signature)
Programs and hackathons that branched from a move sit indented beneath it, bounded by a dashed 1px ink rule with large mono "(" and ")" at its ends, divided from each other by dashed rules at 35% ink.

### Positions (signature)
Projects are numbered positions, not cards: a mono position number before each name, a hatched double-rule diagram holding the screenshot (16:10, top-anchored), a context line, summary, an outcome set off by a 1px left rule, a mono stack line and line buttons. The first position leads at diagram scale.

### Player Card and Repertoire
The About section is an ink region with a paper double-rule photo frame and a two-column fact list under a 30% paper rule. Skills are four columns divided by 1px ink rules, with an 800-weight group title over a mono list at line-height 2.

### "Your move." Drafter (signature)
An ink section led by the display headline. Intent chips and underline fields sit on the left; on the right a paper scoresheet preview, framed in the paper double rule, shows To and Subject rows over ink hairlines and the drafted body, with a primary "Open in email app" button and quiet send and copy buttons beneath it on ink.

## Do's and Don'ts

### Do:
- **Do** keep the page to paper (#f6f6f3) and ink (#141414); introduce contrast by inverting whole regions, not by adding greys.
- **Do** hatch every dark square, duration bar and empty diagram with the 135° ink hatch.
- **Do** frame diagrams, photos and previews with the double rule: 2.5px border plus 1px outline at 3px offset.
- **Do** set notation, coordinates, dates, durations, metrics and stacks in Geist Mono, and everything else in Archivo.
- **Do** make a duration bar's length proportional to the real duration.
- **Do** put secondary material in parentheses (side variations) or an inline "Full notes" disclosure.
- **Do** keep the chess-knight cursor and the knight figurine in the wordmark.
- **Do** honour `prefers-reduced-motion`: the replay jumps to the final position and transitions switch off.

### Don't:
- **Don't** use teal anywhere except the brilliant move, the board arrow and focus.
- **Don't** add drop shadows, glows, blurs or gradients for depth.
- **Don't** round any corner.
- **Don't** put an eyebrow or kicker above a heading.
- **Don't** use mono for headings, buttons or prose.
- **Don't** lay out projects or experience as a card grid.
- **Don't** hide content behind tabs, carousels or modals.
- **Don't** add a second authored animation; the game's replay to the brilliant move is the one moment.
