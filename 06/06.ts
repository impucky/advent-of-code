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

function turnRight(current: DirKey): DirKey {
  const index = turns.indexOf(current);
  return turns[(index + 1) % turns.length] as DirKey;
}

function step(start: number[], direction: DirKey) {
  const [x, y] = start;
  const [dx, dy] = directions[direction];
  return [x + dx, y + dy];
}

function countVisited(start: number[], map: string[][]): number {
  let total = 1;
  let direction: DirKey = "UP";
  let [x, y] = start;
  let [nextX, nextY] = step([x, y], direction);
  while (
    nextX >= 0 &&
    nextX < map[0].length &&
    nextY >= 0 &&
    nextY < map.length
  ) {
    // Turn
    if (map[nextY][nextX] === "#") {
      direction = turnRight(direction);
    } else {
      [x, y] = [nextX, nextY];
      // Mark visited
      if (map[y][x] === ".") {
        total++;
        map[y][x] = "X";
      }
    }
    [nextX, nextY] = step([x, y], direction);
  }
  return total;
}

function mapHasLoop(start: number[], map: string[][]) {
  const visited = new Set<string>();
  let direction: DirKey = "UP";
  let [x, y] = start;
  let [nextX, nextY] = step([x, y], direction);
  while (
    nextX >= 0 &&
    nextX < map[0].length &&
    nextY >= 0 &&
    nextY < map.length
  ) {
    // Check for loops
    const state = `${x}:${y}:${direction}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(state);
    // Turn
    if (map[nextY][nextX] === "#") {
      direction = turnRight(direction);
    } else {
      [x, y] = [nextX, nextY];
      // Mark visited
    }
    [nextX, nextY] = step([x, y], direction);
  }
  return false;
}

function countLoops() {
  let total = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === ".") {
        map[y][x] = "#";
        if (mapHasLoop(startingCoords, map)) total++;
        map[y][x] = ".";
      }
    }
  }
  return total;
}

// Part 1
console.log(
  "Part one:",
  countVisited(startingCoords, JSON.parse(JSON.stringify(map)))
);
// Part 2
console.log("Part two:", countLoops());

// Yep, pretty slow 💩
const end = performance.now();
console.log(`💩Finished in ${(end - start).toFixed(0)}ms💩`);
