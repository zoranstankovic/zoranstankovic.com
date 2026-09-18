# Japanese glyph subset

The design uses a handful of Japanese characters: the katakana of the name in the home hero,
the kanji section labels (作品, 記事, 今, 道具, 本, 目次) and 月 on the theme toggle. A full
Japanese font would add megabytes, so the site ships a subset containing only these glyphs:
`src/assets/fonts/jp-subset.woff2`, registered in `src/styles/fonts.css` as the font family
`'ZS Japanese'` and used as a fallback in every `--font-*` stack.

## Prerequisite

`pyftsubset` from fonttools, with brotli for WOFF2 output:

```bash
pipx install fonttools && pipx inject fonttools brotli
```

## Adding a glyph

1. Append the character to `glyphs.txt`.
2. Run `./scripts/fonts/build-jp-subset.sh`.
3. Commit `glyphs.txt` and the regenerated `src/assets/fonts/jp-subset.woff2`.

## Source font

Shippori Mincho Regular from the Google Fonts repository, licensed under the SIL Open Font
License 1.1. The script downloads it into a temporary directory at build time; the full font
is never committed.
