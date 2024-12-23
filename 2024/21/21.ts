const start = performance.now();
const input = Deno.readTextFileSync("2024/21/input.txt").split("\n");

const moves = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const moveStr = ["^", ">", "v", "<"];

const numpad = [
  ["#", "#", "#", "#", "#"],
  ["#", "7", "8", "9", "#"],
  ["#", "4", "5", "6", "#"],
  ["#", "1", "2", "3", "#"],
  ["#", "#", "0", "A", "#"],
  ["#", "#", "#", "#", "#"],
];

const numpos: Record<string, [number, number]> = {
  "7": [1, 1],
  "8": [2, 1],
  "9": [3, 1],
  "4": [1, 2],
  "5": [2, 2],
  "6": [3, 2],
  "1": [1, 3],
  "2": [2, 3],
  "3": [3, 3],
  "0": [2, 4],
  "A": [3, 4],
};

const dirpad = [
  ["#", "#", "#", "#", "#"],
  ["#", "#", "^", "A", "#"],
  ["#", "<", "v", ">", "#"],
  ["#", "#", "#", "#", "#"],
];

const dirpos: Record<string, [number, number]> = {
  "^": [2, 1],
  "A": [3, 1],
  "<": [1, 2],
  "v": [2, 2],
  ">": [3, 2],
};

const zigZags = ["^>^", ">^>", "v>v", ">v>", "v<v", "<v<", "^<^", "<^<"];

function findPaths(pad: string[][], [sx, sy]: number[], [gx, gy]: number[]) {
  type state = {
    x: number;
    y: number;
    path: string;
  };
  const visited = new Map<string, number>();
  const queue: state[] = [{ x: sx, y: sy, path: "" }];
  let paths: string[] = [];
  let smallestLength = Infinity;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    const [cx, cy] = [curr.x, curr.y];
    const record = `${cx}:${cy}`;
    const len = curr.path.length;

    // found goal
    if (cx === gx && cy === gy) {
      if (len < smallestLength) {
        // new smallest length => discard old paths
        paths = [curr.path];
        smallestLength = len;
      } else if (len === smallestLength) {
        // match for shortest len, keep path
        paths.push(curr.path);
      }
    }

    if ((visited.get(record) ?? Infinity) < len) continue;
    visited.set(record, len);
    if (len > smallestLength) continue;

    // Check all directions
    moves.forEach(([dx, dy], index) => {
      const [nx, ny] = [cx + dx, cy + dy];
      if (pad[ny][nx] === "#") return;
      const newState = {
        x: nx,
        y: ny,
        path: curr.path + moveStr[index],
      };
      queue.push(newState);
    });
  }
  return paths
    .filter((path) => !zigZags.some((str) => path.includes(str)))
    .filter((path) => path[0] !== path[path.length - 1] || path.length < 4);
}

function makeSequences(
  keys: string,
  index: number,
  prevKey: string,
  currPath: string,
  result: string[]
): string[] {
  if (index === keys.length) {
    result.push(currPath);
    return [];
  }
  paths.get(`${prevKey}:${keys[index]}`)!.forEach((path) => {
    makeSequences(keys, index + 1, keys[index], currPath + path + "A", result);
  });
  return result;
}

function bestSequence(keys: string, depth: number, cache: Map<string, number>) {
  let total = 0;
  if (depth === 0) return keys.length;
  if (cache.has(`${keys}:${depth}`)) {
    return cache.get(`${keys}:${depth}`)!;
  }
  const segments = keys.match(/.*?A/g)!;
  segments.forEach((segment) => {
    const seqs = makeSequences(segment, 0, "A", "", []);
    total += Math.min(...seqs.map((s) => bestSequence(s, depth - 1, cache)));
  });
  cache.set(`${keys}:${depth}`, total);
  return total;
}

const paths = new Map<string, string[]>();
Object.keys(numpos).forEach((a) => {
  Object.keys(numpos).forEach((b) => {
    paths.set(`${a}:${b}`, findPaths(numpad, numpos[a], numpos[b]));
  });
});
Object.keys(dirpos).forEach((a) => {
  Object.keys(dirpos).forEach((b) => {
    paths.set(`${a}:${b}`, findPaths(dirpad, dirpos[a], dirpos[b]));
  });
});

let totalP1 = 0;
let totalP2 = 0;
const cache = new Map<string, number>();

function toNum(str: string) {
  return Number(str.replace("A", ""));
}

input.forEach((code) => {
  const seqs = makeSequences(code, 0, "A", "", []);
  const num = toNum(code);
  totalP1 += Math.min(...seqs.map((s) => bestSequence(s, 2, cache))) * num;
  totalP2 += Math.min(...seqs.map((s) => bestSequence(s, 25, cache))) * num;
});

console.log("Part one:", totalP1);
console.log("Part two:", totalP2);

console.log(`\n💀Finished in ${(performance.now() - start).toFixed(0)}ms💀`);
