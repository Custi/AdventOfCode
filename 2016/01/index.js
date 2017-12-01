const input = 'L1, L3, L5, L3, R1, L4, L5, R1, R3, L5, R1, L3, L2, L3, R2, R2, L3, L3, R1, L2, R1, L3, L2, R4, R2, L5, R4, L5, R4, L2, R3, L2, R4, R1, L5, L4, R1, L2, R3, R1, R2, L4, R1, L2, R3, L2, L3, R5, L192, R4, L5, R4, L1, R4, L4, R2, L5, R45, L2, L5, R4, R5, L3, R5, R77, R2, R5, L5, R1, R4, L4, L4, R2, L4, L1, R191, R1, L1, L2, L2, L4, L3, R1, L3, R1, R5, R3, L1, L4, L2, L3, L1, L1, R5, L4, R1, L3, R1, L2, R1, R4, R5, L4, L2, R4, R5, L1, L2, R3, L4, R2, R2, R3, L2, L3, L5, R3, R1, L4, L3, R4, R2, R2, R2, R1, L4, R4, R1, R2, R1, L2, L2, R4, L1, L2, R3, L3, L5, L4, R4, L3, L1, L5, L3, L5, R5, L5, L4, L2, R1, L2, L4, L2, L4, L1, R4, R4, R5, R1, L4, R2, L4, L2, L4, R2, L4, L1, L2, R1, R4, R3, R2, R2, R5, L1, L2';
const inputDirections = input.split(', ');

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';

const position = { x: 0, y: 0 };
let path = [[0,0]];
let direction = NORTH;

// HELPERS

const getDistance = (x, y) => Math.abs(x) + Math.abs(y);

const getPassedPoints = () => {
  const current  = [ position.x, position.y ];
  const previous = path[path.length - 1];

  const points = [];
  if (current[0] === previous[0]) {
    for (let i = previous[1]; i !== current[1]; i = previous[1] < current[1] ? i + 1 : i -1) {
      points.push([current[0], i]);
    }
  }
  else {
    for (let i = previous[0]; i !== current[0]; i = previous[0] < current[0] ? i + 1 : i - 1) {
      if( i > -20) console.log('Index', i);
      points.push([i, current[1]]);
    }
  }

  // Remove first element
  points.shift();
  return points;
};

const getPointVisitedTwice = (pointsToCheck) => {
  for(let i = 0; i < pointsToCheck.length; i++) {
    const ptc = pointsToCheck[i];
    if (path.find(p => p[0] === ptc[0] && p[1] === ptc[1])) {
      return ptc;
    }
  }
  return  null;
};

const addPointsToPath = (pointsToAdd) => {
  path = [...path, ...pointsToAdd];
};

// MAIN

inputDirections.forEach(instruction => {
  const left = instruction[0] === 'L';
  const amount = parseInt(instruction.substring(1), 10);

  const start = `[${direction}] ${position.x}, ${position.y} + ${instruction}`;
  switch (direction) {
    case NORTH:
      position.x += left ? -amount : amount;
      direction = left ? WEST : EAST;
      break;
    case EAST:
      position.y += left ? amount : -amount;  
      direction = left ? NORTH : SOUTH;      
      break;
    case SOUTH:
      position.x += left ? amount : -amount;  
      direction = left ? EAST : WEST;   
      break;
    default:
    case WEST:
      position.y += left ? -amount : amount;
      direction = left ? SOUTH : NORTH;       
      break;
  }
  console.log(`${start} => [${direction}] ${position.x}, ${position.y}`);
  
  const passedPoints = getPassedPoints();
  const twice = getPointVisitedTwice(passedPoints);
  if (twice) {
    console.log('Twice here: ', twice);
    console.log('Distance: ', getDistance(twice[0], twice[1]));
    process.exit()
  }
  addPointsToPath(passedPoints);
});

console.log('Result: ', getDistance(position.x, position.y));
