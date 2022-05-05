// sets ratio of Imperial and SI units
// object {unit,[[iperialUnit, ratio], [siUnit, ratio]}
let ratioImpSi = {};
// ratios here
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
// end of ratios

// program class  
class converter {
  // Public
  run() {
    if (!this.getInput() === true) {return}; //input is NAN
    this.convert();
    this.updateOutput();
  };

  // Private
  #currentInput;
  #newInput;

  // returns false if NAN
  getInput() {
    this.#newInput = document.getElementById("input-field");
    if (isNaN(this.#newInput)){return false}; // throw error? or fail silently?
    this.#currentInput = this.#newInput;
  };

  // converts currentInput to other units
  // returns {unitType, [unitImperial, outImperial], [unitMetric, outMetric]}
  convertAll() {
    let convertedInput = {};
    for (const [type, info] of Object.entries(ratioImpSi)) {
      convertedInput[type] = [
          [info[0][0],info[0][1] * currentInput],
          [info[1][0],info[1][1] * currentInput]
          ];
    };
    
    // for dev purposes
    for (const [type, info] of Object.entries(convertedInput)) {
        console.log("\n" + type);
        console.log(currentInput + info[1][0] + " = " + info[0][1] + info[0][0]);
        console.log(currentInput + info[0][0] + " = " + info[1][1] + info[1][0]);
    };
    // for dev purposes

    return convertedInput;
  };
  
  // Prints converted number to output fields
  updateOutput() {

  };
};

// document.getElementsByClassName();

// activate program
const program = new converter;
program.run();
setInterval(program.run(), 500);