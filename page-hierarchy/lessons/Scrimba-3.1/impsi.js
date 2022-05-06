// sets ratio of Imperial and SI units
// object {unit,[[iperialUnit, ratio], [siUnit, ratio]}
console.log("drafting exchange");
let ratioImpSi = {};
// ratios here
console.log("-inserting rates");
ratioImpSi.length = [
  // feet / meter
  ["feet", 0.3048],
  // meter / feet
  ["meter", 3.2808398950131233595800524934383]
  ];

ratioImpSi.volume = [
  // imperial gallon / liter
  ["imperial gallon", 4.54609],
  // liter / imperial gallon
  ["liter", 0.21996924829908778752730368294512]
  ];

ratioImpSi.mass = [
  // pound / kilogram
  ["pound", 0.3048],
  // kilogram / pound
  ["kilogram", 3.2808398950131233595800524934383]
  ];
console.log("exchange full");
// end of ratios

// program class  
class converter {
  // Public
  run() {
    console.log("-searching for value");
    if (!this.#getInput() === true) {return}; // could not parse input to number
    console.log("-value acquired");
    
    console.log("-converting to local currency");
    this.#convertAll();
    console.log("-conversion finished");
    
    console.log("-promoting values")
    this.#updateOutput();
    console.log("-update published");
  };

  // Private
  #currentInput = 8;
  #newInput = 10;
  #convertedInput = {};

  // returns false if parsing input to number fails
  #getInput() {
    console.log(" -collecting valuables");
    this.#newInput = Number(document.getElementById("input-field"));
    console.log(" -has value?");
    if (isNaN(this.#newInput) === true) {
      console.log("  -wealth not real");
      return false};
    console.log(" -wealth real");
    console.log(" -inserting to reality");
    this.#currentInput = this.#newInput;
    return true;
  };

  // converts currentInput to other units
  // produces {unitType, [unitImperial, outImperial], [unitMetric, outMetric]}
  #convertAll() {
    console.log(" -calculating hoard")
    for (const [type, info] of Object.entries(ratioImpSi)) {
      this.#convertedInput[type] = [
          [info[0][0],info[0][1] * this.#currentInput],
          [info[1][0],info[1][1] * this.#currentInput]
          ];
    };
  };

  // Prints converted number to output fields
  #updateOutput() {
      console.log(" -orator not employed")
  };
  
  // <DELETE dev code DELETE
  log() {
    console.log(" -testing reality");
    for (const [type, info] of Object.entries(this.#convertedInput)) {
        console.log("\n" + type);
        console.log(this.#currentInput + info[1][0] + " = " + info[0][1] + info[0][0]);
        console.log(this.#currentInput + info[0][0] + " = " + info[1][1] + info[1][0]);
    };
  };
  // DELETE dev code DELETE>
};

// document.getElementsByClassName();

// activate program
console.log("declearing reality");
const program = new converter;

console.log("jumpstarting reality");
program.run();

console.log("what is real?");
program.log();

// console.log("implementing time");
// setInterval(program.run(), 500);