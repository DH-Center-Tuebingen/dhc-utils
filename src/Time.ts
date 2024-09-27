import { TimeInput } from "./types/Time.ts";
import dayjs from "./vendor/dayjs.ts";

const invalidString = ""

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
    if (!from) return "-";
    if (!to) to = Date.now() / 1000;
    const toDateObject = toDate(to);
    const fromDateObject = toDate(from);
    return dayjs(fromDateObject).from(toDateObject);
}

/**
 * Returns the user locale when no locale string was provided".
 * @param locale 
 * @returns - The locale string
 */
function localeFallback(locale?: string): string {
    return locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale;
}

/**
 * Formats a Unix timestamp or date string to a datetime string.
 *
 * The locale and localeOptions parameters are optional and mainly used for testing.
 * 
 * TODO // DISCUSS: This function creates a datetime string. So should we better rename it to formatDateTime()?
 *
 * @param value - Unix timestamp or date string
 * @param locale - Locale string
 * @param localeOptions - Locale options
 * @returns
 */
export function datestring(
    value: TimeInput,
    locale?: string,
    localeOptions?: Intl.DateTimeFormatOptions,
): string {
    if (!value) return invalidString;
    const date = toDate(value);
    locale = localeFallback(locale);

    // We are using the toLocaleDateString() + toLocaleTimeString() method
    // to have the same result as the toString() method.
    // Note that the toLocaleString() method is not used because it
    // returns a different result.
    return `${date.toLocaleDateString(locale, localeOptions)} ${date.toLocaleTimeString(locale, localeOptions)}`;
}

function formatDateFromDateObject(
    date: Date,
    intlLocaleString: string,
    localeOptions: Intl.DateTimeFormatOptions = {}
): string {
    return date.toLocaleDateString(intlLocaleString, localeOptions);
}


/**
 * 
 * Formats the input to a date string.
 * 
 * @param value 
 * @param locale 
 * @param localeOptions 
 * @returns 
 */
export function formatDate(
    value: TimeInput,
    locale?: string,
    localeOptions?: Intl.DateTimeFormatOptions
): string {
    if (!value) return invalidString;
    const date = toDate(value);
    return formatDateFromDateObject(date, localeFallback(locale), localeOptions);
}
