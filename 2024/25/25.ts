const start = performance.now();
const [keys, locks]: [string[][], string[][]] = [[], []];
const input = Deno.readTextFileSync("2024/25/input.txt")
  .split("\r\n\r\n")
  .map((rows) => rows.split("\r\n"))
  .forEach((schematic) => {
    if (schematic[0][0] === "#") {
      keys.push(schematic);
    } else {
      locks.push(schematic);
    }
  });

function countHeights(schematic: string[]) {
  return schematic.reduce(
    (acc, row) => {
      row.split("").forEach((char, i) => {
        if (char === "#") acc[i]++;
      });
      return acc;
    },
    [0, 0, 0, 0, 0]
  );
}

const kh = keys.map(countHeights);
const lh = locks.map(countHeights);

let partOne = 0;

lh.forEach((lock) => {
  kh.forEach((key) => {
    for (let i = 0; i < 5; i++) {
      if (lock[i] + key[i] > 7) return;
    }
    partOne++;
  });
});

console.log("Part one:", partOne);
console.log("Part two:");

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms`);
