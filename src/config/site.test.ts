import { describe, expect, it } from 'vitest';
import { navItems, visibleNavItems } from './site';

describe('visibleNavItems', () => {
  it('shows only unflagged items when every feature is off', () => {
    expect(visibleNavItems().map((item) => item.label)).toEqual(['Writing', 'Now', 'Uses', 'CV']);
  });

  it('includes a flagged item in its original position when its feature is on', () => {
    const labels = visibleNavItems(navItems, { projects: true, books: false, videos: false }).map(
      (item) => item.label,
    );
    expect(labels).toEqual(['Writing', 'Projects', 'Now', 'Uses', 'CV']);
  });
});
