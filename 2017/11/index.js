const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });
const instructions = input.trim().split(',');

const dirs = {
  n: [-1, 1, 0],
  ne: [0, 1, -1],
  se: [1, 0, -1],
  s: [1, -1, 0],
  sw: [0, -1, 1],
  nw: [-1, 0, 1]
};

const { abs, max } = Math;
const getDistance = p => p.map(abs).reduce((a, b) => max(a,b));

let maxDistance = -1;
const position = instructions.reduce(
  (pos, instr) => {
    const newPos = pos.map((c, i) => c + dirs[instr][i]);
    maxDistance = max(getDistance(newPos), maxDistance);
    return newPos;
  },
  [0, 0, 0]
);

console.log('Part 1: ', getDistance(position));
console.log('Part 2: ', maxDistance);
