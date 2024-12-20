const input = Deno.readTextFileSync("2024/03/input.txt");

function calcAll(ops: string[]) {
  return ops.reduce((acc, curr) => {
    return (
      acc +
      curr
        .split(",")
        .map(Number)
        .reduce((a, b) => a * b, 1)
    );
  }, 0);
}

const findAll = new RegExp(/(?<=mul\()(\d+),(\d+)(?=\))/g);
const filterDisabled = new RegExp(/(?<=don\'t\(\))(.|\n)*?(?=do\(\)|$)/g);

const p1 = input.match(findAll);
const p2 = input.replace(filterDisabled, "").match(findAll);

if (p1 && p2) {
  console.log(calcAll(p1), calcAll(p2));
}
