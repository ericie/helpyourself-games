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
    fontFamily: "Lato, sans-serif"
    fontSize: "clamp(38px, 5vw, 60px)"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: '"Lilita One", sans-serif'
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.1
  page-lead:
    fontFamily: "Lato, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.45
  privacy-heading:
    fontFamily: "Lato, sans-serif"
    fontSize: "20px"
    fontWeight: 700
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
  text-action:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
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

The hot-dog mascot, supplied two-line wordmark and Our Promise lettering preserved as traced SVG paths, generated page-heading path artwork, and mustard separators carry the identity. Warm ivory and charcoal give the colorful game icons room, with relish green reserved for prominent actions and selected supporting text. The layout is open, centered, and readable, with playful display type and plain body copy. Interior pages follow the user-approved preference for simple, clean layouts and pithy messaging: brief centered stories, a compact games gallery, and a plain privacy reading column.

**Key Characteristics:**
- Supplied mascot and lettering, with custom SVG path artwork for visible H1s.
- Warm ivory canvas, charcoal text, mustard separators, and relish actions.
- Circular game artwork, generous homepage spacing, and concise interior pages.
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

**Visible H1 lettering:** SVG path artwork. The user explicitly rejected a live font for page H1s. **Game H2/H3 Font:** Lilita One, with sans-serif fallback. **Privacy H2 Font:** bold Lato. **Body Font:** Lato, with sans-serif fallback. Both fonts are self-hosted under `docs/assets/fonts`; Lato has regular and bold files, and Lilita One uses its regular file. Font synthesis is disabled in the shared stylesheet.

All visible H1s use actual SVG paths, with no embedded bitmap or SVG text. The home wordmark, compact header wordmark, and Our Promise artwork are traced from the alpha channels of the original supplied PNGs, preserving their lettering. Four interior H1s use artwork generated in `design/generated/heading-lettering-sheet.png` and traced into `docs/assets/headings/`: Our games, A little more play., Help us keep playing., and Your time is for playing. The standalone 404 heading uses the generated Page not found. artwork as inline paths. Sources and tracing provenance are recorded in [the asset manifest](design/asset-sources.json).

Each H1 keeps its actual words in a visually hidden HTML span. Decorative artwork is `aria-hidden="true"`; external images also use empty alt text. The interior H1's Lato font and fluid font-size in the frontmatter's display role apply to hidden/fallback text, not the visible lettering. Its line-height is 1. The artwork has height `clamp(42px, 5vw, 60px)`, automatic width, maximum width 100%, `object-fit: contain`, and centered inline margins. The independent 404 uses the same height clamp and width limit for its inline SVG, with system-ui for its surrounding text.

The other frontmatter roles describe live text. Home game titles and the desktop games gallery use the title role. About and Support leads use the page-lead role, with short text and a 1.45 line-height. Privacy subheadings use the privacy-heading role: bold Lato at 20px, retaining the shared heading line-height of 1.1. This quieter reading hierarchy is deliberate; do not apply Lilita One to the privacy subheadings.

Homepage typography stays unchanged: promise copy is fluid (`clamp(19px, 2.5vw, 24px)`, line-height 1.4), game summaries use 19px, Eric's signoff is ordinary Lato at 20px, and footer text is 15px. The interior gallery uses 17px single-sentence descriptions with a maximum measure of 28ch; desktop descriptions reserve a minimum height of 3em to align the status rows. About's three-line promise uses 20px Lato with line-height 1.6. Coming Soon is bold dark-relish text at 16px.

At the narrow breakpoint, body type becomes 17px, navigation 15px, home game titles 29px, home game summaries 17px, homepage promise copy 20px, and footer text 14px. Interior leads become 20px, the three-line promise 18px, gallery titles 26px, gallery descriptions 16px, and gallery status 14px. Gallery descriptions no longer reserve a minimum height. Navigation becomes 14px at the smallest breakpoint. Live headings use balanced wrapping; paragraphs use pretty wrapping where supported.

## Layout

The shared site width is capped at 960px with desktop side gutters of 32px. The page-intro container is capped at the existing 680px copy-width token. The header is fixed, 100px tall, with its inner navigation row 77px tall. Its compact wordmark is 94px wide. The home hero is centered with a width of `min(310px, 65vw)`, a 270px-tall mascot, and a 310px wordmark.

The homepage is a centered, single-column lineup. Each game uses circular artwork, a linked title, and a short summary, with 72px between previews. The current order is Arrow Strum, Bus Bash, Block Breaker, Timber Tumble. The promise block is capped at 800px and follows with the same generous vertical rhythm. The home composition is documented in [the homepage brief](design/homepage-brief.md); its layout is preserved separately from the simpler interiors.

Interior pages use 164px top padding, 48px bottom padding, and minimum height `calc(100svh - 130px)`. Their lettered page introduction has no repeated subtitle and leaves a 40px gap before content. The footer directly follows the interior without the homepage's extra top margin. Both mustard separators still span the full viewport, while footer contents stay on one centered flex row within the site-width gutters beneath the line.

About and Support use a centered story column capped at 480px. About pairs a short two-line lead with a 200px-tall pie character, the promise in three lines, and one text action. The lead and character each have 28px below them; the promise has 20px below it. Support uses a short lead, a brief tip-jar pending message, and a Say hello email action. Its supporting paragraph has 24px below it. Privacy uses a left-aligned reading column capped at 600px, with 32px above subsequent H2s, 12px below them, and 20px between paragraphs. The first privacy H2 has no top margin.

The games page is a centered two-column gallery capped at 720px, with 48px row gaps and 64px column gaps. Each entry centers a 160px circular icon above a title, one short description, and Coming Soon status. Icons have 16px below them, titles 8px, and descriptions 12px. Entries remain flat on the paper canvas without enclosing panels.

At `max-width: 640px`, header and footer gutters become 16px, interior gutters become 20px, the compact brand becomes 70px wide, and the home hero uses a 270px width with 100px top padding and a 245px mascot. Home game artwork becomes 220px and preview spacing becomes 60px. Homepage promise copy wraps naturally with desktop-only breaks hidden. Interiors use 136px top and 40px bottom padding, with 32px after the page introduction. The pie becomes 180px tall. The games gallery becomes a single column capped at 420px with 32px between entries; each entry is a left-aligned row with a 96px icon and a flexible text column separated by 20px. At `max-width: 360px`, the compact brand becomes 60px and navigation gaps tighten again.

## Elevation & Depth

The interface uses no box shadows or elevated panels. The shared paper background, artwork silhouettes, spacing, and decorative separators provide separation. The home header starts transparent and receives the paper background when its compact brand appears; this is a flat background change.

## Shapes

Circular clipping defines game artwork through the game-art radius token and `object-fit: cover`. Prominent action links use the button radius token. Focus-visible links receive the smaller focus radius. There are no card borders or enclosing game tiles. Preserve the supplied irregular mustard-line artwork rather than replacing it with a generic straight border.

## Components

### Filled action link

A bold Lato anchor with paper text on relish, an inline right-arrow SVG, a 7px icon gap, and a minimum height of 48px. Padding and radius are in the frontmatter. Hover uses dark relish with a 180ms ease-out background-color transition. Keyboard focus uses the shared relish outline (3px, offset 6px) and focus radius. The filled support action remains on the homepage; the simplified interiors use the unfilled text action instead.

### Text action

About and Support use a bold, underlined ink-colored anchor with an inline right-arrow SVG. It has no fill or enclosing border, a minimum height of 44px, and an 8px icon gap. Type follows the shared bold action role, becoming 17px at the narrow breakpoint. It keeps the ordinary link's 0.22em underline offset, 2px underline on hover, and shared visible keyboard focus. About links to the games page; Support's Say hello action opens email.

### Text links and navigation

Ordinary links inherit text color, remain underlined, and use a 0.22em underline offset; hover thickens the underline to 2px. Navigation uses a horizontal flex row, 26px gaps, 44px minimum link heights, and no default underline. Hover and `aria-current="page"` add an underline. Footer navigation has 30px gaps and smaller type. All anchors share the visible keyboard outline.

### Game preview

The artwork and title are one link, followed by a separate summary. The artwork is 230px square at desktop and 220px at the narrow breakpoint. Hover underlines the title at a 0.14em offset; keyboard focus outlines the whole link. The sidecar demonstrates the title-link portion without substituting invented artwork for the real game PNGs. The interior gallery uses the smaller artwork and responsive row layout described under Layout; its entries are static articles with plain game headings rather than title links. Both home previews and gallery entries show **Coming Soon** for all four games until release links are supplied; this is bold dark-relish text, not a disabled purchase button.

### Lettered page heading

Use the traced page-specific SVG inside a semantic H1 alongside visually hidden real text. The artwork is decorative to assistive technology; it does not replace the accessible name. Keep its proportions and the shared height clamp described under Typography. The home H1 uses the traced supplied wordmark instead of the generated interior-heading sheet. Our Promise uses the same accessible image pattern in an H2. The README contains the developer markup example.

### Brand header and decorative separators

The compact wordmark uses the traced supplied SVG and links home. On the homepage it is hidden from view, keyboard navigation, and assistive technology until the large hero has scrolled away. Its opacity transition is 180ms ease-out. Interior pages show it immediately. The mustard-line SVG repeats across full-width, 24px-tall header and footer separators. Each separator uses one continuous background, with matching tile endpoint heights and tangents for smooth joins. The mascot sits above the header rule.

### Skip link and motion

The skip link is fixed above the viewport until focused, then moves to the top-left above the header. It has a paper background and uses the shared link focus treatment. Smooth scrolling and state transitions are disabled for `prefers-reduced-motion: reduce`. No custom active-state animation is implemented.

## Do's and Don'ts

### Do:
- **Do** reuse the supplied mascot, wordmark, Our Promise lettering, and mustard-line assets.
- **Do** use self-hosted Lato for copy and Privacy H2s, Lilita One for game headings, and SVG path artwork with real hidden HTML text for H1s.
- **Do** preserve circular game artwork, open spacing, and the shared paper canvas.
- **Do** keep interior messaging short, with one clear reading order and simple text actions.
- **Do** retain visible keyboard focus, current-page navigation, and reduced-motion behavior.

### Don't:
- **Don't** replace H1 or supplied custom lettering with a live font, embedded bitmap, or SVG text element.
- **Don't** introduce shadows, bordered game cards, or a fictional input library as existing patterns.
- **Don't** present the generated sample signature as authentic handwriting.
- **Don't** substitute the concept's illustrative game placeholders for the confirmed games' real icons.
