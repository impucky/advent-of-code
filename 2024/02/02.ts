const reports: number[][] = Deno.readTextFileSync("2024/02/input.txt")
  .split("\n")
  .map((line) => {
    return line.split(" ").map((n) => parseInt(n));
  });

function isSafe(report: number[]) {
  if (report[1] < report[0]) report = report.reverse();
  for (let i = 0; i < report.length - 1; i++) {
    const curr = report[i];
    const next = report[i + 1];
    const step = Math.abs(curr - next);
    if (next < curr || next === curr || step > 3) return false;
  }
  return true;
}

function isKindaSafe(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    if (isSafe(report.toSpliced(i, 1))) return true;
  }
  return false;
}

console.log(reports.filter(isSafe).length);
console.log(reports.filter(isKindaSafe).length);
