const start = performance.now();
const input = Deno.readTextFileSync("2024/23/input.txt").split("\r\n");

const G = new Map<string, Set<string>>();

input.forEach((line) => {
  const [a, b] = line.split("-");
  if (!G.has(a)) G.set(a, new Set());
  if (!G.has(b)) G.set(b, new Set());
  G.get(a)!.add(b);
  G.get(b)!.add(a);
});

function findTriangles(graph: Map<string, Set<string>>): string[][] {
  const triangles = new Set<string>();

  for (const [node, neighbors] of graph) {
    const neighborsArray = Array.from(neighbors);

    for (let i = 0; i < neighborsArray.length; i++) {
      for (let j = i + 1; j < neighborsArray.length; j++) {
        const n1 = neighborsArray[i];
        const n2 = neighborsArray[j];

        if (graph.get(n1)?.has(n2)) {
          const triangle = [node, n1, n2];
          if (triangle.some((id) => id.startsWith("t"))) {
            triangles.add(triangle.sort().join(","));
          }
        }
      }
    }
  }

  return Array.from(triangles).map((t) => t.split(","));
}

function bronKerbosch(
  graph: Map<string, Set<string>>,
  R: Set<string> = new Set(),
  P: Set<string> = new Set(graph.keys()),
  X: Set<string> = new Set(),
  cliques: Set<Set<string>> = new Set()
): Set<Set<string>> {
  if (P.size === 0 && X.size === 0) {
    cliques.add(new Set(R));
    return cliques;
  }

  const pivot = Array.from(new Set([...P, ...X]))[0];
  const neighbors = graph.get(pivot) ?? new Set();

  for (const v of Array.from(P).filter((node) => !neighbors.has(node))) {
    const vNeighbors = graph.get(v) ?? new Set();
    bronKerbosch(
      graph,
      new Set([...R, v]),
      new Set([...P].filter((node) => vNeighbors.has(node))),
      new Set([...X].filter((node) => vNeighbors.has(node))),
      cliques
    );
    P.delete(v);
    X.add(v);
  }

  return cliques;
}

function findPassword(graph: Map<string, Set<string>>): string {
  const allCliques = bronKerbosch(graph);
  let largestClique = new Set<string>();
  for (const clique of allCliques) {
    if (clique.size > largestClique.size) {
      largestClique = clique;
    }
  }
  return Array.from(largestClique).sort().join(",");
}

console.log("Part one:", findTriangles(G).length);
console.log("Part two:", findPassword(G));

console.log(`\nFinished in ${(performance.now() - start).toFixed(0)}ms`);
