const start = performance.now();
const input = Deno.readTextFileSync("2025/01/input.txt").split("\r\n");

let position = 50;
let part1 = 0;
let part2 = 0;

input.forEach(move => {
  const clicks = +move.substring(1);

  if (move.startsWith("L")) {
    for (let i = 0; i < clicks; i++) {
      position -= 1;
      if (position < 0) position = 99;
      if (position === 0) part2 += 1;
    }
  } else if (move.startsWith("R")) {
    for (let i = 0; i < clicks; i++) {
      position += 1;
      if (position > 99) position = 0;
      if (position === 0) part2 += 1;
    }
  }

  if (position === 0) part1++;
});

console.log("Part one:", part1);
console.log("Part two:", part2);

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms 🔒`);
