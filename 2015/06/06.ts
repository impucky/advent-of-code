const start = performance.now();
const input = Deno.readTextFileSync("2015/06/input.txt")
  .split("\n")
  .map((line) => {
    const coords = line.match(/(\d+)/g)!.map(Number);
    return {
      cmd: line.split(/\d+/g)[0].trim(),
      from: [coords[0], coords[1]],
      to: [coords[2], coords[3]],
    } as cmd;
  });

type cmd = { cmd: string; from: number[]; to: number[] };

const map = Array.from(Array(1000), () => new Array(1000).fill(false));
const map2 = Array.from(Array(1000), () => new Array(1000).fill(0));

function exec({ cmd, from, to }: cmd) {
  for (let x = from[0]; x <= to[0]; x++) {
    for (let y = from[1]; y <= to[1]; y++) {
      if (cmd === "turn on") {
        map[y][x] = true;
        map2[y][x] += 1;
      }
      if (cmd === "turn off") {
        map[y][x] = false;
        if (map2[y][x] > 0) map2[y][x] -= 1;
      }
      if (cmd === "toggle") {
        map[y][x] = !map[y][x];
        map2[y][x] += 2;
      }
    }
  }
}

input.forEach(exec);

console.log(
  "Part one:",
  map.reduce((acc, curr) => acc + curr.filter((c) => c === true).length, 0)
);
console.log(
  "Part two:",
  map2.reduce((acc, curr) => acc + curr.reduce((a, b) => a + b, 0), 0)
);

console.log(`\n💡Finished in ${(performance.now() - start).toFixed(0)}ms💡`);
