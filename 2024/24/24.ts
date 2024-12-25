const start = performance.now();
const input = Deno.readTextFileSync("2024/24/input.txt").split("\r\n\r\n");

type Gate = { inputs: string[]; type: string; value: number | null };
const wires: { [key: string]: number } = {};
const gates: { [key: string]: Gate } = {};

input[0]
  .split("\r\n")
  .map((line) => line.split(": "))
  .forEach(([wire, value]) => {
    wires[wire] = parseInt(value);
  });

input[1]
  .split("\r\n")
  .map((line) => line.split(" -> "))
  .forEach(([inputs, output]) => {
    const [a, type, b] = inputs.split(" ");
    gates[output] = { inputs: [a, b], type, value: null };
  });

while (Object.values(gates).filter(({ value }) => value === null).length > 0) {
  Object.entries(gates)
    .filter(([_output, gate]) => gate.value === null)
    .forEach(([output, gate]) => {
      const { inputs, type } = gate;
      const [a, b] = [wires[inputs[0]], wires[inputs[1]]];
      if (a === undefined || b === undefined) return;
      if (type === "AND") {
        gate.value = a && b;
        wires[output] = gate.value;
      }
      if (type === "OR") {
        gate.value = a || b;
        wires[output] = gate.value;
      }
      if (type === "XOR") {
        gate.value = a ^ b;
        wires[output] = gate.value;
      }
    });
}

const output = Object.keys(wires)
  .filter((wire) => wire.startsWith("z"))
  .sort()
  .reverse()
  .reduce((acc, curr) => {
    return (acc += wires[curr]);
  }, "");

function makeDot(input: { [key: string]: Gate }) {
  const lines = ["digraph {", "  rankdir=LR;"];
  for (const [output, { inputs, type }] of Object.entries(input)) {
    lines.push(`  ${output} [label="${output}\\n${type}\", shape=box];`);
    for (const inputWire of inputs) {
      lines.push(`  ${inputWire} -> ${output};`);
    }
  }
  lines.push("}");
  return lines.join("\n");
}

console.log("Part one:", parseInt(output, 2));

// Manual with graphviz
console.log(
  "Part two:",
  ["z06", "ksv", "nbd", "kbs", "tqq", "z20", "z39", "ckb"].sort().join(",")
);

console.log(makeDot(gates));

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms`);
