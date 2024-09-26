import { TimeInput } from "./types/Time.ts";
import dayjs from "./vendor/dayjs.ts";



function toDate(value: TimeInput): Date {
    if (!isNaN(+value)) {
        value = (+value) * 1000;
    }

    return dayjs.utc(value).toDate();
}

/**
 * Outputs the time since the input date. E.g. "2 hours ago" or "3 years ago".
 * 
 * @param value  - Unix timestamp or date string
 * @returns 
 */
export function ago(from: TimeInput, to: TimeInput | null = null): string {
    if(!from) return "-";
    if(!to) to = Date.now() / 1000;
    const toDateObject = toDate(to);
    const fromDateObject = toDate(from);
    return dayjs(fromDateObject).from(toDateObject);
}

/**
 * Formats a Unix timestamp or date string to a date string.
 *
 * The locale and localeOptions parameters are optional and mainly used for testing.
 *
 * @param value - Unix timestamp or date string
 * @param locale - Locale string
 * @param localeOptions - Locale options
 * @returns
 */ 
export function datestring(
    value: TimeInput,
    locale: string | null = null,
    localeOptions: Intl.DateTimeFormatOptions = {},
): string {
    if (!value) return "";
    const date = toDate(value);
    locale = locale || Intl.DateTimeFormat().resolvedOptions().locale;

    // We are using the toLocaleDateString() + toLocaleTimeString() method
    // to have the same result as the toString() method.
    // Note that the toLocaleString() method is not used because it
    // returns a different result.
    return `${date.toLocaleDateString(locale, localeOptions)} ${
        date.toLocaleTimeString(locale, localeOptions)
    }`;
}
