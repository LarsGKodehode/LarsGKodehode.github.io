// conversion object
class conversionEntry {
  constructor(type, unit1, unit2, unit2DivideUnit1) {
    this.type = type;
    this.unit1 = unit1;
    this.ratio1 = 1 / unit2DivideUnit1;
    this.unit2 = unit2;
    this.ratio2 = unit2DivideUnit1;
  };
};

// program class  
class converter {
  // Public
  run() {
    if (!this.#getInputInt() === true) {return}; // abort if can't parse input to real number
    this.#convertAll();
    this.#updateOutput();
  };
  
  // Private
  #currentInput; // last valid input for reuse across calls
  #convertedInput = []; // stores converted values in a convenient format
  
  // tests and parses input to number
  #getInputInt() {
    let newInput = Number(input.value);
    if (!(typeof(newInput)) === "number" || (isNaN(newInput))) {return false}; // TODO: might get away with only checking for NAN
    this.#currentInput = newInput;
    return true;
  };
  
  // converts currentInput to all registered types
  #convertAll() {
    for (const entry in conversionBook) {
      this.#convertedInput[entry] = [
        Number.parseFloat(this.#currentInput * conversionBook[entry].ratio1).toFixed(3),
        Number.parseFloat(this.#currentInput * conversionBook[entry].ratio2).toFixed(3)];
    };
  };

  // updates output fields
  #updateOutput() {
    for (const entry in conversionBook) {
      outputFields[entry * 4 + 0].innerHTML = `${this.#currentInput} ${conversionBook[entry].unit1}`;
      outputFields[entry * 4 + 1].innerHTML = `${this.#convertedInput[entry][0]} ${conversionBook[entry].unit2}`;
      outputFields[entry * 4 + 2].innerHTML = `${this.#currentInput} ${conversionBook[entry].unit2}`;
      outputFields[entry * 4 + 3].innerHTML = `${this.#convertedInput[entry][1]} ${conversionBook[entry].unit1}`;
    };
  };
};

// array of all conversions
let conversionBook = [];
// inserts conversions
conversionBook.push(new conversionEntry("Length", "Meter", "Feet", 0.3048));
conversionBook.push(new conversionEntry("Volume", "Litre", "Imperial Gallon", 4.54609));
conversionBook.push(new conversionEntry("Mass", "Kilogram", "Pound", 0.45359237));

// selects input field
const input = document.getElementById("input-field")
// selects output fields
const outputHeader = document.getElementsByClassName("info-block-description");
const outputFields = document.getElementsByClassName("output-field");

// preformat header field
// ugly wrapping in code
for (entry in conversionBook) {
  outputHeader[entry].innerHTML =
  `
  ${conversionBook[entry].type}
   (${conversionBook[entry].unit1}/
   ${conversionBook[entry].unit2})
   `;
};

// create program
const program = new converter;
// necesarry for passing correct instance of this to program
// might be a more javascriptesque way, (arrow functions lexical this)
function programWrapper() {
  program.run();
};

// run program on input field change
input.addEventListener("input", programWrapper);