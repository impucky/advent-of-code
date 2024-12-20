const start = performance.now();
const input = Deno.readTextFileSync("2015/03/input.txt").split("");

const p1 = new Set<string>(["0:0"]);
const p2 = new Set<string>(["0:0"]);
let [x, y] = [0, 0];
let [x2, y2] = [0, 0];
let [x3, y3] = [0, 0];

const dirs: Record<string, [number, number]> = {
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
  "<": [-1, 0],
};

input.forEach((move, i) => {
  const [dx, dy] = dirs[move];
  x += dx;
  y += dy;
  p1.add(`${x}:${y}`);
  if (i % 2 === 0) {
    x2 += dx;
    y2 += dy;
    p2.add(`${x2}:${y2}`);
  } else {
    x3 += dx;
    y3 += dy;
    p2.add(`${x3}:${y3}`);
  }
});

console.log("Part one:", p1.size);
console.log("Part two:", p2.size);

console.log(`\n🎅Finished in ${(performance.now() - start).toFixed(0)}ms🤖`);
