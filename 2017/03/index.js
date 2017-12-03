const { ceil, sqrt, pow, abs } = Math;
const input = 312051;

const getPositionInSpiral = (n) => {
  const k = ceil((sqrt(n) - 1) / 2);
  const t = 2 * k;
  let m = pow(t + 1, 2); 
  
  if (n >= m - t) {
    return [k - (m - n), -k]; 
  } else {
    m = m - t;
  }

  if (n >= m - t) {
    return [-k, -k + (m - n)];
  } else {
    m = m - t;
  }

  if (n >= m - t) {
    return [-k + (m - n), k];
  }

  return [k, k - (m - n - t)];
}

const pos = getPositionInSpiral(input);

const distance = abs(pos[0]) + abs(pos[1]);

console.log('Part 1: ', distance, ` (${pos})`);

const map = new Map();
const pos2key = ([x, y]) => `${x},${y}`;
const set = (pos, value) => map.set(pos2key(pos), value);
const get = pos => map.get(pos2key(pos)) || 0;

set([0,0], 1); // Set the first point

for (let i = 2; i < input; i++) {
  const [x, y] = getPositionInSpiral(i);
  const sum = 0
    + get([x + 1, y])
    + get([x + 1, y + 1])
    + get([x + 1, y - 1])
    + get([x - 1, y])
    + get([x - 1, y + 1])
    + get([x - 1, y - 1])
    + get([x, y + 1])
    + get([x, y - 1]);

    if (sum > input) {
      console.log('Part 2: ', sum, `(${x},${y})`);
      process.exit();
    }

    set([x,y], sum);
}
