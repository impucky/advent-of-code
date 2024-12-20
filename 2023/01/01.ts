const input = Deno.readTextFileSync("2023/01/input.txt").split("\n");

const nums = new Map<string, number>([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

function replaceNumStrings(line: string) {
  // replace all number strings with the corresponding int
  nums.forEach((int, string) => {
    if (line.includes(string)) {
      line = line.replaceAll(
        string,
        // but keep the first and last char to avoid messing up subsequent replacements
        string[0] + int.toString() + string.charAt(string.length - 1)
      );
    }
  });
  return line;
}

function squish(input: string[]) {
  return (
    input
      // keep only integers
      .map((line) => line.split("").filter((char) => !isNaN(Number(char))))
      .map((line) => {
        // concat first and last char, or with itself if there's only one
        return line.length > 1 ? line[0] + line.at(-1) : line[0] + line[0];
      })
      .map(Number)
      .reduce((a, b) => a + b)
  );
}

console.log("Part one:", squish(input));
console.log("Part two:", squish(input.map(replaceNumStrings)));
