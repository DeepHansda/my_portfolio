import assert from "node:assert/strict";
import {
  parseDate,
  formatDate,
  formatMonthYear,
  formatDateRange,
  calculateDurationSpan,
  formatRelativeTime,
} from "./date.ts";

console.log("[CHECK] Testing reusable date utility functions...");

// 1. parseDate
assert.equal(parseDate(null), null);
assert.equal(parseDate(undefined), null);
assert.equal(parseDate("invalid-date"), null);
const valid = parseDate("2022-11-28T00:00:00.000Z");
assert.ok(valid instanceof Date);
assert.equal(valid?.getUTCFullYear(), 2022);
assert.equal(valid?.getUTCMonth(), 10); // 0-indexed: Nov

// 2. formatMonthYear
assert.equal(formatMonthYear("2022-11-28T00:00:00.000Z"), "Nov 2022");
assert.equal(formatMonthYear("2023-02-28T00:00:00.000Z"), "Feb 2023");
assert.equal(formatMonthYear(null), "");

// 3. formatDate presets
assert.equal(formatDate("2022-11-28T00:00:00.000Z", "short"), "11/28/22");
assert.equal(formatDate("2022-11-28T00:00:00.000Z", "medium"), "Nov 28, 2022");
assert.equal(formatDate("2022-11-28T00:00:00.000Z", "long"), "November 28, 2022");

// 4. formatDateRange
// Start & End provided (matching user sample data)
const sampleRange = formatDateRange(
  "2022-11-28T00:00:00.000Z",
  "2023-02-28T00:00:00.000Z"
);
assert.equal(sampleRange, "Nov 2022 — Feb 2023");

// Open-ended range (current employment)
const presentRange = formatDateRange("2023-03-01T00:00:00.000Z", null);
assert.equal(presentRange, "Mar 2023 — Present");

// Custom delimiter and fallback
const customRange = formatDateRange("2023-01-01T00:00:00.000Z", undefined, {
  delimiter: " to ",
  fallbackEnd: "Current",
});
assert.equal(customRange, "Jan 2023 to Current");

// 5. calculateDurationSpan
// Nov 2022 to Feb 2023 (inclusive: Nov, Dec, Jan, Feb)
const span1 = calculateDurationSpan(
  "2022-11-28T00:00:00.000Z",
  "2023-02-28T00:00:00.000Z"
);
assert.ok(span1.includes("mos"));

// Multi-year span: 2021-01-01 to 2023-06-01 (~2 yrs 5 mos)
const multiYearSpan = calculateDurationSpan(
  "2021-01-01T00:00:00.000Z",
  "2023-06-01T00:00:00.000Z"
);
assert.ok(multiYearSpan.includes("yr"));

// 6. formatRelativeTime
const base = new Date("2026-09-04T12:00:00.000Z");
const past2Days = new Date("2026-09-02T12:00:00.000Z");
assert.equal(formatRelativeTime(past2Days, base), "2 days ago");

const future3Months = new Date("2026-12-04T12:00:00.000Z");
assert.ok(formatRelativeTime(future3Months, base).includes("3 months"));

console.log("[CHECK] All reusable date utility checks passed successfully ✓");
