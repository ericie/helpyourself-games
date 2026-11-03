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
  game-preview:
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

The hot-dog mascot, supplied two-line wordmark preserved as traced SVG paths, generated My Promise and page-heading path artwork, and mustard separators carry the identity. Warm ivory and charcoal give the colorful game icons room, with relish green reserved for prominent actions and selected supporting text. The layout is open and readable, with playful display type and plain body copy. Copy speaks in Eric’s approved I/me voice for his one-person studio. About’s supplied pie character and Support’s generated coin-bank character accompany the short interior stories. The homepage keeps its centered brand and promise, with a two-column games gallery with centered icons and captions on desktop and a centered single-column lineup on mobile. Interior pages follow the user-approved preference for left-aligned headings and copy, simple layouts, and pithy messaging: brief stories and a plain privacy reading column. The homepage now supplies the single games destination.

**Key Characteristics:**
- Supplied mascot and lettering, with custom SVG path artwork for visible H1s.
- Warm ivory canvas, charcoal text, mustard separators, and relish actions.
- Circular game artwork, generous homepage spacing, and concise interior pages.
- Self-hosted Lato and Lilita One.
- Flat surfaces with visible keyboard focus.

## Colors

The frontmatter preserves the existing CSS palette; no additional shades are specified.

### Primary
- **Mustard:** The decorative header and footer separators use the supplied mustard-line SVG.

### Secondary
- **Relish:** Filled action links, keyboard focus outlines, and text selection background.
- **Dark relish:** Action hover background and the homepage’s availability messages.

### Tertiary
- **Ketchup:** The scrollbar thumb uses this brand color against the paper track.

### Neutral
- **Paper:** The page canvas, interior header, button text, and selection text.
- **Ink:** Body copy, headings, navigation, and ordinary links.

## Typography

**Visible H1 lettering:** SVG path artwork. The user explicitly rejected a live font for page H1s. **Game H2/H3 Font:** Lilita One, with sans-serif fallback. **Privacy H2 Font:** bold Lato. **Body Font:** Lato, with sans-serif fallback. Both fonts are self-hosted under `docs/assets/fonts`; Lato has regular and bold files, and Lilita One uses its regular file. Font synthesis is disabled in the shared stylesheet.

All visible H1s use actual SVG paths, with no embedded bitmap or SVG text. The home and compact header wordmarks are traced from the alpha channel of the original supplied PNG. The retained Games artwork (`docs/assets/headings/games.svg`, 883×264), current My Promise H2 (`docs/assets/headings/my-promise.svg`, 1339×289), and Thanks for playing. H1 (`docs/assets/headings/thanks-for-playing.svg`, 1487×222) come from `design/generated/solo-studio-lettering-sheet.png`, with its adjacent prompt file retained. About’s A little more play. and Privacy’s Your time is for playing. still use the earlier `design/generated/heading-lettering-sheet.png`; its Page not found. artwork remains inline on the standalone 404. The Games H1 is no longer displayed because /games/ redirects to the homepage. It joins the earlier Our games, Our Promise, and Help us keep playing. lettering as retained historical source material. Both sheets are traced by `design/trace-lettering.py`. Sources and provenance are recorded in [the asset manifest](design/asset-sources.json).

Each H1 keeps its actual words in a visually hidden HTML span. Decorative artwork is `aria-hidden="true"`; external images also use empty alt text. The interior H1's Lato font and fluid font-size in the frontmatter's display role apply to hidden/fallback text, not the visible lettering. Its line-height is 1. The artwork has height `clamp(42px, 5vw, 60px)`, automatic width, maximum width 100%, `object-fit: contain`, and `object-position: left center`, without automatic inline margins. The independent 404 uses the same height clamp and width limit for its inline SVG, with system-ui for its surrounding text.

The other frontmatter roles describe live text. Homepage game titles use the title role. About and Support leads use the page-lead role, with short text and a 1.45 line-height. Privacy subheadings use the privacy-heading role: bold Lato at 20px, retaining the shared heading line-height of 1.1. This quieter reading hierarchy is deliberate; do not apply Lilita One to the privacy subheadings.

Homepage promise copy remains fluid (`clamp(19px, 2.5vw, 24px)`, line-height 1.4), Eric's signoff remains ordinary Lato at 20px, and footer text is 15px. The homepage games gallery uses 17px descriptions with a maximum measure of 28ch; desktop descriptions reserve a minimum height of 3em to align the status rows. About's three-line promise uses 20px Lato with line-height 1.6. Coming Soon is bold dark-relish text at 16px.

At the narrow breakpoint, body type becomes 17px, navigation 15px, home game titles 29px, home game summaries 17px, homepage promise copy 20px, and footer text 14px. Interior leads become 20px and the three-line promise 18px. Homepage game status remains 16px; game descriptions no longer reserve a minimum height. Navigation becomes 14px at the smallest breakpoint. Live headings use balanced wrapping; paragraphs use pretty wrapping where supported.

## Layout

The shared site width is capped at 960px with desktop side gutters of 32px. Interior pages share a centered main canvas capped at 720px, with their page headings and content aligned to its left edge. The interior header is fixed and 100px tall, with its inner navigation row 77px tall. The homepage fixes its navigation strip and mustard rule separately, as described under Components. Its compact wordmark is 94px wide. The home hero is centered with a width of `min(310px, 65vw)`, a 310.5px-tall mascot, and a 310px wordmark. The mascot is 15% larger than its previous 270px height.

The homepage’s #games section is the single games destination. It starts 72px below the wordmark and uses a two-column gallery capped at 720px (`width: min(720px, calc(100% - 64px))`), with 48px row gaps and 64px column gaps. The order is Arrow Strum, Bus Bash, Block Breaker, Timber Tumble. Each static article is 260px wide, capped at 100%, and centered within its grid column. Its 160px circular icon is centered within the article using automatic inline margins; the title, existing pithy description, and Coming Soon status are centered beneath it. This keeps the pair of icons balanced around the hero’s center. Icons have 16px below them, titles 8px, and descriptions 12px. Entries remain flat on the paper canvas. The promise block stays centered, capped at 800px, and begins 72px after the lineup. See [the homepage brief](design/homepage-brief.md).

Games navigation and About’s Meet the games action target the homepage #games section. The former /games/ document is a static client redirect with a meta refresh and direct-link fallback. Its script preserves the games anchor and the four recognized game IDs; other fragments fall back to #games.

Interior pages use 164px top padding, 48px bottom padding, and minimum height `calc(100svh - 130px)`. Their lettered page introduction has no repeated subtitle and leaves a 40px gap before content. The footer directly follows the interior without the homepage's extra top margin. Both mustard separators still span the full viewport, while footer contents stay on one centered flex row within the site-width gutters beneath the line.

About and Support share a two-column grid across the interior canvas, with a flexible text column, a 240px art column, and a 48px column gap. About’s first-person introduction to Eric and his one-person studio, three-line promise, and text action occupy the left column. The enlarged pie is 260px tall. Support pairs the approved tip invitation, “Tip jar coming soon.”, and a Say hello email action with a 240px-tall coin-bank character. Both illustrations sit on the right, vertically centered and spanning grid rows 1 through 3 (`grid-row: 1 / 4`). The lead has 28px below it, About’s promise 20px, and Support’s supporting paragraph 24px. There is no payment destination yet. Privacy uses a reading column capped at 600px, sharing the main canvas's left edge rather than recentering the narrower column. It has 32px above subsequent H2s, 12px below them, and 20px between paragraphs. The first privacy H2 has no top margin.

At `max-width: 640px`, header and footer gutters become 16px, interior gutters become 20px, the compact brand becomes 70px wide, and the home hero uses a 270px width with 100px top padding and a 281.75px mascot, 15% larger than its previous 245px height. The homepage lineup starts 64px below the wordmark, becomes one centered column at `calc(100% - 48px)` width, and uses full-width articles with centered 220px artwork and 60px gaps. Homepage promise copy wraps naturally with desktop-only breaks hidden. Interiors use 136px top and 40px bottom padding, with 32px after the page introduction. About and Support stack into one column at the same left edge, with their illustrations returned to document order. The pie is 200px tall and the bank 180px tall, each with 28px below it. At `max-width: 360px`, the compact brand becomes 60px and navigation gaps tighten again.

## Elevation & Depth

The interface uses no box shadows or elevated panels. The shared paper background, artwork silhouettes, spacing, and decorative separators provide separation. The homepage’s fixed navigation strip and mustard rule have flat paper backgrounds; the transparent, zero-height header wrapper adds no elevated surface.

## Shapes

Circular clipping defines game artwork through the game-art radius token and `object-fit: cover`. Prominent action links use the button radius token. Focus-visible links receive the smaller focus radius. There are no card borders or enclosing game tiles. Preserve the supplied irregular mustard-line artwork rather than replacing it with a generic straight border.

## Components

### Filled action link

A bold Lato anchor with paper text on relish, an inline right-arrow SVG, a 7px icon gap, and a minimum height of 48px. Padding and radius are in the frontmatter. Hover uses dark relish with a 180ms ease-out background-color transition. Keyboard focus uses the shared relish outline (3px, offset 6px) and focus radius. The filled support action remains on the homepage; the simplified interiors use the unfilled text action instead.

### Text action

About and Support use a bold, underlined ink-colored anchor with an inline right-arrow SVG. It has no fill or enclosing border, a minimum height of 44px, and an 8px icon gap. Type follows the shared bold action role, becoming 17px at the narrow breakpoint. It keeps the ordinary link's 0.22em underline offset, 2px underline on hover, and shared visible keyboard focus. About links to the homepage #games section; Support's Say hello action opens email.

### Text links and navigation

Ordinary links inherit text color, remain underlined, and use a 0.22em underline offset; hover thickens the underline to 2px. Navigation labels are Games, About, and Support. Navigation uses a horizontal flex row, 26px gaps, 44px minimum link heights, and no default underline. Hover and `aria-current="page"` add an underline. Footer navigation has 30px gaps and smaller type. All anchors share the visible keyboard outline.

### Game preview

Each homepage game is a static article with a stable game ID and `aria-labelledby` referencing its H3. Artwork, title, description, and availability are informational; there is no game link, hover underline, or keyboard focus target. Artwork is 160px square on desktop and 220px at the narrow breakpoint. The sidecar demonstrates the text portion without substituting invented artwork for the real PNGs. All four entries show **Coming Soon** until release links are supplied; this is bold dark-relish text, not a disabled purchase button.

### Character illustrations

About retains the supplied cherry-pie PNG at the larger sizes described under Layout. Support uses `docs/assets/characters/coin-bank.png`, a native-generated transparent RGBA image (1223×1286). The friendly pink piggy bank uses one of its own black arms to place a gold coin in its own slot while holding more coins with the other. Its sparse face, black limbs, and outlined shapes follow the supplied character family. The exact generation prompt is retained in `design/generated/coin-bank-character.prompt.txt` and embedded in the PNG; provenance is recorded in the asset manifest. Support gives the image meaningful alt text: “A smiling piggy bank putting a gold coin into its own slot.” The illustration does not turn the pending tip jar into a payment action.

### Lettered page heading

Use the traced page-specific SVG inside a semantic H1 alongside visually hidden real text. The artwork is decorative to assistive technology; it does not replace the accessible name. Keep its proportions and the shared height clamp described under Typography. The home H1 uses the traced supplied wordmark instead of the generated interior-heading sheet. My Promise uses the same accessible image pattern in an H2. The README contains the developer markup example.

### Brand header and decorative separators

The compact wordmark uses the traced supplied SVG and links home. On the homepage, the header wrapper is static with zero height and no raised z-index; its paper-backed navigation strip and mustard rule are fixed separately. The rule sits at z-index 10, the large wordmark at 11, the navigation strip at 12, and the initial mascot at 13. This lets buffered title artwork pass above the wave and below readable navigation. The hero itself has no raised z-index. The hero observer measures the mustard rule’s bottom boundary (100px on desktop, 97px on mobile), subtracts it through a negative top rootMargin, and reveals the compact brand when the non-intersecting hero’s bottom reaches that boundary. The large wordmark is then hidden. A separate mascot observer hides the mascot at the same boundary before its feet or paper buffer can cover navigation. The compact brand’s opacity transition is 180ms ease-out; its hidden state is excluded from keyboard navigation and assistive technology. Interior pages retain their original fixed header and show the compact brand immediately. The mustard-line SVG still repeats across continuous full-width, 24px-tall header and footer separators, with matching tile endpoint heights and tangents.

The mascot and large wordmark share a crisp paper-colored buffer following each asset’s actual alpha silhouette. A zero-size brand-filter SVG definition, hidden from assistive technology and focus, dilates SourceAlpha by 14 CSS px, fills that silhouette with paper, and merges the original artwork above it through the brand-clearance filter. Both image elements apply that filter. Original artwork and the continuous full-width mustard background remain unchanged. The mascot’s bottom margin stays 22px so its buffer clears the wordmark.

### Skip link and motion

The skip link is fixed above the viewport until focused, then moves to the top-left above the header. It has a paper background and uses the shared link focus treatment. Smooth scrolling and state transitions are disabled for `prefers-reduced-motion: reduce`. No custom active-state animation is implemented.

## Do's and Don'ts

### Do:
- **Do** reuse the supplied mascot, wordmark, mustard-line assets, and current My Promise path lettering; retain earlier lettering as historical source material.
- **Do** use self-hosted Lato for copy and Privacy H2s, Lilita One for game headings, and SVG path artwork with real hidden HTML text for H1s.
- **Do** preserve circular game artwork, open spacing, and the shared paper canvas.
- **Do** keep interior messaging short, with headings and copy sharing a left edge, one clear reading order, and simple text actions.
- **Do** retain visible keyboard focus, current-page navigation, and reduced-motion behavior.

### Don't:
- **Don't** replace H1 or supplied custom lettering with a live font, embedded bitmap, or SVG text element.
- **Don't** introduce shadows, bordered game cards, or a fictional input library as existing patterns.
- **Don't** present the generated sample signature as authentic handwriting.
- **Don't** substitute the concept's illustrative game placeholders for the confirmed games' real icons.
