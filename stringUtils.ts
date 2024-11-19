// stringUtils.ts

/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert.
 * @returns The camelCase version of the string.
 */
export function toCamelCase(str: string): string {
    return str
        .replace(/([-_]\w)/g, g => g[1].toUpperCase())
        .replace(/(^\w)/, g => g.toLowerCase());
}

/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert.
 * @returns The kebab-case version of the string.
 */
export function toKebabCase(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

/**
 * Reverses the characters in a string.
 *
 * @param str - The string to reverse.
 * @returns The reversed string.
 */
export function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

/**
 * Truncates a string to a given length and adds "..." if it is longer.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the string.
 * @returns The truncated string.
 */
export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Checks if a string is a palindrome.
 *
 * @param str - The string to check.
 * @returns `true` if the string is a palindrome, `false` otherwise.
 */
export function isPalindrome(str: string): boolean {
    const cleanedStr = str.replace(/[\W_]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

/**
 * Counts the number of words in a string.
 *
 * @param str - The string to count words in.
 * @returns The number of words in the string.
 */
export function countWords(str: string): number {
    return str.trim().split(/\s+/).length;
}

export default {
    toCamelCase,
    toKebabCase,
    reverseString,
    truncateString,
    capitalizeWords,
    isPalindrome,
    countWords,
};
