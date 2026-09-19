import type { PostListEntry } from './types';

export interface DatedEntry {
  id: string;
  data: { date: Date; draft: boolean };
}

export function publishedNewestFirst<T extends DatedEntry>(entries: readonly T[]): T[] {
  return entries
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function adjacentPosts<T extends { id: string }>(
  newestFirst: readonly T[],
  id: string,
): { previous?: T; next?: T } {
  const index = newestFirst.findIndex((entry) => entry.id === id);
  if (index === -1) return {};
  return {
    previous: newestFirst[index + 1],
    next: index > 0 ? newestFirst[index - 1] : undefined,
  };
}

export function postHref(id: string): string {
  return `/blog/${id}`;
}

export function toListEntry(post: {
  id: string;
  data: { title: string; date: Date; topic: string };
}): PostListEntry {
  return {
    href: postHref(post.id),
    title: post.data.title,
    date: post.data.date,
    topic: post.data.topic,
  };
}
