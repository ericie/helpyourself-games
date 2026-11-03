# HelpYourself.games

The static website for **HelpYourself.games**, built from the supplied homepage
reference and brand assets. The lineup is Arrow Strum, Bus Bash, Block Breaker,
and Timber Tumble. Eric is an American living in Tokyo; Help Yourself is his
one-person studio. Site copy uses his approved I/me voice.

- Repository: https://github.com/ericie/helpyourself-games
- Website: https://helpyourself.games
- GitHub Pages address: https://ericie.github.io/helpyourself-games/ (redirects to the custom domain)
- Alternate hostname: https://www.helpyourself.games (redirects to the primary domain)
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
  index.html          Home: brand, game lineup, and My Promise
  games/index.html    Redirect to the homepage games section
  about/index.html    About Help Yourself
  support/index.html  Support information (payment link pending)
  privacy/index.html  Website privacy information
  404.html            Page-not-found response
  .nojekyll           Serve files directly without Jekyll processing
  assets/             Brand art, SVG headings, game icons, fonts, shared CSS/JS
design/               Sources, generated lettering sheets, trace tool, and brief
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

Games navigation and About’s Meet the games link target the homepage `#games`
section. It uses two left-aligned columns on desktop and one centered column at
640px and below. Game entries are static, with stable IDs and Coming Soon status.
The former `/games/` page redirects to `../#games`; its script preserves recognized
game fragments, with a meta refresh and direct link as fallbacks.

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

- Keep all four games marked **Coming Soon** in the homepage lineup until
  the App Store account is ready and real release URLs are supplied.
- Add the payment destination in `docs/support/index.html`; no provider or
  checkout is configured yet.
- Confirm the existing games' `support@helpyourself.games` inbox receives mail.
- Review the website copy and privacy information.
- Keep the configured domain records in [DOMAIN-SETUP.md](DOMAIN-SETUP.md).

## Asset sources

The supplied asset pack is retained across `docs/assets/` and
`design/source-assets/`. The original rectangle-only SVG lettering stays in the
source archive. The website serves the Help Yourself wordmark as real SVG paths traced from
the supplied PNG alpha channel. The earlier Our Promise tracing and its original
PNG remain preserved as historical sources; the visible heading is now My Promise. The sample signature and concept game previews
are retained as source material and are not displayed.

The Support page’s `docs/assets/characters/coin-bank.png` is a native-generated,
transparent RGBA illustration (1223×1286) of a smiling piggy bank depositing a gold
coin into its own slot. Its exact prompt is saved in
`design/generated/coin-bank-character.prompt.txt` and embedded in the PNG; the
asset manifest records its provenance. About continues to use the supplied
cherry-pie illustration, displayed a little larger. Both illustrations accompany
left-aligned text and stack with it on narrow screens.

The four game icons come from the existing Help Yourself game workspace. Source
details are recorded in [design/asset-sources.json](design/asset-sources.json).
Lato supplies body copy and Lilita One supplies live H2/H3 text. Both are
self-hosted, with their SIL Open Font Licenses in `docs/assets/fonts/`.

Visible H1s use path artwork rather than a live font. The current My Promise H2
and Thanks for playing. H1, plus the retained Games artwork, come from
`design/generated/solo-studio-lettering-sheet.png` and its adjacent `.prompt.txt`
file. Their traced assets are `docs/assets/headings/games.svg` (883×264),
`my-promise.svg` (1339×289), and `thanks-for-playing.svg` (1487×222).
About, Privacy, and Page not found retain lettering generated in
`design/generated/heading-lettering-sheet.png`. The unused Games H1 and older Our games, Our Promise,
and Help us keep playing. lettering remain as historical source material.
The 404 page includes its paths inline so it remains self-contained. The home H1
and compact header use the traced supplied wordmark. None of these lettering SVGs
embeds a bitmap or uses an SVG text element.

## Accessible heading markup

Keep the heading's exact words in a real HTML span and hide only that span
visually. Hide the decorative artwork from assistive technology to avoid reading
the heading twice. For example, on a nested page using the shared stylesheet:

```html
<h1 class="lettered-heading">
  <span class="visually-hidden">Thanks for playing.</span>
  <img class="heading-art" src="../assets/headings/thanks-for-playing.svg"
       alt="" aria-hidden="true" width="1487" height="222">
</h1>
```

The existing `.heading-art` rule uses `height: clamp(42px, 5vw, 60px)`, `width: auto`,
`max-width: 100%`, and `object-fit: contain`. Its proportions remain intact on
narrow screens. The H1's Lato styling applies only to hidden/fallback text.
For inline SVG, keep the real HTML span and use `aria-hidden="true"` and
`focusable="false"` on the artwork, as the 404 page does. The home wordmark and
My Promise H2 use the same hidden-text/decorative-image accessibility pattern.

## Optional lettering regeneration

Serving or publishing the site needs no build step or Python packages. Only
regenerating design assets requires `vtracer==0.6.12`, Pillow, and NumPy. From the
repository root, an optional local environment can run the checked-in trace tool:

```sh
python3 -m venv .venv-lettering
.venv-lettering/bin/python -m pip install vtracer==0.6.12 pillow numpy
.venv-lettering/bin/python design/trace-lettering.py
```

The script reads both generated lettering sheets and the original brand PNG alpha
channels, then writes eight heading SVGs and the two brand SVGs, including retained
historical lettering. It traces
monochrome paths and checks for unexpected empty/rectangle results, embedded
images, and SVG text. If Page not found artwork changes, also synchronize the
inline SVG in `docs/404.html`; the script does not update HTML. Review regenerated
artwork at desktop and mobile sizes before publishing. Keep the optional Python
environment out of version control.

The small home-page header logo is a progressive enhancement: it becomes visible
when the large brand leaves the viewport. Navigation and content work without
JavaScript. Reduced-motion preferences disable smooth scrolling and transitions.
