# HelpYourself.games

The static website for **HelpYourself.games**. Initial setup includes a temporary
holding page; the existing rough design and final content are still to be supplied.

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
  index.html          Temporary home page
  404.html            Page-not-found response
  .nojekyll           Serve files directly without Jekyll processing
  assets/styles.css   Shared styles
DOMAIN-SETUP.md        Custom-domain instructions
```

Keep drafts and private files outside `docs/`. Everything in this repository is
public; do not commit credentials or other sensitive information.

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

## Next work

- Bring in the existing rough design and brand assets.
- Confirm the page list and copy, then build the website.
- Connect `HelpYourself.games` using [DOMAIN-SETUP.md](DOMAIN-SETUP.md).
