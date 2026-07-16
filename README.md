# aherriot.github.io

Visit: http://www.aherriot.com

Portfolio web site for Andrew Herriot, built with [Eleventy](https://www.11ty.dev/).

Content lives in `src/content/{work,projects,volunteering,education}` as markdown with frontmatter. Templates are in `src/_includes`. Deploys to GitHub Pages automatically via `.github/workflows/deploy.yml` on push to `main`.

```
npm install
npm run serve   # local dev server with live reload
npm run build   # outputs to _site/
```
