# [Fregram Blog](https://blog.fregram.com/)

[![Deploy](https://github.com/Rassilion/Fregram-Blog/actions/workflows/deploy.yml/badge.svg?branch=v2)](https://github.com/Rassilion/Fregram-Blog/actions/workflows/deploy.yml)

A static Markdown blog built with Astro and deployed to GitHub Pages.

## Development

```sh
npm ci
npm run dev
```

Run `npm run build` to create the production site in `dist/`. Posts live in
`content/posts`; their frontmatter is validated by the Astro content collection
schema in `src/content.config.ts`.

Run `npm run check` before committing to validate Astro templates and TypeScript.
The deployment workflow performs a full static build before publishing.

The site includes tag archives, RSS, a generated sitemap, per-post social images,
structured metadata, a web app manifest, and an analytics consent preference.
