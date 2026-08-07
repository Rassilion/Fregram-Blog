import { getCollection } from 'astro:content';
import { postUrl, sortPosts } from '../lib/posts';

export async function GET({ site }) {
  const posts = sortPosts(await getCollection('posts'));
  const urls = ['/', '/projects/', ...posts.map(postUrl)];
  const body = urls
    .map((path) => `<url><loc>${new URL(path, site).href}</loc></url>`)
    .join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
