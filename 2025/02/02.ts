const start = performance.now();
const input = Deno.readTextFileSync("2025/02/input.txt")
  .split(",")
  .map(range => range.split("-"));

let part1 = 0;
let part2 = 0;

input.forEach(range => {
  const [start, end] = range;
  for (let i = +start; i <= +end; i++) {
    const str = i.toString();
    if (/^(\d+)\1$/.test(str)) part1 += i;
    if (/^(\d+)\1+$/.test(str)) part2 += i;
  }
});

console.log("Part one:", part1);
console.log("Part two:", part2);

console.log(`\n🪪 Finished in ${(performance.now() - start).toFixed(0)}ms🪪`);
