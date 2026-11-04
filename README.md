# AI Indie Revenue Cases

Minimal static share site for curated AI indie / startup revenue cases: idea, revenue, category, stage, and source links.

**Stack:** plain `index.html` + `styles.css` + `app.js` + `cases.json`. No backend. No build step.

## Local preview

From this folder:

```bash
cd /workspace/ai-success-cases   # or wherever you cloned it
python3 -m http.server 8080
```

Open http://127.0.0.1:8080

> `cases.json` is loaded via `fetch`, so open through a local server — not `file://`.

## Daily update workflow

Static-first: keep the page clean; update data by editing files.

1. Edit `cases.json` — add/adjust a case (keep the schema keys below).
2. Optionally tweak copy in `index.html` if filters/labels change.
3. Preview locally (`python3 -m http.server 8080`).
4. Publish the change (see **How daily updates reach Cloudflare** below).

```bash
git add cases.json
git commit -m "cases: update revenue snapshots"
git push
```

Dynamic features (CMS, API, comments) can wait until traffic justifies them.

### How daily updates reach Cloudflare (no account password needed)

You do **not** need to share your Cloudflare login password with the bot.

**Preferred — Git → Cloudflare Pages auto-deploy**

1. Put this site in a **GitHub or GitLab** repo.
2. In Cloudflare Pages, connect that repo once (you do this in the dashboard).
3. After that, every `git push` rebuilds/publishes the site.
4. Daily routine on the bot side: edit `cases.json` (and SEO files if needed) on the box → `git push` using a **GitHub/GitLab token or connector** (not a Cloudflare password).
5. Fallback if git is not wired yet: bot packs an updated `ai-success-cases.tar.gz` → you download and **Direct Upload** / replace files in Pages, or pull + push yourself.

**Optional later — Cloudflare API token**

A scoped Pages **API token** in the vault can deploy without the dashboard. Not required now. Never put a Cloudflare password in repo files or README.

**Also never required:** Cloudflare account password in chat, vault-as-password-for-login, or sharing session cookies.

## User submissions (static)

The page has a **Submit a case** modal. Submissions are **not** auto-published.

1. Users fill the form → **Copy as JSON** (primary) and share with you.
2. Mailto is configured to `jinxingle1983@gmail.com` via `OWNER_EMAIL` in `app.js`.
3. Optional: set `FORMSPREE_ID` in `app.js` to POST to Formspree.

Paste reviewed JSON into `cases.json`, then redeploy.


## Case schema

Exact keys per object in `cases.json`:

| Key | Notes |
| --- | --- |
| `id` | slug |
| `name` | product name |
| `one_liner` | idea |
| `revenue` | number or `null` |
| `revenue_unit` | `MRR` \| `ARR` \| `last_30d` \| `exit` |
| `revenue_range` | optional string when messy |
| `category` | `image-video` \| `writing-research` \| `chatbots` \| `marketing-seo` \| `agents` \| `devtools` \| `productivity` \| `vertical` |
| `stage` | `mvp` \| `early` \| `growing` \| `breakout` \| `scaled` \| `exited` \| `declining` |
| `team_size` | `solo` \| `2-5` \| `vc` |
| `source_url` | citation |
| `as_of` | `YYYY-MM` |
| `evidence` | `self_reported` \| `screenshot` \| `stripe_verified` \| `press` |
| `founder` | optional |
| `notes` | optional short |
| `one_liner_zh` | optional Chinese one-liner (shown when UI lang=zh) |
| `notes_zh` | optional Chinese notes (shown when UI lang=zh) |

## Deploy: Cloudflare Pages

1. Push this folder to a GitHub/GitLab repo (repo root = this site, or set root to `ai-success-cases`).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or `ai-success-cases` if the site is a subfolder)
4. Save and deploy. Each push updates the site.

Custom domain: Pages → your project → **Custom domains**.

After the first deploy, set SEO placeholders to your live origin:

- `index.html`: replace relative `canonical` / `og:url` with `https://YOUR_DOMAIN/`
- `sitemap.xml`: replace `BASE_URL` with `https://YOUR_DOMAIN` (no trailing slash on BASE_URL if paths already start with `/`)
- `robots.txt`: set `Sitemap: https://YOUR_DOMAIN/sitemap.xml`

No Cloudflare password is needed for the bot to help with daily content updates (see above).

## Deploy: GitHub Pages

### Option A — repo root

1. Put these files at the repo root.
2. Settings → **Pages** → Source: **Deploy from a branch**.
3. Branch: `main` (or `gh-pages`), folder: `/ (root)`.
4. Visit `https://<user>.github.io/<repo>/`.

### Option B — `/docs`

1. Copy this folder’s contents into `/docs` on `main`.
2. Pages → folder: `/docs`.

### Option C — GitHub Actions (optional)

Use the official “static HTML” Pages workflow; no build required — upload this directory as the artifact.

## SEO files

| File | Role |
| --- | --- |
| `index.html` `<head>` | title, description, robots index/follow, Open Graph, Twitter card, canonical placeholder, JSON-LD WebSite + ItemList |
| `robots.txt` | `Allow: /` + Sitemap hint |
| `sitemap.xml` | lists `/` and `index.html` — replace `BASE_URL` after deploy |

Keep descriptions factual; JSON-LD has **no** fake ratings or AggregateRating.

## Disclaimer

Figures are mostly self-reported or press-cited and may be outdated. Always click through to `source_url` before citing a number.
