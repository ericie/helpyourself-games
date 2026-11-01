# Homepage implementation brief

Mode: Persuade. Existing visual authority: the homepage reference supplied by the user in the asset pack.

Preserve the centered hot-dog mascot and two-line wordmark, single-column game previews with generous space, custom Our Promise lettering, green support action, and mustard header/footer lines.
The user subsequently requested edge-to-edge mustard separators with smooth joins. Both rules span the viewport in one continuous background; the SVG tile endpoints share their height and tangent. The mascot sits above the header rule.

Apply the user's updated four-game lineup in this order: Arrow Strum, Bus Bash, Block Breaker, Timber Tumble. Use their existing real icons rather than the three unrelated concept previews. Icons are rounded into the reference's circular preview shape.

Use real HTML for titles, descriptions, and promise copy. Following the user's explicit lettering revision, visible H1s use SVG path artwork while their actual words remain in visually hidden HTML. The home H1 and compact header use the wordmark traced from the supplied PNG alpha channel; Our Promise uses the same tracing method and its hidden-text H2. Four interior H1s and the inline 404 H1 use generated lettering from `design/generated/heading-lettering-sheet.png`, traced into true SVG paths. No visible H1 uses a live font, embedded bitmap, or SVG text. Interior heading artwork keeps `height: clamp(42px, 5vw, 60px)`, automatic width, a 100% maximum width, and `object-fit: contain`. Decorative artwork is hidden from assistive technology, and image elements have empty alt text. H2/H3 live text remains Lilita One; body copy remains Lato. Small header brand appears after the main hero scrolls away, with reduced-motion support. On narrow screens, keep navigation readable and let text wrap naturally.

The signature in the pack is explicitly a generated sample. Display the name Eric as ordinary text; do not impersonate handwriting.

All four games display **Coming Soon** on the home and games pages until the user has set up the App Store account and supplies release links. Missing store and support links must remain honest pending states. Game title links open an actual games page with descriptions. Support opens a local page explaining the tip jar is pending.
