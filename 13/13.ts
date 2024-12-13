const start = performance.now();
const input = Deno.readTextFileSync("13/input.txt")
  .split("\n\n")
  .map((prize) => {
    const nums = prize.match(/(?<=[+=])\d+/g)!.map(Number);
    return {
      a: { x: nums[0], y: nums[1] },
      b: { x: nums[2], y: nums[3] },
      prize: { x: nums[4], y: nums[5] },
    };
  });

type Vec2 = { x: number; y: number };

function play(bA: Vec2, bB: Vec2, prize: Vec2, partTwo: boolean): number {
  const [ax, ay] = [bA.x, bA.y];
  const [bx, by] = [bB.x, bB.y];
  let [dx, dy] = [prize.x, prize.y];

  if (partTwo) {
    dx += 10000000000000;
    dy += 10000000000000;
  }

  const determinant = ax * by - ay * bx;

  if (determinant === 0) {
    return 0;
  }

  const a = (dx * by - dy * bx) / determinant;
  const b = (ax * dy - ay * dx) / determinant;

  if (!(Number.isInteger(a) && Number.isInteger(b))) return 0;
  if (a >= 100 && b >= 100 && !partTwo) return 0;
  return a * 3 + b;
}

console.log(
  "Part one:",
  input
    .map(({ a, b, prize }) => play(a, b, prize, false))
    .reduce((x, y) => x + y, 0)
);

console.log(
  "Part two:",
  input
    .map(({ a, b, prize }) => play(a, b, prize, true))
    .reduce((x, y) => x + y, 0)
);

console.log(`🧮Finished in ${(performance.now() - start).toFixed(0)}ms🧮`);
