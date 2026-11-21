# holdyourfire.in (GitHub Pages)

Static site for Hold Your Fire. Served by GitHub Pages from the root of the `main` branch.

| Path | What |
|---|---|
| `/` | landing page (`index.html`) |
| `/r/{ROOM_CODE}` | invitation page: GitHub Pages serves `404.html` for it, and `page.js` reads the code from the path |
| `/.well-known/assetlinks.json` | Android App Links association |
| `/.well-known/apple-app-site-association` | iOS Universal Links association (JSON, no extension) |
| `/support`, `/privacy`, `/app-ads.txt` | reserved: not created yet (an unknown path shows the "page does not exist" card) |

`site.js` is the only file to edit for store links (`PLAY_URL`, `APP_STORE_ID`). The invitation page never claims a room exists or is open: the game checks that when the player joins.

## Values still to fill in
- `.well-known/assetlinks.json`: DONE. Both fingerprints are filled in: the upload key (read from the release AAB) and the Google Play app-signing key (classical key, copied from Play Console -> App signing on 2026-11-21).
- `site.js`: `APP_STORE_ID` once the App Store listing exists; confirm `PLAY_URL` when the Play listing is public.
- `.well-known/apple-app-site-association`: the Team ID `6CPXZ9NP66` comes from the signed App Store archive; confirm it at developer.apple.com -> Membership.

## DNS at Hostinger (hPanel -> Domains -> holdyourfire.in -> DNS / Nameservers -> DNS records)
Remove any default parking A/AAAA/CNAME records for `@` and `www`, then add:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| AAAA | @ | 2606:50c0:8000::153 | 3600 |
| AAAA | @ | 2606:50c0:8001::153 | 3600 |
| AAAA | @ | 2606:50c0:8002::153 | 3600 |
| AAAA | @ | 2606:50c0:8003::153 | 3600 |
| CNAME | www | ronconapps.github.io | 3600 |

Do not add MX/TXT changes you do not need. `api.holdyourfire.in` is a later, separate step (the Room Service migration is not part of this site).

## GitHub Pages
The repo `ronconapps/holdyourfire-site` is public with Pages enabled from `main` / root and the `CNAME` file `holdyourfire.in`. After DNS resolves (minutes to a few hours): Settings -> Pages -> the custom domain shows a green check -> tick **Enforce HTTPS**. www redirects to the apex automatically. Optional hardening: verify the domain in the `ronconapps` account (Settings -> Pages -> Add a domain, a TXT record).

## Verify after DNS (do not call it live before this)
```
curl -sI https://holdyourfire.in/ | head -3
curl -s  https://holdyourfire.in/.well-known/assetlinks.json
curl -sI https://holdyourfire.in/.well-known/apple-app-site-association      # 200, no redirect (content type application/octet-stream is expected on GitHub Pages)
curl -sI https://holdyourfire.in/r/K7M2QX | head -1                           # HTTP/2 404 is normal: it is the 404.html fallback that renders the invitation
curl -sI https://www.holdyourfire.in/ | grep -i location                      # -> https://holdyourfire.in/
```
Apple reads the association file through its own CDN; a change can take hours to reach devices.
