const input = `set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23
`;

const instructions = input.split('\n').filter(Boolean);

const registerNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const registers = new Map();
let opCounter = new Map();

let nextInstruction = 0;

function init() {
  registerNames.forEach(r => registers.set(r, 0));
  opCounter = new Map();
  nextInstruction = 0;
}

function getValue(value) {
  const registerValue = registers.get(value);
  if (registerValue === undefined) {
    return parseInt(value, 10);
  }
  return registerValue;
}

function writeRegister(register, value) {
  if (!registerNames.includes(register)) {
    throw new Error('Invalid register name!');
  }
  registers.set(register, value);
}

function incOpCounter(opCode) {
  const current = opCounter.get(opCode);
  const count = current ? current + 1 : 1;
  opCounter.set(opCode, count); 
}

function dump() {
  for (const [key, value] of registers.entries()) {
    console.log(`${key}: ${value}`);
  }
  console.log('Next Instruction: ', instructions[nextInstruction]);
  console.log('===\n');
}

function executeNextInstruction() {
  const instruction = instructions[nextInstruction];
  const [opCode, X, Y] = instruction.split(' ');

  switch (opCode) {
    case 'set':
      writeRegister(X, getValue(Y));
      incOpCounter(opCode);
      break;
    case 'sub':
      writeRegister(X, getValue(X) - getValue(Y));
      incOpCounter(opCode);
      break;
    case 'mul':
      writeRegister(X, getValue(X) * getValue(Y));
      incOpCounter(opCode);
      break;
    case 'jnz':
      if (getValue(X) !== 0) {
        nextInstruction += getValue(Y);
        incOpCounter(opCode);   
        return;
      }
      break;
    default:
      throw new Error(`Invalid Op Code: ${opCode}`);
  }

  nextInstruction += 1;
}

init();
while(nextInstruction >= 0 && nextInstruction < instructions.length) {
  executeNextInstruction();
}

console.log('Part 1: ', opCounter.get('mul'));

init();
writeRegister('a', 1);
while(nextInstruction >= 0 && nextInstruction < instructions.length) {
  executeNextInstruction();
}

console.log('Part 2: ', registers.get('h'));
