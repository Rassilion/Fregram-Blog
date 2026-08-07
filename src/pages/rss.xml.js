import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { postUrl, sortPosts } from '../lib/posts';

export async function GET(context) {
  const posts = sortPosts(await getCollection('posts'));
  return rss({
    title: 'Fregram Blog',
    description: 'Fregram Blog, unmotivated authors and unfinished projects ...',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: post.data.tags,
      author: post.data.author
    }))
  });
}
