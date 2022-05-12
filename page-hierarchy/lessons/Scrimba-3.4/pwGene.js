// container for available output fields
let outputFields = []
const docOutputFields = document.getElementsByClassName("output-field");

// pre calculated value for number of symbols in password
const numberOfSymbols = 16;

// this is a sensible utf-8 range
const alphabetStart = 33;
const alphabetEnd = 127;
const alphabetSize = alphabetEnd - alphabetStart;



function submit() {
  for (entry in docOutputFields) {
    let pwGene = "";
    for (i = 0; i < numberOfSymbols; i++) {
      pwGene += String.fromCharCode(Math.floor(Math.random() * alphabetSize + alphabetStart));
    };
    docOutputFields[entry].value = pwGene;
  };
};