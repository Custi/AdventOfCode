const input = `DDDURLURURUDLDURRURULLRRDULRRLRLRURDLRRDUDRUDLRDUUDRRUDLLLURLUURLRURURLRLUDDURUULDURDRUUDLLDDDRLDUULLUDURRLUULUULDLDDULRLDLURURUULRURDULLLURLDRDULLULRRRLRLRULLULRULUUULRLLURURDLLRURRUUUDURRDLURUURDDLRRLUURLRRULURRDDRDULLLDRDDDDURURLLULDDULLRLDRLRRDLLURLRRUDDDRDLLRUDLLLLRLLRUDDLUUDRLRRRDRLRDLRRULRUUDUUDULLRLUDLLDDLLDLUDRURLULDLRDDLDRUDLDDLDDDRLLDUURRUUDLLULLRLDLUURRLLDRDLRRRRUUUURLUUUULRRUDDUDDRLDDURLRLRLLRRUDRDLRLDRRRRRRUDDURUUUUDDUDUDU
RLULUULRDDRLULRDDLRDUURLRUDDDUULUUUDDRDRRRLDUURDURDRLLLRDDRLURLDRRDLRLUURULUURDRRULRULDULDLRRDDRLDRUDUDDUDDRULURLULUDRDUDDDULRRRURLRRDLRDLDLLRLUULURLDRURRRLLURRRRRLLULRRRDDLRLDDUULDLLRDDRLLUUDRURLRULULRLRUULUUUUUDRURLURLDDUDDLRDDLDRRLDLURULUUDRDLULLURDLLLRRDRURUDDURRLURRDURURDLRUDRULUULLDRLRRDRLDDUDRDLLRURURLUDUURUULDURUDULRLRDLDURRLLDRDUDRUDDRLRURUDDLRRDLLLDULRRDRDRRRLURLDLURRDULDURUUUDURLDLRURRDRULLDDLLLRUULLLLURRRLLLDRRUDDDLURLRRRDRLRDLUUUDDRULLUULDURLDUUURUDRURUDRDLRRLDRURRLRDDLLLULUDDUULDURLRUDRDDD
RDDRUDLRLDDDRLRRLRRLUULDRLRUUURULRRLUURLLLRLULDDLDLRLULULUUDDDRLLLUDLLRUDURUDDLLDUDLURRULLRDLDURULRLDRLDLDRDDRUDRUULLLLRULULLLDDDULUUDUUDDLDRLRRDLRLURRLLDRLDLDLULRLRDLDLRLUULLDLULRRRDDRUULDUDLUUUUDUDRLUURDURRULLDRURUDURDUULRRULUULULRLDRLRLLRRRLULURLUDULLDRLDRDRULLUUUDLDUUUDLRDULRDDDDDDDDLLRDULLUDRDDRURUDDLURRUULUURURDUDLLRRRRDUDLURLLURURLRDLDUUDRURULRDURDLDRUDLRRLDLDULRRUDRDUUDRLURUURLDLUDLLRDDRDU
LLDDDDLUDLLDUDURRURLLLLRLRRLDULLURULDULDLDLLDRRDLUDRULLRUUURDRLLURDDLLUDDLRLLRDDLULRLDDRURLUDRDULLRUDDLUURULUUURURLRULRLDLDDLRDLDLLRUURDLUDRRRDDRDRLLUDDRLDRLLLRULRDLLRLRRDDLDRDDDUDUDLUULDLDUDDLRLDUULRULDLDULDDRRLUUURUUUDLRDRULDRRLLURRRDUDULDUDUDULLULLULULURLLRRLDULDULDLRDDRRLRDRLDRLUDLLLUULLRLLRLDRDDRUDDRLLDDLRULLLULRDDDLLLDRDLRULDDDLULURDULRLDRLULDDLRUDDUDLDDDUDRDRULULDDLDLRRDURLLRLLDDURRLRRULLURLRUDDLUURULULURLRUDLLLUDDURRLURLLRLLRRLDULRRUDURLLDDRLDLRRLULUULRRUURRRDULRLRLRDDRDULULUUDULLLLURULURRUDRLL
UULLULRUULUUUUDDRULLRLDDLRLDDLULURDDLULURDRULUURDLLUDDLDRLUDLLRUURRUDRLDRDDRRLLRULDLLRUUULLLDLDDULDRLRURLDRDUURLURDRUURUULURLRLRRURLDDDLLDDLDDDULRUDLURULLDDRLDLUDURLLLLLRULRRLLUDRUURLLURRLLRDRLLLRRDDDRRRDLRDRDUDDRLLRRDRLRLDDDLURUUUUULDULDRRRRLUDRLRDRUDUDDRULDULULDRUUDUULLUDULRLRRURDLDDUDDRDULLUURLDRDLDDUURULRDLUDDLDURUDRRRDUDRRDRLRLULDRDRLRLRRUDLLLDDDRURDRLRUDRRDDLDRRLRRDLUURLRDRRUDRRDLDDDLRDDLRDUUURRRUULLDDDLLRLDRRLLDDRLRRRLUDLRURULLDULLLUDLDLRLLDDRDRUDLRRDDLUU`;

const allInstructions = input.split('\n').map(i => i.split(''));
const pin = [];

const getKeyPadPositionAfterInstructions = (start, instructions) => {
  let pos = start;
  let newPos = -1
  ;
  instructions.forEach(direction => {
    switch (direction) {
      case 'U':
        newPos = pos - 3;
        pos = newPos > 0 ? newPos : pos;
        break;
      case 'D':
        newPos = pos + 3;
        pos = newPos < 10 ? newPos : pos;
        break;
      case 'L':
        if (pos === 1 || pos === 4 || pos === 7) return;
        pos -= 1; 
        break;
      case 'R':
        if (pos === 3 || pos === 6 || pos === 9) return;
        pos += 1; 
        break;
    }
  });
  return pos;
};

const getKeyPadPositionAfterInstructionsForCrazyKeyPad = (start, instructions) => {
  let pos = start;
  let newPos = -1
  ;
  instructions.forEach(direction => {
    switch (direction) {
      case 'U':
        if ([5,2,1,4,9].includes(pos)) return;      
        if ([6,7,8,10,11,12].includes(pos)) pos -= 4;
        else pos -= 2;
        break;
      case 'D':
        if ([5,10,13,12,9].includes(pos)) return;      
        if ([2,3,4,6,7,8].includes(pos)) pos += 4;
        else pos += 2;
        break;
      case 'L':
        if ([1,2,5,10,13].includes(pos)) return;
        pos -= 1; 
        break;
      case 'R':
        if ([1,4,9,12,13].includes(pos)) return;
        pos += 1; 
        break;
    }
  });
  return pos;
};

let position = 5;
allInstructions.forEach(instructions => {
  // position = getKeyPadPositionAfterInstructions(position, instructions);
  position = getKeyPadPositionAfterInstructionsForCrazyKeyPad(position, instructions);
  pin.push(position);
});

console.log('Result: ', pin.map(p => (p).toString(16).toUpperCase()
).join(''));
