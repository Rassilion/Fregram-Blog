---
title: The Blog Is Now Running on Astro
slug: astro-update-2026
date: 2026-08-07
tags: ['project', 'astro', 'blog', 'finished']
category: project
author: Rassilion
description: 'The long-promised blog update is complete: Gatsby and Travis are out, Astro and GitHub Actions are in.'
---

Another three years, another blog update—but this time the update is actually finished before the announcement.

## What changed?

The blog has moved from Gatsby 2 and the Chronoblog theme to [Astro](https://astro.build/). All existing Markdown posts, authors, tags, dates, and familiar post URLs were kept. The new site is still static, but the machinery around those static pages is much smaller.

The deployment pipeline changed too. Travis CI had stopped doing useful work, so deployments now run on GitHub Actions. A push to the `v2` branch installs the locked dependencies, builds the Astro site, and publishes the result to the `gh-pages` branch.

## What stayed?

- GitHub Pages and `blog.fregram.com`
- The existing Markdown archive
- RSS, project filtering, and post search
- The dark, minimal look
- The optimistic belief that updating the blog will cause me to write more often

## Why Astro?

This site is content first. Astro can turn the Markdown archive into static HTML without shipping a React application to every visitor. Content collections also give the frontmatter a schema, which means a malformed date or missing title is caught during the build instead of becoming a mysterious page later.

There is now less framework-specific code, fewer dependencies, and a deployment flow that lives beside the source code. That should make the next update less of an archaeological expedition.

The TerraMaster has changed since the last update too, but that belongs in the next update message. Some traditions have to survive a migration.
