const start = performance.now();
const input = Deno.readTextFileSync("2024/22/input.txt")
  .split("\n")
  .map(Number);

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function secret(secret: number) {
  let n = secret * 64;
  secret = secret ^ n;
  secret = mod(secret, 16777216);
  n = Math.floor(secret / 32);
  secret = secret ^ n;
  secret = mod(secret, 16777216);
  n = secret * 2048;
  secret = secret ^ n;
  secret = mod(secret, 16777216);
  return secret;
}

function prediction(n: number) {
  const costs = [];
  for (let i = 0; i < 2000; i++) {
    n = secret(n);
    costs.push(n % 10);
  }
  // Save costs for part 2
  traderCosts.push(costs);
  return n;
}

function stonks(costs: number[]) {
  // Keep track of sequences for current monkey
  const sequences = new Set<string>();
  costs.forEach((cost, i) => {
    if (i >= 4) {
      const [l1, l2, l3, l4] = [
        costs[i - 3] - costs[i - 4],
        costs[i - 2] - costs[i - 3],
        costs[i - 1] - costs[i - 2],
        cost - costs[i - 1],
      ];
      const seq = `${l1},${l2},${l3},${l4}`;
      // Only record the price if the sequence is new
      if (!sequences.has(seq)) {
        sequences.add(seq);
        // Add the cost to the total cost for that sequence
        const prev = allSequences.get(seq);
        if (prev) allSequences.set(seq, cost + prev);
        else allSequences.set(seq, cost);
      }
    }
  });
}

const allSequences = new Map<string, number>();
const traderCosts: number[][] = [];
const secrets = input.map(prediction);
traderCosts.forEach((costs) => stonks(costs));

console.log(
  "Part one:",
  secrets.reduce((a, b) => a + b)
);

console.log("Part two:", Math.max(...allSequences.values()));

console.log(`\n🍌Finished in ${(performance.now() - start).toFixed(0)}ms🍌`);
