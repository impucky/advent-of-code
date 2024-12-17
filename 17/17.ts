const start = performance.now();
const input = Deno.readTextFileSync("17/input.txt").split("\n\n");

let A: bigint = BigInt(input[0].split("\n")[0].split(": ")[1]);
let B: bigint = 0n;
let C: bigint = 0n;
const programStr = input[1].split(": ")[1].split(",").join("");
const program = input[1].split(": ")[1].split(",").map(BigInt);

function combo(operand: bigint) {
  switch (operand) {
    case 0n:
      return 0n;
    case 1n:
      return 1n;
    case 2n:
      return 2n;
    case 3n:
      return 3n;
    case 4n:
      return A;
    case 5n:
      return B;
    case 6n:
      return C;
    case 7n:
      console.error("When this comes back I'm definitely tapping out lol");
  }
  return 0n;
}

function aaaa() {
  function adv(operand: bigint) {
    const out = A / 2n ** combo(operand);
    A = out;
    i += 2n;
  }

  function bxl(operand: bigint) {
    B = B ^ operand;
    i += 2n;
  }

  function bst(operand: bigint) {
    B = combo(operand) % 8n;
    i += 2n;
  }

  function jnz(operand: bigint) {
    if (A === 0n) i += 2n;
    else i = operand;
  }

  function bxc(operand: bigint) {
    B = B ^ C;
    i += 2n;
  }

  function out(operand: bigint) {
    output += combo(operand) % 8n;
    i += 2n;
  }

  function bdv(operand: bigint) {
    const out = A / 2n ** combo(operand);
    B = out;
    i += 2n;
  }

  function cdv(operand: bigint) {
    const out = A / 2n ** combo(operand);
    C = out;
    i += 2n;
  }

  function run() {
    for (i = 0n; i < program.length; ) {
      const opcode = program[Number(i)];
      const operand = program[Number(i + 1n)];

      switch (opcode) {
        case 0n:
          adv(operand);
          break;
        case 1n:
          bxl(operand);
          break;
        case 2n:
          bst(operand);
          break;
        case 3n:
          jnz(operand);
          break;
        case 4n:
          bxc(operand);
          break;
        case 5n:
          out(operand);
          break;
        case 6n:
          bdv(operand);
          break;
        case 7n:
          cdv(operand);
          break;
      }
    }
  }

  let i: bigint;
  let output = "";
  run();
  console.log("Part one:", output.split("").join(","));
  output = "";

  // pain
  for (let o = 105843715000000n; o < Infinity; o += 1n) {
    A = o;
    run();
    if (output === programStr) {
      console.log("Part two:", Number(o));
      break;
    } else {
      output = "";
      i = 0n;
    }
  }
}

aaaa();

console.log(`\n💩Finished in ${(performance.now() - start).toFixed(0)}💩ms`);
