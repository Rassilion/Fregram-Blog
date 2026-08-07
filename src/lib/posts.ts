import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function postSlug(post: Post) {
  const source = post.data.slug ?? post.id.replace(/\/index$/, '');
  return source
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function postUrl(post: Post) {
  return `/${postSlug(post)}/`;
}

export function tagSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function tagUrl(tag: string) {
  return `/tags/${tagSlug(tag)}/`;
}

export function readingTime(post: Post) {
  const words = (post.body ?? '').replace(/```[\s\S]*?```/g, ' ').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function relatedPosts(post: Post, posts: Post[], limit = 3) {
  return posts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({ candidate, score: candidate.data.tags.filter((tag) => post.data.tags.includes(tag)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.data.date.valueOf() - a.candidate.data.date.valueOf())
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function sortPosts(posts: Post[]) {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
