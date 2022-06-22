class Queue {
  constructor(size) {
    this.size = size;
  };

  // members
  #data = [];
  #rear = 0;
  #size;

  //methods
  enqueue(data) {};
  dequeue() {};
  
  // setters and getters
  set data(data) {
    this.#data = data;
  };
  get data() {
    return this.#data;
  };

  set rear(integer) {
    this.#rear = integer;
  };
  get rear() {
    return this.#rear;
  };

  set size(integer) {
    this.#size = integer;
  };
  get size() {
    return this.#size;
  };

  // methods definitions
  enqueue(data) {
    if (this.rear < this.size) {
      this.data[this.rear] = data;
    this.rear += 1;
    } else {return false}; // queue is full
  };
};





// =======================================
//  -------------- Testing --------------
// =======================================

// test helper
function testCases(testSet) {
  console.log(` -------- Test: ${testSet.name} --------`);
  for (test of testSet.cases) {
    
  };
  console.log("==========================");
};

// initial setup
const queue = new Queue(10);

const cases01 = {
  "name": "Enqueue & Dequeue",
  "cases": [
    [,
    ]
  ],
};
testCases(cases01);