// uses ratioImpToSi as a dictionary
// available Imperial to SI ratios
const ratioImpToSi = {
  length: 3.2808398950131233595800524934383,
  volume: 0.21996924829908778752730368294512,
  mass: 2.2046244201837774916665196917053,
};

// populate array with keys
let ratioKeys = [];
for (key in ratioImpToSi.entries) {
  ratioKeys.push(key);
};

// let outputFields = [];


// "global" variables
let input = document.getElementById(input-field);
let running = true;
let newNumber;
let currentNumber;

// minor functions
function impSiConverter(unit, value) {

}; 

// main loop functions
function updateCurrentNumber() {
  // might be wiser adding a listener, this require wrapping main loop in a function
  // if (newNumber === currentNum) {
    //   setTimeout();
    //   running = false;
    // };
  
  // check if actually a number
  if (isNaN(newNumber)) {return};
  
  currentNumber = newNumber;
};

function updateDisplay() {
  
};

//main loop
while (running) {
  // gets input number
  newNumber = input.innerHTML;

  // sequence
  updateCurrentNumber();
  updateDisplay();
};