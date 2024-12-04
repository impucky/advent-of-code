const input: string[][] = Deno.readTextFileSync("04/input.txt")
  .split("\n")
  .map((line) => line.split(""));

const directions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

function traverse(grid: string[][]) {
  let totalXMAS = 0;
  let totalX = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (x > 0 && x < grid[0].length - 1 && y > 0 && y < grid.length - 1) {
        if (grid[y][x] === "A") {
          totalX += searchX(grid, x, y);
        }
      }
      if (grid[y][x] === "X") {
        totalXMAS += searchXMAS(grid, x, y);
      }
    }
  }
  console.log(`XMASes: ${totalXMAS} | X-Mases: ${totalX}`);
}

function searchXMAS(grid: string[][], startX: number, startY: number) {
  let count = 0;
  for (const [dx, dy] of directions) {
    let newX = startX + dx;
    let newY = startY + dy;

    for (let step = 1; step < 4; step++) {
      if (
        newX >= 0 &&
        newX < grid[0].length &&
        newY >= 0 &&
        newY < grid.length
      ) {
        if (grid[newY][newX] === "XMAS"[step]) {
          if (step === 3) count++;
        } else break;
      }
      newX += dx;
      newY += dy;
    }
  }
  return count;
}

function searchX(grid: string[][], startX: number, startY: number) {
  const d1 = grid[startY - 1][startX - 1] + grid[startY + 1][startX + 1];
  const d2 = grid[startY - 1][startX + 1] + grid[startY + 1][startX - 1];
  if ((d1 === "MS" || d1 === "SM") && (d2 === "MS" || d2 === "SM")) return 1;
  else return 0;
}

traverse(input);
