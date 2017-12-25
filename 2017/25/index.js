class TuringMachine {
  constructor() {
    this.tape = [0];
    this.position = 0;
    this.state = null;
    this.states = {};
  }

  moveLeft() {
    if (this.position === 0) {
      this.tape.unshift(0);
    } else {
      this.position -= 1;
    }
  }

  moveRight() {
    if (this.position === this.tape.length - 1) {
      this.tape.push(0);
    }
    this.position += 1;
  }

  addState(id, if0, if1) {
    this.states[id] = [ if0, if1 ];
  }

  nextStep() {
    const val = this.tape[this.position];
    const instr = this.states[this.state][val];
    this.tape[this.position] = instr[0];
    if (instr[1] > 0) this.moveRight();
    else this.moveLeft();
    this.state = instr[2];
  }

  log() {
    const tapeString = this.tape.map((s, i) => i === this.position ? `[${s}]`: ` ${s} `).join(' ');
    console.log(`State: ${this.state}\n${tapeString}\n===`);
  }
}

const tm = new TuringMachine();
tm.state = 'A';
tm.addState('A', [1, 1, 'B'], [0, 1, 'C']);
tm.addState('B', [0, -1, 'A'], [0, 1, 'D']);
tm.addState('C', [1, 1, 'D'], [1, 1, 'A']);
tm.addState('D', [1, -1, 'E'], [0, -1, 'D']);
tm.addState('E', [1, 1, 'F'], [1, -1, 'B']);
tm.addState('F', [1, 1, 'A'], [1, 1, 'E']);

for(let i = 0; i < 12399302; i += 1) {
  // tm.log();
  tm.nextStep();
}

const ones = tm.tape.filter(s => s === 1).length;
console.log('Part 1: ', ones);
