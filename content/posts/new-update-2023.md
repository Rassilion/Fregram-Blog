---
title: Triennial update time!
slug: Triennial update time
date: 2023-12-10
tags: ['project', 'teaser' ]
category: random 
author: Rassilion 
description: 'The 2023 plan, clarified: modernize the blog, move CI to GitHub Actions, and leave the homeserver story for another post.'
---
No, this still is not the long-awaited homeserver update. By this point I was already on the third—or possibly fourth—iteration of the setup, then with a TerraMaster NAS. The TerraMaster has changed since then too, but that story can wait for the next traditional update message.

The actual plan for the blog had two concrete parts:

1. Replace the aging Gatsby 2 setup with a smaller static-site stack. I considered Gatsby 5, [Nextra](https://nextra.site/), and [Astro](https://astro.build/). Astro eventually won because this blog is mostly Markdown and does not need a client-side React application.
2. Replace the broken Travis deployment with GitHub Actions, while keeping GitHub Pages and the existing domain.

So the mystery options in the original version of this post now have an answer: **Astro for the site, GitHub Actions for deployment, and whatever replaced the TerraMaster saved for the next update.**
