const start = performance.now();
const input = Deno.readTextFileSync("2024/18/input.txt").split("\n");

let map: string[][] = [];
for (let y = 0; y < 71; y++) {
  map[y] = [];
  for (let x = 0; x < 71; x++) {
    if (input.slice(0, 1024).includes(`${x},${y}`)) {
      map[y][x] = "#";
    } else map[y][x] = ".";
  }
}

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function escape(map: string[][], partOne: boolean) {
  const visited = new Set<string>();
  const queue = [{ x: 0, y: 0, len: 0 }];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    const [cx, cy] = [curr.x, curr.y];

    if (cx === 70 && cy === 70) {
      if (partOne) console.log("Part one: ", curr.len);
      return true;
    }

    for (const [dx, dy] of dirs) {
      const [nx, ny] = [cx + dx, cy + dy];
      if (inBounds(nx, ny) && map[ny][nx] === ".") {
        if (!visited.has(`${nx}:${ny}`)) {
          visited.add(`${nx}:${ny}`);
          queue.push({ x: nx, y: ny, len: curr.len + 1 });
        }
      }
    }
  }
  return;
}

escape(map, true);

for (let i = 1023; i < input.length; i++) {
  const [x, y] = input[i].split(",").map(Number);
  map[y][x] = "O";
  if (!escape(map, false)) {
    console.log("Part two:", `${x},${y}`);
    break;
  }
}

console.log(`\n💩Finished in ${(performance.now() - start).toFixed(0)}ms💩`);
