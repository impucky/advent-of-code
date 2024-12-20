const start = performance.now();
const input = Deno.readTextFileSync("2024/09/input.txt");

function toMap(input: string): number[] {
  const output: number[] = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const curr = Number(input[i]);
    if (i % 2 === 0) {
      for (let j = 0; j < curr; j++) {
        output.push(id);
      }
    } else {
      for (let j = 0; j < curr; j++) {
        output.push(-1);
      }
      id++;
    }
  }
  return output;
}

type Block = { id: number; size: number };

function toBlocks(input: string): Block[] {
  const output: Block[] = [];
  let id = 0;
  for (let i = 0; i < input.length; i++) {
    const curr = Number(input[i]);
    if (i % 2 === 0) {
      output.push({ id, size: curr });
    } else {
      output.push({ id: -1, size: curr });
      id++;
    }
  }
  return output;
}

function compressP1(map: number[]): number[] {
  let endPointer = map.length - 1;
  for (let i = 0; i < map.length; i++) {
    const curr = map[i];
    if (curr === -1) {
      if (map[endPointer] === -1) {
        i--;
        endPointer--;
      } else {
        [map[i], map[endPointer]] = [map[endPointer], map[i]];
      }
    }
    if (i === endPointer) {
      break;
    }
  }
  return map;
}

function compressP2(blocks: Block[]): Block[] {
  const files = blocks
    .map((block, i) => ({ ...block, index: i }))
    .filter((block) => block.id !== -1)
    .sort((a, b) => b.id - a.id);

  files.forEach((file) => {
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (i > file.index) break;

      if (block.id === -1 && block.size === file.size) {
        [blocks[i], blocks[file.index]] = [blocks[file.index], blocks[i]];
        break;
      }

      if (block.id === -1 && block.size > file.size) {
        // Shrink empty space
        block.size -= file.size;
        // Insert file
        blocks.splice(i, 0, file);
        // Delete old file
        blocks.splice(file.index + 1, 1);
        // Grow space left by file
        blocks[file.index].size += file.size;
        // Shift indexes
        files.forEach((f) => {
          if (f.index > i && f.id < file.id) f.index++;
        });
        break;
      }
    }
  });
  return blocks;
}

function checksumP1(map: number[]): number {
  return map.reduce((acc, curr, i) => {
    if (curr === -1) {
      return acc;
    }
    return acc + i * map[i];
  }, 0);
}

function checksumP2(input: Block[]): number {
  let total = 0;
  let pos = 0;
  input.forEach((block) => {
    if (block.id !== -1) {
      for (let i = 0; i < block.size; i++) {
        total += block.id * pos;
        pos++;
      }
    } else pos += block.size;
  });
  return total;
}

console.log("Part one:", checksumP1(compressP1(toMap(input))));
console.log("Part two:", checksumP2(compressP2(toBlocks(input))));
console.log(`💩Finished in ${(performance.now() - start).toFixed(0)}ms💩`);
