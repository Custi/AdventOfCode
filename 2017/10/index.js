const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });
const lengths = input.split(',').map(n => parseInt(n, 10));

const listLength = 256;
let list = Array.from(Array(listLength).keys());

let skipSize = 0;
let pos = 0;

lengths.forEach(length => {
  const wrapListLength = (pos + length) > listLength ? (pos + length) % listLength : 0;
  const pre1 = list.splice(pos, length);
  const pre2 = list.splice(0, wrapListLength);
  const reversed = pre1.concat(pre2).reverse();
  const post1 = reversed.splice(0, pre1.length);
  const post2 = reversed;
  const listStart = list.splice(0, pos);

  list = post2.concat(listStart, post1, list);
  pos = (pos + length + skipSize) % listLength;
  skipSize += 1;
});

console.log('Part 1: ', list[0] * list[1]);
