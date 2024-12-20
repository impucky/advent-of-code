const input = Deno.readTextFileSync("2024/05/input.txt").split("\n\n");

const updates: string[][] = input[1]
  .split("\n")
  .map((update) => update.split(","));

const rules: { [key: string]: string[] } = {};

input[0]
  .split("\n")
  .map((rule) => rule.split("|"))
  .forEach((rule) => {
    const [l, r] = rule;
    if (!(l in rules)) {
      rules[l] = [];
    }
    if (!(r in rules)) {
      rules[r] = [];
    }
    rules[r].push(l);
  });

function isValid(update: string[]) {
  for (let i = 0; i <= update.length; i++) {
    const curr = update[i];
    for (let j = i + 1; j < update.length; j++) {
      if (rules[curr].includes(update[j])) {
        return false;
      }
    }
  }
  return true;
}

function sort(update: string[]) {
  while (!isValid(update)) {
    for (let i = 0; i <= update.length; i++) {
      const curr = update[i];
      for (let j = i + 1; j < update.length; j++) {
        if (rules[curr].includes(update[j])) {
          [update[i], update[j]] = [update[j], update[i]];
        }
      }
    }
  }
  return update;
}

function centerToInt(arr: string[]) {
  return parseInt(arr[Math.floor(arr.length / 2)]);
}

// Part one
console.log(
  updates
    .filter(isValid)
    .map(centerToInt)
    .reduce((a, b) => a + b)
);
// Part two
console.log(
  updates
    .filter((u) => !isValid(u))
    .map(sort)
    .map(centerToInt)
    .reduce((a, b) => a + b)
);
