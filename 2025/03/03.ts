const start = performance.now();
const input = Deno.readTextFileSync("2025/03/input.txt")
  .split("\r\n")
  .map(line => line.split("").map(Number));

function findMaxJoltage(len: number, line: number[]) {
  let batteries = "";
  let startPos = 0;
  let endPos = line.length - len;
  let max = 0;
  while (batteries.length < len) {
    for (let i = startPos; i <= endPos; i++) {
      if (line[i] > max) {
        max = line[i];
        startPos = i + 1;
      }
    }
    batteries += max.toString();
    endPos += 1;
    max = 0;
  }
  return +batteries;
}

console.log(
  "Part one:",
  input.reduce((a, b) => a + findMaxJoltage(2, b), 0)
);
console.log(
  "Part two:",
  input.reduce((a, b) => a + findMaxJoltage(12, b), 0)
);

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms 🔋`);
