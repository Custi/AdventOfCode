const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });
const { max } = Math;

const makeId = (x, y) => `${x}-${y}`;
const UP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;

function init(input) {
  const infectedNodes = new Set();

  let maxX = 0, maxY = 0;
  input.split('\n').filter(Boolean).forEach((line, y) => {
    maxY = max(maxY, y);
    line.split('').filter(Boolean).forEach((char, x) => {
      maxX = max(maxX, x);
      if (char === '#') infectedNodes.add(makeId(x, y));
    });
  });

  const carrierPosition = [maxX / 2, maxY / 2];
  const carrierOrientation = UP;

  return { infectedNodes, carrierPosition, carrierOrientation };
}

function burst(infectedNodes, pos, carrierOrientation, infectedCount) {
  const x = pos[0], y = pos[1];
  const id = makeId(x, y);
  const isInfected = infectedNodes.has(id);

  const newOrientation = isInfected ? carrierOrientation + 1 : carrierOrientation - 1;
  carrierOrientation = ((newOrientation % 4) + 4) % 4;

  if (isInfected) infectedNodes.delete(id);
  else infectedNodes.add(id);

  let carrierPosition;
  if      (carrierOrientation === UP)     carrierPosition = [x, y - 1];
  else if (carrierOrientation === RIGHT)  carrierPosition = [x + 1, y];
  else if (carrierOrientation === DOWN)   carrierPosition = [x, y + 1];
  else if (carrierOrientation === LEFT)   carrierPosition = [x - 1, y];

  if (isInfected) infectedCount += 1;

  return { infectedNodes, carrierPosition, carrierOrientation, infectedCount }; 
}

let { infectedNodes, carrierPosition, carrierOrientation } = init(input);
let infectedCount = 0;

for (let i = 0; i < 10000; i++) {
  const b = burst(infectedNodes, carrierPosition, carrierOrientation, infectedCount);
  carrierPosition = b.carrierPosition;
  carrierOrientation = b.carrierOrientation;
  infectedCount = b.infectedCount;

  console.log(carrierPosition);
}

console.log('Part 1: ', infectedCount);
