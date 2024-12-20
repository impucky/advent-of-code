const start = performance.now();
const input = Deno.readTextFileSync("2015/02/input.txt")
  .split("\n")
  .map((line) => line.split("x").map(Number));

function wrap(gift: number[]) {
  const [sa, sb] = gift.sort((a, b) => a - b);
  const [l, w, h] = gift;
  const paper = 2 * l * w + 2 * w * h + 2 * h * l + sa * sb;
  const ribbon = sa * 2 + sb * 2 + l * w * h;
  return [paper, ribbon];
}

console.log(
  "Part one:",
  input.map(wrap).reduce((a, b) => a + b[0], 0)
);
console.log(
  "Part two:",
  input.map(wrap).reduce((a, b) => a + b[1], 0)
);

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms`);
