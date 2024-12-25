const [keys, locks]: [number[][], number[][]] = [[], []];
Deno.readTextFileSync("2024/25/input.txt")
  .split("\r\n\r\n")
  .map((rows) => rows.split("\r\n"))
  .forEach((schematic) => {
    if (schematic[0][0] === "#") {
      keys.push(countHeights(schematic));
    } else {
      locks.push(countHeights(schematic));
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

let partOne = 0;

locks.forEach((lock) => {
  keys.forEach((key) => {
    for (let i = 0; i < 5; i++) {
      if (lock[i] + key[i] > 7) return;
    }
    partOne++;
  });
});

console.log("Part one:", partOne);

console.log(`\n🌟Finished in 25 days🌟`);
