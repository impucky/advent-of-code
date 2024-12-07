const start = performance.now();
const input = Deno.readTextFileSync("07/input.txt");

const inputs = [];

for (const line of input.split("\n")) {
  const [a, b] = line.split(": ");
  inputs.push([Number(a), ...b.split(" ").map(Number)]);
}

// Rotate through permutations of operators
// 0, 1, 2 = multiply, add, concat
function rotate(ops: number[], max: number) {
  for (let i = 0; i < ops.length; i++) {
    if (ops[i] < max) {
      ops[i]++;
      break;
    } else if (ops[i] === max) {
      ops[i] = 0;
    }
  }
  return ops;
}

function find(input: number[], max: number) {
  const target = input[0];
  const terms = input.slice(1);
  let total = terms[0];
  // Start with * * *
  let ops = Array(terms.length - 1).fill(0);
  // Max number of possible equations
  const permutations = (max + 1) ** ops.length;
  for (let n = 0; n < permutations; n++) {
    for (let i = 0; i < terms.length - 1; i++) {
      // Go through the equation with current operators
      const next = terms[i + 1];
      if (ops[i] === 0) {
        total *= next;
      } else if (ops[i] === 1) {
        total += next;
      } else if (ops[i] === 2) {
        const concat = Number(total.toString() + next.toString());
        total = concat;
      }
      // No point continuing if it overshoots
      if (total > target) {
        break;
      }
    }
    // Found a solution?
    if (total === target) {
      return target;
    }
    // Else rotate and try again
    total = terms[0];
    ops = rotate(ops, max);
  }
  // No solution found
  return 0;
}

console.log(
  "Part one:",
  inputs.map((input) => find(input, 1)).reduce((a, b) => a + b)
);

console.log(
  "Part two:",
  inputs.map((input) => find(input, 2)).reduce((a, b) => a + b)
);

// Not that bad? ¯\_(ツ)_/¯
console.log(`💩Finished in ${(performance.now() - start).toFixed(0)}ms💩`);
