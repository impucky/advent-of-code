const start = performance.now();
const input = Deno.readTextFileSync("2025/06/input.txt").split("\r\n");
const inputA = input.map(line => line.trim().split(/\s+/));
const totalProblems = inputA[0].length;
const height = input.length;
const length = input[0].length;

let p1 = 0;
for (let i = 0; i < totalProblems; i++) {
  const op = inputA[height - 1][i];
  let result = 0;
  for (let j = 0; j < height - 1; j++) {
    if (j === 0) {
      result += +inputA[j][i];
      continue;
    }
    if (op === "*") result *= +inputA[j][i];
    if (op === "+") result += +inputA[j][i];
  }
  p1 += result;
  result = 0;
}

const ops = input[height - 1];
let op = input[height - 1][0];
let p2 = 0;
let result = 0;

for (let i = 0; i < length; i++) {
  // Updating the total & operand when we reach a new problem
  if (ops[i] !== " " && i !== 0) {
    p2 += result;
    result = 0;
    op = ops[i];
  }
  // Parsing cols and calculating
  while ((i + 1 < length && ops[i + 1] === " ") || i === length - 1) {
    let num = "";
    for (let j = 0; j < height - 1; j++) {
      const row = input[j][i];
      if (row) num += row;
    }
    if (result === 0) result = +num;
    else if (op === "*") result *= +num;
    else if (op === "+") result += +num;
    i++;
  }
}
// Adding the last result
p2 += result;

// Whatever, it works 😭

console.log("Part one:", p1);
console.log("Part two:", p2);

console.log(`\n🐙Finished in ${(performance.now() - start).toFixed(0)}ms🐙`);
