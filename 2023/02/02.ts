const input = Deno.readTextFileSync("2023/02/input.txt");
type RGB = { r: number; g: number; b: number };
const games = new Map<number, RGB>();

input
  .split("\n")
  .map((line) => line.split(": "))
  .forEach((line) => {
    games.set(Number(line[0].split(" ")[1]), maxRGB(line[1]));
  });

function validPartOne(game: RGB) {
  if (game.r > 12 || game.g > 13 || game.b > 14) return false;
  return true;
}

function maxRGB(rounds: string): RGB {
  const piles = rounds.replaceAll("; ", ", ").split(", ");
  const max = ["red", "green", "blue"]
    .map((color) =>
      piles
        .filter((pile) => pile.includes(color))
        .map((pile) => parseInt(pile.split(" ")[0]))
    )
    .map((totals) => Math.max(...totals));
  return { r: max[0], g: max[1], b: max[2] };
}

console.log(
  "Part one:",
  Array.from(games)
    .map(([id, game]) => (validPartOne(game) ? id : 0))
    .reduce((a, b) => a + b)
);

console.log(
  "Part two:",
  Array.from(games)
    .map(([_id, game]) => game.r * game.g * game.b)
    .reduce((a, b) => a + b)
);
