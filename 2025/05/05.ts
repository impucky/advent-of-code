const start = performance.now();
const [a, b] = Deno.readTextFileSync("2025/05/input.txt")
  .split("\r\n\r\n")
  .map(part => part.split("\r\n"));

const ranges = a.map(range => range.split("-").map(Number)).sort((a, b) => a[0] - b[0]);
const ids = b.map(Number);
let p1 = 0;

// Squash all the overlapping ranges
const merged = [];
for (const range of ranges) {
  if (!merged.length || merged[merged.length - 1][1] < range[0]) {
    merged.push(range);
  } else {
    merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], range[1]);
  }
}

for (const id of ids) {
  for (const range of merged) {
    if (id >= range[0] && id <= range[1]) {
      p1++;
      break;
    }
  }
}

console.log("Part one:", p1);

// adding 1 since it's inclusive
console.log(
  "Part two:",
  merged.reduce((a, b) => a + b[1] - b[0] + 1, 0)
);

console.log(`\n 🍍Finished in ${(performance.now() - start).toFixed(0)}ms🥑`);
