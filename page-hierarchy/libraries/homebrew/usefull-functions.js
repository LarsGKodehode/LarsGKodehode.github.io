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