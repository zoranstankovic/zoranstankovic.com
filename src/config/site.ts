export const features = {
  projects: false,
  books: false,
  videos: false,
};

export type Feature = keyof typeof features;

export interface NavItem {
  label: string;
  href: string;
  feature?: Feature;
}

export const site = {
  url: 'https://zoranstankovic.com',
  name: 'Zoran Stankovic',
  nameKatakana: 'ゾラン・スタンコビッチ',
  role: 'Software developer',
  // Shown after the role in the hero kicker. Set to [] to show the role alone.
  stack: ['Go', 'PHP'],
  description: 'Software developer writing about PHP, Laravel and Go.',
  bio: 'Software developer. PHP, Laravel and Go.',
  cvPath: '/zoran-stankovic-cv.pdf',
  social: [
    { label: 'GitHub', href: 'https://github.com/zoranstankovic' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zoran-stankovic-40748061/' },
    { label: 'YouTube', href: 'https://www.youtube.com/@zstankovic' },
    { label: 'RSS', href: '/rss.xml' },
  ],
} as const;

export const navItems: readonly NavItem[] = [
  { label: 'Writing', href: '/blog' },
  { label: 'Projects', href: '/projects', feature: 'projects' },
  { label: 'Now', href: '/now' },
  { label: 'Uses', href: '/uses' },
  { label: 'Books', href: '/books', feature: 'books' },
  { label: 'CV', href: site.cvPath },
];

export function heroKicker(role: string, stack: readonly string[]): string {
  return stack.length ? `${role} · ${stack.join(' / ')}` : role;
}

export function visibleNavItems(
  items: readonly NavItem[] = navItems,
  flags: Record<Feature, boolean> = features,
): NavItem[] {
  return items.filter((item) => !item.feature || flags[item.feature]);
}
