const start = performance.now();
const input = Deno.readTextFileSync("16/input.txt");

const map = input.split("\n").map((line) => line.split(""));

function findTile(map: string[][], target: string) {
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === target) {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

const moves = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

const S = findTile(map, "S");

function findPaths(map: string[][], [sx, sy]: number[]) {
  type state = {
    x: number;
    y: number;
    dir: number;
    path: string[];
    score: number;
  };
  const visited = new Map<string, number>();
  const queue: state[] = [{ x: sx, y: sy, dir: 0, path: [], score: 0 }];
  let paths: string[][] = [];
  let smallestScore = Infinity;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const [cx, cy] = [curr.x, curr.y];
    const record = `${cx}:${cy}:${curr.dir}`;
    curr.path.push(record);
    if (map[cy][cx] === "E") {
      if (curr.score < smallestScore) {
        // new smallest score => discard old paths
        paths = [curr.path];
        smallestScore = curr.score;
      } else if (curr.score === smallestScore) {
        // match for best score, keep path
        paths.push(curr.path);
      }
    }

    if ((visited.get(record) ?? Infinity) < curr.score) continue;
    visited.set(record, curr.score);
    if (curr.score > smallestScore) continue;

    // Check all directions
    const [cdx, cdy] = moves[curr.dir];
    moves.forEach(([dx, dy], index) => {
      // only 90deg turns
      if (dx === -cdx && dy === -cdy) return;
      const [nx, ny] = [cx + dx, cy + dy];
      if (map[ny][nx] === "#") return;
      const score = curr.score + (index === curr.dir ? 1 : 1001);
      const newState = {
        x: nx,
        y: ny,
        dir: index,
        path: [...curr.path],
        score,
      };
      queue.push(newState);
    });
  }
  console.log("Part one:", smallestScore);
  return paths;
}

const bestPaths = findPaths(map, S);

const seats = new Set<string>();
bestPaths.forEach((path) => {
  path.forEach((pos) => {
    seats.add(`${pos.split(":")[0]}:${pos.split(":")[1]}`);
  });
});

console.log("Part two:", seats.size);

console.log(`\n🦌Finished in ${(performance.now() - start).toFixed(0)}ms🦌`);
