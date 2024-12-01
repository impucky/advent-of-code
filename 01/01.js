const fs = require("node:fs");

const left = [];
const right = [];

fs.readFileSync("01/input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    left.push(parseInt(line.split("   ")[0]));
    right.push(parseInt(line.split("   ")[1]));
  });

function partOne() {
  let total = 0;
  let ls = left.sort();
  let rs = right.sort();

  for (let i = 0; i < ls.length; i++) {
    total += Math.abs(ls[i] - rs[i]);
  }

  console.log(total);
}

function partTwo() {
  let total = 0;

  for (let i = 0; i < left.length; i++) {
    let match = 0;
    for (let j = 0; j < left.length; j++) {
      if (left[i] === right[j]) match++;
    }
    total += left[i] * match;
  }

  console.log(total);
}

partOne();
partTwo();
