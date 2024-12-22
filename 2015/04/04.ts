import { md5 } from "@takker/md5";
import { encodeHex } from "jsr:@std/encoding@1/hex";
const start = performance.now();
const input = Deno.readTextFileSync("2015/04/input.txt");

let hash = input;
let p1 = true;
for (let i = 0; i < Infinity; i++) {
  hash = encodeHex(md5(input + i.toString()));
  if (hash.startsWith("00000") && p1) {
    console.log("Part one:", i);
    p1 = false;
  }
  if (hash.startsWith("000000")) {
    console.log("Part two:", i);
    break;
  }
}

console.log(`\n🔡Finished in ${(performance.now() - start).toFixed(0)}ms🔡`);
