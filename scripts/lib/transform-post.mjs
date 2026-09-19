// Pure transform from a Bookworm post to the new `blog` collection format.
// Used once by scripts/migrate-posts.mjs; kept as documentation of the migration.

export const TOPICS = {
  'basic-package-file-structure': 'Go',
  'basic-structure-of-go-program-explained': 'Go',
  'boolean-data-type-in-go': 'Go',
  'byte-and-runes-in-go': 'Go',
  'compile-go-programs-for-multiple-os': 'Go',
  'data-types-in-go': 'Go',
  'how-to-create-library-in-go': 'Go',
  'numeric-data-types-in-go': 'Go',
  'setting-up-go-environment-win-linux': 'Go',
  'strings-in-go': 'Go',
  'variable-declaration-in-go': 'Go',
  'execution-context-in-javascript-pt-1': 'JavaScript',
  'execution-context-in-javascript-pt-2': 'JavaScript',
  'how-to-set-up-nvm-to-work-with-fish-shell': 'Shell',
  'how-to-study': 'Learning',
};

const ASSET_PREFIX = '../../assets/images/';
const YOUTUBE_IMPORT = 'import YouTube from "../../components/YouTube.astro";';

export function transformPost(source, slug) {
  if (source.includes('\r')) throw new Error(`${slug}: CRLF line endings are not supported`);
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${slug}: no frontmatter`);
  const topic = TOPICS[slug];
  if (!topic) throw new Error(`${slug}: no topic assigned`);

  const images = [];
  const frontmatter = match[1]
    .split('\n')
    .filter((line) => !/^(categories|authors):/.test(line))
    .map((line) => {
      const hero = line.match(/^image: "(\/images\/[^"]+)"$/);
      if (!hero) return line;
      images.push(hero[1]);
      return `image: "${ASSET_PREFIX}${hero[1].slice('/images/'.length)}"`;
    });
  frontmatter.push(`topic: "${topic}"`, 'type: article');

  let body = source.slice(match[0].length);
  for (const [, path] of body.matchAll(/\]\((\/images\/[^)\s]+)/g)) images.push(path);
  body = body.replaceAll('](/images/', `](${ASSET_PREFIX}`);

  const hasVideo = body.includes('<Youtube ');
  body = body.replaceAll('<Youtube client:load ', '<YouTube ');
  if (body.includes('<Youtube')) throw new Error(`${slug}: unexpected <Youtube> usage`);

  const header = `---\n${frontmatter.join('\n')}\n---\n`;
  return { content: header + (hasVideo ? `${YOUTUBE_IMPORT}\n` : '') + body, images };
}
