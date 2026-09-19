import { describe, expect, it } from 'vitest';
import { formatIsoDate, formatLongDate, formatMonthYear } from './format';

// Frontmatter dates like `2022-11-20` are parsed as UTC midnight.
const date = new Date('2022-11-20T00:00:00Z');

describe('date formatting', () => {
  it('formats ISO dates in UTC', () => expect(formatIsoDate(date)).toBe('2022-11-20'));
  it('formats long dates', () => expect(formatLongDate(date)).toBe('20 Nov 2022'));
  it('formats month and year', () => expect(formatMonthYear(date)).toBe('November 2022'));
  it('does not shift a UTC-midnight date to the previous day', () => {
    expect(formatIsoDate(new Date('2022-01-01T00:00:00Z'))).toBe('2022-01-01');
  });
});
