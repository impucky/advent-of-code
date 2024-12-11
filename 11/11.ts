const start = performance.now();
const input = Deno.readTextFileSync("11/input.txt");

type Stones = { [key: string]: number };

function blink(stones: Stones) {
  const newStones: Stones = {};

  for (const [key, count] of Object.entries(stones)) {
    if (+key === 0) {
      if (!(1 in newStones)) newStones[1] = 0;
      newStones[1] += count;
    } else if (key.length % 2 === 0) {
      const [left, right] = [
        parseInt(key.slice(0, key.length / 2)),
        parseInt(key.slice(key.length / 2, key.length)),
      ];
      if (!(left in newStones)) newStones[left] = 0;
      if (!(right in newStones)) newStones[right] = 0;
      newStones[left] += count;
      newStones[right] += count;
    } else {
      if (!(+key * 2024 in newStones)) newStones[+key * 2024] = 0;
      newStones[+key * 2024] += count;
    }
  }
  return newStones;
}

let stones: Stones = {};

input.split(" ").forEach((s) => {
  stones[s] = 1;
});

for (let i = 0; i < 75; i++) {
  if (i === 25)
    console.log(
      "Part one:",
      Object.values(stones).reduce((a, b) => a + b)
    );
  stones = blink(stones);
}

console.log(
  "Part two:",
  Object.values(stones).reduce((a, b) => a + b)
);

console.log(`🗿Finished in ${(performance.now() - start).toFixed(0)}ms🗿`);
