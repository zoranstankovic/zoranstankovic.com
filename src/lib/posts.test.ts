import { describe, expect, it } from 'vitest';
import { adjacentPosts, postHref, publishedNewestFirst, toListEntry } from './posts';

const entry = (id: string, date: string, draft = false) => ({
  id,
  data: { date: new Date(date), draft, title: id, topic: 'Go' },
});

describe('publishedNewestFirst', () => {
  it('drops drafts and sorts newest first', () => {
    const result = publishedNewestFirst([
      entry('old', '2020-01-01'),
      entry('draft', '2023-01-01', true),
      entry('new', '2022-11-20'),
    ]);
    expect(result.map((e) => e.id)).toEqual(['new', 'old']);
  });

  it('breaks date ties by id so the order is stable', () => {
    const result = publishedNewestFirst([entry('b', '2022-01-01'), entry('a', '2022-01-01')]);
    expect(result.map((e) => e.id)).toEqual(['a', 'b']);
  });
});

describe('adjacentPosts', () => {
  const posts = [
    entry('newest', '2022-11-20'),
    entry('middle', '2022-11-12'),
    entry('oldest', '2022-10-29'),
  ];

  it('links the older post as previous and the newer as next', () => {
    const { previous, next } = adjacentPosts(posts, 'middle');
    expect(previous?.id).toBe('oldest');
    expect(next?.id).toBe('newest');
  });

  it('has no next for the newest post and no previous for the oldest', () => {
    expect(adjacentPosts(posts, 'newest').next).toBeUndefined();
    expect(adjacentPosts(posts, 'oldest').previous).toBeUndefined();
  });

  it('returns nothing for an unknown id', () =>
    expect(adjacentPosts(posts, 'missing')).toEqual({}));
});

describe('hrefs and list entries', () => {
  it('builds post URLs under /blog', () =>
    expect(postHref('strings-in-go')).toBe('/blog/strings-in-go'));
  it('maps a post to a list entry', () => {
    expect(toListEntry(entry('strings-in-go', '2022-11-20'))).toEqual({
      href: '/blog/strings-in-go',
      title: 'strings-in-go',
      date: new Date('2022-11-20'),
      topic: 'Go',
    });
  });
});
