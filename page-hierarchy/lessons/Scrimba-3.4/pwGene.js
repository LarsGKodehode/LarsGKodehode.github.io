// container for available output fields
let outputFields = [];
const documentOutputFields = document.getElementsByClassName("output-field");

// how many symbols in password
const passwordLength = 16;

// this is a sensible selection of utf-8 charecters
const alphabetStart = 33;
const alphabetEnd = 127;
const alphabetSize = alphabetEnd - alphabetStart;

function generatePassword() {
  for (field in documentOutputFields) {
    let newPassword = "";
    for (i = 0; i < passwordLength; i++) {
      newPassword += String.fromCharCode(Math.floor(Math.random() * alphabetSize + alphabetStart));
    };
    documentOutputFields[field].value = newPassword;
  };
};

function switchTheme() {
  console.log("button clicked");
  let currentTheme = document.body.dataset.theme;
  switch (currentTheme) {
    case "dark":
      document.body.dataset.theme = "light";
      console.log("new theme is light")
      break;
    case "light":
      document.body.dataset.theme = "dark";
      console.log("new theme is dark")
      break;
  };
};

const themeSwitch = document.getElementById("theme-switcher");
themeSwitch.addEventListener("click", switchTheme);