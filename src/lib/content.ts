import { getCollection, type CollectionEntry } from 'astro:content';
import { publishedNewestFirst } from './posts';

export async function getPosts(): Promise<CollectionEntry<'blog'>[]> {
  return publishedNewestFirst(await getCollection('blog'));
}
