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
  assets/             Brand art, game icons, licensed fonts, shared CSS/JS
design/               Supplied reference, original assets, and homepage brief
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

- Add the real App Store URLs in `docs/games/index.html`; the current links are
  deliberately marked as coming soon.
- Add the payment destination in `docs/support/index.html`; no provider or
  checkout is configured yet.
- Confirm the existing games' `support@helpyourself.games` inbox receives mail.
- Review the website copy and privacy information.
- Connect `HelpYourself.games` using [DOMAIN-SETUP.md](DOMAIN-SETUP.md).

## Asset sources

The supplied asset pack is retained across `docs/assets/` and
`design/source-assets/`. Broken rectangle-only SVG lettering stays in the source
archive; the working transparent PNG lettering is used by the website.
The sample signature and concept game previews are retained as source material
and are not displayed.

The four game icons come from the existing Help Yourself game workspace. Source
details are recorded in [design/asset-sources.json](design/asset-sources.json).
The body font is Lato; game titles and page headings use Lilita One. Both are
self-hosted, with their SIL Open Font Licenses in `docs/assets/fonts/`.

The small home-page header logo is a progressive enhancement: it becomes visible
when the large brand leaves the viewport. Navigation and content work without
JavaScript. Reduced-motion preferences disable smooth scrolling and transitions.
