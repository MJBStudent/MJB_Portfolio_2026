# MJB Portfolio 2026 · Image Host

A tiny, static website to host images you can embed elsewhere. Drop files into `images/`, push to `main`, and the gallery lists them automatically using the GitHub API. Each card provides copy buttons for a direct URL and Markdown.

## Enable GitHub Pages
- Repo Settings → Pages → Build and deployment
- Source: "Deploy from a branch"
- Branch: `main` and folder `/ (root)`
- Save. After a minute, your site will be live at:
  - `https://MJBStudent.github.io/MJB_Portfolio_2026/`

## Add Images
- Put your files in the `images/` folder (any of: .png, .jpg, .jpeg, .gif, .webp, .svg, .avif)
- Commit and push:

```powershell
# From the repo root
git add images/* ; git commit -m "Add images" ; git push
```

## Embed URLs
- Direct URL pattern (recommended after Pages is enabled):
  - `https://MJBStudent.github.io/MJB_Portfolio_2026/images/<filename>`
- Markdown example:
  - `![alt text](https://MJBStudent.github.io/MJB_Portfolio_2026/images/example.png)`
- Raw (alternative):
  - `https://raw.githubusercontent.com/MJBStudent/MJB_Portfolio_2026/main/images/<filename>`

## Local Preview (optional)
Open `index.html` in a browser, or use a simple local server for nicer reloads.

```powershell
# If you have Python installed
python -m http.server 8080
# Then browse http://localhost:8080/
```

## Notes
- The gallery uses the GitHub REST API to list files in `images/`. The repository must be public for the API call to work without a token.
- You can override owner/repo/branch via URL, e.g.: `?owner=MJBStudent&repo=MJB_Portfolio_2026&branch=main`.