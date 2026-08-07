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
