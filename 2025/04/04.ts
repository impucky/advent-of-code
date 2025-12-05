const start = performance.now();
const input = Deno.readTextFileSync("2025/04/input.txt").split("\r\n");

const map = input.map(line => line.split(""));

let p1 = 0;
let p2 = 0;

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function countRolls(x: number, y: number) {
  const dirs = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
  let count = 0;
  for (const dir of dirs) {
    const [nx, ny] = [x + dir[0], y + dir[1]];
    const isInBounds = inBounds(nx, ny);
    if (isInBounds && map[ny][nx] === "@") {
      count++;
    }
  }
  return count;
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (input[y][x] === ".") continue;
    if (countRolls(x, y) < 4) {
      p1++;
    }
  }
}

// Jumping back to the start of the previous row after clearing a paper roll
// Could be smarter but it's plenty fast
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    if (map[y][x] === ".") continue;
    if (countRolls(x, y) < 4) {
      map[y][x] = ".";
      p2++;
      x = 0;
      if (y > 0) y--;
    }
  }
}

console.log("Part one:", p1);
console.log("Part two:", p2);

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms 🧻`);
