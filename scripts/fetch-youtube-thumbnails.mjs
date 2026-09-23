// One-off download of the thumbnail for every <YouTube id="…"> in the posts, so the site serves
// them itself and a visitor's browser never contacts YouTube before they follow a video link.
// Run again after adding a post with a new video:
//   node scripts/fetch-youtube-thumbnails.mjs
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const postsDir = 'src/content/blog';
const outDir = 'src/assets/youtube';

const ids = new Set();
for (const file of await readdir(postsDir)) {
  const source = await readFile(path.join(postsDir, file), 'utf8');
  for (const [, id] of source.matchAll(/<YouTube\s+id="([^"]+)"/g)) ids.add(id);
}

await mkdir(outDir, { recursive: true });
for (const id of ids) {
  // maxresdefault exists only for HD uploads; hqdefault always exists (480x360, letterboxed).
  let saved;
  for (const name of ['maxresdefault', 'hqdefault']) {
    const response = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`);
    if (!response.ok) continue;
    await writeFile(path.join(outDir, `${id}.jpg`), Buffer.from(await response.arrayBuffer()));
    saved = name;
    break;
  }
  if (!saved) throw new Error(`No thumbnail found for ${id}`);
  console.log(`${id}  ${saved}`);
}
console.log(`\n${ids.size} thumbnails in ${outDir}`);
