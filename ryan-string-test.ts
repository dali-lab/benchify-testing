export function processStrings(strings: string[]): string[] {
  return strings
    .filter((str) => str.trim() !== '') // Remove empty or whitespace-only strings
    .map((str) => str.toUpperCase());   // Convert each string to uppercase
}
