# HelpYourself.games domain configuration

Configured on November 1, 2026.

- Primary domain: `helpyourself.games`
- Alternate domain: `www.helpyourself.games` (GitHub Pages redirects to the primary domain)
- Registrar/DNS provider: Namecheap BasicDNS
- Nameservers: `dns1.registrar-servers.com` and `dns2.registrar-servers.com`
- GitHub repository: `ericie/helpyourself-games`
- Pages publishing source: `main` → `/docs`
- Tracked domain declaration: `docs/CNAME`

## Website DNS records

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ericie.github.io |

The Namecheap parking CNAME and apex URL redirect were replaced by these records.
The existing Private Email setup and `privateemail._domainkey` DKIM TXT record
were preserved. MX records remain `mx1.privateemail.com` and
`mx2.privateemail.com`, both priority 10.

## HTTPS and verification

GitHub Pages provisions and renews the TLS certificate. The repository's
Settings → Pages shows certificate status and the Enforce HTTPS setting.
DNS changes must propagate before GitHub can complete certificate issuance.

Use these read-only checks when diagnosing the domain:

```sh
dig +short helpyourself.games A
dig +short www.helpyourself.games CNAME
dig +short helpyourself.games MX
gh api repos/ericie/helpyourself-games/pages
gh api repos/ericie/helpyourself-games/pages/health
```

Account-level domain verification is managed separately in GitHub's profile
Settings → Pages. If enabled, keep GitHub's challenge TXT record in Namecheap.

[GitHub custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
