import { describe, expect, it } from 'vitest';
import { canonicalPath, isActive } from './urls';

describe('canonicalPath', () => {
  it.each([
    ['/', '/'],
    ['/index.html', '/'],
    ['/now.html', '/now'],
    ['/blog.html', '/blog'],
    ['/blog/strings-in-go.html', '/blog/strings-in-go'],
    ['/now', '/now'],
    ['/now/', '/now'],
  ])('%s -> %s', (input, expected) => expect(canonicalPath(input)).toBe(expected));
});

describe('isActive', () => {
  it('matches the exact path', () => expect(isActive('/blog', '/blog')).toBe(true));
  it('matches children', () => expect(isActive('/blog', '/blog/strings-in-go')).toBe(true));
  it('ignores prefixes that are not path segments', () =>
    expect(isActive('/blog', '/blogroll')).toBe(false));
});
