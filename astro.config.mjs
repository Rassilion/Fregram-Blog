import { defineConfig, passthroughImageService } from 'astro/config';

export default defineConfig({
  site: 'https://blog.fregram.com',
  output: 'static',
  publicDir: './static',
  image: {
    service: passthroughImageService()
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
