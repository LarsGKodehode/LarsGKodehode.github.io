// ------------------------ run functions ------------------------

// runs an array of functions, can be nested. logs strings to console
function functionRun(package) {
  switch (typeof (package)) {
    case "function":
      console.log(`\nkjører: ${package.name}`);
      package();
      break;
    case "object":
      for (const pack of package) {
        functionRun(pack);
      };
      break;
    case "string":
      console.log(package);
      break;
    default:
      console.log(`"${typeof(package)}" is not a valid argument for "${functionRun.name}"`);
  };
};

// tests
const functionList = [
  function() {console.log("function 1")},
  function() {console.log("function 2")},
  [
    function() {console.log("function 1.1")},
    function() {console.log("function 1.2")},
    function() {console.log("function 1.3")}
  ],

]

// ------------------------ insert string ------------------------

// inserts an array of strings as children of target
function render(target, toDisplay) {
  let renderChunk = [toDisplay];
  publish(target, renderChunk);
};

// handles strings
function publish(target, texts) {
  const fragment = new DocumentFragment();
  const node = document.createElement("p");
  
  for (text of texts) {
    node.textContent += text;
  };
  
  fragment.appendChild(node);
  target.appendChild(fragment);
};



// ------------------------- clear childs ------------------------
function programClear(target) {
  while(target.firstChild) {
    target.removeChild(target.firstChild);
  };
};



// ------------------------- attach nodes ------------------------

// returns a document node built from object
function createNode(createInfo) {
  const newNode = document.createElement(createInfo.type);
  for ([key, value] of Object.entries(createInfo)) {
    if (key === "type") {continue};
    newNode[key] = value;
  };
  return newNode;
};

// returns a document node built from an array of objects
function createNodeSiblings(createInfo, type="div") {
  if (Array.isArray(createInfo)) {
    const fullNode = document.createElement(type);
    
    for (entry of createInfo) {
      fullNode.appendChild(createNodeShard(entry));
    };
    return fullNode;
  };
  
  return createNodeShard(createInfo);
};



// ------------------------- Keyboard Shortcuts ------------------------

// keybinding listner
/*
currently only handles single key inputs, not key combos
 */
document.addEventListener("keydown", (event) => {
  if (!(event.code in keybindings)) {return}; // check if we have registred a keybinding
  if (document.activeElement.type === "text") {return}; // check if text input is in focus
  event.preventDefault(); // bypasses default event
  keybindings[event.code](event); // run hotkeyed function
});

// keybindings storage
let keybindings = {};



// ------------------------- Circular Single Linked List ------------------------

class singleLinkedListNode {
  constructor(data, next = parent.head) {
    this.data = data;
    this.next = next;
  };
};

class singleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  };
  
  push(string) {
    if (tail === null) { // list empty
    this.head = new singleLinkedListNode(string);
    this.tail = new singleLinkedListNode(string);
    } else {

    };
  };
  
  next() {
    this.tail.next;
  };
};



// tests
console.clear();

let list = new singleLinkedList;

const cases = ["a", "b", "c"];
for (entry of cases) {
  console.log(`Inserting:\t${entry}`);
  list.push(entry);
};

console.log(`Correct value is: a\t\t\tActual value is:${list.data}`);
console.log(`Correct value is: b\t\t\tActual value is:${list.next().data}`);
console.log(`Correct value is: c\t\t\tActual value is:${list.next().data}`);
console.log(`Correct value is: a\t\t\tActual value is:${list.next().data}`);
