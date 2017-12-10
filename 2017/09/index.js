// /r/adventofcode/comments/7iksqc/2017_day_9_solutions/dqziw0i/
const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });

let garbage = false;
let score = 0;
let depth = 1;
let garbageCount = 0;

for (let i = 0, c = input[0]; i < input.length; i++, c = input[i]) {
  if (c == '!') i++;
  else if (garbage && c != '>') garbageCount++;
  else if (c == '<') garbage = true;
  else if (c == '>') garbage = false;
  else if (c == '{') score += depth++;
  else if (c == '}') depth--;
}

console.log('Part 1: ', score);
console.log('Part 2: ', garbageCount);
