const start = performance.now();
const input = Deno.readTextFileSync("./06/input.txt").split("\n");

const map = input.map((line) => line.split(""));

const startY = input.findIndex((row) => row.includes("^"));
const startingCoords = [input[startY].indexOf("^"), startY];

const directions = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
};

const turns = ["UP", "RIGHT", "DOWN", "LEFT"];

type DirKey = keyof typeof directions;
type vec2 = [number, number];

function turnRight(current: DirKey): DirKey {
  const index = turns.indexOf(current);
  return turns[(index + 1) % turns.length] as DirKey;
}

function step(start: number[], direction: DirKey) {
  const [x, y] = start;
  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
}

// Walk through map and record path
function walk(partOne: boolean): boolean | Set<string> {
  let [x, y] = startingCoords;
  const visited = new Set<string>();
  const states = new Set<string>();
  let direction: DirKey = "UP";
  let [nextX, nextY] = step([x, y], direction);
  while (
    nextX >= 0 &&
    nextX < map[0].length &&
    nextY >= 0 &&
    nextY < map.length
  ) {
    // Check for loops on part two
    if (!partOne) {
      const state = `${x}:${y}:${direction}`;
      if (states.has(state)) {
        return true;
      }
      states.add(state);
    }
    // Turn
    if (map[nextY][nextX] === "#") {
      direction = turnRight(direction);
    } else {
      [x, y] = [nextX, nextY];
    }
    // Mark path on part one
    if (partOne) visited.add(`${x}:${y}`);
    [nextX, nextY] = step([x, y], direction);
  }
  return partOne ? visited : false;
}

function countLoops() {
  let total = 0;
  for (const coords of visited) {
    const [x, y] = coords.split(":").map((n) => parseInt(n));
    if (map[y][x] === ".") {
      map[y][x] = "#";
      if (walk(false)) total++;
      map[y][x] = ".";
    }
  }
  return total;
}

const visited = walk(true) as Set<string>;

// Part 1 (+1 for starting point)
console.log("Part one:", visited.size + 1);
// Part 2
console.log("Part two:", countLoops());

// Quite a bit faster! 💩
const end = performance.now();
console.log(`💩Finished in ${(end - start).toFixed(0)}ms💩`);
