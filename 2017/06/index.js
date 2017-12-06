const input = '2	8	8	5	4	2	3	1	5	5	1	2	15	13	5	14';

// Helper 
const equals = (arr1, arr2) =>
  arr1.length === arr2.length && arr1.every((n, i) => n === arr2[i]);

const memoryBanks = input.split('\t').map(n => parseInt(n, 10));
const length = memoryBanks.length;
const states = [];

while (!states.some(s => equals(s, memoryBanks))) {
  states.push(memoryBanks.map(n => n));
  let index = memoryBanks.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  let blocks = memoryBanks[index];
  memoryBanks[index] = 0;

  while (blocks > 0) {
    index += 1;
    memoryBanks[index % length] += 1;
    blocks -= 1;
  }
}

const rounds = states.length;
console.log('Part 1: ', rounds);

const firstOccurrence = states.findIndex(s => equals(s, memoryBanks))
console.log('Part 2: ', rounds - firstOccurrence);

