const start = performance.now();
const map = Deno.readTextFileSync("10/input.txt")
  .split("\n")
  .map((line) => line.split("").map(Number));

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

const trailHeads: number[][] = [];
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (map[y][x] === 0) {
      trailHeads.push([x, y]);
    }
  }
}

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function hike(start: number[], partTwo: boolean) {
  const visited = new Set<string>();
  const queue = [start];
  let score = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (map[curr[1]][curr[0]] === 9) {
      score++;
    }
    for (const dir of dirs) {
      const [nx, ny] = [curr[0] + dir[0], curr[1] + dir[1]];
      if (inBounds(nx, ny) && map[curr[1]][curr[0]] + 1 === map[ny][nx]) {
        if (!visited.has(`${nx}:${ny}`)) {
          if (!partTwo) visited.add(`${nx}:${ny}`);
          queue.push([nx, ny]);
        }
      }
    }
  }
  return score;
}

// Part one
console.log(
  trailHeads.map((start) => hike(start, false)).reduce((a, b) => a + b)
);

// Part two
console.log(
  trailHeads.map((start) => hike(start, true)).reduce((a, b) => a + b)
);

console.log(`💩Finished in ${(performance.now() - start).toFixed(0)}ms💩`);
