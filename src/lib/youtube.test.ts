import { describe, expect, it } from 'vitest';
import { thumbnailFor, youtubeWatchUrl } from './youtube';

describe('youtubeWatchUrl', () => {
  it('links to the watch page on youtube.com', () =>
    expect(youtubeWatchUrl('cN7KBkJWTd8')).toBe('https://www.youtube.com/watch?v=cN7KBkJWTd8'));
  it.each(['', 'short', 'cN7KBkJWTd8&list=x', '../../evil'])('rejects %j', (id) =>
    expect(() => youtubeWatchUrl(id)).toThrow(/YouTube id/),
  );
});

describe('thumbnailFor', () => {
  const modules = {
    '/src/assets/youtube/cN7KBkJWTd8.jpg': 'boolean',
    '/src/assets/youtube/Q06YpbR3aU8.jpg': 'numeric',
  };

  it('finds the local thumbnail by video id', () =>
    expect(thumbnailFor('Q06YpbR3aU8', modules)).toBe('numeric'));
  it('fails loudly when the thumbnail is missing', () =>
    expect(() => thumbnailFor('fRKaKP_h6gg', modules)).toThrow(
      /src\/assets\/youtube\/fRKaKP_h6gg\.jpg/,
    ));
});
