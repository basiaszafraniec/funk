# Portfolio Claude

Desktop OS–style portfolio built with React + Vite.

## Stack
- React 18 + Vite
- Plain CSS (design tokens in `css/`)
- Project data in `js/data/projectData.js`
- Deployed via `gh-pages` to GitHub Pages

## Git workflow
After any major change (new feature, significant UI update, bug fix, data update), **create a git commit and push to `origin main`**. Do not wait to be asked — commit proactively after meaningful work is done.

Commit message style: short imperative sentence, e.g. "add project filter", "fix window drag on mobile", "update project data".

To push: `git push origin main`

## Project structure
- `index.html` — entry point
- `src/` — React components
- `css/` — stylesheets and design tokens
- `js/data/projectData.js` — project entries (title, tags, description, links)
- `assets/` — images and static files
- `public/` — Vite public assets
