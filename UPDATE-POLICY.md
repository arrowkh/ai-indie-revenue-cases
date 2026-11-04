# cases.json update policy (user 2026-11-04)

Daily / refresh jobs must **ADD or UPDATE** rows. Do **not** replace the whole catalog or drop entries solely for staleness.

- Match on stable `id` (fallback: name).
- Same product: prefer newer `as_of` and richer evidence/revenue fields.
- Unique older cases stay in the file even if no 2026 disclosure.
- Sort default for the file: revenue magnitude desc (matches site default), then as_of, then name.
- Sitemap `lastmod` bump when content changes.

Merged 2026-11-04 after user feedback "不用替换，新增就可以了": 20 old + 23 new → 30 unique (7 restored, 10 new-only, 13 overlaps kept fresher).
