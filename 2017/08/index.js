class RegManager {
  constructor() {
    this.map = new Map();
    this.highestValue = 0;
  }

  get(registerName) {
    return this.map.get(registerName) || 0;
  }

  set(registerName, value) {
    if(value > this.highestValue) this.highestValue = value;
    return this.map.set(registerName, value);
  }

  inc(registerName, value) {
    return this.set(registerName, this.get(registerName) + value);
  }

  dec(registerName, value) {
    return this.set(registerName, this.get(registerName) - value);
  }

  getMaxValue() {
    const values = Array.from(this.map.values());
    return Math.max(...values);
  }
}

class Condition {
  constructor(left, right, operator) {
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  isRegister(leftOrRight) {
    return Number.isNaN(parseInt(leftOrRight, 10));
  }

  evaluate(regManager) {
    const left = this.left;
    const right = this.right;
    const value1 = this.isRegister(left) ? regManager.get(left) : parseInt(left);
    const value2 = this.isRegister(right) ? regManager.get(right) : parseInt(right);
    
    switch (this.operator) {
      case '==':
        return value1 === value2;
        break;
      case '!=':
        return value1 !== value2;
        break;
      case '<=':
        return value1 <= value2;
        break;
      case '>=':
        return value1 >= value2;
        break;
      case '<':
        return value1 < value2;
        break;
      case '>':
        return value1 > value2;
        break;
      default:
      throw new Error('Unknown operator: ', this.operator);
        break;
    }
  }
}

class Instruction {
  constructor(registerName, operation, value, condition) {
    this.registerName = registerName;
    this.operation = operation;
    this.value = parseInt(value, 10);
    this.condition = condition;
  }

  run(regManager) {
    if(this.condition.evaluate(regManager)) {
      if(this.operation === 'inc') {
        regManager.inc(this.registerName, this.value);
      }
      else if(this.operation === 'dec') {
        regManager.dec(this.registerName, this.value);
      }
      else {
        throw new Error('Invalid operation: ', this.operation);
      }
    }
  }
}

class CPU {
  constructor() {
    this.regManager = new RegManager();
    this.instructions = [];
  }

  readInstructions(lines) {
    const regex = /([A-Za-z]+)\s(inc|dec)\s(-?\d+)\s(?:if)\s([A-Za-z]+)\s(==|<=|>=|!=|<|>)\s(-?\d+)/;
    lines.map(l => {
      const matches = regex.exec(l);
      const condition = new Condition(matches[4], matches[6], matches[5]);
      const instruction = new Instruction(matches[1], matches[2], matches[3], condition);
      this.instructions.push(instruction);
    });
  }

  runInstructions() {
    this.instructions.forEach(instr => instr.run(this.regManager));
  }
}

const input = require('fs').readFileSync('input.txt', {encoding: 'utf8'});
const lines = input.split('\n').filter(Boolean);

const cpu = new CPU();
cpu.readInstructions(lines);
cpu.runInstructions();
console.log('Part 1: ', cpu.regManager.getMaxValue());
console.log('Part 2: ', cpu.regManager.highestValue);
