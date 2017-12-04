const input = `YOUR INPUT COULD BE HERE`;

const numberOfValidPassphrasesForPart1 = input
  .split('\n')
  .map(pps => pps.split(' '))
  .filter(pp => pp.length === [ ... new Set(pp) ].length)
  .length;

console.log('Part 1: ', numberOfValidPassphrasesForPart1);

const numberOfValidPassphrasesForPart2 = input
.split('\n')
.map(pps => pps
  .split(' ')
  .map(word => word.split('').sort().join(''))
)
.filter(pp => pp.length === [ ... new Set(pp) ].length)
.length;

console.log('Part 2: ', numberOfValidPassphrasesForPart2);
