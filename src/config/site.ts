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
  role: 'Backend developer',
  location: 'Magdeburg, DE',
  description: 'Backend developer writing about PHP, Laravel and Go.',
  bio: 'Backend developer. PHP, Laravel and Go.',
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

export function visibleNavItems(
  items: readonly NavItem[] = navItems,
  flags: Record<Feature, boolean> = features,
): NavItem[] {
  return items.filter((item) => !item.feature || flags[item.feature]);
}
