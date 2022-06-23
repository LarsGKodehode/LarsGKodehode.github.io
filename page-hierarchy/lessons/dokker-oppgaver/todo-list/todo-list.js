/* CONTENTS:
  1. Global Variables
  2. Function to append task element
  3. Helper Functions
  4. Functionality Functions
  5. Keyboard Shortcuts
*/

// ----- 1. Global Variables -----
const inputField = document.getElementById("input-field");
const buttonSubmit = document.getElementById("input-button-submit");
const listTarget = document.getElementById("task-list-insertion-point");
const buttonSave = document.getElementById("button-save");
const buttonLoad = document.getElementById("button-load");
const buttonSort = document.getElementById("button-sort");
let taskList = []; // array to hold tasks for sorting and rerendering
let sortFunctions = []; // array to hold sorting function to allow cycling through them
let currentSortIndex = 0;



// ----- 2. Function to append task element -----
function addListElement(description, target=listTarget) {
  // element definition
  const newTaskDefinition = `
  <li class="list-element-wrapper" dragable="true" data-tooltip="Due: Tomorrow, 12.00>

    <div class="overlay-task-done hidden not-clickable"></div>

    <div class="texts-wrapper">
      <p>${description}</p>
    </div>

    <div class="buttons-wrapper">
      <input type="button" class="button button-done" value="DONE">
      <input type="button" class="button button-delete" value="DELETE">
    </div>

  </li>
  `;

  // parse new element to DOM node
  const newTaskNode = new DOMParser().parseFromString(newTaskDefinition, "text/html").body.firstChild;

  // find interactive elements
  const elementList = newTaskNode.querySelectorAll("input");
  for (element of elementList) {
    if (element.className.includes("done")){
      element.addEventListener("click", (e) => taskComplete(e, newTaskNode));
    } else if (element.className.includes("delete")) {
      element.addEventListener("click", (e) => taskDelete(e, description));
    };
  };

  // append new task
  target.appendChild(newTaskNode);
};



// ----- 3. Helper Functions -----

// store taskList locally
function saveTasks() {
  console.log("saving");
  localStorage.setItem("savedTasks", JSON.stringify(taskList));
};

function loadTasks() {
  const loadedJSON = localStorage.getItem("savedTasks")
  if (!loadedJSON) {return};
  let loadedTasks = [];
  for (entry of JSON.parse(loadedJSON)) {
    loadedTasks.push(entry);
  };
  taskList.splice(0, taskList.length, ...loadedTasks);
  renderTasks();

};

// rerenders stored tasks
function renderTasks() {
  // clears task list
  while(listTarget.firstChild) {
    listTarget.removeChild(listTarget.firstChild);
  };
  // readds tasks to DOM
  for (task of taskList) {
    addListElement(task);
  };
};


// variuos sorting functions

// alphabetically sorting
function alphabeticallyAscending(a, b) {
  return a.localeCompare(b);
};
sortFunctions.push({
    sortFunction: alphabeticallyAscending,
    iconPath: "/content/icon/actions/sort-alpha-ascending.svg",
});

function alphabeticallyDescending(a, b) {
  return b.localeCompare(a);
};
sortFunctions.push({
    sortFunction: alphabeticallyDescending,
    iconPath: "/content/icon/actions/sort-alpha-descending.svg",
});


// ----- 4. Funtionality Functions -----

// function sections

function taskAdd() {
  if (inputField.value == /^\s*$/) {return}; // regex to check for empty string
  // add to task list
  taskList.push(inputField.value);
  // add to DOM
  addListElement(inputField.value);
  // clears input field
  inputField.value = "";
  // resets sort icon to unsorted
  buttonSort.src = "/content/icon/actions/sort-unsorted.svg";
};

/*
TODO: this should dynamically find target to toggle, not hardcoded
*/
function taskComplete(e, node) {
  node.children[0].classList.toggle("hidden");
};

function taskDelete(event, description) {
  // remove from DOM
  event.target.parentElement.parentElement.remove();
  // remove from taskList
  const index = taskList.indexOf(description);
  taskList.splice(index, 1);
};

function focusInput(target, value) {
  inputField.focus();
};

/*
TODO: replace cycling hack with linked list
*/
function sortList() {
  taskList.sort((a, b) => sortFunctions[currentSortIndex].sortFunction(a, b));
  buttonSort.src = sortFunctions[currentSortIndex].iconPath;
  renderTasks();

  // increment sort function
  if (currentSortIndex < (sortFunctions.length - 1)) { // there is  still sorting function left
    currentSortIndex += 1;
  } else { // this was the last, start over
    currentSortIndex = 0;
  };
};


// event listener section

// submit form
buttonSubmit.addEventListener("click", () => {
  if (inputField.value.match(/^\s*$/)) {return} // ignores empty input
  taskAdd();
});

// gui functions
buttonSave.addEventListener("click", () => saveTasks());
buttonLoad.addEventListener("click", () => loadTasks());
buttonSort.addEventListener("click", () => sortList());



// ----- 5. Keyboard Shortcuts -----

// keybinding listner
/*
currently only handles single key inputs, no "ctrl(cmd) + key" combos
*/
document.addEventListener("keydown", (event) => {
  if (!(event.code in keybindings)) {return}; // check if we have registred a keybinding
  if (document.activeElement.type === "text") {return}; // check if text input is in focus
  event.preventDefault(); // bypasses default event
  keybindings[event.code](event); // run hotkeyed function
});

// keybindings storage
let keybindings = {};

// bind keys
keybindings["KeyF"] = focusInput;
