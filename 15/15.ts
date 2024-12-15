const start = performance.now();
const input = Deno.readTextFileSync("15/input.txt");

const moves = input.split("\n\n")[1].replaceAll("\n", "").split("") as Dir[];

const map = input
  .split("\n\n")[0]
  .split("\n")
  .map((line) => line.split(""));
//  ¯\_(ツ)_/¯
let map2 = input
  .split("\n\n")[0]
  .split("\n")
  .map((line) =>
    line
      .replaceAll("#", "##")
      .replaceAll(".", "..")
      .replaceAll("O", "[]")
      .replaceAll("@", "@.")
      .split("")
  );

function findBot(map: string[][]) {
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === "@") {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

type Dir = "^" | ">" | "v" | "<";
const dirs: Record<Dir, [number, number]> = {
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
  "<": [-1, 0],
};

function step([dx, dy]: number[], map: string[][]) {
  const [x, y] = [bot1[0], bot1[1]];
  const [nx, ny] = [bot1[0] + dx, bot1[1] + dy];
  if (map[ny][nx] === "#") return;
  if (map[ny][nx] === ".") {
    map[y][x] = ".";
    bot1 = [nx, ny];
    map[ny][nx] = "@";
  }
  if (map[ny][nx] === "O") {
    let [nextX, nextY] = [nx, ny];
    while (map[nextY][nextX] === "O") {
      nextX += dx;
      nextY += dy;
      if (map[nextY][nextX] === "#") return;
      if (map[nextY][nextX] === ".") {
        map[y][x] = ".";
        bot1 = [nx, ny];
        map[ny][nx] = "@";
        map[nextY][nextX] = "O";
        return;
      }
    }
  }
}

function stepP2([dx, dy]: number[], map: string[][], move: Dir) {
  const [x, y] = [bot2[0], bot2[1]];

  const toMove = new Set<string>().add(`${x}:${y}`);
  const moving = [[x, y]];
  while (moving.length > 0) {
    let [nx, ny] = moving.pop()!;
    nx += dx;
    ny += dy;
    const tile = map[ny][nx];
    if (tile === "#") return;
    if (tile === "[" || tile === "]") {
      moving.push([nx, ny]);
      toMove.add(`${nx}:${ny}`);
      if (move === "^" || move === "v") {
        if (tile === "[") {
          moving.push([nx + 1, ny]);
          toMove.add(`${nx + 1}:${ny}`);
        } else if (tile === "]") {
          moving.push([nx - 1, ny]);
          toMove.add(`${nx - 1}:${ny}`);
        }
      }
    }
  }

  const newMap: string[][] = [];
  for (let y = 0; y < map.length; y++) {
    newMap.push([]);
    for (let x = 0; x < map[y].length; x++) {
      newMap[y].push(map[y][x]);
    }
  }
  toMove.forEach((coords) => {
    const [x, y] = coords.split(":").map(Number);
    newMap[y][x] = ".";
  });
  toMove.forEach((coords) => {
    const [x, y] = coords.split(":").map(Number);
    newMap[y + dy][x + dx] = map[y][x];
  });
  bot2 = [x + dx, y + dy];
  map2 = newMap;
  return;
}

let bot1: number[] = findBot(map);
let bot2: number[] = findBot(map2);

for (const move of moves) {
  step(dirs[move], map);
  stepP2(dirs[move], map2, move);
}

let totalP1 = 0;
let totalP2 = 0;

for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (map[y][x] === "O") {
      totalP1 += 100 * y + x;
    }
  }
}

for (let x = 0; x < map2[0].length; x++) {
  for (let y = 0; y < map2.length; y++) {
    if (map2[y][x] === "[") {
      totalP2 += 100 * y + x;
    }
  }
}

console.log("Part one:", totalP1);
console.log("Part two:", totalP2);

console.log(`\n📦Finished in ${(performance.now() - start).toFixed(0)}ms📦`);
