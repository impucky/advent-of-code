import { open } from "https://deno.land/x/open@v1.0.0/index.ts";
const [year, day] = [Deno.args[0], Deno.args[1]];

if (!year || !day) Deno.exit();

const content = `
const start = performance.now();
const input = Deno.readTextFileSync("${year}/${day}/input.txt").split("\\n");

console.log("Part one:");
console.log("Part two:");

console.log(\`\\nFinished in \${(performance.now() - start).toFixed(0)}ms\`);
`;

try {
  const _stat = await Deno.lstat(year);
} catch (_error) {
  Deno.mkdir(year);
}

Deno.mkdir(`${year}/${day}`);
Deno.writeTextFileSync(`${year}/${day}/input.txt`, "");
Deno.writeTextFileSync(`${year}/${day}/example.txt`, "");
Deno.writeFileSync(
  `${year}/${day}/${day}.ts`,
  new TextEncoder().encode(content)
);

open(`https://adventofcode.com/${year}/day/${day.replace("0", "")}`);
