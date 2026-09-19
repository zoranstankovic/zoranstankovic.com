import { codeToHtml } from 'shiki';
import { describe, expect, it } from 'vitest';
import { codeFrame, parseTitle } from './shiki-code-frame';

const highlight = (lang: string, meta?: string) =>
  codeToHtml('package main', {
    lang,
    theme: 'github-light',
    meta: meta ? { __raw: meta } : undefined,
    transformers: [codeFrame()],
  });

describe('parseTitle', () => {
  it('reads title="…"', () => expect(parseTitle('title="main.go"')).toBe('main.go'));
  it('returns undefined without a title', () => expect(parseTitle(undefined)).toBeUndefined());
});

describe('codeFrame', () => {
  it('wraps a titled block in a figure with filename and language', async () => {
    const html = await highlight('go', 'title="main.go"');
    expect(html.startsWith('<figure class="code-frame">')).toBe(true);
    expect(html).toContain('<span class="code-frame__title">main.go</span>');
    expect(html).toContain('<span class="code-frame__lang">go</span>');
  });

  it('shows only the language when there is no title', async () => {
    const html = await highlight('go');
    expect(html).toContain('<span class="code-frame__lang">go</span>');
    expect(html).not.toContain('code-frame__title');
  });

  it('leaves plain text blocks unwrapped', async () => {
    expect((await highlight('text')).startsWith('<pre')).toBe(true);
  });
});
