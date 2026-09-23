// Videos are plain links to youtube.com with a thumbnail served from this site, so a visitor's
// browser contacts YouTube only after they choose to follow the link.
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function youtubeWatchUrl(id: string): string {
  if (!VIDEO_ID.test(id)) throw new Error(`Not a YouTube id: ${JSON.stringify(id)}`);
  return `https://www.youtube.com/watch?v=${id}`;
}

// `modules` is the result of `import.meta.glob('/src/assets/youtube/*.jpg')`, keyed by path.
export function thumbnailFor<T>(id: string, modules: Record<string, T>): T {
  const path = `/src/assets/youtube/${id}.jpg`;
  const thumbnail = modules[path];
  if (thumbnail === undefined) {
    throw new Error(`Missing ${path.slice(1)}: run node scripts/fetch-youtube-thumbnails.mjs`);
  }
  return thumbnail;
}
