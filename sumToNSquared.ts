/**
 * Calculates the sum of integers from 1 to n²
 * @param n - The positive integer to calculate the sum up to n²
 * @returns The sum of all integers from 1 to n²
 */
function sumToNSquared(n: number): number {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("Input must be a positive integer");
  }
  
  const nSquared = n * n;
  
  // Formula for sum of first m natural numbers: m*(m+1)/2
  // where m = n²
  return (nSquared * (nSquared + 1)) / 2;
}

// Example usage
function demonstrateSumToNSquared(): void {
  const testCases = [1, 2, 3, 4, 5, 10];
  
  for (const n of testCases) {
    console.log(`Sum from 1 to ${n}² (${n*n}) = ${sumToNSquared(n)}`);
  }
}

demonstrateSumToNSquared();
