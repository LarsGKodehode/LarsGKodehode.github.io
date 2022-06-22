class Node {
  constructor(data) {
    this.data = data;
  };

  #data;
  #nextNode;

  set data(data) {
    this.#data = data;
  };
  get data() {
    return this.#data
  };

  set nextNode(node) {
    this.#nextNode = node;
  };
  get nextNode() {
    return this.#nextNode;
  };
};

class List {
  constructor(data) {
    this.currentNode = new Node(data);
    this.nextNode = this.currentNode;
    this.currentNode.nextNode = this.currentNode;
  };

  #currentNode;
  #nextNode;

  insertNode(data) {};
  next() {};
  listNodes() {};

  // getters and setters
  set currentNode(node) {
    this.#currentNode = node;
  };
  get currentNode() {
    return this.#currentNode;
  };

  set nextNode(node) {
    this.#nextNode = node;
  };
  get nextNode() {
    return this.#nextNode;
  };

  // methods
  insertNode(data) {
    const newNode = new Node(data);
    newNode.nextNode = this.currentNode.nextNode;
    this.currentNode.nextNode = newNode;
    this.currentNode = newNode;
  };

  next() {
    this.currentNode = this.nextNode;
    this.nextNode = this.currentNode.nextNode;
  };

  listNodes() {
    const startNode = this.currentNode;
    let nodeArray = [];

    while (!(startNode === this.nextNode)) {
      nodeArray.push(this.currentNode.data);
      this.next();
    };
    return nodeArray;
  };
};







// =======================================
//  -------------- Testing --------------
// =======================================

// initial setup
const list = new List(1);

console.log(" -------- test 01 --------")
console.log(list);
console.log(list.currentNode);
console.log(list.nextNode);
console.log("==========================")

console.log(" -------- test 02 --------")
list.insertNode(2);
console.log(list.currentNode);
console.log(list.nextNode);
console.log("==========================")

console.log(" -------- test 03 --------")
for (let i = 0; i < 30; i++) {
  list.insertNode(i);
};
console.log(list.listNodes(100));
console.log("==========================")
