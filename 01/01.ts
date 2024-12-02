const left: number[] = [];
const right: number[] = [];

Deno.readTextFileSync("01/input.txt")
  .split("\n")
  .forEach((line) => {
    left.push(parseInt(line.split("   ")[0]));
    right.push(parseInt(line.split("   ")[1]));
  });

function partOne() {
  let total = 0;
  const ls = left.sort();
  const rs = right.sort();

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
