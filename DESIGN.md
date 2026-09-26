---
name: Jason Chimdinma Jason — Portfolio
description: A dark, deliberate portfolio where every piece of proof is placed with intent.
colors:
  board-teal: "#0c2a2a"
  midnight-well: "#082021"
  knight-teal: "#00ad9f"
  knight-teal-lit: "#0cc5b3"
  aqua-highlight: "#74f6eb"
  ivory-white: "#ffffff"
  mist: "#d1e3e3"
  slate-sage: "#9fb9b9"
  veil: "rgba(255, 255, 255, 0.03)"
  veil-strong: "rgba(255, 255, 255, 0.06)"
  hairline: "rgba(255, 255, 255, 0.12)"
  success: "#4ade80"
  error: "#f87171"
typography:
  display:
    fontFamily: "Figtree, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "2.4rem"
    fontWeight: 700
  headline:
    fontFamily: "Figtree, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
  title:
    fontFamily: "Figtree, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
  body:
    fontFamily: "Figtree, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  detail-link:
    fontFamily: "Instrument Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "24px"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "96px"
  section-lg: "120px"
components:
  button-primary:
    backgroundColor: "{colors.knight-teal}"
    textColor: "{colors.ivory-white}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-primary-hover:
    backgroundColor: "{colors.knight-teal-lit}"
    textColor: "{colors.ivory-white}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-white}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-outline-hover:
    textColor: "{colors.knight-teal}"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.slate-sage}"
    rounded: "{rounded.pill}"
    padding: "6px 16px"
  tab-active:
    backgroundColor: "{colors.knight-teal}"
    textColor: "{colors.ivory-white}"
  card:
    backgroundColor: "{colors.veil}"
    rounded: "{rounded.md}"
    padding: "18px 20px"
  input:
    backgroundColor: "rgba(255, 255, 255, 0.02)"
    textColor: "{colors.ivory-white}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  modal:
    backgroundColor: "{colors.midnight-well}"
    rounded: "{rounded.md}"
    padding: "20px 22px"
    width: "520px"
---

# Design System: Jason Chimdinma Jason — Portfolio

## Overview

**Creative North Star: "The Endgame Board"**

The site is a dark, deliberate board where each piece of proof (an internship, a shipped product, a program selection) sits on its own square, placed with intent. The ground is a single deep teal-black. The pieces are flat, barely-lit tiles defined by hairline borders rather than shadows. Knight Teal is the move being made: it marks the one action or state that matters in any given view, such as the primary button, the active tab, or the focused field. The knight cursor and the falling-sparkle trail are the player's hand on the board, the site's signature personal touches.

The mood is calm, strategic, and confident. Density is moderate: one long page of anchored sections, each opening with a plain heading and then laying its pieces out in a one- or two-column grid. Nothing competes for attention. Hierarchy comes from white-versus-mist text contrast and from the single teal accent, not from size jumps or decoration. Components are calm and precise: soft pill controls, quiet borders, and content doing the talking.

**Key Characteristics:**
- One dark teal ground (`board-teal`) behind everything; no light theme.
- Flat tonal surfaces: 3–6% white veils with 12% white hairline borders.
- A single accent family (Knight Teal, with Aqua Highlight for tiny details).
- Pill-shaped interactive controls; softly rounded (12px) containers.
- Figtree throughout, with bold weight rather than large size carrying hierarchy.
- Personal signature: chess-knight cursor and a white sparkle trail.

## Colors

A monochrome teal night with one bright move: everything sits in the same blue-green hue family, from near-black ground to pale mist text, and only Knight Teal is saturated.

### Primary
- **Knight Teal** (`knight-teal`): the accent for action and state. Used for primary button fills, the active experience tab, modal close buttons, input focus borders, the hero title line ("Software Engineer"), the hero avatar ring, hover borders on outline buttons and contact cards, and contact icons (on a 10% tint of itself).
- **Knight Teal, Lit** (`knight-teal-lit`): the hover state of Knight Teal on filled buttons, and the thin ring around experience logos.

### Secondary
- **Aqua Highlight** (`aqua-highlight`): a small-detail color only. Used for the "View details" link text and the underline under skill category headings. It never fills a surface.

### Neutral
- **Board Teal** (`board-teal`): the page background and the base of the translucent sticky header (at 96% opacity with a 12px blur).
- **Midnight Well** (`midnight-well`): a slightly darker, deeper teal used only for modal panels so they read as sunk below the page.
- **Ivory White** (`ivory-white`): headings, the logo, card titles, input text, and text on teal buttons.
- **Mist** (`mist`): body copy, summaries, and paragraph text.
- **Slate Sage** (`slate-sage`): meta lines (location and dates), nav links at rest, uppercase labels, placeholders, the footer, and inactive tabs.
- **Veil / Veil Strong** (`veil`, `veil-strong`): translucent white fills for cards, tabs, and the form. Veil Strong is the hover fill.
- **Hairline** (`hairline`): the universal 1px border on cards, inputs, outline buttons, the header, and the footer. Section dividers use an even fainter 4% white.

### Status
- **Success** (`success`) / **Error** (`error`): form-submission results only, each shown as text on an 8% tint of itself with a 25% border.

### Named Rules
**The One Move Rule.** In any view, Knight Teal marks the one thing to act on or the one active state. If two teal fills sit side by side, one of them is wrong.

**The Aqua Is Ink Rule.** Aqua Highlight is only for text and underlines. Never use it as a fill, border, or background.

## Typography

**Display Font:** Figtree (with system-ui, -apple-system, BlinkMacSystemFont, sans-serif)
**Body Font:** Figtree
**Detail Font:** Instrument Sans, used only for the "View details" link on experience cards

**Character:** A single friendly geometric sans at every level. Hierarchy comes from weight (400 / 500 / 600 / 700) and white-versus-mist contrast rather than from dramatic size changes.

### Hierarchy
- **Display** (`typography.display`): the hero name only.
- **Headline** (`typography.headline`): section headings (About, Experience, Projects, Contact), using the browser-default h2 size in bold Ivory White with 24px below.
- **Title** (`typography.title`): experience card titles, modal titles, and contact subheads.
- **Body** (`typography.body`): paragraphs in Mist. Long prose in About and Contact uses a 1.7 line-height; the contact intro is capped at 680px.
- **Label** (`typography.label`): uppercase meta labels (the Education card, contact item labels) in Slate Sage.
- **Meta** (0.85–0.9rem, 400): organization lines and "location • dates" lines in Slate Sage or Mist.
- **Detail link** (`typography.detail-link`): underlined Aqua Highlight text with a Knight Teal-Lit underline, which nudges up and right on hover.

### Named Rules
**The Weight, Not Size Rule.** Promote an element with weight and white before you promote it with size. Only the hero name gets real display scale.

## Layout

A single scrolling page with anchored sections, each separated by a 4%-white top hairline and generous vertical padding (96px by default, 120px for Hero, About, and Projects). Content sits in a centered container 1120–1200px wide with 24px side padding (the header uses `min(1120px, 100% - 32px)`).

- **Hero:** a two-column flex. The text column is fixed at 540px and the illustration column takes the remaining space. Under 900px the illustration hides and the text centers.
- **About:** a fixed 250×400 portrait frame on the left and text on the right. Under 850px these stack, and the portrait becomes a full-width 250px-tall crop.
- **Experience / Projects:** a single column that becomes two equal columns at 768px or wider, with a 20px gap.
- **Contact:** a two-column grid with a 48px gap that collapses to one column under 900px.
- **Rhythm:** 8 / 12 / 16 / 20 / 24 / 32 / 48px steps. Cards use 16–20px internal padding; the form uses 32px (24px on mobile).

## Elevation & Depth

The system is flat. Depth comes only from tonal layering: a 3% white veil lifts a card off the Board Teal, a 12% hairline defines its edge, and hover raises the veil to 6% and turns the hairline Knight Teal. Modals sink rather than rise: they sit on Midnight Well above a 60% black scrim. The only real shadows belong to the photo lightbox (a large, soft drop under the enlarged image) and a near-invisible 4% shadow under experience logos.

### Named Rules
**The No-Shadow Rule.** Don't use shadows on cards, buttons, or panels. To make something feel closer, brighten its veil or its border.

## Shapes

Softness is split by role. Interactive controls (buttons, tabs, social icons, the avatar) are full pills or circles (`rounded.pill`). Containers (cards, inputs, modals, contact items) use a gentle 12px corner (`rounded.md`). The contact form and the tops of project images step up to 20px (`rounded.lg`). Small icon chips and logos use 8px (`rounded.sm`). Borders are always 1px, except the 2px Knight Teal ring around the hero avatar. Modal bullet lists use square markers, a small echo of the board.

## Components

### Buttons
Calm and precise pills. The action is obvious from color alone.
- **Shape:** full pill (`rounded.pill`), 1px border, 0.95rem, weight 500.
- **Primary:** a Knight Teal fill with white text. On hover it shifts to Knight Teal, Lit.
- **Outline:** a transparent background with white text and a Hairline border. On hover both the border and the text turn Knight Teal.
- **Project buttons:** 12px-radius pills with a Hairline border, 8px 16px padding, and 0.2s transitions on background, border, and color. Unavailable links get a `not-allowed` cursor.
- **Focus:** there is no custom focus style yet; the browser default applies.

### Tabs (Experience switcher)
- A segmented pill track with a Veil fill, a Hairline border, and 6px padding. Inactive tabs are transparent with Slate Sage text; the active tab is a Knight Teal pill with white text.

### Cards / Containers
- **Corner Style:** 12px (`rounded.md`).
- **Background:** Veil.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px Hairline. On interactive cards (contact items), hover turns the border Knight Teal and the fill Veil Strong.
- **Internal Padding:** 18px 20px (experience), 16px (contact items), 32px 28px (skills).
- **Experience card anatomy:** a 36px logo tile (8px radius with a Knight Teal-Lit ring) above the title, organization, meta line, summary, and "View details" link.
- **Project tile:** the image sits flush at the top with 20px top corners, and the title and justified description sit below.

### Inputs / Fields
- **Style:** a 2% white fill, a Hairline border, 12px radius, and 12px 16px padding. Labels sit above in white at weight 500. Placeholders are Slate Sage.
- **Focus:** the border turns Knight Teal and the fill rises to 4% white. The outline is removed.
- **Result states:** full-width success and error panels, as described under Status colors.

### Navigation
- A sticky header on 96% Board Teal with a 12px backdrop blur and a Hairline bottom border. The "Jason C. Jason" wordmark is bold white with 0.04em tracking. Nav links are 0.95rem Slate Sage and turn white on hover, with 20px between them.

### Experience Modal (Signature)
- A centered Midnight Well panel, 520px wide, over a 60% black scrim. It contains a white title, a Slate Sage meta line, a square-bullet achievement list in Mist, an optional two-up media grid (clicking an image opens a full-screen lightbox), and a Knight Teal pill Close button.

### Personal Cursor (Signature)
- A 16px chess-knight cursor across the whole page, plus a falling white sparkle trail that follows the pointer. Together they are the site's recognizable personal mark.

## Do's and Don'ts

### Do:
- **Do** keep Board Teal as the only page background. New sections sit directly on it, separated by a 4% white hairline.
- **Do** build new containers from Veil + Hairline + 12px radius, and brighten them to Veil Strong with a Knight Teal border on hover when they are interactive.
- **Do** make every interactive control a pill, and every container a 12px or 20px rounded rectangle.
- **Do** give each view one Knight Teal move (The One Move Rule).
- **Do** set headings in bold Ivory White, body text in Mist, and meta and labels in Slate Sage.
- **Do** keep the knight cursor and sparkle trail. They are the signature.

### Don't:
- **Don't** add drop shadows to cards, buttons, or panels (The No-Shadow Rule).
- **Don't** introduce a second accent hue. Status green and red are only for form results.
- **Don't** use Aqua Highlight as a fill or border (The Aqua Is Ink Rule).
- **Don't** use a light theme or light surfaces. The board stays dark.
- **Don't** use large size jumps for hierarchy below the hero name. Use weight and white instead (The Weight, Not Size Rule).
