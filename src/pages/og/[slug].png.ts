import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { Resvg } from '@resvg/resvg-js';
import { formatDate, postSlug } from '../../lib/posts';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
})[character] ?? character);

function wrapTitle(title: string, max = 32) {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  for (const word of words) {
    const current = lines.at(-1) ?? '';
    if (!current || `${current} ${word}`.length > max) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 3);
}

export async function getStaticPaths() {
  const posts = (await getCollection('posts')).filter((post) => !post.data.draft);
  return posts.map((post) => ({ params: { slug: postSlug(post) }, props: { post } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const lines = wrapTitle(post.data.title);
  const title = lines.map((line, index) => `<text x="72" y="${245 + index * 78}" font-size="62" font-weight="700" fill="#eaeaea">${escapeXml(line)}</text>`).join('');
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0e0f17"/>
    <rect x="44" y="44" width="1112" height="542" rx="18" fill="#202426" stroke="#30363a"/>
    <text x="72" y="118" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#74b6d3">FREGRAM BLOG</text>
    <g font-family="Arial, sans-serif">${title}</g>
    <text x="72" y="540" font-family="Arial, sans-serif" font-size="26" fill="#9eabb3">${escapeXml(formatDate(post.data.date))} · ${escapeXml(post.data.author)}</text>
  </svg>`;
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
