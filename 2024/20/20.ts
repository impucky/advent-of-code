const start = performance.now();
const map = Deno.readTextFileSync("2024/20/input.txt")
  .split("\n")
  .map((line) => line.split(""));

function findTile(target: string) {
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === target) {
        return [x, y];
      }
    }
  }
}

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const [startPos, endPos] = [findTile("S")!, findTile("E")!];

function race(map: string[][], [sx, sy]: number[], [ex, ey]: number[]) {
  const visited = new Set<string>();
  const queue = [{ x: sx, y: sy, len: 0, path: [[sx, sy, 0]] }];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const [cx, cy] = [curr.x, curr.y];

    if (cx === ex && cy === ey) {
      return curr.path;
    }

    for (const [dx, dy] of dirs) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (map[ny][nx] !== "#") {
        if (!visited.has(`${nx}:${ny}`)) {
          visited.add(`${nx}:${ny}`);
          queue.push({
            x: nx,
            y: ny,
            len: curr.len + 1,
            path: [...curr.path, [nx, ny, curr.len + 1]],
          });
        }
      }
    }
  }
  return;
}

// Get the full path to the end with [x, y, distance from start]
const path = race(map, startPos, endPos)!;
let [p1, p2] = [0, 0];

// For every pair check if travelling there (within cheat distance) saves time
for (let i = 0; i < path.length; i++) {
  for (let j = i + 2; j < path.length; j++) {
    const [cx, cy, cd] = path[i];
    const [nx, ny, nd] = path[j];
    const dist = Math.abs(nx - cx) + Math.abs(ny - cy);
    const savedTime = nd - cd - dist;
    if (dist === 2 && savedTime >= 100) p1++;
    if (dist <= 20 && savedTime >= 100) p2++;
  }
}

console.log("Part one:", p1);
console.log("Part two:", p2);

console.log(`\n🏃Finished in ${(performance.now() - start).toFixed(0)}ms🏃`);
