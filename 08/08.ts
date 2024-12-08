const start = performance.now();
const input = Deno.readTextFileSync("08/input.txt").split("\n");

const map = input.map((line) => line.split(""));

// List all antennas
const antennas = new Map<string, number[][]>();
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (map[y][x] !== ".") {
      const signal = map[y][x];
      if (!antennas.has(signal)) {
        antennas.set(signal, []);
      }
      antennas.get(signal)!.push([x, y]);
    }
  }
}

function inBounds(x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

const antinodesP1 = new Set<string>();
const antinodesP2 = new Set<string>();

antennas.forEach((freq) => {
  for (let i = 0; i < freq.length; i++) {
    for (let j = i + 1; j < freq.length; j++) {
      const [a1x, a1y] = freq[i];
      const [a2x, a2y] = freq[j];
      // In part two every antenna is also an antinode unless there's only one of its kind
      antinodesP2.add(`${a1x}:${a1y}`);
      antinodesP2.add(`${a2x}:${a2y}`);
      const [dx, dy] = [a2x - a1x, a2y - a1y];
      let [n1x, n1y] = [a1x - dx, a1y - dy];
      let [n2x, n2y] = [a2x + dx, a2y + dy];
      // Part 1
      if (inBounds(n1x, n1y)) {
        antinodesP1.add(`${n1x}:${n1y}`);
      }
      if (inBounds(n2x, n2y)) {
        antinodesP1.add(`${n2x}:${n2y}`);
      }
      // Part 2
      while (inBounds(n1x, n1y)) {
        antinodesP2.add(`${n1x}:${n1y}`);
        [n1x, n1y] = [n1x - dx, n1y - dy];
      }
      while (inBounds(n2x, n2y)) {
        antinodesP2.add(`${n2x}:${n2y}`);
        [n2x, n2y] = [n2x + dx, n2y + dy];
      }
    }
  }
});

console.log("There are", antinodesP1.size, "antinodes.");
console.log("Wait, actually there's", antinodesP2.size, "!");

console.log(`📡Finished in ${(performance.now() - start).toFixed(0)}ms📡`);
