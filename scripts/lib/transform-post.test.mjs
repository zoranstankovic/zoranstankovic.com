import { describe, expect, it } from 'vitest';
import { TOPICS, transformPost } from './transform-post.mjs';

const source = `---
title: "Strings in Go (Golang) An Introduction"
description: ""
date: 2022-11-20
image: "/images/posts/strings-in-go.jpg"
categories: ["programming"]
authors: ["Zoran Stankovic"]
tags: ["go", "golang", "programming"]
draft: false
---

Intro.

<Youtube client:load id="abc123" title="Strings in Go" />

![Lexicographical Comparison](/images/lexicographical-comparison.png)
`;

describe('transformPost', () => {
  const { content, images } = transformPost(source, 'strings-in-go');

  it('drops categories and authors', () => {
    expect(content).not.toMatch(/^categories:/m);
    expect(content).not.toMatch(/^authors:/m);
  });

  it('adds topic and type', () => {
    expect(content).toMatch(/^topic: "Go"$/m);
    expect(content).toMatch(/^type: article$/m);
  });

  it('keeps title, date, tags, draft and description', () => {
    for (const key of ['title', 'description', 'date', 'tags', 'draft']) {
      expect(content).toMatch(new RegExp(`^${key}:`, 'm'));
    }
  });

  it('rewrites the hero image to a relative asset path', () => {
    expect(content).toMatch(/^image: "\.\.\/\.\.\/assets\/images\/posts\/strings-in-go\.jpg"$/m);
  });

  it('rewrites body images to relative asset paths', () => {
    expect(content).toContain('](../../assets/images/lexicographical-comparison.png)');
    expect(content).not.toContain('](/images/');
  });

  it('replaces the theme YouTube component and imports the new one after the frontmatter', () => {
    expect(content).toContain('<YouTube id="abc123" title="Strings in Go" />');
    expect(content).not.toContain('<Youtube');
    expect(content).toMatch(
      /\n---\nimport YouTube from "\.\.\/\.\.\/components\/YouTube\.astro";\n/,
    );
  });

  it('reports every referenced image, hero first', () => {
    expect(images).toEqual([
      '/images/posts/strings-in-go.jpg',
      '/images/lexicographical-comparison.png',
    ]);
  });

  it('does not add an import to posts without a video', () => {
    const plain = source.replace(/<Youtube[^>]*\/>\n/, '');
    expect(transformPost(plain, 'strings-in-go').content).not.toContain('import YouTube');
  });

  it('refuses a slug without a topic', () => {
    expect(() => transformPost(source, 'unknown-post')).toThrow(/topic/);
  });

  it('assigns all 15 posts a topic', () => {
    expect(Object.keys(TOPICS)).toHaveLength(15);
  });
});
