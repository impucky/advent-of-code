const start = performance.now();
const input = Deno.readTextFileSync("2024/12/input.txt");

const map = input.split("\n").map((line) => line.split(""));

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
type Vertex = "TL" | "TR" | "BL" | "BR";

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const eightDirs: Record<Direction, [number, number]> = {
  N: [0, -1],
  NE: [1, -1],
  E: [1, 0],
  SE: [1, 1],
  S: [0, 1],
  SW: [-1, 1],
  W: [-1, 0],
  NW: [-1, -1],
};

function countNeighbors(x: number, y: number, type: string) {
  let neighbors = 0;
  for (const dir of dirs) {
    const [nx, ny] = [x + dir[0], y + dir[1]];
    if (inBounds(nx, ny) && map[ny][nx] === type) {
      neighbors++;
    }
  }
  return neighbors;
}

function countCorners(x: number, y: number, type: string) {
  let total = 0;
  const vertices: Record<Vertex, Direction[]> = {
    TL: ["W", "NW", "N"],
    TR: ["N", "NE", "E"],
    BL: ["W", "SW", "S"],
    BR: ["E", "SE", "S"],
  };
  for (const vert of Object.keys(vertices) as Vertex[]) {
    let shape = "";
    for (const dir of vertices[vert]) {
      const [nx, ny] = [x + eightDirs[dir][0], y + eightDirs[dir][1]];
      if (inBounds(nx, ny)) {
        if (map[ny][nx] === type) shape += "O";
        else shape += "X";
      } else shape += "X";
    }
    if (shape === "XXX" || shape === "XOX" || shape === "OXO") total++;
  }
  return total;
}

function garden(
  start: number[],
  type: string,
  allVisited: Set<string>,
  partTwo: boolean
) {
  const visited = new Set<string>();
  const queue = [start];
  let perimeter = 0;
  let corners = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    for (const dir of dirs) {
      const [nx, ny] = [curr[0] + dir[0], curr[1] + dir[1]];
      if (inBounds(nx, ny) && map[ny][nx] === type) {
        if (!visited.has(`${nx}:${ny}`)) {
          perimeter += 4 - countNeighbors(nx, ny, type);
          corners += countCorners(nx, ny, type);
          visited.add(`${nx}:${ny}`);
          allVisited.add(`${nx}:${ny}`);
          queue.push([nx, ny]);
        }
      }
    }
  }
  // 0 corners or perimeter = single tile plot
  if (partTwo) {
    return corners === 0 ? 4 : visited.size * corners;
  } else {
    return perimeter === 0 ? 4 : visited.size * perimeter;
  }
}

for (const part of ["one", "two"]) {
  // Keep track of previous plots
  const allVisited = new Set<string>();
  let price = 0;
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      // New plot
      if (!allVisited.has(`${x}:${y}`)) {
        // Pass position, plot type, and all visited plots
        price += garden(
          [x, y],
          map[y][x],
          allVisited,
          part === "two" ? true : false
        );
      }
    }
  }
  console.log(`Part ${part}:`, price);
}

console.log(`🌱Finished in ${(performance.now() - start).toFixed(0)}ms🌱`);
