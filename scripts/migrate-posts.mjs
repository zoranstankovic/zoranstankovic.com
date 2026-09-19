// One-off migration of the 15 posts from my-bookworm-blog. Run once:
//   node scripts/migrate-posts.mjs ../my-bookworm-blog
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { transformPost } from './lib/transform-post.mjs';

const oldRepo = process.argv[2];
if (!oldRepo) {
  console.error('Usage: node scripts/migrate-posts.mjs <path-to-my-bookworm-blog>');
  process.exit(1);
}

const postsDir = path.join(oldRepo, 'src/content/posts');
const outDir = 'src/content/blog';
const assetsDir = 'src/assets/images';

const files = (await readdir(postsDir)).filter((f) => /\.mdx?$/.test(f) && !f.startsWith('-'));
if (files.length !== 15) throw new Error(`Expected 15 posts, found ${files.length}`);

await mkdir(outDir, { recursive: true });
const images = new Set();
for (const file of files) {
  const slug = file.replace(/\.mdx?$/, '');
  const source = await readFile(path.join(postsDir, file), 'utf8');
  const { content, images: used } = transformPost(source, slug);
  used.forEach((image) => images.add(image));
  await writeFile(path.join(outDir, file), content);
}

for (const image of images) {
  const relative = image.slice('/images/'.length);
  const target = path.join(assetsDir, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(path.join(oldRepo, 'public/images', relative), target);
}

if (images.size !== 35) throw new Error(`Expected 35 images, copied ${images.size}`);
console.log(`Migrated ${files.length} posts and ${images.size} images.`);
