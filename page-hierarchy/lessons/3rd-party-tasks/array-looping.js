// algorithms for testing

// container for algorithms
const algorithmList = [
  // simple test cas for faulty algorithm
  bogusImplementation,
];

// simple algorithm translated directly from task
function simpleImplementation(length, arr) {
  for (let i = 1; i <= length; i++) {
    if (i % 3 === 0 && i % 5 === 0) {arr[i] = "FizzBuzz"
    } else if (i % 3 === 0) {arr[i] = "Fizz"
    } else if (i % 5 === 0) {arr[i] = "Buzz"
    } else { arr.push(i)
    };
  };
};
algorithmList.push(simpleImplementation);

// some more tought put into this one
function fillFirstThenReplace(length, arr) {
  // fill array first
  for (let i = 0; i <= length; i++) {
    arr[i] = i;
  };

  // replace first
  for (let i = 5; i <= length; i += 5) {
    arr[i] = "Buzz";
  };

  // replace common
  for (let i = 3; i <= length; i += 3) {
    arr[i] = "Fizz";
  };

  // add to rare
  for (let i = 15; i <= length; i += 3*5) {
    arr[i] += "Buzz";
  };
};
algorithmList.push(fillFirstThenReplace);


function bogusImplementation (length, arr){
  arr[0] = length * 2;
};


function run(implementation, length, arr) {
  implementation(length, arr);
};

function algorithmFaultless(subject, cases) {
  for (entry of cases) {
    if ( subject[entry.index] !== entry.value) {
      render(targetPlane, [`Faulty algorithm:\t ${implementation.name} | Index[${entry.index}] = ${subject[entry.index]}; Expexted ${entry.value}`]);
      //console.log(subject);
      return false;
    };
  };
  return true;
};

function main(algorithms, length, testCases) {
  let results = [];
  
  for (implementation of algorithms) {
    // initialize array with 0 @ index 0
    let arr = [0];
    // run algorithm
    const t1 = window.performance.now();
    run(implementation, length, arr);
    const t2 = window.performance.now();

    // checks wether algorithm passed
    if (!algorithmFaultless(arr, testCases)){
      // logArray(arr, 0, 15);
      continue;
    };

    // record time
    results.push({
      name: implementation.name,
      runningTime: t2 - t1,
    });
  };
  
  // post result to console
  for (entry of results) {
    render(targetPlane, `algorithm:\t ${entry.name}\nrunning time was\t ~${Number.parseFloat(entry.runningTime).toFixed(1)} ms`);
  };
};

// helper functions
function logArray(arr, start, stop) {
  let record = [];
  for (i = start; i <= stop; i++) {
    record.push(arr[i]);
  };
  render(targetPlane, record);
};

// render/insert in html element
function render(target, toDisplay) {
  let renderChunk = [];
  renderChunk.push(toDisplay);
  
  publish(target, renderChunk);
};

function publish(target, texts) {
  const fragment = new DocumentFragment();
  const node = document.createElement("p");
  
  for (text of texts) {
    node.textContent += text;
  };
  
  fragment.appendChild(node);
  target.appendChild(fragment);
};


// render target
const targetPlane = document.getElementById("console-display");
// size of array
const runningLength = 10**3 ;

// test cases
const tests = [
  {index: 0, value: 0},
  {index: 2, value: 2},
  {index: 3, value: "Fizz"},
  {index: 4, value: 4},
  {index: 5, value: "Buzz"},
  {index: 6, value: "Fizz"},
  {index: 7, value: 7},
  {index: 15, value: "FizzBuzz"},
  {index: 150, value: "FizzBuzz"},
];

// run program
//console.clear();

function programClear() {
  while(targetPlane.firstChild) {
    targetPlane.removeChild(targetPlane.firstChild);
  };
};

function programRun() {
  main(algorithmList, runningLength, tests);
};

// grab handlers
const inputRun = document.getElementById("button-run");
inputRun.addEventListener("click", programRun);
const inputClear = document.getElementById("button-clear");
inputClear.addEventListener("click", programClear);