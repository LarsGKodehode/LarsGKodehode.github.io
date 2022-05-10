// object containing valid rations
//{unit,[[unit1, ratio], [unit2, ratio]}
const ratioImpSi = {
length: [
  // feet / meter, meter / feet
  ["Feet", 0.3048],
  ["Meter", 3.2808398950131233595800524934383]
  ],
volume: [
  // imperial gallon / liter, liter / imperial gallon
  ["Imperial Gallon", 4.54609],
  ["Liter", 0.21996924829908778752730368294512]
  ],
mass: [
  // pound / kilogram, kilogram / pound
  ["Pound", 0.3048],
  ["Kilogram", 3.2808398950131233595800524934383]
  ],
};

// program class  
class converter {
  // Public
  run() {
    if (!this.#getInputInt() === true) {return}; // don't update if can't parse input to number
    this.#convertAll();

    this.#updateOutput(); // WIP

    //DELETE dev
    for (const [type, info] of Object.entries(this.#convertedInput)) {
      console.log(`${this.#currentInput} ${type} = ${info[0][0]}:${info[0][1]}`);
      console.log(`${this.#currentInput} ${type} = ${info[1][0]}:${info[1][1]}`);
    };
    //DELETE dev
  };

  // Private
  #timesRan = 0;
  #currentInput;
  #newInput;
  #convertedInput = {};

  // tests and parses input to number
  #getInputInt() {
    this.#newInput = Number(input.value);
    if (!(typeof(this.#newInput) === "number")) {return false};
    this.#currentInput = this.#newInput;
    return true;
  };

  // converts currentInput to all valid units
  // produces {unitType, [unit1, out1], [unit2, out2]}
  #convertAll() {
    for (const [type, info] of Object.entries(ratioImpSi)) {
      // multiplies values and sets 3 decimal precision
      this.#convertedInput[type] = [
        [info[0][0], Number.parseFloat(info[0][1] * this.#currentInput).toFixed(3)],
        [info[1][0], Number.parseFloat(info[1][1] * this.#currentInput).toFixed(3)]
        ];
    };
  };

  // updates output fields
  #updateOutput() {
  };
};

// selects input field
const input = document.getElementById("input-field")

// selects output fields
// document.getElementsByClassName();

// necesarry for passing correct instance of this to class
// might be more correct to convert class to function
function programWrapper() {
  program.run();
};

// create program
const program = new converter;
// run program on input field change
input.addEventListener("input", programWrapper);