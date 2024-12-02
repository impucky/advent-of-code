const reports: number[][] = Deno.readTextFileSync("02/input.txt")
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
    if (next < curr || next === curr) return false;
    if (step > 3) return false;
  }
  return true;
}

function isKindaSafe(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    if (isSafe(report.toSpliced(i, 1))) return true;
  }
  return false;
}

function partOne() {
  let total = 0;
  reports.forEach((report) => {
    if (isSafe(report)) total++;
  });
  console.log(total);
}

function partTwo() {
  let total = 0;
  reports.forEach((report) => {
    if (isSafe(report)) total++;
    else if (isKindaSafe(report)) total++;
  });
  console.log(total);
}

partOne();
partTwo();
