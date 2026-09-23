// Usage: node scripts/verify-redirects.mjs https://<host>
// Every old URL, with and without a trailing slash, must answer with a single 301 to its
// target, and the target must answer 200. `/` must answer 200 directly.
import { EXTRA_URLS, OLD_URLS } from './old-urls.mjs';

const base = process.argv[2];
if (!base) {
  console.error('Usage: node scripts/verify-redirects.mjs <base-url>');
  process.exit(1);
}

const checks = [...OLD_URLS, ...EXTRA_URLS].flatMap(({ path, target }) =>
  path === '/'
    ? [{ path, target }]
    : [
        { path, target },
        { path: `${path}/`, target },
      ],
);

let failures = 0;
for (const { path, target } of checks) {
  const response = await fetch(new URL(path, base), { redirect: 'manual' });
  let problem;
  if (path === target) {
    if (response.status !== 200) problem = `expected 200, got ${response.status}`;
  } else {
    const location = response.headers.get('location');
    const landed = location && new URL(location, base).pathname;
    if (response.status !== 301) problem = `expected 301, got ${response.status}`;
    else if (landed !== target) problem = `redirects to ${landed}, expected ${target}`;
    else {
      const final = await fetch(new URL(target, base), { redirect: 'manual' });
      if (final.status !== 200) problem = `target ${target} answered ${final.status}`;
    }
  }
  if (problem) failures++;
  console.log(`${problem ? 'FAIL' : 'ok  '}  ${path.padEnd(48)} ${problem ?? `-> ${target}`}`);
}

console.log(`\n${checks.length - failures}/${checks.length} passed`);
process.exit(failures ? 1 : 0);
