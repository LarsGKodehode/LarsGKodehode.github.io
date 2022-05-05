// sets ratio of Imperial and SI units
// object {key,[iperialUnit, siUnit]}
let ratioImpToSi = {};
// ratios here
ratioImpSi.length = [
  // 1 feet to meters
  0.3048,
  // 1 meter to feets
  3.2808398950131233595800524934383];

ratioImpSi.volume = [
  // 1 Imperial Gallon to liters
  4.54609,
  // 1 SI to Imperial
  0.21996924829908778752730368294512];

ratioImpSi.mass = [
  // 1 Pound to kilograms
  0.3048,
  // 1 SI to Imperial
  3.2808398950131233595800524934383];
// end of ratios

// object prototype to hold converted values
let convertedInput = {};
for ( key in Object.entries(ratioImpSi)) {
  convertedInput.`${key}` = ;
};

// program class
class converter {
  // Public
  run() {
    this.getInput();
    this.convert();
    this.updateOutput();
  };

  // Private
  #currentInput;
  #newInput;
  // Stores input field in private variable
  getInput() {
    this.#newInput = document.getElementById("input-field");
    if (isNaN(this.#newInput)){return}; // throw error? or fail silently?
    this.#currentInput = this.#newInput;
  };

  // converts input number into Imperial and SI units 
  convertAll() {

  };

  // Prints converted number to output fields
  updateOutput() {

  };
};

document.getElementsByClassName()

// activate program
const program = new converter;
setInterval(program.run(), 500);