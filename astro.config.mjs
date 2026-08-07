import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.fregram.com',
  output: 'static',
  publicDir: './static',
  integrations: [sitemap()],
  image: {
    service: passthroughImageService()
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
