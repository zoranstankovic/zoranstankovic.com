import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config/site';
import { getPosts } from '../lib/content';
import { postHref } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site ?? site.url,
    // Item links match the canonical URLs: no trailing slash (the package adds one by default).
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post.id),
      categories: [post.data.topic, ...post.data.tags],
    })),
  });
}
