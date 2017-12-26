const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });
const list = input
  .trim()
  .split('\n')
  .map(l => l.split(' <-> ')[1].split(', ').map(i => parseInt(i, 10)));

const visited = [];
function reach(i) {
  if (visited.includes(i))
    return 0;
  visited.push(i);
  return list[i].reduce((a,b) => a + reach(b), 1);
}

const groups = list.map((_, k) => reach(k));

console.log('Part 1: ', groups[0]);
console.log('Part 2: ', groups.filter(g => g > 0).length);
