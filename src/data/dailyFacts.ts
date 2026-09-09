import {
  ALL_366_FACTS,
  THEME_METADATA_366,
  TOTAL_366_DAYS_COUNT,
  DailyTicFact366,
} from './dailyFacts366Data';

export interface DailyTicFact {
  id: number;
  dayOfYear?: number; // 1 to 366
  month?: number;     // 1 to 12
  day?: number;       // 1 to 31
  dateLabel?: {
    pt: string;
    en: string;
  };
  themeId: string; // 'tic-sociedade' | 'ergonomia' | 'seguranca' | 'palavras-passe' | 'correio-eletronico' | 'navegar-internet' | 'direitos-autor'
  themeNumber: number;
  themeTitle: {
    pt: string;
    en: string;
  };
  themeIcon: string;
  category: {
    pt: string;
    en: string;
  };
  icon: string;
  badgeColor: string; // Tailwind colors (indigo, emerald, amber, rose, sky, purple, teal)
  title: {
    pt: string;
    en: string;
  };
  teaser: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  whyItMatters: {
    pt: string;
    en: string;
  };
  funFact: {
    pt: string;
    en: string;
  };
  isSpecialMilestone?: boolean;
}

export const THEME_METADATA = THEME_METADATA_366;

/**
 * 366 Distinct Curated Facts for 5th Grade ICT
 * Covers all 366 calendar days of the year (Day 1 to Day 366, including Feb 29 for leap years).
 */
export const DAILY_TIC_FACTS: DailyTicFact[] = ALL_366_FACTS;
export { ALL_366_FACTS, TOTAL_366_DAYS_COUNT };
export type { DailyTicFact366 };

/**
 * Returns the exact fact assigned to today's date (Month & Day).
 * Matches all 366 calendar days (including Feb 29).
 */
export function getDailyTicFact(date = new Date()): DailyTicFact {
  const month = date.getMonth() + 1; // 1 - 12
  const day = date.getDate();        // 1 - 31

  const match = ALL_366_FACTS.find((f) => f.month === month && f.day === day);
  if (match) {
    return match;
  }

  // Fallback to day of year index if date is outside bounds
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.max(1, Math.min(366, Math.floor(diff / oneDay)));

  return ALL_366_FACTS[dayOfYear - 1] || ALL_366_FACTS[0];
}

/**
 * Get fact by day of the year (1 to 366)
 */
export function getFactByDayOfYear(dayOfYear: number): DailyTicFact {
  const normalized = Math.max(1, Math.min(366, dayOfYear));
  return ALL_366_FACTS[normalized - 1] || ALL_366_FACTS[0];
}

/**
 * Get fact by calendar date (month 1-12, day 1-31)
 */
export function getFactByDate(month: number, day: number): DailyTicFact | undefined {
  return ALL_366_FACTS.find((f) => f.month === month && f.day === day);
}

export function getTodayDateString(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getFactsByTheme(themeId: string): DailyTicFact[] {
  return ALL_366_FACTS.filter((fact) => fact.themeId === themeId);
}

export function getRandomFact(excludeId?: number): DailyTicFact {
  const candidates = excludeId
    ? ALL_366_FACTS.filter((f) => f.id !== excludeId)
    : ALL_366_FACTS;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

export function getFactById(id: number): DailyTicFact | undefined {
  return ALL_366_FACTS.find((f) => f.id === id);
}
