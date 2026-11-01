---
name: Help Yourself
description: The implemented visual system for HelpYourself.games.
colors:
  ink: "#232323"
  paper: "#fffdf5"
  mustard: "#efb900"
  ketchup: "#e12620"
  relish: "#247327"
  relish-dark: "#19531c"
typography:
  display:
    fontFamily: '"Lilita One", sans-serif'
    fontSize: "clamp(38px, 5vw, 60px)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: '"Lilita One", sans-serif'
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Lato, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Lato, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "Lato, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  button: "8px"
  focus: "3px"
  game-art: "50%"
spacing:
  small: "16px"
  medium: "32px"
  large: "72px"
components:
  button-primary:
    backgroundColor: "{colors.relish}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "11px 23px"
  button-primary-hover:
    backgroundColor: "{colors.relish-dark}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  game-title-link:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  skip-link:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "12px 20px"
---

# Design System: Help Yourself

## Overview

**Creative North Star: "Help Yourself"**

This document records the current implementation and inherited visual decisions, rather than a new identity proposal. Its visual authority is the supplied [homepage concept](design/source-assets/reference/homepage-approved-concept.png); exact implementation values come from [the stylesheet](docs/assets/styles.css).

The hot-dog mascot, supplied two-line PNG wordmark, custom Our Promise lettering, and mustard separators carry the identity. Warm ivory and charcoal give the colorful game icons room, with relish green reserved for prominent actions and selected supporting text. The layout is open, centered, and readable, with playful display type and plain body copy.

**Key Characteristics:**
- Supplied mascot and lettering assets.
- Warm ivory canvas, charcoal text, mustard separators, and relish actions.
- Circular game artwork and generous vertical spacing.
- Self-hosted Lato and Lilita One.
- Flat surfaces with visible keyboard focus.

## Colors

The frontmatter preserves the existing CSS palette; no additional shades are specified.

### Primary
- **Mustard:** The decorative header and footer separators use the supplied mustard-line SVG. The mustard token also colors the scrollbar.

### Secondary
- **Relish:** Filled action links, keyboard focus outlines, and text selection background.
- **Dark relish:** Action hover background and the games page's availability messages.

### Tertiary
- **Ketchup:** Existing brand palette token. The stylesheet defines it but does not currently assign it to an interface selector; do not infer a new action or error role.

### Neutral
- **Paper:** The page canvas, interior header, button text, and selection text.
- **Ink:** Body copy, headings, navigation, and ordinary links.

## Typography

**Display Font:** Lilita One, with sans-serif fallback. **Body Font:** Lato, with sans-serif fallback. Both are self-hosted under `docs/assets/fonts`; Lato has regular and bold files, and Lilita One uses its regular file. Font synthesis is disabled.

The custom wordmark and Our Promise heading remain image assets, with accessible text in HTML. Lilita One supplies the rounded weight of ordinary headings. Lato supplies readable prose, navigation, and bold action labels; Eric's signoff is ordinary Lato text.

The frontmatter records the desktop roles. Interior page headings use the fluid display size; home game titles and prose subheadings use the title role. Game-detail headings are larger (36px). Introductory paragraphs use larger Lato (22px), while promise copy is fluid (`clamp(19px, 2.5vw, 24px)`, line-height 1.4). Home game summaries use 19px. Footer text is 15px.

At the narrow breakpoint, body type becomes 17px, navigation 15px, home game titles 29px, game-detail headings 32px, game summaries 17px, intro and promise paragraphs 20px, and footer text 14px. Navigation becomes 14px at the smallest breakpoint. Headings use balanced wrapping; paragraphs use pretty wrapping where supported.

## Layout

The shared site width is capped at 960px with desktop side gutters of 32px. Reading copy is capped at 680px. The header is fixed, 100px tall, with its inner navigation row 77px tall. Its compact wordmark is 94px wide. The home hero is centered with a width of `min(310px, 65vw)`, a 270px-tall mascot, and a 310px wordmark.

The homepage is a centered, single-column lineup. Each game uses circular artwork, a linked title, and a short summary, with 72px between previews. The current order is Arrow Strum, Bus Bash, Block Breaker, Timber Tumble. The promise block is capped at 800px and follows with the same generous vertical rhythm. The home composition is documented in [the homepage brief](design/homepage-brief.md); it is not a requirement to make every interior page a centered lineup.

Interior pages begin below the fixed header with 156px top padding. Game details use 230px artwork beside copy, a 48px gap, and an 800px maximum width. The about page uses a two-column layout with a 48px gap. Footer contents sit on one flex row beneath the mustard line.

At `max-width: 640px`, header and footer gutters become 16px, interior gutters become 20px, the compact brand becomes 70px wide, and the hero uses a 270px width with 100px top padding and a 245px mascot. Circular artwork becomes 220px. Game spacing becomes 60px; interior top padding becomes 132px. About and game-detail layouts stack into one column. Promise copy wraps naturally with desktop-only breaks hidden. At `max-width: 360px`, the compact brand becomes 60px and navigation gaps tighten again.

## Elevation & Depth

The interface uses no box shadows or elevated panels. The shared paper background, artwork silhouettes, spacing, and decorative separators provide separation. The home header starts transparent and receives the paper background when its compact brand appears; this is a flat background change.

## Shapes

Circular clipping defines game artwork through the game-art radius token and `object-fit: cover`. Prominent action links use the button radius token. Focus-visible links receive the smaller focus radius. There are no card borders or enclosing game tiles. Preserve the supplied irregular mustard-line artwork rather than replacing it with a generic straight border.

## Components

### Filled action link

A bold Lato anchor with paper text on relish, an inline right-arrow SVG, a 7px icon gap, and a minimum height of 48px. Padding and radius are in the frontmatter. Hover uses dark relish with a 180ms ease-out background-color transition. Keyboard focus uses the shared relish outline (3px, offset 6px) and focus radius. The same primitive appears on home and interior pages.

### Text links and navigation

Ordinary links inherit text color, remain underlined, and use a 0.22em underline offset; hover thickens the underline to 2px. Navigation uses a horizontal flex row, 26px gaps, 44px minimum link heights, and no default underline. Hover and `aria-current="page"` add an underline. Footer navigation has 30px gaps and smaller type. All anchors share the visible keyboard outline.

### Game preview

The artwork and title are one link, followed by a separate summary. The artwork is 230px square at desktop and 220px at the narrow breakpoint. Hover underlines the title at a 0.14em offset; keyboard focus outlines the whole link. The sidecar demonstrates the title-link portion without substituting invented artwork for the real game PNGs.

### Brand header and decorative separators

The supplied compact wordmark links home. On the homepage it is hidden from view, keyboard navigation, and assistive technology until the large hero has scrolled away. Its opacity transition is 180ms ease-out. Interior pages show it immediately. The mustard-line SVG repeats across 24px-tall header and footer separators; the home header initially leaves space for the hero.

### Skip link and motion

The skip link is fixed above the viewport until focused, then moves to the top-left above the header. It has a paper background and uses the shared link focus treatment. Smooth scrolling and state transitions are disabled for `prefers-reduced-motion: reduce`. No custom active-state animation is implemented.

## Do's and Don'ts

### Do:
- **Do** reuse the supplied mascot, wordmark, Our Promise lettering, and mustard-line assets.
- **Do** use self-hosted Lato for copy and Lilita One for ordinary headings.
- **Do** preserve circular game artwork, open spacing, and the shared paper canvas.
- **Do** retain visible keyboard focus, current-page navigation, and reduced-motion behavior.

### Don't:
- **Don't** replace custom lettering with a typed approximation.
- **Don't** introduce shadows, bordered game cards, or a fictional input library as existing patterns.
- **Don't** present the generated sample signature as authentic handwriting.
- **Don't** substitute the concept's illustrative game placeholders for the confirmed games' real icons.
