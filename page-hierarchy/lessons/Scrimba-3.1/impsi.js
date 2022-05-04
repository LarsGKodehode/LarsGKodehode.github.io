//all valid Imperial to SI ratios
const ratioImpToSi = {
  length: 3.2808398950131233595800524934383,
  volume: 0.21996924829908778752730368294512,
  mass: 2.2046244201837774916665196917053,
};

// variables
let input = document.getElementById(input-field)
let currentNumber;

function impSiConverter(unit, value) {
  ratioImpToSi.unit
};

function updateCurrentNumber() {
  // don't update unnecessaryly
  // if (newNumber === currentNum) {
    //   waitSomeInterval(pauseTime)};
    
    // check if actually a number
    if (isNaN(newNumber)) {return};
    
    currentNumber = newNumber;
  };
  
  function updateDisplay() {
    for (func in conversions) {
    conversions[func](currentNumber);
  };
};

//main loop
while (true) {
  // gets input number
  let newNumber = input.innerHTML;

  // sequence
  updateCurrentNumber();
  updateDisplay();
};