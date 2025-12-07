const start = performance.now();
const map = Deno.readTextFileSync("2025/07/input.txt")
  .split("\r\n")
  .map(line => line.split(""));

const [startX, startY] = [map[0].indexOf("S"), 0];
let splits = 0;
function beamFrom(x: number, y: number) {
  if (map[y][x] === "|") return;
  while (map[y][x] === "." && y < map.length - 1) {
    map[y][x] = "|";
    y++;
  }
  if (y < map.length && map[y][x] === "^") {
    splits++;
    beamFrom(x - 1, y);
    beamFrom(x + 1, y);
  }
}
beamFrom(startX, startY + 1);

// Part two
const tachyons: number[] = map[0].map(cell => (cell === "." ? 0 : 1));

for (let y = 2; y < map.length; y++) {
  if (y % 2 !== 0) continue;
  for (let x = 0; x < map[0].length; x++) {
    if (map[y][x] === "^") {
      tachyons[x - 1] += tachyons[x];
      tachyons[x + 1] += tachyons[x];
      tachyons[x] = 0;
    }
  }
}

console.log("Part one:", splits);
console.log(
  "Part two:",
  tachyons.reduce((a, b) => a + b)
);

console.log(`\n📡Finished in ${(performance.now() - start).toFixed(0)}ms📡`);
