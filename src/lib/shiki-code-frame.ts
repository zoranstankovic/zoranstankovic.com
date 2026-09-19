import type { Element, ElementContent } from 'hast';
import type { ShikiTransformer } from 'shiki';

const PLAIN_LANGS = new Set(['', 'text', 'txt', 'plaintext']);

export function parseTitle(meta: string | undefined): string | undefined {
  return meta?.match(/title="([^"]+)"/)?.[1];
}

const span = (className: string, text: string): Element => ({
  type: 'element',
  tagName: 'span',
  properties: { className: [className] },
  children: [{ type: 'text', value: text }],
});

export function codeFrame(): ShikiTransformer {
  return {
    name: 'zs:code-frame',
    root(root) {
      const lang = this.options.lang ?? '';
      const meta = this.options.meta as { __raw?: string } | undefined;
      const title = parseTitle(meta?.__raw);
      const showLang = !PLAIN_LANGS.has(lang);
      if (!title && !showLang) return;

      const pre = root.children.find(
        (node): node is Element => node.type === 'element' && node.tagName === 'pre',
      );
      if (!pre) return;

      const caption: ElementContent[] = [];
      if (title) caption.push(span('code-frame__title', title));
      if (showLang) caption.push(span('code-frame__lang', lang));

      root.children = [
        {
          type: 'element',
          tagName: 'figure',
          properties: { className: ['code-frame'] },
          children: [
            {
              type: 'element',
              tagName: 'figcaption',
              properties: { className: ['code-frame__caption'] },
              children: caption,
            },
            pre,
          ],
        },
      ];
    },
  };
}
