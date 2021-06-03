export const MINUTE_MILLISECS = 60 * 1000;

export const DAY_MILLISECS = 24 * 60 * MINUTE_MILLISECS;

export const getDateString = (date: Date): string =>
  new Date(date.getTime() - date.getTimezoneOffset() * MINUTE_MILLISECS).toISOString().split('T')[0];

export const getTodayString = (): string => getDateString(new Date());
