const start = performance.now();
const input = Deno.readTextFileSync("2015/05/input.txt").split("\n");

function isNiceString(s: string) {
  const vowels = s.match(/([aeiou])/g);
  const doubles = s.match(/(.)\1{1}/g);
  const naughty = s.match(/(ab)|(cd)|(pq)|(xy)/g);
  if (!vowels || vowels.length < 3) return false;
  if (!doubles) return false;
  if (naughty) return false;
  return true;
}

function isActuallyNiceString(s: string) {
  const doubles = s.match(/([a-z]{2}).*?\1/g);
  const sandwich = s.match(/(\w)\w\1/g);
  if (!doubles) return false;
  if (!sandwich) return false;
  return true;
}

console.log("Part one:", input.filter(isNiceString).length);
console.log("Part two:", input.filter(isActuallyNiceString).length);

console.log(`\n✉ Finished in ${(performance.now() - start).toFixed(0)}ms✉`);
