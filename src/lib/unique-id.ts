let counter = 0;

// Ids for SVG defs (filters, masks) that must stay unique when a component renders twice on a page.
export function uniqueId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
