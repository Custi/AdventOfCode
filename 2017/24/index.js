const input = require('fs').readFileSync('input.txt', { encoding: 'utf8' });
const connectors = input
  .split('\n')
  .filter(Boolean)
  .map(c => c.split('/').map(i => parseInt(i, 10)));

const logConnectors = connectors => console.log(connectors.map(c => `${c[0]}/${c[1]}`).join('--'));

const getMax = arr => arr.reduce((a, b) => Math.max(a, b));

const getStrengths = bridges => bridges.map(b => b.reduce((acc, c) => acc + c[0] + c[1], 0));

function buildBridge(freeConnectors, usedConnectors = [], pin = 0) {
  let bridges = [];
  freeConnectors.forEach((c, i) => {
    if (c.includes(pin)) {
      const newFreeConnectors = [...freeConnectors];
      newFreeConnectors.splice(i, 1);
      const newBridges = buildBridge(newFreeConnectors, [...usedConnectors, c], c[0] === pin ? c[1] : c[0]);
      bridges = [...bridges, ...newBridges];
    }
  });

  if (bridges.length === 0) {
    return [usedConnectors];
  }

  return bridges;
}

const bridges = buildBridge(connectors);

const strengths = getStrengths(bridges);
const maxStrength = getMax(strengths);
console.log('Part 1: ', maxStrength);

const maxLength = getMax(bridges.map(b => b.length));
const strengthsOfLogestBrides = getStrengths(bridges.filter(b => b.length === maxLength));
const maxStrengthOfLogestBrides = getMax(strengthsOfLogestBrides);
console.log('Part 2: ', maxStrengthOfLogestBrides);
