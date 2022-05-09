
// sets ratio of Imperial and SI units
// object {unit,[[iperialUnit, ratio], [siUnit, ratio]}
const ratioImpSi = {
  // object containing valid ratios
length: [
  // feet / meter, meter / feet
  ["feet", 0.3048],
  ["meter", 3.2808398950131233595800524934383]
  ],
volume: [
  // imperial gallon / liter, liter / imperial gallon
  ["imperial gallon", 4.54609],
  ["liter", 0.21996924829908778752730368294512]
  ],
mass: [
  // pound / kilogram, kilogram / pound
  ["pound", 0.3048],
  ["kilogram", 3.2808398950131233595800524934383]
  ],
};

// program class  
class converter {
  // Public
  run() {
    console.log("converter has run " + this.#timesRan + " number of times")
    this.#timesRan += 1;

    if (!this.#getInputInt() === true) {return}; // don't update if can't parse input to number
    this.#convertAll();
    this.#updateOutput();
  };

  // Private
  #timesRan = 0;
  #currentInput;
  #newInput;
  #convertedInput = {};

  // tests and parses input to number
  #getInputInt() {
    this.#newInput = Number(input.innerHTML);
    if (this.#newInput === this.#currentInput)
    if (!(typeof(this.#newInput) === "number")) {return false};
    this.#currentInput = this.#newInput;
    return true;
  };

  // converts currentInput to all valid units
  // produces {unitType, [unitImperial, outImperial], [unitMetric, outMetric]}
  #convertAll() {
    for (const [type, info] of Object.entries(ratioImpSi)) {
      this.#convertedInput[type] = [
          [info[0][0], Number.parseFloat(info[0][1] * this.#currentInput).toFixed(3)],
          [info[1][0], Number.parseFloat(info[1][1] * this.#currentInput).toFixed(3)]
          ];
    };
  };

  // Prints converted number to output fields
  #updateOutput() {
    console.log("NOT DONE YET")
  };
};

// acquire input field
const input = document.getElementById("input-field")

function programWrapper() {
  program.run();
}

// acquire output fields
// document.getElementsByClassName();

// program sequen
const program = new converter;
input.addEventListener("input", programWrapper);