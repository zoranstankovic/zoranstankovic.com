// The 36 URLs from the old site's sitemap-0.xml and where each is expected to land.
// `target` equals `path` only for `/`, which must answer 200 without a redirect.
const POSTS = [
  'basic-package-file-structure',
  'basic-structure-of-go-program-explained',
  'boolean-data-type-in-go',
  'byte-and-runes-in-go',
  'compile-go-programs-for-multiple-os',
  'data-types-in-go',
  'execution-context-in-javascript-pt-1',
  'execution-context-in-javascript-pt-2',
  'how-to-create-library-in-go',
  'how-to-set-up-nvm-to-work-with-fish-shell',
  'how-to-study',
  'numeric-data-types-in-go',
  'setting-up-go-environment-win-linux',
  'strings-in-go',
  'variable-declaration-in-go',
];

const TAGS = [
  'go',
  'golang',
  'howto',
  'javascript',
  'learning',
  'programming',
  'shell',
  'terminal',
];

export const OLD_URLS = [
  { path: '/', target: '/' },
  ...POSTS.map((slug) => ({ path: `/${slug}`, target: `/blog/${slug}` })),
  { path: '/about', target: '/' },
  { path: '/contact', target: '/' },
  { path: '/authors', target: '/' },
  { path: '/authors/zoran-stankovic', target: '/' },
  { path: '/privacy-policy', target: '/impressum' },
  { path: '/search', target: '/blog' },
  { path: '/categories', target: '/blog' },
  { path: '/categories/programming', target: '/blog' },
  { path: '/categories/learning', target: '/blog' },
  { path: '/tags', target: '/blog' },
  ...TAGS.map((tag) => ({ path: `/tags/${tag}`, target: '/blog' })),
  { path: '/page/2', target: '/blog' },
  { path: '/page/3', target: '/blog' },
];

export const EXTRA_URLS = [{ path: '/cv', target: '/zoran-stankovic-cv.pdf' }];
