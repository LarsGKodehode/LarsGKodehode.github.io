let activeCursor = document.getElementById("display-cursor")
activeCursor.innerHTML = "";

function writeDigit(x) {
  activeCursor.innerHTML += x;
}

function calculate(func) {
  displayMoveCursor();
  displayInsertMathSign(func);
  displayMoveCursor();
}

function funcEqual() {
};

function funcAdd() {
};

function funcSub() {
};

// dev functions
function funcLog() {
};