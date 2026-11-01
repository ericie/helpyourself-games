# HelpYourself.games

The static website for **HelpYourself.games**, built from the supplied homepage
reference and brand assets. The lineup is Arrow Strum, Bus Bash, Block Breaker,
and Timber Tumble.

- Repository: https://github.com/ericie/helpyourself-games
- Initial website: https://ericie.github.io/helpyourself-games/
- Intended domain: https://helpyourself.games (DNS connection pending)
- Hosting: GitHub Pages, published from `main` → `/docs`
- Stack: plain HTML and CSS; no dependencies, CMS, or build step

## Work locally

From this repository's root:

```sh
python3 -m http.server 8000 --directory docs
```

Open http://localhost:8000. Stop the server with `Ctrl+C`.

## Files

```text
docs/                 Public website (GitHub Pages requires this folder name)
  index.html          Home: brand, game lineup, and Our Promise
  games/index.html    Game descriptions and availability
  about/index.html    About Help Yourself
  support/index.html  Support information (payment link pending)
  privacy/index.html  Website privacy information
  404.html            Page-not-found response
  .nojekyll           Serve files directly without Jekyll processing
  assets/             Brand art, SVG headings, game icons, fonts, shared CSS/JS
design/               Sources, generated lettering sheet, trace tool, and brief
PRODUCT.md            Product facts and pending launch decisions
DESIGN.md             Visual system and implementation guidance
DOMAIN-SETUP.md        Custom-domain instructions
```

Only `docs/` is deployed as the website. Everything in this repository is public;
do not commit credentials or other sensitive information.

## Add pages

Add a directory with its own `index.html`, such as `docs/about/index.html` for
`/about/`. Use relative links so the website works on both the GitHub project URL
and the future custom domain. From a nested page, load shared styles with
`../assets/styles.css` and link home with `../`.

## Publish changes

```sh
git add docs
git commit -m "Update website"
git push origin main
```

GitHub automatically publishes changes to `docs/`. Deployment progress appears
under the repository's **Actions** tab. Hosting settings are under
[Settings → Pages](https://github.com/ericie/helpyourself-games/settings/pages).

## Before launch

- Keep all four games marked **Coming Soon** on the home and games pages until
  the App Store account is ready and real release URLs are supplied.
- Add the payment destination in `docs/support/index.html`; no provider or
  checkout is configured yet.
- Confirm the existing games' `support@helpyourself.games` inbox receives mail.
- Review the website copy and privacy information.
- Connect `HelpYourself.games` using [DOMAIN-SETUP.md](DOMAIN-SETUP.md).

## Asset sources

The supplied asset pack is retained across `docs/assets/` and
`design/source-assets/`. The original rectangle-only SVG lettering stays in the
source archive. The website now serves real SVG paths traced from the alpha
channels of the supplied Help Yourself wordmark and Our Promise PNGs; the original
PNGs remain preserved as sources. The sample signature and concept game previews
are retained as source material and are not displayed.

The four game icons come from the existing Help Yourself game workspace. Source
details are recorded in [design/asset-sources.json](design/asset-sources.json).
Lato supplies body copy and Lilita One supplies live H2/H3 text. Both are
self-hosted, with their SIL Open Font Licenses in `docs/assets/fonts/`.

Visible H1s use path artwork rather than a live font. The four interior headings
and Page not found lettering were generated in
`design/generated/heading-lettering-sheet.png`, then traced into
`docs/assets/headings/*.svg`. The 404 page includes its paths inline so it remains
self-contained. The home H1 and compact header use the traced supplied wordmark.
None of these lettering SVGs embeds a bitmap or uses an SVG text element.

## Accessible heading markup

Keep the heading's exact words in a real HTML span and hide only that span
visually. Hide the decorative artwork from assistive technology to avoid reading
the heading twice. For example, on a nested page using the shared stylesheet:

```html
<h1 class="lettered-heading">
  <span class="visually-hidden">Our games</span>
  <img class="heading-art" src="../assets/headings/our-games.svg"
       alt="" aria-hidden="true" width="720" height="176">
</h1>
```

The existing `.heading-art` rule uses `height: clamp(42px, 5vw, 60px)`, `width: auto`,
`max-width: 100%`, and `object-fit: contain`. Its proportions remain intact on
narrow screens. The H1's Lato styling applies only to hidden/fallback text.
For inline SVG, keep the real HTML span and use `aria-hidden="true"` and
`focusable="false"` on the artwork, as the 404 page does. The home wordmark and
Our Promise H2 use the same hidden-text/decorative-image accessibility pattern.

## Optional lettering regeneration

Serving or publishing the site needs no build step or Python packages. Only
regenerating design assets requires `vtracer==0.6.12`, Pillow, and NumPy. From the
repository root, an optional local environment can run the checked-in trace tool:

```sh
python3 -m venv .venv-lettering
.venv-lettering/bin/python -m pip install vtracer==0.6.12 pillow numpy
.venv-lettering/bin/python design/trace-lettering.py
```

The script reads the generated heading sheet and the original brand PNG alpha
channels, then writes five heading SVGs and the two brand SVGs. It traces
monochrome paths and checks for unexpected empty/rectangle results, embedded
images, and SVG text. If Page not found artwork changes, also synchronize the
inline SVG in `docs/404.html`; the script does not update HTML. Review regenerated
artwork at desktop and mobile sizes before publishing. Keep the optional Python
environment out of version control.

The small home-page header logo is a progressive enhancement: it becomes visible
when the large brand leaves the viewport. Navigation and content work without
JavaScript. Reduced-motion preferences disable smooth scrolling and transitions.
