/* CONTENTS:
  1. Global Variables
  2. Function to append task
  3. Helper Functions
  4. Functionality Functions
  5. Keyboard Shortcuts
*/

// ----- 1. Global Variables -----
const inputField = document.getElementById("input-field");
const buttonSubmit = document.getElementById("input-button-submit");
const buttonSort = document.getElementById("button-sort");
const listTarget = document.getElementById("task-list-insertion-point");
let taskList = [];



// ----- 2. Function create list element k -----
function addListElement(description, target=listTarget) {
  // --- Element Wrapper
  const nodeElementWrapper = {
    type: "li",
    className: "list-element-wrapper",
  };
  const elementWrapper = createNode(nodeElementWrapper);
  // add ordering through hasinh the discription
  elementWrapper.dataset.hash = simpleHash(description);


  // --- Overlay
  const nodeOverlay = {
    type: "div",
    className: "overlay-task-done hidden",
  };
  elementWrapper.appendChild(createNode(nodeOverlay));


  // --- Section Texts
  const nodeTextWrapper = {
    type: "div",
    className: "texts-wrapper",
  };
  const textWrapper = createNode(nodeTextWrapper);
  elementWrapper.appendChild(textWrapper);

  // text description
  const nodeDescriptionElement = {
    type: "p",
    textContent: description,
  };
  textWrapper.appendChild(createNode(nodeDescriptionElement));

  // text details
  const nodeDetailElement = {
    type: "small",
    className: "button-add-details",
    textContent: "Add details",
  };
  textWrapper.appendChild(createNode(nodeDetailElement));

  
  //  --- Section Buttons
  const nodeButtonWrapper = {
    type: "div",
    className: "buttons-wrapper",
  };
  const buttonWrapper = createNode(nodeButtonWrapper);
  elementWrapper.appendChild(buttonWrapper);

  // button done
  const buttonDone = document.createElement("input");
  buttonDone.type = "button";
  buttonDone.className = "button button-done";
  buttonDone.value = "DONE";
  buttonWrapper.appendChild(buttonDone);

  // button delete
  const buttonDelete = document.createElement("input");
  buttonDelete.type = "button";
  buttonDelete.className = "button button-delete";
  buttonDelete.value = "DELETE";
  buttonWrapper.appendChild(buttonDelete);

  // add interactions
  buttonDone.addEventListener("click", (e) => taskComplete(e));
  buttonDelete.addEventListener("click", (e) => taskDelete(e));

  // add to task list
  taskList.push(elementWrapper);
};



// ----- 3. Helper Functions -----
function createNode(createInfo) {
  const newNode = document.createElement(createInfo.type);
  for ([key, value] of Object.entries(createInfo)) {
    if (key === "type") {continue};
    newNode[key] = value;
  };
  return newNode;
};

// hashing algorithm
// TODO: this does not work as intended currently, read some more
// problem is first characters gets assigned to low values, might just get the value of the 32 first ones
function simpleHash(string) {
  let hash = 0;
  if (string.length === 0) {return hash};
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i) * (string.length - i); // problematic portion
  };
  hash |= 0; // casts value to a 32bit int
  return hash;
};



// ----- 4. Funtionality Functions -----
// function sections
function taskAdd() {
  if (inputField.value == /^\s*$/) {return}; // regex to check for empty string
  addListElement(inputField.value);
  inputField.value = "";
};

function taskComplete(e) {
  e.target.parentElement.previousSibling.previousSibling.classList.toggle("hidden");
};

function taskDelete(e) {
  // hardcoded value here
  e.target.parentElement.parentElement.remove();
};

function focusInput() {
  inputField.focus();
}

// rerenders stored tasks
function renderTasks() {
  for (task of taskList) {
    targetList.appendChild(task);
  };
};

// sort tasks
function sortTasks() {
  for (node of taskList) {
    console.log(node);
    node.style.order = node.dataset.hash;
    console.log(node);
  };
};

// event listener section
// submit form
buttonSubmit.addEventListener("click", (e) => {
  if (inputField.value.match(/^\s*$/)) {return}
  taskAdd();
});

buttonSort.addEventListener("click", (e) => sortTasks());



// ----- 5. Keyboard Shortcuts -----
// keybinding listner
document.addEventListener("keydown", (e) => {
  if (!(e.code in keybindings)) {return}; // check if we have registred a keybinding
  if (!document.activeElement.type === "text") {e.preventDefault()}; // prevents hijacking of input if active text input
  keybindings[e.code](); // run hotkeyed function
});

// keybindings storage
let keybindings = {};

// bind keys
keybindings["KeyF"] = focusInput;