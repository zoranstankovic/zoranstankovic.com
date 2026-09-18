#!/usr/bin/env bash
# Builds the Japanese glyph subset used by the design.
# Add a character to glyphs.txt and re-run this script to extend it.
set -euo pipefail
cd "$(dirname "$0")"

SOURCE_URL="https://github.com/google/fonts/raw/main/ofl/shipporimincho/ShipporiMincho-Regular.ttf"
OUTPUT="../../src/assets/fonts/jp-subset.woff2"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL "$SOURCE_URL" -o "$TMP/source.ttf"
mkdir -p "$(dirname "$OUTPUT")"
pyftsubset "$TMP/source.ttf" \
  --text-file=glyphs.txt \
  --layout-features='*' \
  --flavor=woff2 \
  --output-file="$OUTPUT"
ls -l "$OUTPUT"
