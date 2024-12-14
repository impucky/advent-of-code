const start = performance.now();
const bots = Deno.readTextFileSync("14/input.txt")
  .split("\n")
  .map((bot) => {
    const nums = bot.match(/(?<=)-*\d+/g)!.map(Number);
    return {
      p: { x: nums[0], y: nums[1] },
      v: { x: nums[2], y: nums[3] },
    } as Bot;
  });

type Bot = {
  p: { x: number; y: number };
  v: { x: number; y: number };
};

const [mapW, mapH] = [101, 103];

function moveBot(bot: Bot) {
  const { p, v } = bot;
  let [nx, ny] = [p.x + v.x, p.y + v.y];
  // wrap around
  if (nx < 0) nx += mapW;
  if (nx >= mapW) nx -= mapW;
  if (ny < 0) ny += mapH;
  if (ny >= mapH) ny -= mapH;
  bot.p = { x: nx, y: ny };
}

function getSafetyScore() {
  // NW, NE, SE, SW
  const quadrants = [0, 0, 0, 0];
  // centers
  const [cx, cy] = [(mapW - 1) / 2, (mapH - 1) / 2];
  for (const bot of bots) {
    const { p } = bot;
    // don't count bots outside the 4 quadrants
    if (p.x === cx && p.y === cy) return;
    // NW
    if (p.x < cx && p.y < cy) quadrants[0]++;
    // NE
    if (p.x > cx && p.y < cy) quadrants[1]++;
    // SE
    if (p.x > cx && p.y > cy) quadrants[3]++;
    // SW
    if (p.x < cx && p.y > cy) quadrants[2]++;
  }
  return quadrants.reduce((x, y) => x * y, 1);
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function observeBots() {
  for (let i = 1; i < 10000; i++) {
    for (const bot of bots) {
      moveBot(bot);
    }
    if (i === 100) console.log("\nPart one:", getSafetyScore());
    // used to find patterns, then picture
    // if ((i - 11) % mapW === 0 || (i - 87) % mapH === 0) {
    //   drawMap(makeMap(), i);
    //   await sleep(100);
    // }
    // magic number
    if (i === 6577) {
      console.log("Part two:", 6577, "\n");
      const map = makeMap();
      for (const [i, row] of map.entries()) {
        if (i > 54 && i < 88) console.log(row.slice(27, 58).join(""));
      }
    }
  }
}

function makeMap() {
  const map: string[][] = [];
  for (let y = 0; y < mapH; y++) {
    map.push(new Array(mapW).fill("░"));
  }
  for (const bot of bots) {
    map[bot.p.y][bot.p.x] = "█";
  }
  return map;
}

function renderMap(map: string[][], i: number) {
  // move cursor to top left
  Deno.stdout.write(new TextEncoder().encode("\x1b[H"));
  // draw map
  for (const row of map) {
    Deno.stdout.write(new TextEncoder().encode(row.join("") + "\n"));
  }
  // move cursor to bottom
  Deno.stdout.write(new TextEncoder().encode(`\x1b[${mapH + 3};1H`));
  // print iteration counter
  Deno.stdout.write(new TextEncoder().encode(`Iteration: ${i}`));
}

observeBots();

console.log(
  `\n🚻🤖🎄Finished in ${(performance.now() - start).toFixed(0)}ms🎄🤖🚻`
);
