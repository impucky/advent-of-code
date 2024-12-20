const start = performance.now();
const input = Deno.readTextFileSync("2015/01/input.txt").split("");

let p2 = 0;

console.log(
  "Part one:",
  input.reduce((a, b, i) => {
    if (a < 0 && p2 === 0) p2 = i;
    return a + (b === "(" ? 1 : -1);
  }, 0)
);

console.log("Part two:", p2);

console.log(`\↗Finished in ${(performance.now() - start).toFixed(0)}ms↘`);
