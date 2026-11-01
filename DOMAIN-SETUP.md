# Connect HelpYourself.games

The initial site uses https://ericie.github.io/helpyourself-games/. The custom domain
is intentionally pending so that the preview remains accessible while DNS is set up.

At setup on November 1, 2026, DNS pointed to Namecheap parking:

- Apex A record: `162.255.119.230`
- `www` CNAME: `parkingpage.namecheap.com.`
- Nameservers: `dns1.registrar-servers.com` and `dns2.registrar-servers.com`

## Connect the domain when ready

1. In your GitHub account's **Settings → Pages**, verify ownership of
   `helpyourself.games` using GitHub's provided TXT record.
2. In this repository's **Settings → Pages**, save `helpyourself.games` as the
   custom domain **before** changing the routing records below. GitHub creates
   `docs/CNAME`; pull that commit locally with `git pull --ff-only`.
3. In Namecheap's DNS settings, remove the parking/URL redirect record for `@`
   and the parking CNAME for `www`. Replace them with:

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | ericie.github.io |

   Keep any existing email, verification, or other unrelated DNS records.
4. Wait for GitHub's DNS check and TLS certificate to complete, then enable
   **Enforce HTTPS** in the repository's Pages settings.
5. Confirm `https://helpyourself.games` and `https://www.helpyourself.games` both
   reach the site. GitHub redirects `www` to the configured apex domain.

DNS changes can take up to 24 hours. Recheck the current GitHub documentation
before changing records:

- [Manage a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verify a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
