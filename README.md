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
4. Commit and push — Cloudflare Pages / GitHub Pages redeploy automatically.

```bash
git add cases.json
git commit -m "cases: update revenue snapshots"
git push
```

Dynamic features (CMS, API, comments) can wait until traffic justifies them.

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

## Disclaimer

Figures are mostly self-reported or press-cited and may be outdated. Always click through to `source_url` before citing a number.
