# Help Yourself build assets

- `brand/hot-dog-mascot.png`: transparent mascot, extracted from the original logo.
- `brand/help-yourself-wordmark.svg` and `.png`: custom HELP YOURSELF lettering, without Games.
- `brand/our-promise.svg` and `.png`: custom heading lettering traced from the approved mockup.
- `brand/signature-eric-sample.svg` and `.png`: generated sample signature; not Eric’s authentic handwriting.
- `brand/mustard-line.svg`, `brand/ketchup-line.svg`: scalable condiment separators. Mustard is the final choice for both header and footer.
- `characters/cherry-pie.png`: approved color pie with fully silver utensils, transparent background.
- `games/placeholders/`: circular concept previews extracted from the mockup. These are not screenshots of finished games. Source resolution is about 230 pixels; replace with actual game captures for launch.
- `reference/homepage-approved-concept.png`: final layout reference. Original logo with Games retained separately as historical source.

## Build notes
Use real text for game names, descriptions and promise copy. For custom Our Promise lettering, use an HTML h2 containing visually hidden 'Our Promise' text and an aria-hidden SVG/image. Give the home logo an accessible name 'Help Yourself'. Screenshots beside the same linked game title can use empty alt text to avoid repetition. Condiment lines are decorative. The small header brand should appear after the main mascot/wordmark scrolls away; respect reduced-motion preferences.

Palette: charcoal #232323, mustard #efb900, ketchup #e12620, relish #247327, warm ivory #fffdf5.

These are extracted raster assets and automatically traced lettering, not a hand-refined vector master. Preview at intended display sizes before shipping.
