/**
 * Reusable Date formatting and calculation utilities using native Intl APIs.
 * Safe for SSR and client environments with UTC consistency.
 */

export type DateInput = string | number | Date | null | undefined;

export interface DateRangeOptions {
  delimiter?: string;
  fallbackEnd?: string;
  locale?: string;
}

export interface DurationSpanOptions {
  inclusive?: boolean;
}

/**
 * Safely parses any date input into a valid Date object or null.
 */
export function parseDate(input: DateInput): Date | null {
  if (!input) return null;
  const date = input instanceof Date ? input : new Date(input);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Formats a date using native Intl.DateTimeFormat.
 * Defaults to UTC timezone to avoid hydration mismatches between SSR and client.
 */
export function formatDate(
  input: DateInput,
  options: Intl.DateTimeFormatOptions | "short" | "medium" | "long" = "medium",
  locale = "en-US"
): string {
  const date = parseDate(input);
  if (!date) return "";

  let formatOptions: Intl.DateTimeFormatOptions;

  if (typeof options === "string") {
    switch (options) {
      case "short":
        formatOptions = {
          year: "2-digit",
          month: "numeric",
          day: "numeric",
          timeZone: "UTC",
        };
        break;
      case "long":
        formatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        };
        break;
      case "medium":
      default:
        formatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        };
        break;
    }
  } else {
    formatOptions = { timeZone: "UTC", ...options };
  }

  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(date);
  } catch {
    return "";
  }
}

/**
 * Formats date into "Mon Year" format (e.g. "Nov 2022").
 */
export function formatMonthYear(input: DateInput, locale = "en-US"): string {
  return formatDate(
    input,
    { month: "short", year: "numeric", timeZone: "UTC" },
    locale
  );
}

/**
 * Formats a date range into e.g. "Nov 2022 — Feb 2023" or "Nov 2022 — Present".
 */
export function formatDateRange(
  startInput: DateInput,
  endInput?: DateInput,
  options: DateRangeOptions = {}
): string {
  const {
    delimiter = " — ",
    fallbackEnd = "Present",
    locale = "en-US",
  } = options;

  const startDate = parseDate(startInput);
  if (!startDate) return "";

  const startFormatted = formatMonthYear(startDate, locale);
  const endDate = parseDate(endInput);

  if (!endDate) {
    return `${startFormatted}${delimiter}${fallbackEnd}`;
  }

  const endFormatted = formatMonthYear(endDate, locale);
  return `${startFormatted}${delimiter}${endFormatted}`;
}

/**
 * Calculates human-readable duration span between two dates (e.g. "3 mos", "1 yr", "2 yrs 3 mos").
 * Defaults to current date if end is omitted.
 */
export function calculateDurationSpan(
  startInput: DateInput,
  endInput?: DateInput,
  options: DurationSpanOptions = { inclusive: true }
): string {
  const startDate = parseDate(startInput);
  if (!startDate) return "";

  const endDate = parseDate(endInput) || new Date();
  if (endDate.getTime() < startDate.getTime()) return "0 mos";

  let startYear = startDate.getUTCFullYear();
  let startMonth = startDate.getUTCMonth();
  let startDay = startDate.getUTCDate();

  let endYear = endDate.getUTCFullYear();
  let endMonth = endDate.getUTCMonth();
  let endDay = endDate.getUTCDate();

  let months = (endYear - startYear) * 12 + (endMonth - startMonth);
  if (endDay < startDay) {
    months = Math.max(0, months - 1);
  }

  if (options.inclusive) {
    months = Math.max(1, months + (endDay >= startDay ? 1 : 0));
  } else {
    months = Math.max(1, months);
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }
  if (remainingMonths > 0 || years === 0) {
    parts.push(
      `${remainingMonths} ${remainingMonths === 1 ? "mo" : "mos"}`
    );
  }

  return parts.join(" ");
}

/**
 * Formats relative time (e.g., "2 days ago", "in 3 months") using Intl.RelativeTimeFormat.
 */
export function formatRelativeTime(
  input: DateInput,
  baseDateInput?: DateInput,
  locale = "en-US"
): string {
  const date = parseDate(input);
  if (!date) return "";

  const base = parseDate(baseDateInput) || new Date();
  const diffInSeconds = Math.round((date.getTime() - base.getTime()) / 1000);

  const cutoffs = [
    { unit: "second", seconds: 60 },
    { unit: "minute", seconds: 3600 },
    { unit: "hour", seconds: 86400 },
    { unit: "day", seconds: 604800 },
    { unit: "week", seconds: 2592000 },
    { unit: "month", seconds: 31536000 },
    { unit: "year", seconds: Infinity },
  ] as const;

  const absDiff = Math.abs(diffInSeconds);

  for (let i = 0; i < cutoffs.length; i++) {
    const prevSeconds = i === 0 ? 1 : cutoffs[i - 1].seconds;
    const current = cutoffs[i];

    if (absDiff < current.seconds) {
      const value = Math.round(diffInSeconds / prevSeconds);
      try {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
        return rtf.format(value, current.unit as Intl.RelativeTimeFormatUnit);
      } catch {
        return date.toISOString().split("T")[0];
      }
    }
  }

  return date.toISOString().split("T")[0];
}
