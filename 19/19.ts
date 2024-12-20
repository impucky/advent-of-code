const start = performance.now();
const input = Deno.readTextFileSync("19/input.txt").split("\n\n");

const towels = input[0].split(", ");
const patterns = input[1].split("\n");

const memo = new Map<string, number>();

function findPattern(pattern: string) {
  if (memo.has(pattern)) return memo.get(pattern)!;
  let count = 0;
  if (pattern.length === 0) count = 1;
  for (const towel of towels) {
    if (pattern.startsWith(towel)) {
      count += findPattern(pattern.slice(towel.length));
    }
  }
  memo.set(pattern, count);
  return count;
}

const results = patterns.map((pattern) => findPattern(pattern));

console.log("Part one:", results.filter(Boolean).length);
console.log(
  "Part two:",
  results.reduce((a, b) => a + b)
);

console.log(`\n🛁Finished in ${(performance.now() - start).toFixed(0)}ms🛁`);
